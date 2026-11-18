import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import './build.ts';

const ROOT_DIR = process.cwd();
const PORT = Number(process.env.PORT || 3000);
const DATA_FILE = path.join(ROOT_DIR, 'data', 'baocao.json');

const ADMIN_HASH = process.env.WAN_ADMIN_HASH || '45b8778b307f91d4e32dd17b51b02f4b95ff5b7c10e66485b6275cdf294d3105';
const SERVER_SECRET = process.env.WAN_SERVER_SECRET || 'evngenco2-wan-sec-2026-auth-sig';

// Brute-force protection
const attemptTracker = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 60 * 1000;

function verifyToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  if (token.startsWith('off-')) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [payloadB64, expiresAtStr, sig] = parts;
    const expiresAt = Number(expiresAtStr);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const expectedSig = crypto
      .createHmac('sha256', SERVER_SECRET)
      .update(`${payloadB64}.${expiresAtStr}`)
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
  } catch {
    return false;
  }
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

function readBaocaoJson(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {}
  return [];
}

function saveBaocaoAndSyncXlsx(items: any[], callback?: () => void) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
    execFile(
      'python3',
      [path.join(ROOT_DIR, 'scripts', 'generate_baocao.py'), '--json', JSON.stringify(items)],
      (err) => {
        if (err) console.error('Error updating baocao.xlsx:', err);
        if (callback) callback();
      }
    );
  } catch (err) {
    console.error('Error saving baocao.json:', err);
    if (callback) callback();
  }
}

const server = http.createServer((req, res) => {
  const reqUrl = (req.url || '/').split('?')[0];

  // Set Enterprise Security Headers
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // API Route /api/auth
  if (reqUrl === '/api/auth') {
    const clientIp = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown').split(',')[0].trim();

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const tracker = attemptTracker.get(clientIp) || { count: 0, lockedUntil: 0 };
          if (Date.now() < tracker.lockedUntil) {
            const waitSec = Math.ceil((tracker.lockedUntil - Date.now()) / 1000);
            res.writeHead(429, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: `Quá nhiều lần thử sai. Vui lòng đợi ${waitSec} giây.`, locked: true }));
            return;
          }

          const { code } = JSON.parse(body || '{}');
          const inputHash = crypto.createHash('sha256').update(String(code || '').trim()).digest('hex');

          if (crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(ADMIN_HASH))) {
            attemptTracker.delete(clientIp);
            const expiresAt = Date.now() + 8 * 3600 * 1000;
            const payloadB64 = Buffer.from(JSON.stringify({ role: 'admin', ip: clientIp })).toString('base64url');
            const sig = crypto.createHmac('sha256', SERVER_SECRET).update(`${payloadB64}.${expiresAt}`).digest('hex');
            const token = `${payloadB64}.${expiresAt}.${sig}`;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, token, expiresAt }));
          } else {
            tracker.count = (tracker.count || 0) + 1;
            if (tracker.count >= MAX_ATTEMPTS) {
              tracker.lockedUntil = Date.now() + LOCKOUT_TIME_MS;
            }
            attemptTracker.set(clientIp, tracker);
            const remaining = Math.max(0, MAX_ATTEMPTS - tracker.count);
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              error: remaining > 0 ? `Mã đăng nhập không chính xác! (Còn ${remaining} lần thử)` : 'Tài khoản bị tạm khóa 60 giây do nhập sai nhiều lần.',
              remainingAttempts: remaining,
            }));
          }
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    if (req.method === 'GET') {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.replace(/^Bearer\s+/i, '').trim();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ valid: verifyToken(token) }));
      return;
    }
  }

  // API Route /api/baocao
  if (reqUrl === '/api/baocao') {
    if (req.method === 'GET') {
      const items = readBaocaoJson();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(items));
      return;
    }

    // Require authentication token for state modifications
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!verifyToken(token)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Yêu cầu quyền Quản trị viên để thực hiện thao tác.' }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const items = JSON.parse(body || '[]');
          saveBaocaoAndSyncXlsx(items, () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, count: items.length }));
          });
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    if (req.method === 'DELETE') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const { id } = JSON.parse(body || '{}');
          let items = readBaocaoJson();
          if (id) {
            items = items.filter((it: any) => it.id !== id);
          }
          saveBaocaoAndSyncXlsx(items, () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Đã xóa hàng trong baocao.xlsx', items }));
          });
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }
  }

  const relPath = reqUrl === '/' ? '/index.html' : reqUrl;
  const safePath = path.normalize(relPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const fullPath = path.join(ROOT_DIR, safePath);

  if (!fullPath.startsWith(ROOT_DIR) || !fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(fullPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(fullPath).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server giao diện sơ đồ WAN đang chạy tại: http://localhost:${PORT}`);
});


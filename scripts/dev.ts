import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import './build.ts';

const ROOT_DIR = process.cwd();
const PORT = Number(process.env.PORT || 3000);
const DATA_FILE = path.join(ROOT_DIR, 'data', 'baocao.json');
const INFOR_DATA_FILE = path.join(ROOT_DIR, 'data', 'infor.json');

const ADMIN_HASH = process.env.WAN_ADMIN_HASH || '45b8778b307f91d4e32dd17b51b02f4b95ff5b7c10e66485b6275cdf294d3105';
const SERVER_SECRET = process.env.WAN_SERVER_SECRET || 'evngenco2-wan-sec-2026-auth-sig';

// Danh sách mật khẩu xác thực 8 đơn vị EVNGENCO2
const UNIT_PASSWORDS: Record<string, string> = {
  'Tổng công ty Phát điện 2': '@2026!EVNGENCO2-1',
  'Ban Quản lý dự án EVNGENCO2': '@2026!EVNGENCO2-2',
  'Công ty CP Thuỷ điện Thác Mơ': '@2026!EVNGENCO2-3',
  'Công ty CP Thuỷ điện A Vương': '@2026!EVNGENCO2-4',
  'Công ty CP Thuỷ điện Sông Ba Hạ': '@2026!EVNGENCO2-5',
  'Công ty CP NĐ Phả Lại': '@2026!EVNGENCO2-6',
  'Công ty CP NĐ Hải Phòng': '@2026!EVNGENCO2-7',
  'Công ty TNHH MTV Thuỷ điện Trung Sơn': '@2026!EVNGENCO2-8',
};

// Brute-force protection
const attemptTracker = new Map();
const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME_MS = 5 * 60 * 1000;

function verifyToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
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

    if (sig.length !== expectedSig.length) return false;
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

function parseTimeValue(timeStr: string): number {
  if (!timeStr) return -1;
  const s = String(timeStr).trim();

  // Pattern 1: DD/MM/YYYY or DD-MM-YYYY, with optional HH:mm[:ss]
  const dmyMatch = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const hour = dmyMatch[4] ? parseInt(dmyMatch[4], 10) : 0;
    const min = dmyMatch[5] ? parseInt(dmyMatch[5], 10) : 0;
    const sec = dmyMatch[6] ? parseInt(dmyMatch[6], 10) : 0;
    const d = new Date(year, month, day, hour, min, sec);
    if (!isNaN(d.getTime())) return d.getTime();
  }

  // Pattern 2: YYYY-MM-DD or YYYY/MM/DD, with optional HH:mm[:ss]
  const ymdMatch = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    const hour = ymdMatch[4] ? parseInt(ymdMatch[4], 10) : 0;
    const min = ymdMatch[5] ? parseInt(ymdMatch[5], 10) : 0;
    const sec = ymdMatch[6] ? parseInt(ymdMatch[6], 10) : 0;
    const d = new Date(year, month, day, hour, min, sec);
    if (!isNaN(d.getTime())) return d.getTime();
  }

  const parsed = Date.parse(s);
  if (!isNaN(parsed)) return parsed;

  return -1;
}

function sortItemsDescending(items: any[]): any[] {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const diff = parseTimeValue(b.time) - parseTimeValue(a.time);
    if (diff !== 0) return diff;
    return String(b.time || '').localeCompare(String(a.time || ''));
  });
}

function readBaocaoJson(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return sortItemsDescending(parsed);
    }
  } catch {}
  return [];
}

function saveBaocaoAndSyncXlsx(items: any[], callback?: () => void) {
  try {
    const sorted = sortItemsDescending(items);
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(sorted, null, 2), 'utf-8');
    execFile(
      'python3',
      [path.join(ROOT_DIR, 'scripts', 'generate_baocao.py'), '--json', JSON.stringify(sorted)],
      (err) => {
        if (err) console.error('Error updating wan.xlsx:', err);
        if (callback) callback();
      }
    );
  } catch (err) {
    console.error('Error saving baocao.json:', err);
    if (callback) callback();
  }
}

function readInforJson(): any[] {
  try {
    if (fs.existsSync(INFOR_DATA_FILE)) {
      return JSON.parse(fs.readFileSync(INFOR_DATA_FILE, 'utf-8'));
    }
    if (fs.existsSync('/tmp/infor_data.json')) {
      return JSON.parse(fs.readFileSync('/tmp/infor_data.json', 'utf-8'));
    }
  } catch {}
  return [];
}

function saveInforAndSyncXlsx(items: any[], callback?: (err?: any) => void) {
  try {
    fs.mkdirSync(path.dirname(INFOR_DATA_FILE), { recursive: true });
    fs.writeFileSync(INFOR_DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
    const distData = path.join(ROOT_DIR, 'dist', 'data', 'infor.json');
    if (fs.existsSync(path.dirname(distData))) {
      try { fs.copyFileSync(INFOR_DATA_FILE, distData); } catch {}
    }
    execFile(
      'python3',
      [path.join(ROOT_DIR, 'scripts', 'generate_infor_excel.py')],
      (err) => {
        if (err) console.error('Error updating infor.xlsx:', err);
        if (callback) callback(err);
      }
    );
  } catch (err) {
    console.error('Error saving infor.json:', err);
    if (callback) callback(err);
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
            const waitMin = Math.ceil(waitSec / 60);
            res.writeHead(429, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              error: `Tài khoản bị tạm khóa do nhập sai quá 3 lần liên tiếp. Vui lòng đợi ${waitSec} giây (~${waitMin} phút) trước khi thử lại.`,
              locked: true,
              waitSeconds: waitSec,
            }));
            return;
          }

          const { unit, password, code } = JSON.parse(body || '{}');
          const inputPass = String(password || code || '').trim();
          if (!inputPass) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Mật khẩu xác thực không được để trống.' }));
            return;
          }

          let isValid = false;
          let loggedInUnit = unit || '';

          // So sánh mật khẩu bảo vệ Timing Attack
          if (unit && UNIT_PASSWORDS[unit]) {
            const expected = UNIT_PASSWORDS[unit];
            const expHash = crypto.createHash('sha256').update(expected).digest('hex');
            const inHash = crypto.createHash('sha256').update(inputPass).digest('hex');
            isValid = crypto.timingSafeEqual(Buffer.from(inHash), Buffer.from(expHash));
          } else if (!unit) {
            for (const [uName, uPass] of Object.entries(UNIT_PASSWORDS)) {
              const expHash = crypto.createHash('sha256').update(uPass).digest('hex');
              const inHash = crypto.createHash('sha256').update(inputPass).digest('hex');
              if (crypto.timingSafeEqual(Buffer.from(inHash), Buffer.from(expHash))) {
                isValid = true;
                loggedInUnit = uName;
                break;
              }
            }
            if (!isValid) {
              const inHash = crypto.createHash('sha256').update(inputPass).digest('hex');
              if (inHash.length === ADMIN_HASH.length && crypto.timingSafeEqual(Buffer.from(inHash), Buffer.from(ADMIN_HASH))) {
                isValid = true;
                loggedInUnit = 'Quản trị viên EVNGENCO2';
              }
            }
          }

          if (isValid) {
            attemptTracker.delete(clientIp);
            const expiresAt = Date.now() + 8 * 3600 * 1000;
            const payloadB64 = Buffer.from(JSON.stringify({ role: 'user', unit: loggedInUnit, ip: clientIp, loginTime: Date.now() })).toString('base64url');
            const sig = crypto.createHmac('sha256', SERVER_SECRET).update(`${payloadB64}.${expiresAt}`).digest('hex');
            const token = `${payloadB64}.${expiresAt}.${sig}`;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              token,
              expiresAt,
              unit: loggedInUnit,
              message: `Xác thực thành công: ${loggedInUnit}`,
            }));
          } else {
            tracker.count = (tracker.count || 0) + 1;
            if (tracker.count >= MAX_ATTEMPTS) {
              tracker.lockedUntil = Date.now() + LOCKOUT_TIME_MS;
            }
            attemptTracker.set(clientIp, tracker);
            const remaining = Math.max(0, MAX_ATTEMPTS - tracker.count);
            if (remaining === 0) {
              res.writeHead(429, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                error: 'Bạn đã nhập mật khẩu sai 3 lần liên tiếp. Hệ thống tạm khóa đăng nhập trong 5 phút để bảo vệ tài khoản.',
                locked: true,
                remainingAttempts: 0,
                waitSeconds: 300,
              }));
            } else {
              res.writeHead(401, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                error: unit
                  ? `Mật khẩu không chính xác cho ${unit}! (Còn ${remaining} lần thử trước khi bị khóa 5 phút)`
                  : `Mật khẩu xác thực không chính xác! (Còn ${remaining} lần thử trước khi bị khóa 5 phút)`,
                remainingAttempts: remaining,
              }));
            }
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
            res.end(JSON.stringify({ success: true, message: 'Đã xóa hàng trong wan.xlsx', items }));
          });
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }
  }

  // API Route /api/infor
  if (reqUrl === '/api/infor') {
    if (req.method === 'GET') {
      const items = readInforJson();
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
          const payload = JSON.parse(body || '{}');
          let items = readInforJson();

          if (Array.isArray(payload)) {
            items = payload;
          } else if (payload && payload.id) {
            const targetId = String(payload.id);
            const idx = items.findIndex((it: any) => String(it.id) === targetId);
            if (idx !== -1) {
              if (payload.parameter !== undefined) items[idx].parameter = String(payload.parameter);
              if (payload.categoryCode !== undefined) items[idx].categoryCode = payload.categoryCode;
              if (payload.categoryName !== undefined) items[idx].categoryName = payload.categoryName;
              if (payload.title !== undefined) items[idx].title = payload.title;
              if (payload.subtitle !== undefined) items[idx].subtitle = payload.subtitle;
              if (payload.regionCode !== undefined) items[idx].regionCode = payload.regionCode;
              if (payload.regionName !== undefined) items[idx].regionName = payload.regionName;
              if (payload.strokeColor !== undefined) items[idx].strokeColor = payload.strokeColor;
              if (payload.strokeWidth !== undefined) items[idx].strokeWidth = payload.strokeWidth;
              if (payload.fillColor !== undefined) items[idx].fillColor = payload.fillColor;
              if (payload.x1 !== undefined) items[idx].x1 = payload.x1;
              if (payload.y1 !== undefined) items[idx].y1 = payload.y1;
              if (payload.notes !== undefined) items[idx].notes = payload.notes;
            }
          }

          saveInforAndSyncXlsx(items, (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Lỗi khi cập nhật infor.xlsx', details: String(err) }));
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, count: items.length }));
            }
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


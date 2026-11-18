import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import './build.ts';

const ROOT_DIR = process.cwd();
const PORT = Number(process.env.PORT || 3000);
const DATA_FILE = path.join(ROOT_DIR, 'data', 'baocao.json');

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

  // API Route /api/baocao
  if (reqUrl === '/api/baocao') {
    if (req.method === 'GET') {
      const items = readBaocaoJson();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(items));
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


import fs from 'node:fs';
import path from 'node:path';
import { verifyServerToken } from './auth.js';

let inMemoryItems = null;

function getInitialInforData() {
  if (inMemoryItems && inMemoryItems.length > 0) {
    return inMemoryItems;
  }
  try {
    const candidatePaths = [
      path.join(process.cwd(), 'data', 'infor.json'),
      path.join(process.cwd(), 'dist', 'data', 'infor.json'),
      '/tmp/infor_data.json',
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        inMemoryItems = JSON.parse(fs.readFileSync(p, 'utf-8'));
        return inMemoryItems;
      }
    }
  } catch {}
  inMemoryItems = [];
  return inMemoryItems;
}

export default function handler(req, res) {
  const origin = req.headers.origin || '';
  if (origin.endsWith('.vercel.app') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Trả về danh sách thông tin phần tử
  if (req.method === 'GET') {
    const items = getInitialInforData();
    return res.status(200).json(items);
  }

  // POST: Cập nhật thông tin (bắt buộc xác thực Quản trị viên)
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const isAuthorized = verifyServerToken(token);

  if (!isAuthorized) {
    return res.status(401).json({
      error: 'Từ chối truy cập (401 Unauthorized): Yêu cầu quyền Quản trị viên đã xác thực để chỉnh sửa.',
    });
  }

  if (req.method === 'POST') {
    try {
      const payload = req.body || {};
      let items = getInitialInforData();

      if (Array.isArray(payload)) {
        items = payload;
        inMemoryItems = items;
      } else if (payload && payload.id) {
        const targetId = String(payload.id);
        const idx = items.findIndex((it) => String(it.id) === targetId);
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
        inMemoryItems = items;
      }

      // Cố gắng ghi vào /tmp để giữ lại trạng thái trong runtime lambda
      try {
        fs.writeFileSync('/tmp/infor_data.json', JSON.stringify(items, null, 2), 'utf-8');
      } catch {}

      return res.status(200).json({ success: true, count: items.length });
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}


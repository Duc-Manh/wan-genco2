import fs from 'node:fs';
import path from 'node:path';
import { verifyServerToken } from './auth.js';
import { kvGet, kvSet } from './kv.js';

function parseTimeValue(timeStr) {
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

function sortItemsDescending(items) {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const diff = parseTimeValue(b.time) - parseTimeValue(a.time);
    if (diff !== 0) return diff;
    return String(b.time || '').localeCompare(String(a.time || ''));
  });
}

let inMemoryItems = null;
const auditTrail = [];

function getInitialBaocaoData() {
  if (inMemoryItems && inMemoryItems.length > 0) {
    return inMemoryItems;
  }
  try {
    const candidatePaths = [
      path.join(process.cwd(), 'data', 'baocao.json'),
      path.join(process.cwd(), 'dist', 'data', 'baocao.json'),
      '/tmp/baocao_data.json',
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        inMemoryItems = sortItemsDescending(JSON.parse(fs.readFileSync(p, 'utf-8')));
        return inMemoryItems;
      }
    }
  } catch {}
  inMemoryItems = [];
  return inMemoryItems;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (origin.endsWith('.vercel.app') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Xem báo cáo - ưu tiên đọc từ Cloud KV (Redis) đồng bộ tất cả thiết bị
  if (req.method === 'GET') {
    try {
      const kvData = await kvGet('wan_baocao_data');
      if (Array.isArray(kvData) && kvData.length > 0) {
        inMemoryItems = sortItemsDescending(kvData);
        return res.status(200).json(inMemoryItems);
      }
    } catch {}

    const items = getInitialBaocaoData();
    if (items.length > 0) {
      // Seed dữ liệu mặc định lên Cloud KV nếu KV chưa có
      kvSet('wan_baocao_data', items).catch(() => {});
    }
    return res.status(200).json(sortItemsDescending(items));
  }

  // MỌI THAO TÁC THAY ĐỔI (POST, DELETE) BẮT BUỘC PHẢI CÓ TOKEN XÁC THỰC PHÍA SERVER
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const isAuthorized = verifyServerToken(token);

  if (!isAuthorized) {
    return res.status(401).json({
      error: 'Từ chối truy cập (401 Unauthorized): Yêu cầu quyền Quản trị viên đã xác thực để chỉnh sửa.',
    });
  }

  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();

  if (req.method === 'POST') {
    const items = Array.isArray(req.body) ? req.body : [];
    // Kiểm soát kích thước tải (Chống DoS/Buffer Overflow)
    if (items.length > 500) {
      return res.status(400).json({ error: 'Dữ liệu vượt quá dung lượng tối đa cho phép.' });
    }

    inMemoryItems = sortItemsDescending(items);

    // Lưu vĩnh viễn lên Cloud KV (đồng bộ đa thiết bị: máy tính, điện thoại, tablet)
    await kvSet('wan_baocao_data', inMemoryItems);

    try {
      fs.writeFileSync('/tmp/baocao_data.json', JSON.stringify(inMemoryItems, null, 2), 'utf-8');
    } catch {}

    // Ghi nhật ký kiểm toán (Audit Trail)
    auditTrail.push({
      action: 'UPDATE_ALL',
      ip: clientIp,
      count: inMemoryItems.length,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ success: true, count: inMemoryItems.length });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    let items = (await kvGet('wan_baocao_data')) || getInitialBaocaoData();
    if (id) {
      inMemoryItems = items.filter((it) => it.id !== id);
      await kvSet('wan_baocao_data', inMemoryItems);
      try {
        fs.writeFileSync('/tmp/baocao_data.json', JSON.stringify(inMemoryItems, null, 2), 'utf-8');
      } catch {}
      auditTrail.push({
        action: 'DELETE_ROW',
        ip: clientIp,
        rowId: id,
        timestamp: new Date().toISOString(),
      });
    }
    return res.status(200).json({ success: true, message: 'Đã xóa hàng trong baocao.xlsx', items: sortItemsDescending(inMemoryItems) });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

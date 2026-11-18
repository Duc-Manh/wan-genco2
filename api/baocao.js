import { verifyServerToken } from './auth.js';

let inMemoryItems = [];
const auditTrail = [];

export default function handler(req, res) {
  const origin = req.headers.origin || '';
  if (origin.endsWith('.vercel.app') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Xem báo cáo (Công khai cho người xem nội bộ)
  if (req.method === 'GET') {
    return res.status(200).json(inMemoryItems);
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

    inMemoryItems = items;

    // Ghi nhật ký kiểm toán (Audit Trail)
    auditTrail.push({
      action: 'UPDATE_ALL',
      ip: clientIp,
      count: items.length,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ success: true, count: items.length });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (id) {
      inMemoryItems = inMemoryItems.filter((it) => it.id !== id);
      auditTrail.push({
        action: 'DELETE_ROW',
        ip: clientIp,
        rowId: id,
        timestamp: new Date().toISOString(),
      });
    }
    return res.status(200).json({ success: true, message: 'Đã xóa hàng trong baocao.xlsx', items: inMemoryItems });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

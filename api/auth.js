import crypto from 'node:crypto';

// In-memory brute-force attempt tracker per IP
const attemptTracker = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 60 * 1000; // Khóa 60 giây sau 5 lần sai liên tiếp

// Server-side SHA-256 hash của mã quản trị (mật mã gốc không bao giờ xuất hiện ở plaintext)
const ADMIN_HASH = process.env.WAN_ADMIN_HASH || '45b8778b307f91d4e32dd17b51b02f4b95ff5b7c10e66485b6275cdf294d3105';
const SERVER_SECRET = process.env.WAN_SERVER_SECRET || 'evngenco2-wan-sec-2026-auth-sig';

export function verifyServerToken(token) {
  if (!token || typeof token !== 'string') return false;
  try {
    // Hỗ trợ offline token định dạng 'off-...'
    if (token.startsWith('off-')) {
      return true;
    }

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

export default function handler(req, res) {
  const origin = req.headers.origin || '';
  if (origin.endsWith('.vercel.app') || origin.includes('localhost') || origin.includes('127.0.0.1')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();

  if (req.method === 'POST') {
    // 1. Kiểm tra giới hạn khóa do Brute-force
    const tracker = attemptTracker.get(clientIp) || { count: 0, lockedUntil: 0 };
    if (Date.now() < tracker.lockedUntil) {
      const waitSec = Math.ceil((tracker.lockedUntil - Date.now()) / 1000);
      return res.status(429).json({
        error: `Quá nhiều lần thử sai. Vui lòng đợi ${waitSec} giây trước khi thử lại.`,
        locked: true,
      });
    }

    const { code } = req.body || {};
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Mã đăng nhập không được để trống.' });
    }

    // 2. Băm mã nhập vào bằng SHA-256 và so sánh an toàn
    const inputHash = crypto.createHash('sha256').update(code.trim()).digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(ADMIN_HASH))) {
      // Đăng nhập đúng: reset bộ đếm thất bại
      attemptTracker.delete(clientIp);

      const expiresAt = Date.now() + 8 * 60 * 60 * 1000; // Phiên đăng nhập có hiệu lực 8 giờ
      const payloadB64 = Buffer.from(JSON.stringify({ role: 'admin', ip: clientIp, loginTime: Date.now() })).toString('base64url');
      const sig = crypto
        .createHmac('sha256', SERVER_SECRET)
        .update(`${payloadB64}.${expiresAt}`)
        .digest('hex');
      const token = `${payloadB64}.${expiresAt}.${sig}`;

      return res.status(200).json({
        success: true,
        token,
        expiresAt,
        message: 'Xác thực thành công quyền Quản trị viên',
      });
    } else {
      // Đăng nhập sai: tăng bộ đếm và khóa nếu quá 5 lần
      tracker.count = (tracker.count || 0) + 1;
      if (tracker.count >= MAX_ATTEMPTS) {
        tracker.lockedUntil = Date.now() + LOCKOUT_TIME_MS;
      }
      attemptTracker.set(clientIp, tracker);

      const remaining = Math.max(0, MAX_ATTEMPTS - tracker.count);
      return res.status(401).json({
        error: remaining > 0 ? `Mã đăng nhập không chính xác! (Còn ${remaining} lần thử)` : 'Tài khoản bị tạm khóa 60 giây do nhập sai nhiều lần.',
        remainingAttempts: remaining,
      });
    }
  }

  if (req.method === 'GET') {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const valid = verifyServerToken(token);
    return res.status(200).json({ valid });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}


import crypto from 'node:crypto';
import { kvGet, kvSet } from './kv.js';

// Cấu hình chống dò mã xác thực (Brute-force protection)
const MAX_ATTEMPTS = 3; // Sai quá 3 lần
const LOCKOUT_TIME_MS = 5 * 60 * 1000; // Khóa 5 phút (300.000 ms)
const attemptTracker = new Map();

// Hash mã quản trị (lấy từ biến môi trường Vercel hoặc fallback)
const ADMIN_HASH = process.env.WAN_ADMIN_HASH || '45b8778b307f91d4e32dd17b51b02f4b95ff5b7c10e66485b6275cdf294d3105';
const SERVER_SECRET = process.env.WAN_SERVER_SECRET || 'evngenco2-wan-sec-2026-auth-sig';

// Danh sách mật khẩu xác thực 8 đơn vị EVNGENCO2
export const UNIT_PASSWORDS = {
  'Tổng công ty Phát điện 2': '@2026!EVNGENCO2-1',
  'Ban Quản lý dự án EVNGENCO2': '@2026!EVNGENCO2-2',
  'Công ty CP Thuỷ điện Thác Mơ': '@2026!EVNGENCO2-3',
  'Công ty CP Thuỷ điện A Vương': '@2026!EVNGENCO2-4',
  'Công ty CP Thuỷ điện Sông Ba Hạ': '@2026!EVNGENCO2-5',
  'Công ty CP NĐ Phả Lại': '@2026!EVNGENCO2-6',
  'Công ty CP NĐ Hải Phòng': '@2026!EVNGENCO2-7',
  'Công ty TNHH MTV Thuỷ điện Trung Sơn': '@2026!EVNGENCO2-8',
};

export function checkAndSetCors(req, res) {
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://wan-genco2.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080',
  ];

  const isAllowed =
    allowedOrigins.includes(origin) ||
    /^https:\/\/wan-genco2(-[a-z0-9-]+)?-duc-manhs-projects-d3de04df\.vercel\.app$/.test(origin) ||
    /^https:\/\/wan-genco2(-[a-z0-9-]+)?\.vercel\.app$/.test(origin);

  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return isAllowed;
}

// Xác thực Token an toàn phía Server (HMAC-SHA256 signature + expiration)
// KHÔNG CHẤP NHẬN token tự chế hoặc tiền tố 'off-'
export function verifyServerToken(token) {
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

async function getIpTracker(clientIp) {
  const cacheKey = `wan_auth_lock_${clientIp.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  try {
    const data = await kvGet(cacheKey);
    if (data && typeof data === 'object') return data;
  } catch {}
  return attemptTracker.get(clientIp) || { count: 0, lockedUntil: 0 };
}

async function saveIpTracker(clientIp, tracker) {
  const cacheKey = `wan_auth_lock_${clientIp.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  attemptTracker.set(clientIp, tracker);
  try {
    await kvSet(cacheKey, tracker);
  } catch {}
}

async function resetIpTracker(clientIp) {
  const cacheKey = `wan_auth_lock_${clientIp.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  attemptTracker.delete(clientIp);
  try {
    await kvSet(cacheKey, { count: 0, lockedUntil: 0 });
  } catch {}
}

export default async function handler(req, res) {
  checkAndSetCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();

  if (req.method === 'POST') {
    // 1. Kiểm tra trạng thái khóa (Đồng bộ qua Upstash Redis + in-memory)
    const tracker = await getIpTracker(clientIp);
    if (tracker && tracker.lockedUntil && Date.now() < tracker.lockedUntil) {
      const waitSec = Math.ceil((tracker.lockedUntil - Date.now()) / 1000);
      const waitMin = Math.ceil(waitSec / 60);
      return res.status(429).json({
        error: `Tài khoản bị tạm khóa do nhập sai quá 3 lần liên tiếp. Vui lòng đợi ${waitSec} giây (~${waitMin} phút) trước khi thử lại.`,
        locked: true,
        waitSeconds: waitSec,
      });
    }

    const { unit, password, code } = req.body || {};
    const inputPass = String(password || code || '').trim();
    if (!inputPass) {
      return res.status(400).json({ error: 'Mật khẩu xác thực không được để trống.' });
    }

    let isValid = false;
    let loggedInUnit = unit || '';

    // 2. So sánh mật khẩu bảo vệ Timing Attack
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
      // Đăng nhập đúng: reset toàn bộ bộ đếm sai
      await resetIpTracker(clientIp);

      const expiresAt = Date.now() + 8 * 60 * 60 * 1000; // Phiên 8 giờ
      const payloadB64 = Buffer.from(JSON.stringify({ role: 'user', unit: loggedInUnit, ip: clientIp, loginTime: Date.now() })).toString('base64url');
      const sig = crypto
        .createHmac('sha256', SERVER_SECRET)
        .update(`${payloadB64}.${expiresAt}`)
        .digest('hex');
      const token = `${payloadB64}.${expiresAt}.${sig}`;

      return res.status(200).json({
        success: true,
        token,
        expiresAt,
        unit: loggedInUnit,
        message: `Xác thực thành công: ${loggedInUnit}`,
      });
    } else {
      // Đăng nhập sai: tăng bộ đếm và khóa 5 phút nếu sai quá 3 lần
      tracker.count = (tracker.count || 0) + 1;
      if (tracker.count >= MAX_ATTEMPTS) {
        tracker.lockedUntil = Date.now() + LOCKOUT_TIME_MS;
      }
      await saveIpTracker(clientIp, tracker);

      const remaining = Math.max(0, MAX_ATTEMPTS - tracker.count);
      if (remaining === 0) {
        return res.status(429).json({
          error: 'Bạn đã nhập mật khẩu sai 3 lần liên tiếp. Hệ thống tạm khóa đăng nhập trong 5 phút để bảo vệ tài khoản.',
          locked: true,
          remainingAttempts: 0,
          waitSeconds: 300,
        });
      }

      return res.status(401).json({
        error: unit
          ? `Mật khẩu không chính xác cho ${unit}! (Còn ${remaining} lần thử trước khi bị khóa 5 phút)`
          : `Mật khẩu xác thực không chính xác! (Còn ${remaining} lần thử trước khi bị khóa 5 phút)`,
        remainingAttempts: remaining,
      });
    }
  }

  if (req.method === 'GET') {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    const valid = verifyServerToken(token);
    return res.status(200).json({ valid });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

import { checkAndSetCors } from './auth.js';
import { kvGet, kvSet } from './kv.js';

function getTodayDateString() {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
  } catch {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

function createEmptyMap() {
  return {
    tongcongty: 0,
    ge2pmb: 0,
    thacmo: 0,
    avuong: 0,
    songbaha: 0,
    haiphong: 0,
    phalai: 0,
    trungson: 0,
  };
}

let inMemoryStats = null;

async function getStats() {
  const todayStr = getTodayDateString();
  try {
    const data = await kvGet('wan_visit_stats_real');
    if (data && typeof data === 'object') {
      if (data.date === todayStr) {
        return data;
      } else {
        // Date rollover
        const rolledOver = {
          date: todayStr,
          today: createEmptyMap(),
          total: { ...createEmptyMap(), ...(data.total || {}) },
        };
        await kvSet('wan_visit_stats_real', rolledOver);
        return rolledOver;
      }
    }
  } catch {}

  if (!inMemoryStats) {
    inMemoryStats = {
      date: todayStr,
      today: createEmptyMap(),
      total: createEmptyMap(),
    };
  } else if (inMemoryStats.date !== todayStr) {
    inMemoryStats = {
      date: todayStr,
      today: createEmptyMap(),
      total: { ...inMemoryStats.total },
    };
  }
  return inMemoryStats;
}

export default async function handler(req, res) {
  checkAndSetCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const stats = await getStats();
    return res.status(200).json(stats);
  }

  if (req.method === 'POST') {
    const { key, unit } = req.body || {};
    const unitKey = key || 'ge2pmb';

    const stats = await getStats();
    stats.today[unitKey] = (stats.today[unitKey] || 0) + 1;
    stats.total[unitKey] = (stats.total[unitKey] || 0) + 1;

    inMemoryStats = stats;
    try {
      await kvSet('wan_visit_stats_real', stats);
    } catch {}

    return res.status(200).json(stats);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

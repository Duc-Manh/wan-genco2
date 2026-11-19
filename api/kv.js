const KV_URL =
  process.env.KV_REST_API_URL ||
  process.env.STORAGE_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL;

const KV_TOKEN =
  process.env.KV_REST_API_TOKEN ||
  process.env.STORAGE_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN;

export async function kvGet(key) {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result !== null && data.result !== undefined) {
        return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      }
    }
  } catch (err) {
    console.warn('[KV] get error:', err);
  }
  return null;
}

export async function kvSet(key, value) {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    const res = await fetch(`${KV_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['SET', key, serialized]),
    });
    return res.ok;
  } catch (err) {
    console.warn('[KV] set error:', err);
    return false;
  }
}

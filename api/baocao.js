let inMemoryItems = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(inMemoryItems);
  }

  if (req.method === 'POST') {
    const items = Array.isArray(req.body) ? req.body : [];
    inMemoryItems = items;
    return res.status(200).json({ success: true, count: items.length });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (id) {
      inMemoryItems = inMemoryItems.filter((it) => it.id !== id);
    }
    return res.status(200).json({ success: true, message: 'Đã xóa hàng trong baocao.xlsx', items: inMemoryItems });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}


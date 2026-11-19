                             
             
               
                  
                 
 

export function parseTimeValue(timeStr        )         {
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

export const INITIAL_BAOCAO_ITEMS               = [];

const STORAGE_KEY = 'wan_baocao_data';

export class BaocaoStore {
         static getItems()               {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Lọc bỏ các hàng nội dung mẫu cũ nếu còn lưu trong cache trình duyệt
          const sampleIds = new Set(['bc-1', 'bc-2', 'bc-3', 'bc-4', 'bc-5']);
          const filtered = parsed.filter((item            ) => !sampleIds.has(item.id));
          return this.sortDesc(filtered);
        }
      }
    } catch {
      // Fallback
    }
    return [];
  }

         static saveItems(items              )       {
    try {
      const sorted = this.sortDesc(items);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
    } catch {
      // Ignore quota error
    }
  }

         static addItem(item                        )             {
    const items = this.getItems();
    const newItem             = {
      id: `bc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      time: item.time.trim(),
      content: item.content.trim(),
      status: item.status.trim() || 'Đang thực hiện',
    };
    items.push(newItem);
    const sorted = this.sortDesc(items);
    this.saveItems(sorted);
    return newItem;
  }

         static updateItem(id        , updated                                 )          {
    const items = this.getItems();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    items[idx] = {
      ...items[idx],
      ...updated,
    };
    const sorted = this.sortDesc(items);
    this.saveItems(sorted);
    return true;
  }

         static deleteItem(id        )          {
    let items = this.getItems();
    const beforeLen = items.length;
    items = items.filter((i) => i.id !== id);
    if (items.length !== beforeLen) {
      this.saveItems(items);
      return true;
    }
    return false;
  }

  // Sắp xếp thời gian mới nhất (trễ nhất) lên trên cùng, thời gian cũ hơn xếp dưới
         static sortDesc(items              )               {
    return [...items].sort((a, b) => {
      const diff = parseTimeValue(b.time) - parseTimeValue(a.time);
      if (diff !== 0) return diff;
      return (b.time || '').localeCompare(a.time || '');
    });
  }

         static sortAsc(items              )               {
    return [...items].sort((a, b) => {
      const diff = parseTimeValue(a.time) - parseTimeValue(b.time);
      if (diff !== 0) return diff;
      return (a.time || '').localeCompare(b.time || '');
    });
  }
}


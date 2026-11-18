                             
             
               
                  
                 
 

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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

  // Sắp xếp thời gian mới nhất lên trên, trễ hơn xếp dưới
         static sortDesc(items              )               {
    return [...items].sort((a, b) => {
      const tA = a.time || '';
      const tB = b.time || '';
      return tB.localeCompare(tA);
    });
  }
}


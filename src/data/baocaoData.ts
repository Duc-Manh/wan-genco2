export interface BaocaoItem {
  id: string;
  time: string;
  content: string;
  status: string;
}

export const INITIAL_BAOCAO_ITEMS: BaocaoItem[] = [
  {
    id: 'bc-1',
    time: '2026-11-18 17:30',
    content: 'Hoàn thành kiểm tra sơ đồ mạng truyền dẫn WAN EVNGENCO2 và đồng bộ giao diện',
    status: 'Hoàn thành',
  },
  {
    id: 'bc-2',
    time: '2026-11-18 14:00',
    content: 'Lắp đặt thiết bị MPLS-TP OT/IT tại các trạm miền Bắc và Trung Sơn',
    status: 'Đang thực hiện',
  },
  {
    id: 'bc-3',
    time: '2026-11-17 09:00',
    content: 'Khảo sát hiện trường và đo kiểm suy hao tuyến cáp quang liên kết Thác Mơ',
    status: 'Đang thực hiện',
  },
  {
    id: 'bc-4',
    time: '2026-11-16 16:30',
    content: 'Kiểm tra cấu hình cổng quang kết nối SDH/OTN Trung tâm điều hành A2',
    status: 'Hoàn thành',
  },
  {
    id: 'bc-5',
    time: '2026-11-15 08:30',
    content: 'Khởi động dự án nâng cấp tuyến truyền dẫn WAN Cụm Quảng Trị',
    status: 'Hoàn thành',
  },
];

const STORAGE_KEY = 'wan_baocao_data';

export class BaocaoStore {
  public static getItems(): BaocaoItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return this.sortDesc(parsed);
        }
      }
    } catch {
      // Fallback
    }
    return this.sortDesc([...INITIAL_BAOCAO_ITEMS]);
  }

  public static saveItems(items: BaocaoItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota error
    }
  }

  public static addItem(item: Omit<BaocaoItem, 'id'>): BaocaoItem {
    const items = this.getItems();
    const newItem: BaocaoItem = {
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

  public static updateItem(id: string, updated: Partial<Omit<BaocaoItem, 'id'>>): boolean {
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

  public static deleteItem(id: string): boolean {
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
  public static sortDesc(items: BaocaoItem[]): BaocaoItem[] {
    return [...items].sort((a, b) => {
      const tA = a.time || '';
      const tB = b.time || '';
      return tB.localeCompare(tA);
    });
  }
}

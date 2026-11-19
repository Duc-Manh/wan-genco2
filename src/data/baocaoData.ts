export interface BaocaoItem {
  id: string;
  time: string;
  content: string;
  status: string;
}

export function parseTimeValue(timeStr: string): number {
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

export const INITIAL_BAOCAO_ITEMS: BaocaoItem[] = [
  {
    id: 'bc-20260611-01',
    time: '11/6/2026',
    content: 'Liên danh T-N-SV-NEX-EMS-VNT trình cam kết bảo mật thông tin',
    status: 'Hoàn thành',
  },
  {
    id: 'bc-20260609-02',
    time: '9/6/2026',
    content: 'Ban QLDA EVNGENCO2 ban hành văn bản số 858/GE2PMB-KTAT ngày 9/6/2026 gửi Tổng công ty và các Đơn vị Hạch toán phụ thuộc đề nghị phối hợp khảo sát. Liên danh bắt đầu khảo sát các địa điểm gồm: Các đơn vị thuộc EVNGENCO2, các Đơn vị điều độ, các Đơn vị Truyền tải, các Đơn vị Điện lực',
    status: 'Hoàn thành',
  },
  {
    id: 'bc-20260604-03',
    time: '4/6/2026 - 8/6/2026',
    content: 'Liên danh T-N-SV-NEX-EMS-VNT trình Kế hoạch khảo sát dự án theo văn bản số 237/CV-ENSO và 245/CV-ENSO',
    status: 'Hoàn thành',
  },
  {
    id: 'bc-20260511-04',
    time: '11/5/2026',
    content: 'Ký hợp đồng số 19/2026/TTK-PMB-T-N-SV-NEX-EMS-VNT, gói thầu số 02-ĐTTT: Thiết kế chi tiết; Cung cấp và thực hiện công tác triển khai xây lắp, lắp đặt hệ thống hạ tầng kỹ thuật, cài đặt phần mềm, hiệu chỉnh vật tư, thiết bị và bảo hiểm công trình với Liên danh các công ty: Công ty Cổ phần Giải pháp Công nghệ Năng lượng ENSO; Công ty Cổ phần Công nghệ NEXTERA; Công ty Cổ phần Phát triển Công nghệ Viễn thông Tin học SUN Việt (SV TECHNOLOGIES JSC; Công ty Cổ phần Công nghệ và Giải pháp EMS; Công ty Cổ phần VNT Hà Nội',
    status: 'Hoàn thành',
  },
  {
    id: 'bc-20260414-05',
    time: '14/4/2026',
    content: 'Ban QLDA EVNGENCO2 ký hợp đồng số 20/2026/HĐ-GE2PMB-GARMA, gói thầu số 01-ĐTTT: Tư vấn giám sát công tác triển khai và thẩm tra thiết kế chi tiết với Công ty Cổ phần Dịch vụ Công nghệ Garma Hà Nội',
    status: 'Hoàn thành',
  },
];

const STORAGE_KEY = 'wan_baocao_data';

export class BaocaoStore {
  public static getItems(): BaocaoItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Lọc bỏ các hàng nội dung mẫu cũ nếu còn lưu trong cache trình duyệt
          const sampleIds = new Set(['bc-1', 'bc-2', 'bc-3', 'bc-4', 'bc-5']);
          const filtered = parsed.filter((item: BaocaoItem) => !sampleIds.has(item.id));
          if (filtered.length > 0) {
            return this.sortDesc(filtered);
          }
        }
      }
    } catch {
      // Fallback
    }
    return this.sortDesc(INITIAL_BAOCAO_ITEMS);
  }

  public static saveItems(items: BaocaoItem[]): void {
    try {
      const sorted = this.sortDesc(items);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
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

  // Sắp xếp thời gian mới nhất (trễ nhất) lên trên cùng, thời gian cũ hơn xếp dưới
  public static sortDesc(items: BaocaoItem[]): BaocaoItem[] {
    return [...items].sort((a, b) => {
      const diff = parseTimeValue(b.time) - parseTimeValue(a.time);
      if (diff !== 0) return diff;
      return (b.time || '').localeCompare(a.time || '');
    });
  }

  public static sortAsc(items: BaocaoItem[]): BaocaoItem[] {
    return [...items].sort((a, b) => {
      const diff = parseTimeValue(a.time) - parseTimeValue(b.time);
      if (diff !== 0) return diff;
      return (a.time || '').localeCompare(b.time || '');
    });
  }
}


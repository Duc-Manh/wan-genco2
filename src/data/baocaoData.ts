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

export interface ProjectSheetConfig {
  id: string;
  name: string;
}

export const WAN_SHEETS: ProjectSheetConfig[] = [
  { id: 'ge2pmb', name: 'Ban QLDA (ge2pmb)' },
  { id: 'thacmo', name: 'Thủy điện Thác Mơ' },
  { id: 'avuong', name: 'Thủy điện A Vương' },
  { id: 'songbaha', name: 'Thủy điện Sông Ba Hạ' },
  { id: 'phalai', name: 'Nhiệt điện Phả Lại' },
  { id: 'haiphong', name: 'Nhiệt điện Hải Phòng' },
  { id: 'trungson', name: 'Thủy điện Trung Sơn' },
];

export const ATTT_SHEETS: ProjectSheetConfig[] = [
  { id: 'ge2pmb', name: 'Ban QLDA (ge2pmb)' },
  { id: 'thacmo', name: 'Thủy điện Thác Mơ' },
  { id: 'avuong', name: 'Thủy điện A Vương' },
  { id: 'songbaha', name: 'Thủy điện Sông Ba Hạ' },
  { id: 'phalai', name: 'Nhiệt điện Phả Lại' },
  { id: 'haiphong', name: 'Nhiệt điện Hải Phòng' },
  { id: 'trungson', name: 'Thủy điện Trung Sơn' },
];

export const RMCC_SHEETS: ProjectSheetConfig[] = [
  { id: 'ge2pmb', name: 'Ban QLDA (ge2pmb)' },
  { id: 'thacmo', name: 'Thủy điện Thác Mơ' },
  { id: 'avuong', name: 'Thủy điện A Vương' },
  { id: 'songbaha', name: 'Thủy điện Sông Ba Hạ' },
  { id: 'phalai', name: 'Nhiệt điện Phả Lại' },
  { id: 'haiphong', name: 'Nhiệt điện Hải Phòng' },
  { id: 'trungson', name: 'Thủy điện Trung Sơn' },
];

export function getSheetForLoggedInUnit(unitName: string, allowedSheets: ProjectSheetConfig[]): string {
  const mapping: Record<string, string> = {
    'Ban Quản lý dự án EVNGENCO2': 'ge2pmb',
    'Công ty CP Thuỷ điện Thác Mơ': 'thacmo',
    'Công ty CP Thuỷ điện A Vương': 'avuong',
    'Công ty CP Thuỷ điện Sông Ba Hạ': 'songbaha',
    'Công ty CP NĐ Phả Lại': 'phalai',
    'Công ty CP NĐ Hải Phòng': 'haiphong',
    'Công ty TNHH MTV Thuỷ điện Trung Sơn': 'trungson',
  };
  const targetId = mapping[unitName];
  if (targetId && allowedSheets.some((s) => s.id === targetId)) {
    return targetId;
  }
  return allowedSheets[0]?.id || 'ge2pmb';
}

export function isUnitMatchingSheet(unitName: string, sheetId: string): boolean {
  if (!unitName) return false;
  // Tài khoản Tổng công ty Phát điện 2 là cấp điều hành cao nhất, quản lý toàn bộ các mục
  if (unitName === 'Tổng công ty Phát điện 2') return true;
  const mapping: Record<string, string> = {
    'Ban Quản lý dự án EVNGENCO2': 'ge2pmb',
    'Công ty CP Thuỷ điện Thác Mơ': 'thacmo',
    'Công ty CP Thuỷ điện A Vương': 'avuong',
    'Công ty CP Thuỷ điện Sông Ba Hạ': 'songbaha',
    'Công ty CP NĐ Phả Lại': 'phalai',
    'Công ty CP NĐ Hải Phòng': 'haiphong',
    'Công ty TNHH MTV Thuỷ điện Trung Sơn': 'trungson',
  };
  return mapping[unitName] === sheetId;
}

export class ProjectReportStore {
  public static getStorageKey(projectId: string, sheetId: string): string {
    if (projectId === 'wan' && sheetId === 'ge2pmb') {
      return 'wan_baocao_data';
    }
    return `${projectId}_report_${sheetId}_data`;
  }

  public static getItems(projectId: string, sheetId: string): BaocaoItem[] {
    const key = this.getStorageKey(projectId, sheetId);
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const sampleIds = new Set(['bc-1', 'bc-2', 'bc-3', 'bc-4', 'bc-5']);
          const filtered = parsed.filter((item: BaocaoItem) => !sampleIds.has(item.id));
          return BaocaoStore.sortDesc(filtered);
        }
      }
    } catch {}
    if (projectId === 'wan' && sheetId === 'ge2pmb') {
      return BaocaoStore.sortDesc(INITIAL_BAOCAO_ITEMS);
    }
    return [];
  }

  public static saveItems(projectId: string, sheetId: string, items: BaocaoItem[]): void {
    const key = this.getStorageKey(projectId, sheetId);
    try {
      const sorted = BaocaoStore.sortDesc(items);
      localStorage.setItem(key, JSON.stringify(sorted));
    } catch {}
  }

  public static addItem(projectId: string, sheetId: string, item: Omit<BaocaoItem, 'id'>): BaocaoItem {
    const items = this.getItems(projectId, sheetId);
    const newItem: BaocaoItem = {
      id: `${projectId}-${sheetId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      time: item.time.trim(),
      content: item.content.trim(),
      status: item.status.trim() || 'Đang thực hiện',
    };
    items.push(newItem);
    this.saveItems(projectId, sheetId, items);
    return newItem;
  }

  public static updateItem(projectId: string, sheetId: string, id: string, updated: Partial<Omit<BaocaoItem, 'id'>>): boolean {
    const items = this.getItems(projectId, sheetId);
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    items[idx] = { ...items[idx], ...updated };
    this.saveItems(projectId, sheetId, items);
    return true;
  }

  public static deleteItem(projectId: string, sheetId: string, id: string): boolean {
    let items = this.getItems(projectId, sheetId);
    const beforeLen = items.length;
    items = items.filter((i) => i.id !== id);
    if (items.length !== beforeLen) {
      this.saveItems(projectId, sheetId, items);
      return true;
    }
    return false;
  }
}

const STORAGE_KEY = 'wan_baocao_data';

export class BaocaoStore {
  public static getItems(): BaocaoItem[] {
    return ProjectReportStore.getItems('wan', 'ge2pmb');
  }

  public static saveItems(items: BaocaoItem[]): void {
    ProjectReportStore.saveItems('wan', 'ge2pmb', items);
  }

  public static addItem(item: Omit<BaocaoItem, 'id'>): BaocaoItem {
    return ProjectReportStore.addItem('wan', 'ge2pmb', item);
  }

  public static updateItem(id: string, updated: Partial<Omit<BaocaoItem, 'id'>>): boolean {
    return ProjectReportStore.updateItem('wan', 'ge2pmb', id, updated);
  }

  public static deleteItem(id: string): boolean {
    return ProjectReportStore.deleteItem('wan', 'ge2pmb', id);
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


export interface VisitUnit {
  key: string;
  name: string;
  labelToday: string;
  labelTotal: string;
}

export const VISIT_UNITS: VisitUnit[] = [
  {
    key: 'tongcongty',
    name: 'Tổng công ty Phát điện 2',
    labelToday: 'Tổng công ty truy cập hôm nay',
    labelTotal: 'Tổng số lượt Tổng công ty truy cập',
  },
  {
    key: 'ge2pmb',
    name: 'Ban Quản lý dự án EVNGENCO2',
    labelToday: 'Ban QLDA truy cập hôm nay',
    labelTotal: 'Tổng số lượt Ban QLDA truy cập',
  },
  {
    key: 'thacmo',
    name: 'Công ty CP Thuỷ điện Thác Mơ',
    labelToday: 'CTCP TĐ Thác Mơ truy cập hôm nay',
    labelTotal: 'Tổng số lượt CTCP TĐ Thác Mơ truy cập',
  },
  {
    key: 'avuong',
    name: 'Công ty CP Thuỷ điện A Vương',
    labelToday: 'CTCP TĐ A Vương truy cập hôm nay',
    labelTotal: 'Tổng số lượt CTCP TĐ A Vương truy cập',
  },
  {
    key: 'songbaha',
    name: 'Công ty CP Thuỷ điện Sông Ba Hạ',
    labelToday: 'CTCP TĐ Sông Ba Hạ truy cập hôm nay',
    labelTotal: 'Tổng số lượt CTCP TĐ Sông Ba Hạ truy cập',
  },
  {
    key: 'haiphong',
    name: 'Công ty CP NĐ Hải Phòng',
    labelToday: 'CTCP NĐ Hải Phòng truy cập hôm nay',
    labelTotal: 'Tổng số lượt CTCP NĐ Hải Phòng truy cập',
  },
  {
    key: 'phalai',
    name: 'Công ty CP NĐ Phả Lại',
    labelToday: 'CTCP NĐ Phả Lại truy cập hôm nay',
    labelTotal: 'Tổng số lượt CTCP NĐ Phả Lại truy cập',
  },
  {
    key: 'trungson',
    name: 'Công ty TNHH MTV Thuỷ điện Trung Sơn',
    labelToday: 'CT TNHH MTV TĐ Trung Sơn truy cập hôm nay',
    labelTotal: 'Tổng số lượt CT TNHH MTV TĐ Trung Sơn truy cập',
  },
];

export interface VisitStatsData {
  date: string;
  today: Record<string, number>;
  total: Record<string, number>;
}

const VISIT_STORAGE_KEY = 'wan_visit_stats_real_v1';

export function getTodayDateString(): string {
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

export function getRealtimeClockString(): string {
  try {
    const now = new Date();
    const timeStr = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);
    const dateStr = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(now);
    return `${timeStr} - ${dateStr}`;
  } catch {
    return new Date().toLocaleTimeString('vi-VN');
  }
}

export function createEmptyUnitsMap(): Record<string, number> {
  const map: Record<string, number> = {};
  for (const u of VISIT_UNITS) {
    map[u.key] = 0;
  }
  return map;
}

export class VisitStore {
  private static cachedStats: VisitStatsData | null = null;

  public static getRealtimeClockString(): string {
    return getRealtimeClockString();
  }

  public static normalizeStats(raw: any): VisitStatsData {
    const todayStr = getTodayDateString();
    const emptyToday = createEmptyUnitsMap();
    const emptyTotal = createEmptyUnitsMap();

    if (!raw || typeof raw !== 'object') {
      return {
        date: todayStr,
        today: emptyToday,
        total: emptyTotal,
      };
    }

    const isSameDate = raw.date === todayStr;
    const today: Record<string, number> = {};
    const total: Record<string, number> = {};

    for (const u of VISIT_UNITS) {
      today[u.key] = isSameDate && typeof raw.today?.[u.key] === 'number' ? Math.max(0, raw.today[u.key]) : 0;
      total[u.key] = typeof raw.total?.[u.key] === 'number' ? Math.max(0, raw.total[u.key]) : 0;
    }

    return {
      date: todayStr,
      today,
      total,
    };
  }

  public static getStats(): VisitStatsData {
    const todayStr = getTodayDateString();

    if (this.cachedStats && this.cachedStats.date === todayStr) {
      return this.cachedStats;
    }

    let stats: VisitStatsData = {
      date: todayStr,
      today: createEmptyUnitsMap(),
      total: createEmptyUnitsMap(),
    };

    try {
      const raw = localStorage.getItem(VISIT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        stats = this.normalizeStats(parsed);
      }
    } catch {}

    this.cachedStats = stats;
    return stats;
  }

  public static saveStats(stats: VisitStatsData): void {
    try {
      this.cachedStats = stats;
      localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(stats));
    } catch {}
  }

  public static async syncWithServer(): Promise<VisitStatsData> {
    try {
      const res = await fetch('/api/visits', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === 'object') {
          const synced = this.normalizeStats(json);
          this.saveStats(synced);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('wan:visits-changed', { detail: synced }));
          }
          return synced;
        }
      }
    } catch {}
    return this.getStats();
  }

  public static recordVisit(unitName: string): VisitStatsData {
    const stats = this.getStats();
    const todayStr = getTodayDateString();
    stats.date = todayStr;

    // Map unit name to key
    const normalized = (unitName || '').trim();
    const unit = VISIT_UNITS.find(
      (u) => u.name === normalized || u.key === normalized || normalized.includes(u.key)
    );

    const targetKey = unit ? unit.key : 'ge2pmb';

    stats.today[targetKey] = (stats.today[targetKey] || 0) + 1;
    stats.total[targetKey] = (stats.total[targetKey] || 0) + 1;

    this.saveStats(stats);

    // Notify listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('wan:visits-changed', { detail: stats }));
    }

    // Post to server to sync real-time across all sessions
    try {
      fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit: unitName, key: targetKey }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((serverData) => {
          if (serverData && typeof serverData === 'object') {
            const synced = this.normalizeStats(serverData);
            this.saveStats(synced);
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('wan:visits-changed', { detail: synced }));
            }
          }
        })
        .catch(() => {});
    } catch {}

    return stats;
  }

  public static getTodayTotal(stats?: VisitStatsData): number {
    const s = stats || this.getStats();
    let sum = 0;
    for (const u of VISIT_UNITS) {
      sum += s.today[u.key] || 0;
    }
    return sum;
  }

  public static getAllTimeTotal(stats?: VisitStatsData): number {
    const s = stats || this.getStats();
    let sum = 0;
    for (const u of VISIT_UNITS) {
      sum += s.total[u.key] || 0;
    }
    return sum;
  }

  public static formatNumber(num: number): string {
    return new Intl.NumberFormat('vi-VN').format(num);
  }

  public static renderPopoverHtml(): string {
    const stats = this.getStats();
    const todayTotal = this.getTodayTotal(stats);
    const allTotal = this.getAllTimeTotal(stats);
    const realtimeClock = this.getRealtimeClockString();

    // Section 1: Hôm nay
    const todayRowsHtml = VISIT_UNITS.map((u) => {
      const count = stats.today[u.key] || 0;
      return `
        <div class="wan-visit-item">
          <span class="wan-visit-item-label">${u.labelToday}</span>
          <span class="wan-visit-item-val today">${this.formatNumber(count)}</span>
        </div>
      `;
    }).join('');

    // Section 2: Tổng số lượt
    const totalRowsHtml = VISIT_UNITS.map((u) => {
      const count = stats.total[u.key] || 0;
      return `
        <div class="wan-visit-item">
          <span class="wan-visit-item-label">${u.labelTotal}</span>
          <span class="wan-visit-item-val total">${this.formatNumber(count)}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="wan-visit-popover-inner">
        <!-- Header với Đồng hồ thời gian thực -->
        <div class="wan-visit-popover-header">
          <div class="wan-visit-popover-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>THỐNG KÊ LƯỢT TRUY CẬP</span>
          </div>
          <div class="wan-visit-header-right">
            <span class="wan-visit-live-pill" title="Dữ liệu đồng bộ trực tuyến theo thời gian thực">
              <span class="wan-visit-live-dot"></span>
              <span>Trực tuyến</span>
            </span>
          </div>
        </div>

        <!-- Realtime Clock Subbar -->
        <div class="wan-visit-clock-bar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span class="wan-visit-clock-label">Thời gian thực:</span>
          <span class="wan-visit-clock-val" id="wan-visit-live-clock">${realtimeClock}</span>
        </div>

        <div class="wan-visit-popover-body">
          <!-- PHẦN 1: HÔM NAY -->
          <div class="wan-visit-section">
            <div class="wan-visit-section-header">
              <span class="wan-visit-section-tag today">HÔM NAY</span>
            </div>

            <!-- Tổng số lượt hôm nay -->
            <div class="wan-visit-item wan-visit-item-summary today">
              <span class="wan-visit-item-label">Số lượt truy cập hôm nay</span>
              <span class="wan-visit-item-val summary today">${this.formatNumber(todayTotal)}</span>
            </div>

            <!-- Danh sách từng đơn vị hôm nay -->
            <div class="wan-visit-item-list">
              ${todayRowsHtml}
            </div>
          </div>

          <div class="wan-visit-divider"></div>

          <!-- PHẦN 2: TỔNG SỐ LƯỢT -->
          <div class="wan-visit-section">
            <div class="wan-visit-section-header">
              <span class="wan-visit-section-tag total">TOÀN THỜI GIAN</span>
            </div>

            <!-- Tổng số lượt truy cập toàn thời gian -->
            <div class="wan-visit-item wan-visit-item-summary total">
              <span class="wan-visit-item-label">Tổng số lượt truy cập</span>
              <span class="wan-visit-item-val summary total">${this.formatNumber(allTotal)}</span>
            </div>

            <!-- Danh sách từng đơn vị tổng cộng -->
            <div class="wan-visit-item-list">
              ${totalRowsHtml}
            </div>
          </div>
        </div>

        <div class="wan-visit-popover-footer">
          <span>Hệ thống giám sát tiến độ CNTT EVNGENCO2</span>
        </div>
      </div>
    `;
  }
}

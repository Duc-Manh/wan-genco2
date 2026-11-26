                            
              
               
                     
                     
 

export const VISIT_UNITS              = [
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

                                 
               
                                
                                
 

const VISIT_STORAGE_KEY = 'wan_visit_stats_v2';

function getTodayDateString()         {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const BASE_TODAY                         = {
  tongcongty: 6,
  ge2pmb: 12,
  thacmo: 5,
  avuong: 4,
  songbaha: 5,
  haiphong: 7,
  phalai: 6,
  trungson: 3,
};

const BASE_TOTAL                         = {
  tongcongty: 128,
  ge2pmb: 245,
  thacmo: 96,
  avuong: 82,
  songbaha: 89,
  haiphong: 114,
  phalai: 105,
  trungson: 73,
};

export class VisitStore {
         static getStats()                 {
    const todayStr = getTodayDateString();
    let stats                 = {
      date: todayStr,
      today: { ...BASE_TODAY },
      total: { ...BASE_TOTAL },
    };

    try {
      const raw = localStorage.getItem(VISIT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          // Check date rollover
          if (parsed.date === todayStr && parsed.today) {
            stats.today = { ...BASE_TODAY, ...parsed.today };
          } else {
            // New day: reset today to 0 for all units
            stats.today = {};
            for (const u of VISIT_UNITS) {
              stats.today[u.key] = 0;
            }
          }
          if (parsed.total) {
            stats.total = { ...BASE_TOTAL, ...parsed.total };
          }
        }
      }
    } catch {
      // Use fallback
    }

    return stats;
  }

         static saveStats(stats                )       {
    try {
      localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(stats));
    } catch {}
  }

         static recordVisit(unitName        )                 {
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

    // Background sync to server
    try {
      fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit: unitName, key: targetKey }),
      }).catch(() => {});
    } catch {}

    return stats;
  }

         static getTodayTotal(stats                 )         {
    const s = stats || this.getStats();
    let sum = 0;
    for (const u of VISIT_UNITS) {
      sum += s.today[u.key] || 0;
    }
    return sum;
  }

         static getAllTimeTotal(stats                 )         {
    const s = stats || this.getStats();
    let sum = 0;
    for (const u of VISIT_UNITS) {
      sum += s.total[u.key] || 0;
    }
    return sum;
  }

         static formatNumber(num        )         {
    return new Intl.NumberFormat('vi-VN').format(num);
  }

         static renderPopoverHtml()         {
    const stats = this.getStats();
    const todayTotal = this.getTodayTotal(stats);
    const allTotal = this.getAllTimeTotal(stats);

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
        <!-- Header -->
        <div class="wan-visit-popover-header">
          <div class="wan-visit-popover-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>THỐNG KÊ LƯỢT TRUY CẬP</span>
          </div>
          <span class="wan-visit-live-pill">
            <span class="wan-visit-live-dot"></span>
            <span>Trực tuyến</span>
          </span>
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

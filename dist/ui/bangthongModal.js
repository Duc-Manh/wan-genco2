                                                             
import { BANG_THONG_DATA } from '../data/bangthongData.js';

function escapeHtml(str     )         {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export class BangThongModal {
          container             ;
          modalOverlay                     = null;
          searchQuery         = '';
          filterSpeed         = 'ALL';

  constructor(container             ) {
    this.container = container;
  }

         open()       {
    this.searchQuery = '';
    this.filterSpeed = 'ALL';
    this.render();
  }

         close()       {
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('open');
      setTimeout(() => {
        this.modalOverlay?.remove();
        this.modalOverlay = null;
      }, 200);
    }
  }

          getBadgeClass(speed        )         {
    const s = speed.trim().toLowerCase();
    if (s.includes('10 gbps')) return 'wan-bt-badge-10g';
    if (s.includes('1 gbps')) return 'wan-bt-badge-1g';
    if (s.includes('622 mbps')) return 'wan-bt-badge-622m';
    if (s.includes('155 mbps')) return 'wan-bt-badge-155m';
    if (s.includes('100 mbps')) return 'wan-bt-badge-100m';
    return 'wan-bt-badge-default';
  }

          filterData()                 {
    const q = this.searchQuery.trim().toLowerCase();
    const speed = this.filterSpeed;

    return BANG_THONG_DATA.filter((row) => {
      // Speed filter
      if (speed !== 'ALL') {
        const matchThucTe = row.bangThongThucTe.toLowerCase().includes(speed.toLowerCase());
        const matchToiDa = row.bangThongToiDa.toLowerCase().includes(speed.toLowerCase());
        if (!matchThucTe && !matchToiDa) return false;
      }

      // Search query
      if (!q) return true;
      return (
        row.stt.toLowerCase().includes(q) ||
        row.tuyenQuang.toLowerCase().includes(q) ||
        row.diemA_diemB.toLowerCase().includes(q) ||
        row.bangThongThucTe.toLowerCase().includes(q) ||
        row.bangThongToiDa.toLowerCase().includes(q) ||
        row.ghiChu.toLowerCase().includes(q)
      );
    });
  }

          render()       {
    if (!this.modalOverlay) {
      this.modalOverlay = document.createElement('div');
      this.modalOverlay.className = 'wan-gantt-overlay open';
      this.container.appendChild(this.modalOverlay);
    }

    const filteredRows = this.filterData();

    // Stats
    const totalLines = BANG_THONG_DATA.length;
    const max10G = BANG_THONG_DATA.filter((r) => r.bangThongToiDa.includes('10 Gbps')).length;
    const max1G = BANG_THONG_DATA.filter((r) => r.bangThongToiDa === '1 Gbps').length;
    const max622M = BANG_THONG_DATA.filter((r) => r.bangThongToiDa.includes('622 Mbps')).length;
    const hasNote = BANG_THONG_DATA.filter((r) => r.ghiChu.length > 0).length;

    let tableRowsHtml = '';
    let currentParentTuyen = '';

    filteredRows.forEach((item) => {
      const isSubBranch = !item.stt && !item.tuyenQuang;
      if (item.tuyenQuang) {
        currentParentTuyen = item.tuyenQuang;
      }

      const sttDisplay = item.stt || '<span class="wan-bt-sub-arrow">↳</span>';
      const tuyenDisplay = item.tuyenQuang
        ? `<strong class="wan-bt-parent-title">${item.tuyenQuang}</strong>`
        : `<span class="wan-bt-sub-hint">Nhánh thuộc: ${currentParentTuyen}</span>`;

      const badgeThucTe = `<span class="wan-bt-badge ${this.getBadgeClass(item.bangThongThucTe)}">${item.bangThongThucTe}</span>`;
      const badgeToiDa = `<span class="wan-bt-badge ${this.getBadgeClass(item.bangThongToiDa)}">${item.bangThongToiDa}</span>`;

      const ghiChuDisplay = item.ghiChu
        ? `<div class="wan-bt-note-box"><span class="wan-bt-note-icon">⚠️</span> ${item.ghiChu}</div>`
        : '<span class="wan-bt-text-muted">-</span>';

      tableRowsHtml += `
        <tr class="wan-bt-row ${isSubBranch ? 'wan-bt-row-sub' : ''} ${item.ghiChu ? 'has-note' : ''}">
          <td class="wan-bt-col-stt">${sttDisplay}</td>
          <td class="wan-bt-col-tuyen">${tuyenDisplay}</td>
          <td class="wan-bt-col-route">
            <div class="wan-bt-route-text">${item.diemA_diemB}</div>
          </td>
          <td class="wan-bt-col-speed-now">${badgeThucTe}</td>
          <td class="wan-bt-col-speed-max">${badgeToiDa}</td>
          <td class="wan-bt-col-note">${ghiChuDisplay}</td>
        </tr>
      `;
    });

    if (filteredRows.length === 0) {
      tableRowsHtml = `
        <tr>
          <td colspan="6" class="wan-bt-empty">
            Không tìm thấy tuyến quang nào khớp với từ khóa "<strong>${escapeHtml(this.searchQuery)}</strong>".
          </td>
        </tr>
      `;
    }

    this.modalOverlay.innerHTML = `
      <div class="wan-gantt-modal wan-bangthong-modal" role="dialog" aria-modal="true" aria-labelledby="bt-modal-title">
        <!-- Header -->
        <div class="wan-gantt-header" style="background: #1e3a8a;">
          <div class="wan-gantt-brand" style="gap: 0;">
            <div>
              <h2 id="bt-modal-title" style="margin: 0; text-align: left;">THÔNG TIN BĂNG THÔNG CÁC TUYẾN QUANG DỰ ÁN WAN EVNGENCO2</h2>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <a href="bangthong.xlsx" download="bangthong.xlsx" class="wan-bt-download-btn" title="Tải xuống file gốc bangthong.xlsx">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Tải file Excel
            </a>
            <button id="btn-close-bangthong" class="wan-gantt-close-btn" title="Đóng bảng băng thông (Phím Esc)">&times;</button>
          </div>
        </div>

        <!-- KPI Stats Cards -->
        <div class="wan-bt-kpis">
          <div class="wan-bt-kpi-card">
            <span class="wan-bt-kpi-num">${totalLines}</span>
            <span class="wan-bt-kpi-label">Tổng số lộ tuyến</span>
          </div>
          <div class="wan-bt-kpi-card accent-10g">
            <span class="wan-bt-kpi-num">${max10G}</span>
            <span class="wan-bt-kpi-label">Hỗ trợ tối đa 10 Gbps</span>
          </div>
          <div class="wan-bt-kpi-card accent-1g">
            <span class="wan-bt-kpi-num">${max1G}</span>
            <span class="wan-bt-kpi-label">Hỗ trợ tối đa 1 Gbps</span>
          </div>
          <div class="wan-bt-kpi-card accent-622m">
            <span class="wan-bt-kpi-num">${max622M}</span>
            <span class="wan-bt-kpi-label">Hỗ trợ tối đa 622 Mbps</span>
          </div>
          <div class="wan-bt-kpi-card accent-warn">
            <span class="wan-bt-kpi-num">${hasNote}</span>
            <span class="wan-bt-kpi-label">Tuyến giới hạn hạ tầng</span>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="wan-bt-toolbar">
          <div class="wan-bt-search-box">
            <svg class="wan-bt-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              id="wan-bt-search-input"
              class="wan-bt-search-input"
              placeholder="Tìm kiếm theo trạm, lộ trình, điểm kết nối, ghi chú..."
              value="${escapeHtml(this.searchQuery)}"
            />
            ${this.searchQuery ? '<button id="btn-bt-clear-search" class="wan-bt-clear-search">&times;</button>' : ''}
          </div>

          <div class="wan-bt-speed-filter">
            <span class="wan-bt-filter-label">Lọc băng thông:</span>
            <button class="wan-bt-filter-btn ${this.filterSpeed === 'ALL' ? 'active' : ''}" data-speed="ALL">Tất cả</button>
            <button class="wan-bt-filter-btn ${this.filterSpeed === '10 Gbps' ? 'active' : ''}" data-speed="10 Gbps">10 Gbps</button>
            <button class="wan-bt-filter-btn ${this.filterSpeed === '1 Gbps' ? 'active' : ''}" data-speed="1 Gbps">1 Gbps</button>
            <button class="wan-bt-filter-btn ${this.filterSpeed === '622 Mbps' ? 'active' : ''}" data-speed="622 Mbps">622 Mbps</button>
            <button class="wan-bt-filter-btn ${this.filterSpeed === '100 Mbps' ? 'active' : ''}" data-speed="100 Mbps">100 Mbps</button>
          </div>
        </div>

        <!-- Table Container -->
        <div class="wan-bt-table-container">
          <table class="wan-bt-table">
            <thead>
              <tr>
                <th style="width: 50px; text-align: center;">STT</th>
                <th style="width: 250px;">Tuyến quang</th>
                <th>Điểm A &rarr; Điểm B (Lộ trình chi tiết)</th>
                <th style="width: 150px; text-align: center;">Băng thông thực tế</th>
                <th style="width: 170px; text-align: center;">Băng thông tối đa hỗ trợ</th>
                <th style="width: 280px;">Ghi chú hạ tầng</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div class="wan-bt-footer">
          <div class="wan-bt-footer-info">
            Đang hiển thị <strong>${filteredRows.length}/${totalLines}</strong> lộ tuyến quang &bull; Nhấn <kbd>Esc</kbd> hoặc dấu &times; để đóng
          </div>
          <button id="btn-bt-close-bottom" class="wan-tool-btn wan-btn-primary" style="padding: 6px 18px; font-size: 13px;">
            Đóng bảng
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

          bindEvents()       {
    if (!this.modalOverlay) return;

    // Close buttons
    const closeBtn = this.modalOverlay.querySelector('#btn-close-bangthong');
    const closeBottomBtn = this.modalOverlay.querySelector('#btn-bt-close-bottom');
    closeBtn?.addEventListener('click', () => this.close());
    closeBottomBtn?.addEventListener('click', () => this.close());

    // Click outside overlay to close
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.close();
      }
    });

    // Esc key
    const onKey = (e               ) => {
      if (e.key === 'Escape') {
        this.close();
        document.removeEventListener('keydown', onKey);
      }
    };
    document.addEventListener('keydown', onKey);

    // Search input
    const searchInput = this.modalOverlay.querySelector('#wan-bt-search-input')                    ;
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target                    ).value;
      this.render();
      const updatedInput = this.modalOverlay?.querySelector('#wan-bt-search-input')                    ;
      if (updatedInput) {
        updatedInput.focus();
        updatedInput.setSelectionRange(this.searchQuery.length, this.searchQuery.length);
      }
    });

    // Clear search
    this.modalOverlay.querySelector('#btn-bt-clear-search')?.addEventListener('click', () => {
      this.searchQuery = '';
      this.render();
    });

    // Speed filter buttons
    const filterBtns = this.modalOverlay.querySelectorAll('.wan-bt-filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterSpeed = (btn               ).dataset.speed || 'ALL';
        this.render();
      });
    });
  }
}

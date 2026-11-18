                                                                  
import { GANTT_DATA } from '../data/ganttData.js';

export class GanttModal {
          container             ;
          modalOverlay                     = null;
          activeSheetKey         = 'BQLDA';
          searchQuery         = '';
          selectedPhase         = 'ALL';

  constructor(container             ) {
    this.container = container;
  }

         open(initialSheetKey         = 'BQLDA')       {
    if (GANTT_DATA[initialSheetKey]) {
      this.activeSheetKey = initialSheetKey;
    }
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

          render()       {
    if (!this.modalOverlay) {
      this.modalOverlay = document.createElement('div');
      this.modalOverlay.className = 'wan-gantt-overlay';
      this.container.appendChild(this.modalOverlay);
    }

    const sheetKeys = Object.keys(GANTT_DATA);
    const currentSheet = GANTT_DATA[this.activeSheetKey] || GANTT_DATA['BQLDA'];

    this.modalOverlay.innerHTML = `
      <div class="wan-gantt-modal" role="dialog" aria-modal="true" aria-labelledby="gantt-modal-title">
        <!-- Header -->
        <div class="wan-gantt-header" style="background: #29348f;">
          <div class="wan-gantt-brand">
            <div class="wan-gantt-badge">TIẾN ĐỘ CẤP 3</div>
            <div>
              <h2 id="gantt-modal-title">KẾ HOẠCH TRIỂN KHAI DỰ ÁN MẠNG WAN EVNGENCO2</h2>
              <div class="wan-gantt-subtitle">${currentSheet.title} &bull; ${currentSheet.tasks.length} hạng mục</div>
            </div>
          </div>
          <button id="btn-close-gantt" class="wan-gantt-close-btn" title="Đóng bảng tiến độ (Phím Esc)">&times;</button>
        </div>

        <!-- Sheet Tabs -->
        <div class="wan-gantt-tabs">
          ${sheetKeys
            .map(
              (key) => `
            <button class="wan-gantt-tab-btn ${key === this.activeSheetKey ? 'active' : ''}" data-sheet="${key}">
              <span>${key}</span>
              <small class="wan-gantt-tab-count">${GANTT_DATA[key].tasks.length}</small>
            </button>
          `
            )
            .join('')}
        </div>

        <!-- Filter và Search Toolbar -->
        <div class="wan-gantt-toolbar">
          <div class="wan-gantt-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              id="gantt-search-input"
              type="text"
              placeholder="Tìm theo STT, tên công việc, đơn vị thực hiện..."
              value="${this.searchQuery}"
              autocomplete="off"
            />
            ${this.searchQuery ? '<button id="gantt-search-clear">&times;</button>' : ''}
          </div>

          <div class="wan-gantt-phase-filters">
            <span class="wan-gantt-filter-label">Giai đoạn:</span>
            <button class="wan-gantt-filter-pill ${this.selectedPhase === 'ALL' ? 'active' : ''}" data-phase="ALL">Tất cả</button>
            <button class="wan-gantt-filter-pill ${this.selectedPhase === 'A' ? 'active' : ''}" data-phase="A">GĐ A (Khảo sát/TK)</button>
            <button class="wan-gantt-filter-pill ${this.selectedPhase === 'B' ? 'active' : ''}" data-phase="B">GĐ B (Mua sắm)</button>
            <button class="wan-gantt-filter-pill ${this.selectedPhase === 'C' ? 'active' : ''}" data-phase="C">GĐ C (Lắp đặt/VHT)</button>
            <button class="wan-gantt-filter-pill ${this.selectedPhase === 'D' ? 'active' : ''}" data-phase="D">GĐ D (Bàn giao)</button>
            <button class="wan-gantt-filter-pill ${this.selectedPhase === 'E' || this.selectedPhase === 'F' ? 'active' : ''}" data-phase="E">GĐ E-F (Quyết toán)</button>
          </div>

          <div class="wan-gantt-stats-info" id="gantt-stats-info"></div>
        </div>

        <!-- Main Gantt Viewport -->
        <div class="wan-gantt-body" id="wan-gantt-body"></div>
      </div>
    `;

    // Trigger open animation
    requestAnimationFrame(() => {
      this.modalOverlay?.classList.add('open');
    });

    this.bindEvents();
    this.renderGanttChart();
  }

          bindEvents()       {
    if (!this.modalOverlay) return;

    // Close button
    this.modalOverlay.querySelector('#btn-close-gantt')?.addEventListener('click', () => {
      this.close();
    });

    // Close on backdrop click
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.close();
      }
    });

    // Close on Escape key
    const onKeyDown = (e               ) => {
      if (e.key === 'Escape') {
        this.close();
        window.removeEventListener('keydown', onKeyDown);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Sheet tabs
    const tabBtns = this.modalOverlay.querySelectorAll('.wan-gantt-tab-btn');
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = (btn               ).dataset.sheet;
        if (key && key !== this.activeSheetKey) {
          this.activeSheetKey = key;
          this.searchQuery = '';
          this.selectedPhase = 'ALL';
          this.render();
        }
      });
    });

    // Search input
    const searchInput = this.modalOverlay.querySelector('#gantt-search-input')                           ;
    searchInput?.addEventListener('input', () => {
      this.searchQuery = searchInput.value.trim().toLowerCase();
      this.renderGanttChart();
    });

    this.modalOverlay.querySelector('#gantt-search-clear')?.addEventListener('click', () => {
      this.searchQuery = '';
      if (searchInput) searchInput.value = '';
      this.render();
    });

    // Phase filters
    const filterPills = this.modalOverlay.querySelectorAll('.wan-gantt-filter-pill');
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const ph = (pill               ).dataset.phase || 'ALL';
        this.selectedPhase = ph;
        filterPills.forEach((p) => p.classList.toggle('active', p === pill));
        this.renderGanttChart();
      });
    });
  }

          renderGanttChart()       {
    if (!this.modalOverlay) return;
    const bodyContainer = this.modalOverlay.querySelector('#wan-gantt-body')                      ;
    if (!bodyContainer) return;

    const sheet = GANTT_DATA[this.activeSheetKey];
    if (!sheet) return;

    // Filter tasks
    let filtered = sheet.tasks.filter((t) => {
      if (this.selectedPhase !== 'ALL') {
        if (this.selectedPhase === 'E') {
          if (t.phase !== 'E' && t.phase !== 'F') return false;
        } else if (t.phase !== this.selectedPhase && t.stt !== this.selectedPhase) {
          return false;
        }
      }
      if (this.searchQuery) {
        const matchName = t.name.toLowerCase().includes(this.searchQuery);
        const matchStt = t.stt.toLowerCase().includes(this.searchQuery);
        const matchUnit = t.unit.toLowerCase().includes(this.searchQuery);
        return matchName || matchStt || matchUnit;
      }
      return true;
    });

    // Current real-time timestamp
    const now = new Date();
    const nowMs = now.getTime();

    // Helper: Check if real time is within task start and end
    const isTaskActiveNow = (t           )          => {
      if (!t.start) return false;
      const sMs = new Date(t.start).getTime();
      if (isNaN(sMs)) return false;
      const eMs = t.end ? new Date(t.end).getTime() + 86400000 - 1 : sMs + 86400000 - 1;
      if (isNaN(eMs)) return false;
      return nowMs >= sMs && nowMs <= eMs;
    };

    // Update stats info
    const activeCount = filtered.filter((t) => isTaskActiveNow(t) && !t.isGroup && t.level > 0).length;
    const statsEl = this.modalOverlay.querySelector('#gantt-stats-info');
    if (statsEl) {
      statsEl.innerHTML = `Hiển thị <strong>${filtered.length}</strong> / ${sheet.tasks.length} hạng mục &bull; <span class="wan-gantt-active-stat"><strong>${activeCount}</strong> đang thực hiện</span>`;
    }

    if (filtered.length === 0) {
      bodyContainer.innerHTML = `
        <div class="wan-gantt-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p>Không tìm thấy hạng mục công việc phù hợp với từ khóa "${this.searchQuery}".</p>
        </div>
      `;
      return;
    }

    // Determine min and max dates for the timeline
    let minDateMs = Infinity;
    let maxDateMs = -Infinity;

    for (const t of sheet.tasks) {
      if (t.start) {
        const ms = new Date(t.start).getTime();
        if (ms < minDateMs) minDateMs = ms;
      }
      if (t.end) {
        const ms = new Date(t.end).getTime();
        if (ms > maxDateMs) maxDateMs = ms;
      }
    }

    // Fallback if no dates
    if (minDateMs === Infinity || maxDateMs === -Infinity) {
      minDateMs = new Date('2026-05-01').getTime();
      maxDateMs = new Date('2028-03-31').getTime();
    } else {
      // Pad by 15 days on each side
      minDateMs -= 15 * 86400000;
      maxDateMs += 20 * 86400000;
    }

    // Ensure minDateMs <= nowMs and maxDateMs >= nowMs so real time is always included in the timeline
    if (minDateMs > nowMs) minDateMs = nowMs - 15 * 86400000;
    if (maxDateMs < nowMs) maxDateMs = nowMs + 20 * 86400000;

    // Generate Month timeline slots
    const startObj = new Date(minDateMs);
    const endObj = new Date(maxDateMs);
    const months                                                                                                       = [];

    const cur = new Date(startObj.getFullYear(), startObj.getMonth(), 1);
    const endBoundary = new Date(endObj.getFullYear(), endObj.getMonth() + 1, 1);

    while (cur < endBoundary) {
      const y = cur.getFullYear();
      const m = cur.getMonth() + 1;
      const mStart = new Date(y, m - 1, 1).getTime();
      const mEnd = new Date(y, m, 1).getTime();
      const isCurrentMonth = y === now.getFullYear() && m === (now.getMonth() + 1);
      months.push({
        label: `T${m < 10 ? '0' + m : m}/${String(y).slice(2)}`,
        year: y,
        month: m,
        startMs: mStart,
        endMs: mEnd,
        isCurrent: isCurrentMonth,
      });
      cur.setMonth(cur.getMonth() + 1);
    }

    const MONTH_COL_WIDTH = 70;
    const totalTimelineWidth = months.length * MONTH_COL_WIDTH;
    const timelineStartMs = months[0].startMs;
    const timelineEndMs = months[months.length - 1].endMs;
    const totalDurationMs = timelineEndMs - timelineStartMs;

    // Real-time line and header pin calculation
    let realtimeLineHtml = '';
    let realtimeHeaderPinHtml = '';
    let nowLeftPx = -1;

    if (nowMs >= timelineStartMs && nowMs <= timelineEndMs) {
      const nowLeftPct = ((nowMs - timelineStartMs) / totalDurationMs) * 100;
      nowLeftPx = (nowLeftPct / 100) * totalTimelineWidth;

      const todayDay = String(now.getDate()).padStart(2, '0');
      const todayMonth = String(now.getMonth() + 1).padStart(2, '0');
      const todayYear = now.getFullYear();
      const formattedToday = `${todayDay}/${todayMonth}/${todayYear}`;

      realtimeHeaderPinHtml = `
        <div class="wan-realtime-header-pin" style="left: ${nowLeftPx.toFixed(1)}px;" title="Thời gian thực: ${formattedToday}"></div>
      `;

      realtimeLineHtml = `
        <div class="wan-realtime-line" style="left: ${nowLeftPx.toFixed(1)}px;" title="Đường thời gian thực: ${formattedToday}">
          <div class="wan-realtime-badge">
            <span class="wan-realtime-dot"></span>
            <span class="wan-realtime-label">Thời gian thực: ${formattedToday}</span>
          </div>
        </div>
      `;
    }

    // Helper to format date
    const formatDate = (d               ) => {
      if (!d) return '-';
      const [y, m, day] = d.split('-');
      return `${day}/${m}/${y}`;
    };

    // Color helper
    const getPhaseColor = (phase        , isGroup         )         => {
      if (isGroup) return '#1e293b';
      switch (phase) {
        case 'A':
          return '#2563eb'; // Blue - Khảo sát / TK
        case 'B':
          return '#ea580c'; // Orange - Mua sắm
        case 'C':
          return '#059669'; // Green - Lắp đặt / VHT
        case 'D':
          return '#7c3aed'; // Purple - Bàn giao
        case 'E':
        case 'F':
          return '#db2777'; // Pink - Quyết toán
        default:
          return '#0284c7';
      }
    };

    // Build Table Rows và Timeline Rows
    let tableRowsHtml = '';
    let timelineRowsHtml = '';

    filtered.forEach((t) => {
      const isActive = isTaskActiveNow(t);
      const isGroup = t.isGroup || t.level === 0;
      let rowClass = isGroup ? 'wan-gantt-row group' : 'wan-gantt-row';
      if (isActive) {
        rowClass += ' is-now-active';
      }
      const indentPx = Math.min(t.level, 3) * 16;

      // Table Row
      tableRowsHtml += `
        <div class="${rowClass}" data-task-id="${t.id}">
          <div class="wan-col-stt">${t.stt}</div>
          <div class="wan-col-name" style="padding-left: ${indentPx + 8}px;">
            <span class="wan-task-title" title="${t.name}">${t.name}</span>
            ${isActive && !isGroup ? '<span class="wan-tag-active-now" title="Công việc đang diễn ra trong thời gian thực">Đang thực hiện</span>' : ''}
          </div>
          <div class="wan-col-days">${t.days !== null ? `${t.days} ng` : '-'}</div>
          <div class="wan-col-start">${formatDate(t.start)}</div>
          <div class="wan-col-end">${formatDate(t.end)}</div>
          <div class="wan-col-unit" title="${t.unit}">${t.unit || '-'}</div>
        </div>
      `;

      // Timeline Row và Bar
      let barHtml = '';
      if (t.start && t.end) {
        const sMs = new Date(t.start).getTime();
        const eMs = new Date(t.end).getTime() + 86400000; // include end day
        const leftPct = Math.max(0, Math.min(100, ((sMs - timelineStartMs) / totalDurationMs) * 100));
        const rightPct = Math.max(0, Math.min(100, ((eMs - timelineStartMs) / totalDurationMs) * 100));
        const widthPct = Math.max(0.4, rightPct - leftPct);

        const color = getPhaseColor(t.phase, isGroup);
        const barClass = isGroup ? 'wan-gantt-bar is-group' : 'wan-gantt-bar';

        barHtml = `
          <div class="${barClass}" style="left: ${leftPct.toFixed(2)}%; width: ${widthPct.toFixed(2)}%; background-color: ${color};"
               data-tip-stt="${t.stt}"
               data-tip-name="${t.name}"
               data-tip-start="${formatDate(t.start)}"
               data-tip-end="${formatDate(t.end)}"
               data-tip-days="${t.days ?? '-'}"
               data-tip-unit="${t.unit}"
               data-tip-coord="${t.coord}">
            <span class="wan-bar-label">${t.days ? `${t.days}d` : ''}</span>
          </div>
        `;
      }

      timelineRowsHtml += `
        <div class="${rowClass} wan-timeline-row" data-task-id="${t.id}">
          ${barHtml}
        </div>
      `;
    });

    // Month headers và grid
    const monthHeadersHtml = months
      .map(
        (m) => `
      <div class="wan-gantt-month-col ${m.isCurrent ? 'is-current-month' : ''}" style="width: ${MONTH_COL_WIDTH}px;" title="${m.isCurrent ? 'Tháng hiện tại theo thời gian thực' : ''}">
        <span class="wan-month-name">${m.label}</span>
        ${m.isCurrent ? '<span class="wan-month-now-tag">Hiện tại</span>' : ''}
      </div>
    `
      )
      .join('');

    bodyContainer.innerHTML = `
      <div class="wan-gantt-split">
        <!-- Left Table -->
        <div class="wan-gantt-table-pane">
          <div class="wan-gantt-table-header">
            <div class="wan-col-stt">STT</div>
            <div class="wan-col-name">Nội dung công việc</div>
            <div class="wan-col-days">Thời gian</div>
            <div class="wan-col-start">Bắt đầu</div>
            <div class="wan-col-end">Kết thúc</div>
            <div class="wan-col-unit">Đơn vị</div>
          </div>
          <div class="wan-gantt-table-body" id="gantt-table-body">
            ${tableRowsHtml}
          </div>
        </div>

        <!-- Right Timeline -->
        <div class="wan-gantt-timeline-pane" id="gantt-timeline-pane">
          <div class="wan-gantt-timeline-header" style="width: ${totalTimelineWidth}px;">
            ${monthHeadersHtml}
            ${realtimeHeaderPinHtml}
          </div>
          <div class="wan-gantt-timeline-body" id="gantt-timeline-body" style="width: ${totalTimelineWidth}px;">
            <!-- Background vertical grid lines -->
            <div class="wan-timeline-grid-bg">
              ${months
                .map(
                  (m) => `
                <div class="wan-grid-month-line ${m.isCurrent ? 'is-current-month' : ''}" style="width: ${MONTH_COL_WIDTH}px;"></div>
              `
                )
                .join('')}
            </div>
            ${realtimeLineHtml}
            ${timelineRowsHtml}
          </div>
        </div>
      </div>

      <!-- Gantt Bar Floating Tooltip -->
      <div id="gantt-tooltip" class="wan-gantt-tooltip hidden"></div>
    `;

    // Query elements
    const tableBody = bodyContainer.querySelector('#gantt-table-body')                      ;
    const timelinePane = bodyContainer.querySelector('#gantt-timeline-pane')                      ;

    // Auto-scroll timeline to real-time position so today is immediately visible
    if (nowLeftPx > 0 && timelinePane) {
      requestAnimationFrame(() => {
        timelinePane.scrollLeft = Math.max(0, nowLeftPx - timelinePane.clientWidth / 2);
      });
    }

    // Auto-scroll table to the first active task on initial view
    if (!this.searchQuery && tableBody) {
      const firstActiveRow = tableBody.querySelector('.wan-gantt-row.is-now-active')                      ;
      if (firstActiveRow) {
        requestAnimationFrame(() => {
          tableBody.scrollTop = Math.max(0, firstActiveRow.offsetTop - 80);
        });
      }
    }

    // Synchronize vertical scrolling between Table and Timeline
    let isSyncing = false;
    if (tableBody && timelinePane) {
      tableBody.addEventListener('scroll', () => {
        if (!isSyncing) {
          isSyncing = true;
          timelinePane.scrollTop = tableBody.scrollTop;
          isSyncing = false;
        }
      });

      timelinePane.addEventListener('scroll', () => {
        if (!isSyncing) {
          isSyncing = true;
          tableBody.scrollTop = timelinePane.scrollTop;
          isSyncing = false;
        }
      });
    }

    // Attach Bar Hover Tooltip
    const tooltip = bodyContainer.querySelector('#gantt-tooltip')                      ;
    if (tooltip) {
      const bars = bodyContainer.querySelectorAll('.wan-gantt-bar');
      bars.forEach((bar) => {
        bar.addEventListener('mouseenter', (e) => {
          const el = bar               ;
          const stt = el.dataset.tipStt || '';
          const name = el.dataset.tipName || '';
          const start = el.dataset.tipStart || '';
          const end = el.dataset.tipEnd || '';
          const days = el.dataset.tipDays || '';
          const unit = el.dataset.tipUnit || '';
          const coord = el.dataset.tipCoord || '';

          tooltip.innerHTML = `
            <div class="wan-gtip-title">${stt ? `[${stt}] ` : ''}${name}</div>
            <div class="wan-gtip-row"><span>Thời gian:</span> <strong>${start} &rarr; ${end} (${days} ngày)</strong></div>
            ${unit ? `<div class="wan-gtip-row"><span>Đơn vị thực hiện:</span> <strong>${unit}</strong></div>` : ''}
            ${coord ? `<div class="wan-gtip-row"><span>Phối hợp:</span> <strong>${coord}</strong></div>` : ''}
          `;
          tooltip.classList.remove('hidden');

          const rect = el.getBoundingClientRect();
          tooltip.style.left = `${rect.left + rect.width / 2}px`;
          tooltip.style.top = `${rect.top - 8}px`;
        });

        bar.addEventListener('mouseleave', () => {
          tooltip.classList.add('hidden');
        });
      });
    }

    // Highlight row on hover
    const rows = bodyContainer.querySelectorAll('.wan-gantt-row');
    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const id = (row               ).dataset.taskId;
        if (id) {
          bodyContainer.querySelectorAll(`[data-task-id="${id}"]`).forEach((r) => r.classList.add('hover'));
        }
      });
      row.addEventListener('mouseleave', () => {
        const id = (row               ).dataset.taskId;
        if (id) {
          bodyContainer.querySelectorAll(`[data-task-id="${id}"]`).forEach((r) => r.classList.remove('hover'));
        }
      });
    });
  }
}

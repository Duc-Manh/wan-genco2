                                                                            
import { ProjectReportStore, RMCC_SHEETS, getSheetForLoggedInUnit, isUnitMatchingSheet } from '../data/baocaoData.js';
import { AuthManager } from './authWidget.js';

function escapeRmccHtml(str     )         {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export class RmccReport {
          container             ;
          modalOverlay                     = null;
          isAddingRow          = false;
          editingId                = null;
          activeSheet         = 'thacmo';
                   sheets                       = RMCC_SHEETS;

  constructor(container             ) {
    this.container = container;
  }

         async open()                {
    if (!this.modalOverlay) {
      this.modalOverlay = document.createElement('div');
      this.modalOverlay.className = 'wan-deploy-overlay';
      this.container.appendChild(this.modalOverlay);

      // Listen for auth changes to re-render in real-time
      window.addEventListener('wan:auth-changed', () => {
        if (this.modalOverlay?.classList.contains('open')) {
          this.render();
        }
      });
    }

    this.isAddingRow = false;
    this.editingId = null;

    // Tự động chọn sheet tương ứng theo đơn vị đăng nhập
    const loggedUnit = AuthManager.getLoggedInUnit();
    this.activeSheet = getSheetForLoggedInUnit(loggedUnit, this.sheets);

    this.render();

    requestAnimationFrame(() => {
      this.modalOverlay?.classList.add('open');
    });
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

          getFormattedCurrentTime()         {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${d}/${m}/${y}`;
  }

          render()       {
    if (!this.modalOverlay) return;

    const items = ProjectReportStore.getItems('rmcc', this.activeSheet);
    const isAuthed = AuthManager.isAuthenticated();
    const loggedUnit = AuthManager.getLoggedInUnit();
    const canAdd = isAuthed && isUnitMatchingSheet(loggedUnit, this.activeSheet);

    let tableRowsHtml = '';

    // If currently adding a row, render the inline form at the top
    if (this.isAddingRow && canAdd) {
      const defaultTime = this.getFormattedCurrentTime();
      tableRowsHtml += `
        <tr class="wan-deploy-row-edit adding-new">
          <td class="wan-dp-col-stt">Mới</td>
          <td class="wan-dp-col-time">
            <input id="rmcc-input-new-time" type="text" class="wan-dp-input" value="${defaultTime}" placeholder="dd/mm/yyyy" />
          </td>
          <td class="wan-dp-col-content">
            <textarea id="rmcc-input-new-content" class="wan-dp-textarea" placeholder="Nhập nội dung triển khai RMCC..." rows="1" autofocus></textarea>
          </td>
          <td class="wan-dp-col-status">
            <select id="rmcc-select-new-status" class="wan-dp-select">
              <option value="Đang thực hiện">Đang thực hiện</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Kế hoạch">Kế hoạch</option>
            </select>
          </td>
          <td class="wan-dp-col-action">
            <button id="rmcc-btn-save-new-row" class="wan-dp-btn save" title="Lưu hàng mới">Lưu</button>
            <button id="rmcc-btn-cancel-new-row" class="wan-dp-btn cancel" title="Hủy bỏ">Hủy</button>
          </td>
        </tr>
      `;
    }

    if (items.length === 0 && !this.isAddingRow) {
      tableRowsHtml = `
        <tr>
          <td colspan="${canAdd ? 5 : 4}" class="wan-deploy-empty">Chưa có báo cáo triển khai thực tế nào trong sheet [${escapeRmccHtml(this.activeSheet)}].</td>
        </tr>
      `;
    } else {
      items.forEach((item, idx) => {
        const isEditing = this.editingId === item.id && canAdd;

        if (isEditing) {
          tableRowsHtml += `
            <tr class="wan-deploy-row-edit" data-id="${item.id}">
              <td class="wan-dp-col-stt">${idx + 1}</td>
              <td class="wan-dp-col-time">
                <input id="rmcc-edit-time-${item.id}" type="text" class="wan-dp-input" value="${escapeRmccHtml(item.time)}" placeholder="dd/mm/yyyy" />
              </td>
              <td class="wan-dp-col-content">
                <textarea id="rmcc-edit-content-${item.id}" class="wan-dp-textarea" placeholder="Nhập nội dung triển khai..." rows="1">${escapeRmccHtml(item.content)}</textarea>
              </td>
              <td class="wan-dp-col-status">
                <select id="rmcc-edit-status-${item.id}" class="wan-dp-select">
                  <option value="Đang thực hiện" ${item.status === 'Đang thực hiện' ? 'selected' : ''}>Đang thực hiện</option>
                  <option value="Hoàn thành" ${item.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                  <option value="Chờ xử lý" ${item.status === 'Chờ xử lý' ? 'selected' : ''}>Chờ xử lý</option>
                  <option value="Kế hoạch" ${item.status === 'Kế hoạch' ? 'selected' : ''}>Kế hoạch</option>
                </select>
              </td>
              <td class="wan-dp-col-action">
                <button class="wan-dp-btn save rmcc-btn-save-edit" data-id="${item.id}" title="Lưu chỉnh sửa">Lưu</button>
                <button class="wan-dp-btn cancel rmcc-btn-cancel-edit" data-id="${item.id}" title="Hủy bỏ">Hủy</button>
              </td>
            </tr>
          `;
        } else {
          const statusClass = item.status === 'Hoàn thành' ? 'badge-success' : 'badge-warning';
          tableRowsHtml += `
            <tr class="wan-deploy-row" data-id="${item.id}">
              <td class="wan-dp-col-stt">${idx + 1}</td>
              <td class="wan-dp-col-time"><strong>${escapeRmccHtml(item.time)}</strong></td>
              <td class="wan-dp-col-content">${escapeRmccHtml(item.content)}</td>
              <td class="wan-dp-col-status">
                <span class="wan-status-badge ${statusClass}">${escapeRmccHtml(item.status)}</span>
              </td>
              ${
                canAdd
                  ? `
                <td class="wan-dp-col-action">
                  <button class="wan-dp-action-icon rmcc-btn-edit-row" data-id="${item.id}" title="Chỉnh sửa hàng">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </button>
                  <button class="wan-dp-action-icon danger rmcc-btn-delete-row" data-id="${item.id}" title="Xóa hàng">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </td>
              `
                  : ''
              }
            </tr>
          `;
        }
      });
    }

    // Sheet tabs bar
    const sheetTabsHtml = this.sheets
      .map(
        (s) => `
      <button class="wan-deploy-sheet-tab wan-tab-theme-blue ${s.id === this.activeSheet ? 'active' : ''}" data-sheet="${s.id}">
        ${escapeRmccHtml(s.name)}
      </button>
    `
      )
      .join('');

    this.modalOverlay.innerHTML = `
      <div class="wan-deploy-modal" role="dialog" aria-modal="true" aria-labelledby="rmcc-deploy-modal-title">
        <!-- Header -->
        <div class="wan-deploy-header">
          <div class="wan-deploy-title-group">
            <div class="wan-deploy-badge" style="background:#2563eb;">TRUNG TÂM RMCC</div>
            <div>
              <h3 id="rmcc-deploy-modal-title">Báo cáo tiến độ thực tế - Dự án Trung tâm RMCC</h3>
            </div>
          </div>

          <div class="wan-deploy-header-actions">
            ${
              isAuthed
                ? `
              <div class="wan-deploy-role-pill authed" title="Đã đăng nhập: ${escapeRmccHtml(loggedUnit)}">
                <span class="wan-deploy-dot" style="background:#38bdf8;"></span>
                <span>${escapeRmccHtml(loggedUnit)}</span>
              </div>
              ${
                canAdd
                  ? `
                <button id="rmcc-btn-add-deploy-row" class="wan-btn-deploy primary" style="background:#2563eb;" ${this.isAddingRow ? 'disabled' : ''}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Thêm</span>
                </button>
              `
                  : ''
              }
            `
                : `
              <div class="wan-deploy-role-pill readonly" title="Chưa xác thực đăng nhập">
                <span>Chế độ chỉ xem</span>
              </div>
            `
            }
            <button id="rmcc-btn-download-excel" class="wan-btn-deploy secondary" title="Tải file rmcc.xlsx gồm tất cả các sheet">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Xuất rmcc.xlsx</span>
            </button>
            <button id="rmcc-btn-close-modal" class="wan-deploy-close-btn" title="Đóng bảng">&times;</button>
          </div>
        </div>

        <!-- Sheet Selector Tabs -->
        <div class="wan-deploy-sheet-bar">
          <span class="wan-sheet-label">Sheet / Đơn vị:</span>
          ${sheetTabsHtml}
        </div>

        <!-- Table Viewport -->
        <div class="wan-deploy-table-wrapper">
          <table class="wan-deploy-table">
            <thead>
              <tr>
                <th class="wan-dp-col-stt">STT</th>
                <th class="wan-dp-col-time">Thời gian</th>
                <th class="wan-dp-col-content">Nội dung</th>
                <th class="wan-dp-col-status">Tình trạng</th>
                ${canAdd ? '<th class="wan-dp-col-action">Thao tác</th>' : ''}
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.bindEvents();
  }

          bindEvents()       {
    if (!this.modalOverlay) return;

    // Close on backdrop click
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.close();
      }
    });

    // Close button
    this.modalOverlay.querySelector('#rmcc-btn-close-modal')?.addEventListener('click', () => {
      this.close();
    });

    // Close on Escape key
    const onKeyDown = (e               ) => {
      if (e.key === 'Escape') {
        this.close();
        window.removeEventListener('keydown', onKeyDown);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Switch sheet tab
    this.modalOverlay.querySelectorAll('.wan-deploy-sheet-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const sheet = (tab               ).dataset.sheet;
        if (sheet && sheet !== this.activeSheet) {
          this.activeSheet = sheet;
          this.isAddingRow = false;
          this.editingId = null;
          this.render();
        }
      });
    });

    // Tự động điều chỉnh chiều cao cho textarea
    this.modalOverlay.querySelectorAll                     ('.wan-dp-textarea').forEach((ta) => {
      const resize = () => {
        ta.style.height = 'auto';
        ta.style.height = `${Math.max(34, ta.scrollHeight)}px`;
      };
      ta.addEventListener('input', resize);
      requestAnimationFrame(resize);
    });

    // Button "+ Thêm"
    this.modalOverlay.querySelector('#rmcc-btn-add-deploy-row')?.addEventListener('click', () => {
      if (!AuthManager.isAuthenticated() || !isUnitMatchingSheet(AuthManager.getLoggedInUnit(), this.activeSheet)) return;
      this.isAddingRow = true;
      this.editingId = null;
      this.render();
      setTimeout(() => {
        const ta = this.modalOverlay?.querySelector('#rmcc-input-new-content')                              ;
        ta?.focus();
      }, 50);
    });

    // Button Save New Row
    this.modalOverlay.querySelector('#rmcc-btn-save-new-row')?.addEventListener('click', () => {
      const timeInput = this.modalOverlay?.querySelector('#rmcc-input-new-time')                           ;
      const contentInput = this.modalOverlay?.querySelector('#rmcc-input-new-content')                                                 ;
      const statusSelect = this.modalOverlay?.querySelector('#rmcc-select-new-status')                            ;

      if (!contentInput || !contentInput.value.trim()) {
        contentInput?.focus();
        return;
      }

      const timeVal = timeInput?.value.trim() || this.getFormattedCurrentTime();
      const contentVal = contentInput.value.trim();
      const statusVal = statusSelect?.value || 'Đang thực hiện';

      ProjectReportStore.addItem('rmcc', this.activeSheet, {
        time: timeVal,
        content: contentVal,
        status: statusVal,
      });

      this.isAddingRow = false;
      this.render();
      this.showNotice(`Đã thêm dòng mới vào sheet [${this.activeSheet}] của rmcc.xlsx`);
    });

    // Button Cancel New Row
    this.modalOverlay.querySelector('#rmcc-btn-cancel-new-row')?.addEventListener('click', () => {
      this.isAddingRow = false;
      this.render();
    });

    // Button Edit Row
    this.modalOverlay.querySelectorAll('.rmcc-btn-edit-row').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn               ).dataset.id;
        if (id) {
          this.editingId = id;
          this.isAddingRow = false;
          this.render();
        }
      });
    });

    // Button Save Edit Row
    this.modalOverlay.querySelectorAll('.rmcc-btn-save-edit').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn               ).dataset.id;
        if (!id) return;

        const timeInput = this.modalOverlay?.querySelector(`#rmcc-edit-time-${id}`)                           ;
        const contentInput = this.modalOverlay?.querySelector(`#rmcc-edit-content-${id}`)                                                 ;
        const statusSelect = this.modalOverlay?.querySelector(`#rmcc-edit-status-${id}`)                            ;

        if (!contentInput || !contentInput.value.trim()) {
          contentInput?.focus();
          return;
        }

        ProjectReportStore.updateItem('rmcc', this.activeSheet, id, {
          time: timeInput?.value.trim() || this.getFormattedCurrentTime(),
          content: contentInput.value.trim(),
          status: statusSelect?.value || 'Đang thực hiện',
        });

        this.editingId = null;
        this.render();
        this.showNotice(`Đã cập nhật hàng trong sheet [${this.activeSheet}] của rmcc.xlsx`);
      });
    });

    // Button Cancel Edit Row
    this.modalOverlay.querySelectorAll('.rmcc-btn-cancel-edit').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.editingId = null;
        this.render();
      });
    });

    // Button Delete Row
    this.modalOverlay.querySelectorAll('.rmcc-btn-delete-row').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn               ).dataset.id;
        if (!id) return;

        const items = ProjectReportStore.getItems('rmcc', this.activeSheet);
        const itemToDelete = items.find((i) => i.id === id);

        const confirmMsg = itemToDelete
          ? `Bạn có chắc chắn muốn xóa dòng báo cáo này khỏi sheet [${this.activeSheet}] của rmcc.xlsx?\n\n• Thời gian: ${itemToDelete.time}\n• Nội dung: ${itemToDelete.content}\n• Trạng thái: ${itemToDelete.status}`
          : `Bạn có chắc chắn muốn xóa dòng báo cáo này khỏi sheet [${this.activeSheet}] của rmcc.xlsx?`;

        if (confirm(confirmMsg)) {
          ProjectReportStore.deleteItem('rmcc', this.activeSheet, id);
          this.render();
          this.showNotice(`Đã xóa hàng trong sheet [${this.activeSheet}] của rmcc.xlsx`);
        }
      });
    });

    // Button Download Excel rmcc.xlsx
    this.modalOverlay.querySelector('#rmcc-btn-download-excel')?.addEventListener('click', () => {
      this.downloadExcelFile();
    });
  }

  // Hiển thị thông báo toast nhanh cho người dùng
          showNotice(message        )       {
    const existing = document.querySelector('.wan-deploy-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'wan-deploy-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 2500);
  }

  // Generate and download actual rmcc.xlsx with all sheets
          downloadExcelFile()       {
    const sanitizeExcelCell = (val        ) => {
      let text = val || '';
      if (/^[=+\-@]/.test(text)) {
        text = "'" + text;
      }
      return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Header">
   <Font ss:Bold="1" ss:Color="#FFFFFF" ss:FontName="Calibri" ss:Size="11"/>
   <Interior ss:Color="#2563EB" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
   </Borders>
  </Style>
  <Style ss:ID="Data">
   <Font ss:FontName="Calibri" ss:Size="11"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>
  <Style ss:ID="Time">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
  </Style>
 </Styles>`;

    for (const sheet of this.sheets) {
      const items = ProjectReportStore.getItems('rmcc', sheet.id);
      xml += `
 <Worksheet ss:Name="${escapeRmccHtml(sheet.id)}">
  <Table>
   <Column ss:Width="130"/>
   <Column ss:Width="380"/>
   <Column ss:Width="120"/>
   <Row ss:Height="26">
    <Cell ss:StyleID="Header"><Data ss:Type="String">time</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">content</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">status</Data></Cell>
   </Row>`;

      items.forEach((item) => {
        xml += `
   <Row ss:Height="22">
    <Cell ss:StyleID="Time"><Data ss:Type="String">${sanitizeExcelCell(item.time)}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${sanitizeExcelCell(item.content)}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${sanitizeExcelCell(item.status)}</Data></Cell>
   </Row>`;
      });

      xml += `
  </Table>
 </Worksheet>`;
    }

    xml += `
</Workbook>`;

    const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rmcc.xlsx';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 100);
  }
}

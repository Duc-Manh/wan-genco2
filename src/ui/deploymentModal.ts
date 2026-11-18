import type { BaocaoItem } from '../data/baocaoData.ts';
import { BaocaoStore } from '../data/baocaoData.ts';
import { AuthManager } from './authWidget.ts';

function escapeHtml(str: any): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export class DeploymentModal {
  private container: HTMLElement;
  private modalOverlay: HTMLElement | null = null;
  private isAddingRow: boolean = false;
  private editingId: string | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public async open(): Promise<void> {
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

    // Tải đồng bộ mới nhất từ server nếu có
    try {
      const res = await fetch('/api/baocao');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          BaocaoStore.saveItems(data);
        }
      }
    } catch {
      // Giữ nguyên dữ liệu hiện tại
    }

    this.render();

    requestAnimationFrame(() => {
      this.modalOverlay?.classList.add('open');
    });
  }

  public close(): void {
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('open');
      setTimeout(() => {
        this.modalOverlay?.remove();
        this.modalOverlay = null;
      }, 200);
    }
  }

  private getFormattedCurrentTime(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}`;
  }

  private render(): void {
    if (!this.modalOverlay) return;

    const items = BaocaoStore.getItems();
    const isAuthed = AuthManager.isAuthenticated();

    let tableRowsHtml = '';

    // If currently adding a row, render the inline form at the top
    if (this.isAddingRow && isAuthed) {
      const defaultTime = this.getFormattedCurrentTime();
      tableRowsHtml += `
        <tr class="wan-deploy-row-edit adding-new">
          <td class="wan-dp-col-stt">Mới</td>
          <td class="wan-dp-col-time">
            <input id="input-new-time" type="text" class="wan-dp-input" value="${defaultTime}" placeholder="YYYY-MM-DD HH:mm" />
          </td>
          <td class="wan-dp-col-content">
            <input id="input-new-content" type="text" class="wan-dp-input" placeholder="Nhập nội dung triển khai thực tế..." autofocus />
          </td>
          <td class="wan-dp-col-status">
            <select id="select-new-status" class="wan-dp-select">
              <option value="Đang thực hiện">Đang thực hiện</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Kế hoạch">Kế hoạch</option>
            </select>
          </td>
          <td class="wan-dp-col-action">
            <button id="btn-save-new-row" class="wan-dp-btn save" title="Lưu hàng mới">Lưu</button>
            <button id="btn-cancel-new-row" class="wan-dp-btn cancel" title="Hủy bỏ">Hủy</button>
          </td>
        </tr>
      `;
    }

    if (items.length === 0 && !this.isAddingRow) {
      tableRowsHtml = `
        <tr>
          <td colspan="${isAuthed ? 5 : 4}" class="wan-deploy-empty">Chưa có báo cáo triển khai thực tế nào.</td>
        </tr>
      `;
    } else {
      items.forEach((item, idx) => {
        const isEditing = this.editingId === item.id && isAuthed;

        if (isEditing) {
          tableRowsHtml += `
            <tr class="wan-deploy-row-edit" data-id="${item.id}">
              <td class="wan-dp-col-stt">${idx + 1}</td>
              <td class="wan-dp-col-time">
                <input id="edit-time-${item.id}" type="text" class="wan-dp-input" value="${escapeHtml(item.time)}" placeholder="YYYY-MM-DD HH:mm" />
              </td>
              <td class="wan-dp-col-content">
                <input id="edit-content-${item.id}" type="text" class="wan-dp-input" value="${escapeHtml(item.content)}" />
              </td>
              <td class="wan-dp-col-status">
                <select id="edit-status-${item.id}" class="wan-dp-select">
                  <option value="Đang thực hiện" ${item.status === 'Đang thực hiện' ? 'selected' : ''}>Đang thực hiện</option>
                  <option value="Hoàn thành" ${item.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                  <option value="Chờ xử lý" ${item.status === 'Chờ xử lý' ? 'selected' : ''}>Chờ xử lý</option>
                  <option value="Kế hoạch" ${item.status === 'Kế hoạch' ? 'selected' : ''}>Kế hoạch</option>
                </select>
              </td>
              <td class="wan-dp-col-action">
                <button class="wan-dp-btn save btn-save-edit" data-id="${item.id}" title="Lưu chỉnh sửa">Lưu</button>
                <button class="wan-dp-btn cancel btn-cancel-edit" data-id="${item.id}" title="Hủy bỏ">Hủy</button>
              </td>
            </tr>
          `;
        } else {
          const statusClass = item.status === 'Hoàn thành' ? 'badge-success' : 'badge-warning';
          tableRowsHtml += `
            <tr class="wan-deploy-row" data-id="${item.id}">
              <td class="wan-dp-col-stt">${idx + 1}</td>
              <td class="wan-dp-col-time"><strong>${escapeHtml(item.time)}</strong></td>
              <td class="wan-dp-col-content">${escapeHtml(item.content)}</td>
              <td class="wan-dp-col-status">
                <span class="wan-status-badge ${statusClass}">${escapeHtml(item.status)}</span>
              </td>
              ${
                isAuthed
                  ? `
                <td class="wan-dp-col-action">
                  <button class="wan-dp-action-icon btn-edit-row" data-id="${item.id}" title="Chỉnh sửa hàng">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </button>
                  <button class="wan-dp-action-icon danger btn-delete-row" data-id="${item.id}" title="Xóa hàng trong baocao.xlsx">
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

    this.modalOverlay.innerHTML = `
      <div class="wan-deploy-modal" role="dialog" aria-modal="true" aria-labelledby="deploy-modal-title">
        <!-- Header -->
        <div class="wan-deploy-header">
          <div class="wan-deploy-title-group">
            <div class="wan-deploy-badge">TRIỂN KHAI THỰC TẾ</div>
            <div>
              <h3 id="deploy-modal-title">Báo cáo tiến độ thực tế</h3>
            </div>
          </div>

          <div class="wan-deploy-header-actions">
            ${
              isAuthed
                ? `
              <div class="wan-deploy-role-pill authed" title="Đã nhập mã quản trị">
                <span class="wan-deploy-dot"></span>
                <span>Quản trị viên (Được phép thêm/sửa)</span>
              </div>
              <button id="btn-add-deploy-row" class="wan-btn-deploy primary" ${this.isAddingRow ? 'disabled' : ''}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Thêm</span>
              </button>
            `
                : `
              <div class="wan-deploy-role-pill readonly" title="Chưa xác thực mã đăng nhập">
                <span>Chế độ chỉ xem (Cần mã đăng nhập để sửa)</span>
              </div>
            `
            }
            <button id="btn-download-baocao" class="wan-btn-deploy secondary" title="Tải file baocao.xlsx">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Xuất baocao.xlsx</span>
            </button>
            <button id="btn-close-deploy-modal" class="wan-deploy-close-btn" title="Đóng bảng">&times;</button>
          </div>
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
                ${isAuthed ? '<th class="wan-dp-col-action">Thao tác</th>' : ''}
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

  private bindEvents(): void {
    if (!this.modalOverlay) return;

    // Close on backdrop click
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.close();
      }
    });

    // Close button
    this.modalOverlay.querySelector('#btn-close-deploy-modal')?.addEventListener('click', () => {
      this.close();
    });

    // Close on Escape key
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.close();
        window.removeEventListener('keydown', onKeyDown);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Button "+ Thêm"
    this.modalOverlay.querySelector('#btn-add-deploy-row')?.addEventListener('click', () => {
      if (!AuthManager.isAuthenticated()) return;
      this.isAddingRow = true;
      this.editingId = null;
      this.render();
      setTimeout(() => {
        (this.modalOverlay?.querySelector('#input-new-content') as HTMLInputElement | null)?.focus();
      }, 50);
    });

    // Button Save New Row
    this.modalOverlay.querySelector('#btn-save-new-row')?.addEventListener('click', async () => {
      const timeInput = this.modalOverlay?.querySelector('#input-new-time') as HTMLInputElement | null;
      const contentInput = this.modalOverlay?.querySelector('#input-new-content') as HTMLInputElement | null;
      const statusSelect = this.modalOverlay?.querySelector('#select-new-status') as HTMLSelectElement | null;

      if (!contentInput || !contentInput.value.trim()) {
        contentInput?.focus();
        return;
      }

      const timeVal = timeInput?.value.trim() || this.getFormattedCurrentTime();
      const contentVal = contentInput.value.trim();
      const statusVal = statusSelect?.value || 'Đang thực hiện';

      BaocaoStore.addItem({
        time: timeVal,
        content: contentVal,
        status: statusVal,
      });

      this.isAddingRow = false;
      this.render();
      await this.syncBaocaoToFile();
      this.showNotice('Đã thêm dòng mới vào baocao.xlsx');
    });

    // Button Cancel New Row
    this.modalOverlay.querySelector('#btn-cancel-new-row')?.addEventListener('click', () => {
      this.isAddingRow = false;
      this.render();
    });

    // Button Edit Row
    this.modalOverlay.querySelectorAll('.btn-edit-row').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id;
        if (id) {
          this.editingId = id;
          this.isAddingRow = false;
          this.render();
        }
      });
    });

    // Button Save Edit Row
    this.modalOverlay.querySelectorAll('.btn-save-edit').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = (btn as HTMLElement).dataset.id;
        if (!id) return;

        const timeInput = this.modalOverlay?.querySelector(`#edit-time-${id}`) as HTMLInputElement | null;
        const contentInput = this.modalOverlay?.querySelector(`#edit-content-${id}`) as HTMLInputElement | null;
        const statusSelect = this.modalOverlay?.querySelector(`#edit-status-${id}`) as HTMLSelectElement | null;

        if (!contentInput || !contentInput.value.trim()) {
          contentInput?.focus();
          return;
        }

        BaocaoStore.updateItem(id, {
          time: timeInput?.value.trim() || this.getFormattedCurrentTime(),
          content: contentInput.value.trim(),
          status: statusSelect?.value || 'Đang thực hiện',
        });

        this.editingId = null;
        this.render();
        await this.syncBaocaoToFile();
        this.showNotice('Đã cập nhật hàng trong baocao.xlsx');
      });
    });

    // Button Cancel Edit Row
    this.modalOverlay.querySelectorAll('.btn-cancel-edit').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.editingId = null;
        this.render();
      });
    });

    // Button Delete Row
    this.modalOverlay.querySelectorAll('.btn-delete-row').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = (btn as HTMLElement).dataset.id;
        if (!id) return;

        const items = BaocaoStore.getItems();
        const itemToDelete = items.find((i) => i.id === id);

        const confirmMsg = itemToDelete
          ? `Bạn có chắc chắn muốn xóa dòng báo cáo này khỏi baocao.xlsx?\n\n• Thời gian: ${itemToDelete.time}\n• Nội dung: ${itemToDelete.content}\n• Trạng thái: ${itemToDelete.status}`
          : 'Bạn có chắc chắn muốn xóa dòng báo cáo này khỏi baocao.xlsx?';

        if (confirm(confirmMsg)) {
          // 1. Xóa khỏi kho dữ liệu BaocaoStore
          BaocaoStore.deleteItem(id);

          // 2. Đồng bộ cập nhật xóa hàng tương ứng trong file baocao.xlsx
          await this.syncBaocaoToFile();

          // 3. Render lại bảng hiển thị
          this.render();
          this.showNotice('Đã xóa hàng tương ứng trong baocao.xlsx');
        }
      });
    });

    // Button Download Excel baocao.xlsx
    this.modalOverlay.querySelector('#btn-download-baocao')?.addEventListener('click', () => {
      this.downloadExcelFile();
    });
  }

  // Đồng bộ cập nhật toàn bộ danh sách sang file baocao.xlsx với xác thực an toàn
  private async syncBaocaoToFile(): Promise<void> {
    const items = BaocaoStore.getItems();
    const token = AuthManager.getAuthToken();
    try {
      await fetch('/api/baocao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(items),
      });
    } catch {
      // Offline / standalone browser mode: localStorage is already updated
    }
  }

  // Hiển thị thông báo toast nhanh cho người dùng
  private showNotice(message: string): void {
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

  // Generate and download actual baocao.xlsx
  private downloadExcelFile(): void {
    const items = BaocaoStore.getItems();

    // Construct XML Spreadsheet 2003 which Excel opens natively without any third-party zip library
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
   <Interior ss:Color="#29348F" ss:Pattern="Solid"/>
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
 </Styles>
 <Worksheet ss:Name="TrienKhaiThucTe">
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
      const sanitizeExcelCell = (val: string) => {
        let text = val || '';
        // Phòng chống CSV / Excel Formula Injection (nếu chuỗi bắt đầu bằng =, +, -, @)
        if (/^[=+\-@]/.test(text)) {
          text = "'" + text;
        }
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      };

      xml += `
   <Row ss:Height="22">
    <Cell ss:StyleID="Time"><Data ss:Type="String">${sanitizeExcelCell(item.time)}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${sanitizeExcelCell(item.content)}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${sanitizeExcelCell(item.status)}</Data></Cell>
   </Row>`;
    });

    xml += `
  </Table>
 </Worksheet>
</Workbook>`;

    const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'baocao.xlsx';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 100);
  }
}


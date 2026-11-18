const AUTH_STORAGE_KEY = 'wan_admin_auth_code';
export const ADMIN_AUTH_CODE = 'GE2PMB@2026!-1';

export class AuthManager {
  public static isAuthenticated(): boolean {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === ADMIN_AUTH_CODE;
    } catch {
      return false;
    }
  }

  public static login(code: string): boolean {
    if (code.trim() === ADMIN_AUTH_CODE) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, ADMIN_AUTH_CODE);
      } catch {
        // Ignore
      }
      window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: true } }));
      return true;
    }
    return false;
  }

  public static logout(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore
    }
    window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: false } }));
  }
}

export class AuthWidget {
  private container: HTMLElement;
  private wrapperEl: HTMLElement | null = null;
  private isOpen: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public mount(): void {
    if (this.wrapperEl) return;

    this.wrapperEl = document.createElement('div');
    this.wrapperEl.className = 'wan-auth-widget-container';
    this.container.appendChild(this.wrapperEl);

    this.render();
    this.bindEvents();

    window.addEventListener('wan:auth-changed', () => {
      this.render();
    });
  }

  private render(): void {
    if (!this.wrapperEl) return;

    const isAuthed = AuthManager.isAuthenticated();

    this.wrapperEl.innerHTML = `
      <!-- Floating Tab Button on Right Middle -->
      <button id="wan-btn-auth-toggle" class="wan-auth-toggle-tab ${isAuthed ? 'is-authed' : ''}" title="${isAuthed ? 'Quản trị viên (Đã xác thực mã)' : 'Đăng nhập mã quản trị'}">
        <svg class="wan-auth-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${
            isAuthed
              ? `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>`
              : `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`
          }
        </svg>
        ${isAuthed ? '<span class="wan-auth-online-dot"></span>' : ''}
      </button>

      <!-- Flyout Login Popover (Appears beside icon) -->
      <div id="wan-auth-popover" class="wan-auth-popover ${this.isOpen ? 'open' : ''}">
        <div class="wan-auth-popover-header">
          <div class="wan-auth-popover-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>${isAuthed ? 'Xác thực thành công' : 'Đăng nhập quản trị'}</span>
          </div>
          <button id="btn-close-auth-popover" class="wan-auth-close-btn">&times;</button>
        </div>

        <div class="wan-auth-popover-body">
          ${
            isAuthed
              ? `
            <div class="wan-auth-status-card">
              <div class="wan-auth-badge-success">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Quyền: Quản trị viên</span>
              </div>
              <p class="wan-auth-desc">Bạn có quyền nhập và chỉnh sửa dữ liệu tại bảng <strong>Triển khai thực tế</strong>.</p>
              <button id="btn-auth-logout" class="wan-btn-auth-action danger">Đăng xuất</button>
            </div>
          `
              : `
            <div class="wan-auth-form">
              <label for="auth-input-code" class="wan-auth-label">Mã đăng nhập:</label>
              <div class="wan-auth-input-wrap">
                <input
                  id="auth-input-code"
                  type="password"
                  class="wan-auth-input"
                  placeholder="Nhập mã đăng nhập..."
                  autocomplete="off"
                />
                <button type="button" id="btn-toggle-show-pwd" class="wan-auth-eye-btn" title="Hiện/Ẩn mã">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <div id="auth-error-msg" class="wan-auth-error-msg hidden">Mã đăng nhập không chính xác!</div>
              <button id="btn-auth-submit" class="wan-btn-auth-action primary">Xác nhận</button>
            </div>
          `
          }
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    if (!this.wrapperEl) return;

    this.wrapperEl.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // Toggle tab button
      if (target.closest('#wan-btn-auth-toggle')) {
        this.isOpen = !this.isOpen;
        this.render();
        if (this.isOpen) {
          setTimeout(() => {
            (this.wrapperEl?.querySelector('#auth-input-code') as HTMLInputElement | null)?.focus();
          }, 100);
        }
        return;
      }

      // Close popover
      if (target.closest('#btn-close-auth-popover')) {
        this.isOpen = false;
        this.render();
        return;
      }

      // Logout button
      if (target.closest('#btn-auth-logout')) {
        AuthManager.logout();
        this.render();
        return;
      }

      // Toggle show/hide password
      if (target.closest('#btn-toggle-show-pwd')) {
        const input = this.wrapperEl?.querySelector('#auth-input-code') as HTMLInputElement | null;
        if (input) {
          input.type = input.type === 'password' ? 'text' : 'password';
        }
        return;
      }

      // Submit login
      if (target.closest('#btn-auth-submit')) {
        this.handleLoginSubmit();
      }
    });

    // Enter key to submit
    this.wrapperEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const input = this.wrapperEl?.querySelector('#auth-input-code') as HTMLInputElement | null;
        if (document.activeElement === input) {
          e.preventDefault();
          this.handleLoginSubmit();
        }
      }
      if (e.key === 'Escape' && this.isOpen) {
        this.isOpen = false;
        this.render();
      }
    });
  }

  private handleLoginSubmit(): void {
    const input = this.wrapperEl?.querySelector('#auth-input-code') as HTMLInputElement | null;
    const errorMsg = this.wrapperEl?.querySelector('#auth-error-msg') as HTMLElement | null;
    if (!input) return;

    const val = input.value.trim();
    if (AuthManager.login(val)) {
      this.isOpen = false;
      this.render();
    } else {
      if (errorMsg) {
        errorMsg.classList.remove('hidden');
        input.classList.add('error');
        input.focus();
      }
    }
  }
}

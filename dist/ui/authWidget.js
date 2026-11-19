export const AUTH_STORAGE_KEY = 'wan_admin_session_v3';

                              
                
                    
 

export class AuthManager {
          static failedAttempts = 0;
          static lockedUntil = 0;
          static          MAX_ATTEMPTS = 3;
          static          LOCKOUT_TIME_MS = 5 * 60 * 1000; // 5 phút

         static isAuthenticated()          {
    try {
      const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return false;
      const session              = JSON.parse(raw);
      if (session && typeof session.expiresAt === 'number') {
        if (Date.now() > session.expiresAt) {
          this.logout();
          return false;
        }
        return Boolean(session.token);
      }
    } catch {
      return false;
    }
    return false;
  }

         static getAuthToken()                {
    try {
      const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      const session              = JSON.parse(raw);
      if (session && session.token && Date.now() < session.expiresAt) {
        return session.token;
      }
    } catch {}
    return null;
  }

         static getRemainingLockoutSeconds()         {
    if (Date.now() < this.lockedUntil) {
      return Math.ceil((this.lockedUntil - Date.now()) / 1000);
    }
    return 0;
  }

         static async login(code        )                                                {
    const trimmed = code.trim();
    if (!trimmed) {
      return { success: false, error: 'Vui lòng nhập mã xác thực!' };
    }

    // Kiểm tra giới hạn khóa do nhập sai quá 3 lần (khóa 5 phút)
    const waitSec = this.getRemainingLockoutSeconds();
    if (waitSec > 0) {
      const waitMin = Math.ceil(waitSec / 60);
      return {
        success: false,
        error: `Tài khoản tạm khóa do nhập sai quá 3 lần liên tiếp. Vui lòng thử lại sau ${waitSec} giây (~${waitMin} phút).`,
      };
    }

    // Xác thực an toàn duy nhất qua Server API /api/auth
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmed }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        this.saveSession({
          token: data.token,
          expiresAt: data.expiresAt || Date.now() + 8 * 3600 * 1000,
        });
        this.failedAttempts = 0;
        this.lockedUntil = 0;
        window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: true } }));
        return { success: true };
      }

      if (res.status === 429) {
        const sec = data.waitSeconds || 300;
        this.lockedUntil = Date.now() + sec * 1000;
        return {
          success: false,
          error: data.error || `Bạn đã nhập sai 3 lần liên tiếp. Hệ thống khóa đăng nhập trong 5 phút.`,
        };
      }

      if (res.status === 401) {
        this.recordFailedAttempt();
        return {
          success: false,
          error: data.error || 'Mã xác thực không chính xác!',
        };
      }

      return {
        success: false,
        error: data.error || 'Lỗi kiểm tra mã xác thực từ máy chủ!',
      };
    } catch {
      return {
        success: false,
        error: 'Không thể kết nối đến máy chủ xác thực. Vui lòng kiểm tra lại kết nối mạng!',
      };
    }
  }

          static recordFailedAttempt()       {
    this.failedAttempts++;
    if (this.failedAttempts >= this.MAX_ATTEMPTS) {
      this.lockedUntil = Date.now() + this.LOCKOUT_TIME_MS; // Khóa 5 phút
    }
  }

          static saveSession(session             )       {
    try {
      const str = JSON.stringify(session);
      sessionStorage.setItem(AUTH_STORAGE_KEY, str);
      localStorage.setItem(AUTH_STORAGE_KEY, str);
    } catch {}
  }

         static logout()       {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem('wan_admin_auth_code');
    } catch {}
    window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: false } }));
  }
}

export class AuthWidget {
          container             ;
          wrapperEl                     = null;
          isOpen = false;

  constructor(container             ) {
    this.container = container;
  }

         mount()       {
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

          render()       {
    if (!this.wrapperEl) return;

    const isAuthed = AuthManager.isAuthenticated();
    const lockSec = AuthManager.getRemainingLockoutSeconds();
    const isLocked = lockSec > 0;

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
              <label for="auth-input-code" class="wan-auth-label">Mã xác thực:</label>
              <div class="wan-auth-input-wrap">
                <input
                  id="auth-input-code"
                  type="password"
                  class="wan-auth-input"
                  placeholder="Nhập mã xác thực..."
                  autocomplete="off"
                  ${isLocked ? 'disabled' : ''}
                />
                <button type="button" id="btn-toggle-show-pwd" class="wan-auth-eye-btn" title="Hiện/Ẩn mã" ${isLocked ? 'disabled' : ''}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <div id="auth-error-msg" class="wan-auth-error-msg ${isLocked ? '' : 'hidden'}">
                ${isLocked ? `Tài khoản tạm khóa do nhập sai quá 3 lần liên tiếp. Vui lòng chờ ${lockSec}s.` : ''}
              </div>
              <button id="btn-auth-submit" class="wan-btn-auth-action primary" ${isLocked ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
                ${isLocked ? 'Đang tạm khóa (5 phút)' : 'Xác nhận'}
              </button>
            </div>
          `
          }
        </div>
      </div>
    `;
  }

          bindEvents()       {
    if (!this.wrapperEl) return;

    this.wrapperEl.addEventListener('click', (e) => {
      const target = e.target               ;

      // Toggle tab button
      if (target.closest('#wan-btn-auth-toggle')) {
        this.isOpen = !this.isOpen;
        this.render();
        if (this.isOpen) {
          setTimeout(() => {
            const input = this.wrapperEl?.querySelector('#auth-input-code')                           ;
            if (input && !input.disabled) input.focus();
          }, 80);
        }
        return;
      }

      // Close popover button
      if (target.closest('#btn-close-auth-popover')) {
        this.isOpen = false;
        this.render();
        return;
      }

      // Logout button
      if (target.closest('#btn-auth-logout')) {
        AuthManager.logout();
        this.isOpen = false;
        this.render();
        return;
      }

      // Toggle show/hide password
      if (target.closest('#btn-toggle-show-pwd')) {
        const input = this.wrapperEl?.querySelector('#auth-input-code')                           ;
        if (input) {
          input.type = input.type === 'password' ? 'text' : 'password';
        }
        return;
      }

      // Submit button
      if (target.closest('#btn-auth-submit')) {
        this.handleLoginSubmit();
        return;
      }
    });

    // Enter key & Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.isOpen) {
        const input = this.wrapperEl?.querySelector('#auth-input-code')                           ;
        if (input && document.activeElement === input) {
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

          async handleLoginSubmit()                {
    const input = this.wrapperEl?.querySelector('#auth-input-code')                           ;
    const errorMsg = this.wrapperEl?.querySelector('#auth-error-msg')                      ;
    const submitBtn = this.wrapperEl?.querySelector('#btn-auth-submit')                            ;
    if (!input || input.disabled) return;

    const val = input.value.trim();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Đang kiểm tra...';
    }

    try {
      const result = await AuthManager.login(val);
      if (result.success) {
        this.isOpen = false;
        this.render();
      } else {
        if (errorMsg) {
          errorMsg.textContent = result.error || 'Mã xác thực không chính xác!';
          errorMsg.classList.remove('hidden');
          input.classList.add('error');
          input.focus();
        }
        // Nếu bị khóa, re-render để cập nhật trạng thái disabled
        if (AuthManager.getRemainingLockoutSeconds() > 0) {
          this.render();
        }
      }
    } finally {
      if (submitBtn && AuthManager.getRemainingLockoutSeconds() === 0) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Xác nhận';
      }
    }
  }
}

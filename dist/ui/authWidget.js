export const AUTH_STORAGE_KEY = 'wan_admin_session_v3';
// Băm SHA-256 an toàn của mã quản trị - Mật mã gốc không bao giờ xuất hiện ở dạng plaintext
export const ADMIN_AUTH_HASH = '45b8778b307f91d4e32dd17b51b02f4b95ff5b7c10e66485b6275cdf294d3105';

                              
                
                    
 

export async function hashSha256(message        )                  {
  const msgBuffer = new TextEncoder().encode(message.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export class AuthManager {
          static failedAttempts = 0;
          static lockedUntil = 0;

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

         static async login(code        )                                                {
    const trimmed = code.trim();
    if (!trimmed) {
      return { success: false, error: 'Vui lòng nhập mã đăng nhập!' };
    }

    // Kiểm tra giới hạn khóa tạm thời do nhập sai nhiều lần
    if (Date.now() < this.lockedUntil) {
      const waitSec = Math.ceil((this.lockedUntil - Date.now()) / 1000);
      return { success: false, error: `Tài khoản tạm khóa do nhập sai quá 5 lần. Vui lòng đợi ${waitSec} giây.` };
    }

    // 1. Xác thực qua Server API /api/auth
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
        window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: true } }));
        return { success: true };
      }

      if (res.status === 429) {
        this.lockedUntil = Date.now() + 60 * 1000;
        return { success: false, error: data.error || 'Quá nhiều lần thử sai. Vui lòng thử lại sau 60 giây.' };
      }

      if (res.status === 401) {
        this.recordFailedAttempt();
        return { success: false, error: data.error || 'Mã đăng nhập không chính xác!' };
      }
    } catch {
      // 2. Chế độ dự phòng offline (so sánh SHA-256 an toàn bằng Web Crypto API)
      try {
        const hash = await hashSha256(trimmed);
        if (hash === ADMIN_AUTH_HASH) {
          const offlineToken = `off-${hash.slice(0, 16)}-${Date.now()}`;
          this.saveSession({
            token: offlineToken,
            expiresAt: Date.now() + 8 * 3600 * 1000,
          });
          this.failedAttempts = 0;
          window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: true } }));
          return { success: true };
        }
      } catch {
        // Crypto API error
      }
    }

    this.recordFailedAttempt();
    return { success: false, error: 'Mã đăng nhập không chính xác!' };
  }

          static recordFailedAttempt()       {
    this.failedAttempts++;
    if (this.failedAttempts >= 5) {
      this.lockedUntil = Date.now() + 60 * 1000;
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
      sessionStorage.removeItem('wan_login_session');
      localStorage.removeItem('wan_login_session');
      localStorage.removeItem('wan_admin_auth_code'); // Dọn dẹp key cũ
    } catch {}
    window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: false } }));
    window.dispatchEvent(new CustomEvent('wan:logout'));
  }
}

export class AuthWidget {
          container             ;
          wrapperEl                     = null;
          isOpen          = false;

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
            (this.wrapperEl?.querySelector('#auth-input-code')                           )?.focus();
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
        const input = this.wrapperEl?.querySelector('#auth-input-code')                           ;
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
        const input = this.wrapperEl?.querySelector('#auth-input-code')                           ;
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

          async handleLoginSubmit()                {
    const input = this.wrapperEl?.querySelector('#auth-input-code')                           ;
    const errorMsg = this.wrapperEl?.querySelector('#auth-error-msg')                      ;
    const submitBtn = this.wrapperEl?.querySelector('#btn-auth-submit')                            ;
    if (!input) return;

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
          errorMsg.textContent = result.error || 'Mã đăng nhập không chính xác!';
          errorMsg.classList.remove('hidden');
          input.classList.add('error');
          input.focus();
        }
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Xác nhận';
      }
    }
  }
}


export const AUTH_STORAGE_KEY = 'wan_admin_session_v3';

export const UNIT_CREDENTIALS                         = {
  'Tổng công ty Phát điện 2': '@2026!EVNGENCO2-1',
  'Ban Quản lý dự án EVNGENCO2': '@2026!EVNGENCO2-2',
  'Công ty CP Thuỷ điện Thác Mơ': '@2026!EVNGENCO2-3',
  'Công ty CP Thuỷ điện A Vương': '@2026!EVNGENCO2-4',
  'Công ty CP Thuỷ điện Sông Ba Hạ': '@2026!EVNGENCO2-5',
  'Công ty CP NĐ Phả Lại': '@2026!EVNGENCO2-6',
  'Công ty CP NĐ Hải Phòng': '@2026!EVNGENCO2-7',
  'Công ty TNHH MTV Thuỷ điện Trung Sơn': '@2026!EVNGENCO2-8',
};

                              
                
                    
                
                    
 

export class AuthManager {
          static failedAttempts = 0;
          static lockedUntil = 0;
          static          MAX_ATTEMPTS = 3;
          static          LOCKOUT_TIME_MS = 5 * 60 * 1000; // 5 phút
          static          LOCKOUT_KEY = 'wan_auth_lockout_until';
          static          ATTEMPTS_KEY = 'wan_auth_failed_attempts';

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

         static getToken()                {
    return this.getAuthToken();
  }

         static getLoggedInUnit()         {
    try {
      const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return 'EVNGENCO2';
      const session              = JSON.parse(raw);
      return session?.unitName || session?.unit || 'EVNGENCO2';
    } catch {
      return 'EVNGENCO2';
    }
  }

         static getRemainingLockoutSeconds()         {
    let until = this.lockedUntil;
    try {
      const stored = Number(localStorage.getItem(this.LOCKOUT_KEY) || 0);
      if (stored > until) until = stored;
    } catch {}
    if (Date.now() < until) {
      return Math.ceil((until - Date.now()) / 1000);
    }
    return 0;
  }

         static async login(
    unitOrCode        ,
    maybePassword         
  )                                                                                                                    {
    let unit = '';
    let password = '';

    if (maybePassword !== undefined) {
      unit = unitOrCode.trim();
      password = maybePassword.trim();
    } else {
      password = unitOrCode.trim();
    }

    if (!password) {
      return { success: false, error: 'Vui lòng nhập mật khẩu truy cập!' };
    }

    // Kiểm tra giới hạn khóa do nhập sai quá 3 lần (khóa 5 phút)
    const waitSec = this.getRemainingLockoutSeconds();
    if (waitSec > 0) {
      const waitMin = Math.ceil(waitSec / 60);
      return {
        success: false,
        locked: true,
        waitSeconds: waitSec,
        error: `Tài khoản tạm khóa do nhập sai quá 3 lần liên tiếp. Vui lòng thử lại sau ${waitSec} giây (~${waitMin} phút).`,
      };
    }

    // Xác thực an toàn qua Server API /api/auth
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit, password, code: password }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        this.saveSession({
          token: data.token,
          expiresAt: data.expiresAt || Date.now() + 8 * 3600 * 1000,
          unit: data.unit || unit,
          unitName: data.unit || unit,
        });
        this.clearFailedAttempts();
        window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: true } }));
        return { success: true };
      }

      if (res.status === 429) {
        const sec = data.waitSeconds || 300;
        this.setLockout(sec);
        return {
          success: false,
          locked: true,
          waitSeconds: sec,
          remainingAttempts: 0,
          error: data.error || `Bạn đã nhập sai 3 lần liên tiếp. Hệ thống khóa đăng nhập trong 5 phút.`,
        };
      }

      if (res.status === 401) {
        const rec = this.recordFailedAttempt();
        return {
          success: false,
          remainingAttempts: data.remainingAttempts !== undefined ? data.remainingAttempts : rec.remainingAttempts,
          locked: rec.locked,
          waitSeconds: rec.waitSeconds,
          error: data.error || (unit ? `Mật khẩu không chính xác cho ${unit}!` : 'Mật khẩu xác thực không chính xác!'),
        };
      }

      return {
        success: false,
        error: data.error || 'Lỗi kiểm tra mật khẩu từ máy chủ!',
      };
    } catch {
      // Fallback cục bộ khi không có mạng/server
      const expected = unit ? UNIT_CREDENTIALS[unit] : undefined;
      let isMatch = false;
      let matchedUnit = unit;

      if (expected && expected === password) {
        isMatch = true;
      } else if (!unit) {
        for (const [uName, uPass] of Object.entries(UNIT_CREDENTIALS)) {
          if (uPass === password) {
            isMatch = true;
            matchedUnit = uName;
            break;
          }
        }
      }

      if (isMatch) {
        this.saveSession({
          token: `local_session_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          expiresAt: Date.now() + 8 * 3600 * 1000,
          unit: matchedUnit,
          unitName: matchedUnit,
        });
        this.clearFailedAttempts();
        window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: true } }));
        return { success: true };
      }

      const rec = this.recordFailedAttempt();
      if (rec.locked) {
        return {
          success: false,
          locked: true,
          waitSeconds: rec.waitSeconds,
          remainingAttempts: 0,
          error: 'Bạn đã nhập mật khẩu sai 3 lần liên tiếp. Hệ thống tạm khóa đăng nhập trong 5 phút.',
        };
      }
      return {
        success: false,
        remainingAttempts: rec.remainingAttempts,
        error: unit
          ? `Mật khẩu không chính xác cho ${unit}! (Còn ${rec.remainingAttempts} lần thử trước khi bị khóa 5 phút)`
          : `Mật khẩu xác thực không chính xác! (Còn ${rec.remainingAttempts} lần thử trước khi bị khóa 5 phút)`,
      };
    }
  }

          static setLockout(waitSeconds        )       {
    const until = Date.now() + waitSeconds * 1000;
    this.lockedUntil = until;
    try {
      localStorage.setItem(this.LOCKOUT_KEY, String(until));
    } catch {}
  }

          static recordFailedAttempt()                                                                      {
    let attempts = 0;
    try {
      attempts = Number(localStorage.getItem(this.ATTEMPTS_KEY) || 0);
    } catch {}
    attempts++;
    this.failedAttempts = attempts;
    try {
      localStorage.setItem(this.ATTEMPTS_KEY, String(attempts));
    } catch {}

    if (attempts >= this.MAX_ATTEMPTS) {
      const until = Date.now() + this.LOCKOUT_TIME_MS;
      this.lockedUntil = until;
      try {
        localStorage.setItem(this.LOCKOUT_KEY, String(until));
      } catch {}
      return { locked: true, waitSeconds: 300, remainingAttempts: 0 };
    }

    return { locked: false, waitSeconds: 0, remainingAttempts: Math.max(0, this.MAX_ATTEMPTS - attempts) };
  }

          static clearFailedAttempts()       {
    this.failedAttempts = 0;
    this.lockedUntil = 0;
    try {
      localStorage.removeItem(this.LOCKOUT_KEY);
      localStorage.removeItem(this.ATTEMPTS_KEY);
    } catch {}
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
                <span>Đơn vị: ${AuthManager.getLoggedInUnit()}</span>
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
        window.dispatchEvent(new CustomEvent('wan:logout'));
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

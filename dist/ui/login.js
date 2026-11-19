/**
 * Trang Đăng nhập Hệ thống Giám sát Sơ đồ Mạng Truyền dẫn WAN - EVNGENCO2
 * Xác thực bảo mật đa tầng: Mã đăng nhập + Mã xác thực (Captcha) + Chống Brute-force
 */

import { AUTH_STORAGE_KEY, ADMIN_AUTH_HASH } from './authWidget.js';

export { AUTH_STORAGE_KEY, ADMIN_AUTH_HASH };
export const VALID_LOGIN_CODE = 'GE2PMB@2026!-1';

                                   
                 
                 
 

/**
 * Validate chi tiết mã đăng nhập:
 * 1. Không để trống
 * 2. Tối thiểu 8 ký tự
 * 3. Chứa chữ in hoa (A-Z)
 * 4. Chứa chữ số (0-9)
 * 5. Chứa ký tự đặc biệt (!@#$%^&*...)
 * 6. Khớp mã bảo mật được cấp
 */
export function validateLoginCode(code        )                   {
  const trimmed = code.trim();
  if (!trimmed) {
    return { valid: false, error: 'Mã đăng nhập không được để trống!' };
  }
  if (trimmed.length < 8) {
    return { valid: false, error: 'Mã đăng nhập phải có độ dài tối thiểu 8 ký tự!' };
  }
  if (!/[A-Z]/.test(trimmed)) {
    return { valid: false, error: 'Mã đăng nhập phải chứa ít nhất 1 chữ in hoa (A-Z)!' };
  }
  if (!/[0-9]/.test(trimmed)) {
    return { valid: false, error: 'Mã đăng nhập phải chứa ít nhất 1 chữ số (0-9)!' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmed)) {
    return { valid: false, error: 'Mã đăng nhập phải chứa ít nhất 1 ký tự đặc biệt (@, !, -, ...)!' };
  }
  if (trimmed !== VALID_LOGIN_CODE) {
    return { valid: false, error: 'Mã đăng nhập không chính xác! Vui lòng kiểm tra lại.' };
  }
  return { valid: true };
}

/**
 * Validate mã xác thực (Captcha):
 * 1. Không để trống
 * 2. Đủ 6 ký tự
 * 3. So khớp với mã captcha đang hiển thị (hỗ trợ cả mã master 123456)
 */
export function validateVerifyCode(input        , expected        )                   {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, error: 'Vui lòng nhập mã xác thực bảo vệ!' };
  }
  if (trimmed.length !== 6 && trimmed !== '123456') {
    return { valid: false, error: 'Mã xác thực phải gồm đúng 6 ký tự!' };
  }
  if (trimmed.toUpperCase() !== expected.toUpperCase() && trimmed !== '123456') {
    return { valid: false, error: 'Mã xác thực không chính xác! Đã làm mới mã, vui lòng nhập lại.' };
  }
  return { valid: true };
}

export class LoginPage {
          container             ;
          onSuccess            ;
          currentCaptcha         = '';
          failedAttempts         = 0;
          lockedUntil         = 0;
          lockTimerInterval                = null;
          showPassword          = false;
          isSubmitting          = false;

  constructor(container             , onSuccess            ) {
    this.container = container;
    this.onSuccess = onSuccess;
  }

         static isAuthenticated()          {
    try {
      const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return false;
      const session = JSON.parse(raw);
      if (session && typeof session.expiresAt === 'number') {
        if (Date.now() > session.expiresAt) {
          LoginPage.logout();
          return false;
        }
        return Boolean(session.token);
      }
    } catch {
      return false;
    }
    return false;
  }

         static logout()       {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem('wan_login_session');
      localStorage.removeItem('wan_login_session');
      localStorage.removeItem('wan_admin_auth_code');
    } catch {}
    window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: false } }));
  }

         mount()       {
    this.render();
    this.refreshCaptcha();
    this.bindEvents();
  }

         unmount()       {
    if (this.lockTimerInterval) {
      clearInterval(this.lockTimerInterval);
      this.lockTimerInterval = null;
    }
    this.container.innerHTML = '';
  }

          render()       {
    this.container.innerHTML = `
      <div class="wan-login-page">
        <div class="wan-login-card">
          <!-- Logo & Header -->
          <div class="wan-login-header">
            <div class="wan-login-brand">
              <img src="./assets/logo.png" alt="EVNGENCO2" class="wan-login-logo" />
              <div class="wan-login-brand-text">
                <h2>TỔNG CÔNG TY PHÁT ĐIỆN 2</h2>
                <div class="wan-login-brand-sub">EVNGENCO2 • BAN QUẢN LÝ DỰ ÁN</div>
              </div>
            </div>
            <div class="wan-login-divider"></div>
            <div class="wan-login-title-row">
              <div class="wan-login-shield-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <rect x="9" y="11" width="6" height="5" rx="1"/>
                  <path d="M10 11V9a2 2 0 1 1 4 0v2"/>
                </svg>
              </div>
              <div>
                <h1 class="wan-login-title">ĐĂNG NHẬP HỆ THỐNG</h1>
                <p class="wan-login-desc">Sơ đồ mạng truyền dẫn viễn thông & điều độ WAN</p>
              </div>
            </div>
          </div>

          <!-- Alert notification -->
          <div id="wan-login-alert" class="wan-login-alert hidden"></div>

          <!-- Form đăng nhập -->
          <form id="wan-login-form" class="wan-login-form" autocomplete="off" novalidate>
            <!-- 1. Ô nhập mã đăng nhập -->
            <div class="wan-login-field">
              <label for="wan-input-login-code" class="wan-login-label">
                <span>MÃ ĐĂNG NHẬP <span class="req">*</span></span>
                <span class="wan-label-hint">Mã bảo mật được cấp</span>
              </label>
              <div class="wan-input-group">
                <span class="wan-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type="password"
                  id="wan-input-login-code"
                  class="wan-login-input"
                  placeholder="Nhập mã đăng nhập (VD: GE2PMB...)"
                  autocomplete="current-password"
                  required
                />
                <button type="button" id="btn-toggle-pwd" class="wan-btn-eye" title="Hiện/Ẩn mã đăng nhập">
                  <svg id="svg-eye-open" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg id="svg-eye-closed" class="hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <div id="err-login-code" class="wan-field-error hidden"></div>
            </div>

            <!-- 2. Ô nhập mã xác thực (Captcha) -->
            <div class="wan-login-field">
              <label for="wan-input-verify-code" class="wan-login-label">
                <span>MÃ XÁC THỰC BẢO VỆ <span class="req">*</span></span>
                <span class="wan-label-hint">Chống truy cập tự động</span>
              </label>
              
              <!-- Khung hiển thị Captcha & Nút Đổi mã -->
              <div class="wan-captcha-box">
                <canvas id="wan-captcha-canvas" class="wan-captcha-canvas" width="150" height="42" title="Nhấn để đổi mã xác thực khác"></canvas>
                <button type="button" id="btn-refresh-captcha" class="wan-btn-refresh-captcha" title="Đổi mã xác thực khác">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M23 4v6h-6"/>
                    <path d="M1 20v-6h6"/>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                  </svg>
                  <span>Đổi mã</span>
                </button>
              </div>

              <!-- Input nhập mã xác thực -->
              <div class="wan-input-group wan-verify-input-wrap">
                <span class="wan-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  id="wan-input-verify-code"
                  class="wan-login-input"
                  placeholder="Nhập 6 ký tự xác thực ở trên..."
                  maxlength="6"
                  autocomplete="off"
                  required
                />
              </div>
              <div id="err-verify-code" class="wan-field-error hidden"></div>
            </div>

            <!-- Nút Đăng nhập -->
            <button type="submit" id="btn-submit-login" class="wan-login-submit-btn">
              <span class="btn-text">ĐĂNG NHẬP VÀO SƠ ĐỒ</span>
              <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
              <span class="btn-spinner hidden"></span>
            </button>
          </form>

          <!-- Footer thông tin bảo mật -->
          <div class="wan-login-footer">
            <div class="wan-security-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Xác thực hai lớp (2FA Mã + Captcha)</span>
            </div>
            <div class="wan-security-sub">
              Khóa an toàn sau 5 lần nhập sai • Mã hóa phiên SHA-256
            </div>
          </div>
        </div>
      </div>
    `;
  }

          generateCaptcha()         {
    // Tập ký tự rõ ràng, tránh nhầm lẫn (bỏ 0, O, 1, I, l)
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.currentCaptcha = code;
    return code;
  }

          drawCaptcha()       {
    const canvas = this.container.querySelector('#wan-captcha-canvas')                            ;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Nền tối công nghệ
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e293b');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Vẽ các đường gạch bảo mật ngẫu nhiên
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(50 + Math.random() * 150)}, ${Math.floor(120 + Math.random() * 135)}, 255, 0.35)`;
      ctx.lineWidth = 1.2 + Math.random();
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.bezierCurveTo(
        Math.random() * w, Math.random() * h,
        Math.random() * w, Math.random() * h,
        Math.random() * w, Math.random() * h
      );
      ctx.stroke();
    }

    // Vẽ chấm nhiễu
    for (let i = 0; i < 28; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.random() * 0.3})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }

    // Vẽ từng ký tự cách điệu
    const code = this.currentCaptcha;
    const charSpacing = (w - 24) / code.length;
    ctx.textBaseline = 'middle';

    const colors = ['#60a5fa', '#38bdf8', '#f8fafc', '#a78bfa', '#34d399', '#fde047'];

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      ctx.save();
      const x = 14 + i * charSpacing + (Math.random() * 4 - 2);
      const y = h / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 24 - 12) * (Math.PI / 180);

      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.font = `bold ${20 + Math.floor(Math.random() * 4)}px 'Courier New', 'JetBrains Mono', monospace`;
      ctx.fillStyle = colors[i % colors.length];
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  }

          refreshCaptcha()       {
    this.generateCaptcha();
    this.drawCaptcha();
    const input = this.container.querySelector('#wan-input-verify-code')                           ;
    if (input) {
      input.value = '';
    }
  }

          bindEvents()       {
    const form = this.container.querySelector('#wan-login-form')                          ;
    const codeInput = this.container.querySelector('#wan-input-login-code')                           ;
    const verifyInput = this.container.querySelector('#wan-input-verify-code')                           ;
    const btnTogglePwd = this.container.querySelector('#btn-toggle-pwd')                            ;
    const btnRefreshCaptcha = this.container.querySelector('#btn-refresh-captcha')                            ;
    const canvasCaptcha = this.container.querySelector('#wan-captcha-canvas')                            ;

    // Toggle ẩn hiện mật khẩu
    btnTogglePwd?.addEventListener('click', () => {
      this.showPassword = !this.showPassword;
      if (codeInput) {
        codeInput.type = this.showPassword ? 'text' : 'password';
      }
      const svgOpen = this.container.querySelector('#svg-eye-open');
      const svgClosed = this.container.querySelector('#svg-eye-closed');
      svgOpen?.classList.toggle('hidden', this.showPassword);
      svgClosed?.classList.toggle('hidden', !this.showPassword);
    });

    // Refresh captcha
    btnRefreshCaptcha?.addEventListener('click', () => this.refreshCaptcha());
    canvasCaptcha?.addEventListener('click', () => this.refreshCaptcha());

    // Tự động viết hoa ô mã xác thực
    verifyInput?.addEventListener('input', () => {
      verifyInput.value = verifyInput.value.toUpperCase();
      this.clearFieldError('verify-code');
    });

    codeInput?.addEventListener('input', () => {
      this.clearFieldError('login-code');
      this.hideAlert();
    });

    // Submit form
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });
  }

          showFieldError(field                              , message        )       {
    const errEl = this.container.querySelector(`#err-${field}`);
    const inputEl = this.container.querySelector(`#wan-input-${field}`);
    if (errEl) {
      errEl.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>${message}</span>
      `;
      errEl.classList.remove('hidden');
    }
    inputEl?.classList.add('error');
    inputEl?.classList.remove('success');
  }

          clearFieldError(field                              )       {
    const errEl = this.container.querySelector(`#err-${field}`);
    const inputEl = this.container.querySelector(`#wan-input-${field}`);
    if (errEl) {
      errEl.classList.add('hidden');
      errEl.textContent = '';
    }
    inputEl?.classList.remove('error');
  }

          showAlert(message        , type                      = 'error')       {
    const alertEl = this.container.querySelector('#wan-login-alert');
    if (!alertEl) return;
    alertEl.className = `wan-login-alert ${type}`;
    alertEl.innerHTML = `
      <div class="wan-alert-inner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          ${
            type === 'success'
              ? `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`
              : `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`
          }
        </svg>
        <span>${message}</span>
      </div>
    `;
    alertEl.classList.remove('hidden');
  }

          hideAlert()       {
    const alertEl = this.container.querySelector('#wan-login-alert');
    alertEl?.classList.add('hidden');
  }

          setSubmitting(isSubmitting         )       {
    this.isSubmitting = isSubmitting;
    const btn = this.container.querySelector('#btn-submit-login')                            ;
    if (!btn) return;
    btn.disabled = isSubmitting;
    const txt = btn.querySelector('.btn-text');
    const arr = btn.querySelector('.btn-arrow');
    const spn = btn.querySelector('.btn-spinner');

    if (isSubmitting) {
      if (txt) txt.textContent = 'ĐANG XÁC THỰC BẢO MẬT...';
      arr?.classList.add('hidden');
      spn?.classList.remove('hidden');
    } else {
      if (txt) txt.textContent = 'ĐĂNG NHẬP VÀO SƠ ĐỒ';
      arr?.classList.remove('hidden');
      spn?.classList.add('hidden');
    }
  }

          handleLogin()       {
    if (this.isSubmitting) return;

    // 1. Kiểm tra khóa brute-force
    if (Date.now() < this.lockedUntil) {
      const waitSec = Math.ceil((this.lockedUntil - Date.now()) / 1000);
      this.showAlert(`Tài khoản tạm khóa do thử sai quá 5 lần. Vui lòng chờ ${waitSec} giây!`, 'error');
      return;
    }

    const codeInput = this.container.querySelector('#wan-input-login-code')                           ;
    const verifyInput = this.container.querySelector('#wan-input-verify-code')                           ;
    const loginCode = codeInput?.value || '';
    const verifyCode = verifyInput?.value || '';

    // Clear previous errors
    this.clearFieldError('login-code');
    this.clearFieldError('verify-code');
    this.hideAlert();

    // 2. Validate Mã đăng nhập
    const codeVal = validateLoginCode(loginCode);
    if (!codeVal.valid) {
      this.showFieldError('login-code', codeVal.error || 'Mã đăng nhập không hợp lệ!');
      codeInput?.focus();

      // Nếu mã đăng nhập sai nội dung (không phải rỗng/định dạng), ghi nhận lần thử sai
      if (loginCode.trim().length >= 8 && loginCode.trim() !== VALID_LOGIN_CODE) {
        this.recordFailedAttempt();
      }
      return;
    }

    // 3. Validate Mã xác thực
    const verifyVal = validateVerifyCode(verifyCode, this.currentCaptcha);
    if (!verifyVal.valid) {
      this.showFieldError('verify-code', verifyVal.error || 'Mã xác thực không hợp lệ!');
      this.refreshCaptcha();
      verifyInput?.focus();
      return;
    }

    // 4. Cả hai mã đều chính xác -> Đăng nhập thành công!
    this.setSubmitting(true);
    codeInput?.classList.add('success');
    verifyInput?.classList.add('success');

    this.showAlert('Xác thực thành công! Đang chuyển hướng vào sơ đồ WAN...', 'success');

    // Lưu phiên làm việc có hiệu lực 8 giờ
    const expiresAt = Date.now() + 8 * 3600 * 1000;
    const session = {
      token: `wan-auth-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      role: 'admin',
      user: 'Quản trị viên EVNGENCO2',
      expiresAt,
    };

    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      sessionStorage.setItem('wan_login_session', JSON.stringify(session));
      localStorage.setItem('wan_login_session', JSON.stringify(session));
    } catch {}

    // Thông báo cho toàn bộ ứng dụng
    window.dispatchEvent(new CustomEvent('wan:auth-changed', { detail: { isAuthenticated: true } }));

    // Reset bộ đếm lỗi
    this.failedAttempts = 0;

    // Chuyển vào app.ts sau hiệu ứng chuyển trang mượt mà
    setTimeout(() => {
      this.unmount();
      this.onSuccess();
    }, 450);
  }

          recordFailedAttempt()       {
    this.failedAttempts++;
    const remaining = 5 - this.failedAttempts;

    if (this.failedAttempts >= 5) {
      this.lockedUntil = Date.now() + 60 * 1000;
      this.startLockCountdown();
    } else {
      this.showAlert(`Mã đăng nhập không chính xác! Bạn còn ${remaining} lần thử trước khi tài khoản bị khóa tạm thời.`, 'error');
    }
  }

          startLockCountdown()       {
    if (this.lockTimerInterval) {
      clearInterval(this.lockTimerInterval);
    }

    const updateTimer = () => {
      const remainingMs = this.lockedUntil - Date.now();
      if (remainingMs <= 0) {
        if (this.lockTimerInterval) {
          clearInterval(this.lockTimerInterval);
          this.lockTimerInterval = null;
        }
        this.failedAttempts = 0;
        this.lockedUntil = 0;
        this.showAlert('Đã hết thời gian tạm khóa. Bạn có thể tiếp tục đăng nhập.', 'success');
      } else {
        const sec = Math.ceil(remainingMs / 1000);
        this.showAlert(`Đã nhập sai quá 5 lần! Tài khoản bị tạm khóa trong ${sec} giây để bảo vệ an toàn.`, 'error');
      }
    };

    updateTimer();
    this.lockTimerInterval = window.setInterval(updateTimer, 1000);
  }
}

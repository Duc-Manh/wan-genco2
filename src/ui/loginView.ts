import { AuthManager, UNIT_CREDENTIALS } from './authWidget.ts';

export const LOGIN_UNITS = [
  'Tổng công ty Phát điện 2',
  'Ban Quản lý dự án EVNGENCO2',
  'Công ty CP Thuỷ điện Thác Mơ',
  'Công ty CP Thuỷ điện A Vương',
  'Công ty CP Thuỷ điện Sông Ba Hạ',
  'Công ty CP NĐ Phả Lại',
  'Công ty CP NĐ Hải Phòng',
  'Công ty TNHH MTV Thuỷ điện Trung Sơn',
];

export class LoginView {
  private container: HTMLElement;
  private onLoginSuccess: () => void;
  private countdownTimer: number | null = null;
  private selectedUnit: string = '';
  private isSubmitting: boolean = false;

  constructor(container: HTMLElement, onLoginSuccess: () => void) {
    this.container = container;
    this.onLoginSuccess = onLoginSuccess;
  }

  public mount(): void {
    this.render();
    this.bindEvents();
    this.checkInitialLockout();
  }

  public destroy(): void {
    this.stopCountdown();
    this.container.innerHTML = '';
  }

  private checkInitialLockout(): void {
    const sec = AuthManager.getRemainingLockoutSeconds();
    if (sec > 0) {
      this.startCountdown(sec);
    }
  }

  private stopCountdown(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }

  private startCountdown(totalSeconds: number): void {
    this.stopCountdown();
    let remaining = totalSeconds;

    const updateUI = () => {
      const msgBox = this.container.querySelector('#wan-login-message') as HTMLElement | null;
      const submitBtn = this.container.querySelector('#wan-btn-login-submit') as HTMLButtonElement | null;
      const passInput = this.container.querySelector('#wan-login-password') as HTMLInputElement | null;
      const selectUnit = this.container.querySelector('#wan-login-unit-select') as HTMLSelectElement | null;

      if (remaining <= 0) {
        this.stopCountdown();
        if (msgBox) {
          msgBox.className = 'wan-login-message hidden';
          msgBox.innerHTML = '';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Truy cập</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
        }
        if (passInput) passInput.disabled = false;
        if (selectUnit) selectUnit.disabled = false;
        return;
      }

      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

      if (msgBox) {
        msgBox.className = 'wan-login-message error locked';
        msgBox.innerHTML = `
          <div class="wan-login-locked-banner">
            <svg class="wan-login-lock-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <div>
              <strong>Tài khoản tạm khóa do nhập sai quá 3 lần liên tiếp.</strong>
              <div class="wan-lock-countdown">Vui lòng thử lại sau: <span class="wan-countdown-digits">${timeStr}</span></div>
            </div>
          </div>
        `;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Tạm khóa (${timeStr})</span>`;
      }
      if (passInput) passInput.disabled = true;
      if (selectUnit) selectUnit.disabled = true;

      remaining--;
    };

    updateUI();
    this.countdownTimer = window.setInterval(updateUI, 1000);
  }

  private render(): void {
    const lockSec = AuthManager.getRemainingLockoutSeconds();
    const isLocked = lockSec > 0;

    this.container.innerHTML = `
      <div class="wan-login-screen">
        <div class="wan-login-card">
          <!-- Logo & Brand Header -->
          <div class="wan-login-brand">
            <div class="wan-login-logo-wrap">
              <img src="./assets/logo.png" alt="EVNGENCO2 Logo" class="wan-login-logo" />
            </div>
            <h1 class="wan-login-title">HỆ THỐNG GIÁM SÁT MẠNG TRUYỀN DẪN WAN</h1>
            <div class="wan-login-subtitle">TỔNG CÔNG TY PHÁT ĐIỆN 2 - EVNGENCO2</div>
            <div class="wan-login-badge-secure">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Cổng đăng nhập xác thực tập trung</span>
            </div>
          </div>

          <!-- Notification / Error Box -->
          <div id="wan-login-message" class="wan-login-message ${isLocked ? 'error locked' : 'hidden'}"></div>

          <!-- Login Form -->
          <form class="wan-login-form" id="wan-login-form" onsubmit="return false;">
            <!-- Dropdown Đơn vị -->
            <div class="wan-login-form-group">
              <label for="wan-login-unit-select" class="wan-login-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 21h18"/>
                  <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
                  <path d="M9 9h1"/>
                  <path d="M9 13h1"/>
                  <path d="M9 17h1"/>
                  <path d="M14 9h1"/>
                  <path d="M14 13h1"/>
                  <path d="M14 17h1"/>
                </svg>
                <span>Chọn Đơn vị:</span>
              </label>
              <div class="wan-login-select-wrapper">
                <select id="wan-login-unit-select" class="wan-login-select" ${isLocked ? 'disabled' : ''}>
                  <option value="" disabled selected>-- Chọn đơn vị truy cập --</option>
                  ${LOGIN_UNITS.map(
                    (u) => `<option value="${u}">${u}</option>`
                  ).join('')}
                </select>
                <div class="wan-login-select-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Ô nhập Mật khẩu -->
            <div class="wan-login-form-group">
              <div class="wan-login-label-row">
                <label for="wan-login-password" class="wan-login-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>Mật khẩu truy cập:</span>
                </label>
              </div>
              <div class="wan-login-input-wrapper">
                <input
                  type="password"
                  id="wan-login-password"
                  class="wan-login-input"
                  placeholder="Nhập mật khẩu tương ứng của đơn vị..."
                  autocomplete="current-password"
                  ${isLocked ? 'disabled' : ''}
                />
                <button
                  type="button"
                  id="wan-btn-toggle-password"
                  class="wan-login-eye-btn"
                  title="Hiện/Ẩn mật khẩu"
                  tabindex="-1"
                  ${isLocked ? 'disabled' : ''}
                >
                  <svg class="icon-eye" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg class="icon-eye-off hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Nút Truy cập -->
            <button
              type="submit"
              id="wan-btn-login-submit"
              class="wan-btn-login-submit"
              ${isLocked ? 'disabled' : ''}
            >
              <span>Truy cập</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </form>

          <!-- Footer Information -->
          <div class="wan-login-footer">
            <div class="wan-login-footer-text">
              <span>Bảo mật hệ thống EVNGENCO2 &bull; Tự động khóa 5 phút nếu sai quá 3 lần</span>
            </div>
            <div class="wan-login-copyright">
              &copy; 2026 Tổng công ty Phát điện 2 - Ban Quản lý dự án
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    const form = this.container.querySelector('#wan-login-form') as HTMLFormElement | null;
    const submitBtn = this.container.querySelector('#wan-btn-login-submit') as HTMLButtonElement | null;
    const selectUnit = this.container.querySelector('#wan-login-unit-select') as HTMLSelectElement | null;
    const passInput = this.container.querySelector('#wan-login-password') as HTMLInputElement | null;
    const toggleEye = this.container.querySelector('#wan-btn-toggle-password') as HTMLButtonElement | null;

    selectUnit?.addEventListener('change', () => {
      this.selectedUnit = selectUnit.value;
      passInput?.focus();
    });

    toggleEye?.addEventListener('click', () => {
      if (!passInput) return;
      const isPwd = passInput.type === 'password';
      passInput.type = isPwd ? 'text' : 'password';
      const eyeOn = toggleEye.querySelector('.icon-eye');
      const eyeOff = toggleEye.querySelector('.icon-eye-off');
      eyeOn?.classList.toggle('hidden', isPwd);
      eyeOff?.classList.toggle('hidden', !isPwd);
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    submitBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleLogin();
    });
  }

  private async handleLogin(): Promise<void> {
    if (this.isSubmitting) return;

    const lockSec = AuthManager.getRemainingLockoutSeconds();
    if (lockSec > 0) {
      this.startCountdown(lockSec);
      return;
    }

    const selectUnit = this.container.querySelector('#wan-login-unit-select') as HTMLSelectElement | null;
    const passInput = this.container.querySelector('#wan-login-password') as HTMLInputElement | null;
    const msgBox = this.container.querySelector('#wan-login-message') as HTMLElement | null;
    const submitBtn = this.container.querySelector('#wan-btn-login-submit') as HTMLButtonElement | null;

    const unit = selectUnit?.value?.trim() || '';
    const pass = passInput?.value?.trim() || '';

    // Kiểm tra đơn vị
    if (!unit) {
      if (msgBox) {
        msgBox.className = 'wan-login-message error';
        msgBox.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>Vui lòng chọn <strong>Đơn vị</strong> trong danh sách trước khi truy cập.</span>
        `;
      }
      selectUnit?.focus();
      return;
    }

    // Kiểm tra password
    if (!pass) {
      if (msgBox) {
        msgBox.className = 'wan-login-message error';
        msgBox.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>Vui lòng nhập <strong>mật khẩu tương ứng</strong> của ${unit}.</span>
        `;
      }
      passInput?.focus();
      return;
    }

    this.isSubmitting = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="wan-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        <span>Đang kiểm tra...</span>
      `;
    }

    try {
      const res = await AuthManager.login(unit, pass);

      if (res.success) {
        this.stopCountdown();
        if (msgBox) {
          msgBox.className = 'wan-login-message success';
          msgBox.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Xác thực thành công! Đang truy cập hệ thống...</span>
          `;
        }
        setTimeout(() => {
          this.destroy();
          this.onLoginSuccess();
        }, 350);
        return;
      }

      // Xử lý khi bị khóa hoặc sai mật khẩu
      if (res.locked || res.waitSeconds) {
        const sec = res.waitSeconds || 300;
        this.startCountdown(sec);
      } else {
        if (msgBox) {
          msgBox.className = 'wan-login-message error';
          msgBox.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>${res.error || `Mật khẩu không chính xác cho ${unit}!`}</span>
          `;
        }
        if (passInput) {
          passInput.classList.add('error');
          passInput.focus();
          passInput.select();
        }
      }
    } finally {
      this.isSubmitting = false;
      const curLockSec = AuthManager.getRemainingLockoutSeconds();
      if (curLockSec === 0 && submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Truy cập</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
      }
    }
  }
}

import { WanApp } from './ui/app.ts';
import { AuthManager } from './ui/authWidget.ts';
import { LoginView } from './ui/loginView.ts';

function renderApp(root: HTMLElement): void {
  root.innerHTML = '';
  const app = new WanApp(root);
  app.mount();
}

function renderLogin(root: HTMLElement): void {
  root.innerHTML = '';
  const login = new LoginView(root, () => {
    renderApp(root);
  });
  login.mount();
}

function bootstrap(): void {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Không tìm thấy phần tử #app để khởi tạo giao diện WAN.');
  }

  // Lắng nghe sự kiện đăng xuất từ toàn bộ ứng dụng
  window.addEventListener('wan:logout', () => {
    AuthManager.logout();
    renderLogin(root);
  });

  // Kiểm tra phiên đăng nhập đã có hay chưa
  if (AuthManager.isAuthenticated()) {
    renderApp(root);
  } else {
    renderLogin(root);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

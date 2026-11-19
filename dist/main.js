import { WanApp } from './ui/app.js';
import { LoginPage } from './ui/login.js';

function bootstrap()       {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Không tìm thấy phần tử #app để khởi tạo giao diện WAN.');
  }

  const loadApp = ()       => {
    root.innerHTML = '';
    const app = new WanApp(root);
    app.mount();
  };

  const loadLogin = ()       => {
    root.innerHTML = '';
    const login = new LoginPage(root, () => {
      loadApp();
    });
    login.mount();
  };

  // Lắng nghe sự kiện đăng xuất từ toàn bộ ứng dụng
  window.addEventListener('wan:logout', () => {
    LoginPage.logout();
    loadLogin();
  });

  // Kiểm tra trạng thái đã đăng nhập trước đó
  if (LoginPage.isAuthenticated()) {
    loadApp();
  } else {
    loadLogin();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

import { WanApp } from './ui/app.js';

function bootstrap()       {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Không tìm thấy phần tử #app để khởi tạo giao diện WAN.');
  }
  const app = new WanApp(root);
  app.mount();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}


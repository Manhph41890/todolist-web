import Vue from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

if (process.client) { 
  Vue.use(Toast, {
    timeout: 3000, // Thời gian hiển thị thông báo
    position: 'top-right', // Vị trí hiển thị
    closeOnClick: true, // Đóng khi click
    pauseOnFocusLoss: true, // Tạm dừng khi mất focus
    pauseOnHover: true, // Tạm dừng khi hover
    draggable: true, // Kéo thả
    draggablePercent: 0.6, // Phần trăm kéo
    showCloseButtonOnHover: true, // Nút đóng khi hover
    hideProgressBar: false, // Ẩn thanh tiến trình
    closeButton: 'button', // Kiểu nút đóng
    icon: true, // Hiển thị icon
    rtl: false, // Hỗ trợ RTL
  });
}

/* =====================================================
  main.js - Phụ trách: Hanh
  - Khởi tạo 25 điểm đến vào localStorage
  - Tìm kiếm / lọc
  - Thêm điểm đến mới
  - Đăng ký / đăng nhập / đổi mật khẩu
  - Lưu góp ý vào localStorage
  ===================================================== */

$(function () {
  const hash = window.location.hash;
  if (hash === "#register" || hash === "#login") {
    $('[data-tab="' + hash.slice(1) + '"]').trigger("click");
  }
});




$(document).ready(function () {
 // TODO (HOANG ANH)
});




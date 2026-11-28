/* =====================================================
  main.js - Phụ trách: Hanh (jQuery + localStorage)
  Các key localStorage:
    destinations : mảng 25 điểm đến (+ điểm do người dùng thêm)
    users        : mảng tài khoản đã đăng ký
    currentUser  : tài khoản đang đăng nhập {name, email}
    feedbacks    : mảng góp ý/liên hệ
  Mỗi điểm đến: {id, name, region, category, description, image, custom}
  Lưu ý: mật khẩu chỉ băm đơn giản để demo bài tập,
         KHÔNG dùng cách này cho website thật.
  ===================================================== */


$(function () {
 "use strict";


 var KEY_DEST = "destinations";
 var KEY_USERS = "users";
 var KEY_CUR = "currentUser";
 var KEY_FB = "feedbacks";


 /* ---------- 1. DỮ LIỆU MẪU: 25 ĐIỂM ĐẾN ---------- */
 var BAC = "Miền Bắc", TRUNG = "Miền Trung", TN = "Tây Nguyên", NAM = "Miền Nam";
 var BIEN = "Biển đảo", NUI = "Núi rừng", VH = "Văn hóa – Lịch sử", SINHTHAI = "Sinh thái – Miệt vườn";


 var RAW = [
   ["Hà Giang", BAC, NUI, "Cực Bắc của Tổ quốc với cao nguyên đá Đồng Văn, đèo Mã Pì Lèng hùng vĩ và mùa hoa tam giác mạch rực rỡ."],
   ["Đà Nẵng", TRUNG, BIEN, "Thành phố biển năng động với bãi biển Mỹ Khê, bán đảo Sơn Trà, Bà Nà Hills và cầu Rồng phun lửa về đêm."],
   ["Phú Quốc", NAM, BIEN, "Đảo ngọc với bãi cát trắng, nước biển trong xanh, hoàng hôn Sunset Sanato và nước mắm, hồ tiêu nổi tiếng."],
   ["Vịnh Hạ Long", BAC, BIEN, "Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi nhô lên giữa làn nước xanh ngọc."],
   ["Măng Đen", TN, NUI, "\"Đà Lạt thứ hai\" của Kon Tum, se lạnh quanh năm với rừng thông, hồ nước và các bản làng người Xê Đăng."],
   ["Cần Thơ", NAM, SINHTHAI, "Thủ phủ miền Tây sông nước với chợ nổi Cái Răng, vườn trái cây, bến Ninh Kiều và ẩm thực dân dã."],
   ["Sa Pa", BAC, NUI, "Thị trấn trong sương với ruộng bậc thang tuyệt đẹp, đỉnh Fansipan và nét văn hóa đặc sắc của người dân tộc."],
   ["Hà Nội", BAC, VH, "Thủ đô ngàn năm văn hiến với phố cổ, Hồ Gươm, Văn Miếu và nền ẩm thực phở, bún chả trứ danh."],
   ["Ninh Bình", BAC, SINHTHAI, "Vùng non nước với quần thể Tràng An, Tam Cốc – Bích Động và cố đô Hoa Lư của các triều đại xưa."],
   ["Cố đô Huế", TRUNG, VH, "Kinh thành cổ với Đại Nội, lăng tẩm các vua Nguyễn và dòng sông Hương thơ mộng, đậm chất hoài niệm."],
   ["Phố cổ Hội An", TRUNG, VH, "Những ngôi nhà vàng, đèn lồng rực rỡ về đêm và ẩm thực phong phú bên bờ sông Hoài."],
   ["Phong Nha – Kẻ Bàng", TRUNG, NUI, "Vườn quốc gia có hệ thống hang động kỳ vĩ bậc nhất thế giới, nổi tiếng với hang Sơn Đoòng và động Phong Nha."],
   ["Nha Trang", TRUNG, BIEN, "Thành phố biển với vịnh đẹp nhất hành tinh, các đảo san hô, tháp Bà Ponagar và hải sản tươi ngon."],
   ["Quy Nhơn", TRUNG, BIEN, "Thành phố biển yên bình với Kỳ Co, Eo Gió, tháp Chăm cổ và món bún chả cá, bánh xèo tôm nhảy."],
   ["Mũi Né", TRUNG, BIEN, "Thiên đường lướt ván diều với đồi cát vàng, đồi cát hồng, suối Tiên và làng chài đầy màu sắc."],
   ["Đà Lạt", TN, NUI, "Thành phố ngàn hoa mát lành quanh năm, với đồi thông, hồ Xuân Hương và những quán cà phê xinh xắn."],
   ["Buôn Ma Thuột", TN, VH, "Thủ phủ cà phê Việt Nam, nơi có văn hóa cồng chiêng, thác Dray Nur và lễ hội cà phê đặc sắc."],
   ["Pleiku – Biển Hồ", TN, SINHTHAI, "Cao nguyên đất đỏ bazan với hồ T'Nưng (Biển Hồ) trong xanh, đồi chè và những buôn làng Gia Rai."],
   ["TP. Hồ Chí Minh", NAM, VH, "Đô thị sôi động bậc nhất cả nước với Dinh Độc Lập, Nhà thờ Đức Bà, chợ Bến Thành và ẩm thực đường phố."],
   ["Vũng Tàu", NAM, BIEN, "Thành phố biển gần Sài Gòn với Bãi Sau, tượng Chúa Kitô, ngọn hải đăng và hải sản giá hợp lý."],
   ["Côn Đảo", NAM, BIEN, "Quần đảo hoang sơ với những bãi biển trong vắt, rừng nguyên sinh và di tích lịch sử linh thiêng."],
   ["Bến Tre", NAM, SINHTHAI, "Xứ dừa của miền Tây với những con rạch xanh mát, vườn trái cây, lò kẹo dừa và đi xuồng ba lá."],
   ["Châu Đốc – Núi Sam", NAM, VH, "Vùng biên giới An Giang với miếu Bà Chúa Xứ, rừng tràm Trà Sư và mắm Châu Đốc nổi tiếng."],
   ["Mộc Châu", BAC, NUI, "Cao nguyên xanh mướt với đồi chè, đồi hoa mận, hoa cải trắng và các sản phẩm từ sữa bò."],
   ["Cát Bà", BAC, BIEN, "Đảo lớn nhất vịnh Hạ Long với vườn quốc gia, vịnh Lan Hạ, bãi tắm Cát Cò và làng chài nổi."]
 ];


 var DEFAULT_DESTINATIONS = $.map(RAW, function (r, i) {
   var n = i + 1;
   return {
     id: n,
     name: r[0],
     region: r[1],
     category: r[2],
     description: r[3],
     image: "images/product-" + (n < 10 ? "0" + n : n) + ".jpg",
     custom: false
   };
 });


 /* ---------- 2. HÀM TIỆN ÍCH ---------- */
 var memory = {}; // dự phòng nếu trình duyệt chặn localStorage


 function load(key, fallback) {
   try {
     var v = localStorage.getItem(key);
     return v ? JSON.parse(v) : fallback;
   } catch (e) {
     return memory.hasOwnProperty(key) ? memory[key] : fallback;
   }
 }


 function save(key, value) {
   memory[key] = value;
   try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
 }


 function remove(key) {
   delete memory[key];
   try { localStorage.removeItem(key); } catch (e) { /* bỏ qua */ }
 }


 function esc(str) {
   return $("<div>").text(str == null ? "" : String(str)).html().replace(/"/g, "&quot;");
 }


 // bỏ dấu + chữ thường để tìm kiếm "ha long" ra "Hạ Long"
 function norm(str) {
   return String(str || "")
     .toLowerCase()
     .normalize("NFD")
     .replace(/[̀-ͯ]/g, "")
     .replace(/đ/g, "d");
 }


 function hashPw(pw) { // băm djb2 - chỉ để demo
   var h = 5381;
   for (var i = 0; i < pw.length; i++) { h = ((h << 5) + h + pw.charCodeAt(i)) | 0; }
   return "h" + (h >>> 0).toString(16);
 }


 function showMsg($form, text, ok) {
   $form.find(".msg").text(text).removeClass("success error").addClass(ok ? "success" : "error").show();
 }


 function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }


 /* ---------- 3. KHỞI TẠO DỮ LIỆU ---------- */
 var existing = load(KEY_DEST, null);
 if (!$.isArray(existing) || existing.length === 0) {
   save(KEY_DEST, DEFAULT_DESTINATIONS);
 }


 // ảnh lỗi/chưa có -> ẩn ảnh để lộ nền gradient của khung
 function fixBrokenImages(scope) {
   $(scope || document).find(".card-img img").each(function () {
     var img = this;
     if (img.complete && img.naturalWidth === 0) { $(img).hide(); }
     $(img).off("error.fix").on("error.fix", function () { $(this).hide(); });
   });
 }
 fixBrokenImages();


 /* ---------- 4. TRANG ĐIỂM ĐẾN (products.html) ---------- */
 if ($("#destination-list").length) {
   var state = { q: "", region: "all", category: "all" };


   var params = new URLSearchParams(window.location.search);
   if (params.get("q")) {
     state.q = params.get("q");
     $("#search-input").val(state.q);
   }


   var render = function () {
     var all = load(KEY_DEST, []);
     var q = norm(state.q.trim());


     var list = $.grep(all, function (d) {
       var okQ = !q || norm(d.name).indexOf(q) > -1 || norm(d.description).indexOf(q) > -1;
       var okR = state.region === "all" || d.region === state.region;
       var okC = state.category === "all" || d.category === state.category;
       return okQ && okR && okC;
     });


     var html = $.map(list, function (d) {
       return (
         '<article class="card">' +
           '<div class="card-img">' +
             '<img src="' + esc(d.image) + '" alt="' + esc(d.name) + '" loading="lazy">' +
             '<span class="card-tag">' + esc(d.region) + "</span>" +
           "</div>" +
           '<div class="card-body">' +
             '<span class="card-cat">' + esc(d.category) + "</span>" +
             "<h3>" + esc(d.name) + "</h3>" +
             "<p>" + esc(d.description) + "</p>" +
             (d.custom
               ? '<div class="card-actions"><span class="card-new">Do bạn thêm</span>' +
                 '<button type="button" class="btn-delete" data-id="' + esc(d.id) + '">Xóa</button></div>'
               : "") +
           "</div>" +
         "</article>"
       );
     }).join("");


     $("#destination-list").html(html);
     fixBrokenImages("#destination-list");
     $("#result-count").text("Hiển thị " + list.length + " / " + all.length + " điểm đến");
     $("#empty-msg").toggle(list.length === 0);
   };


   // tìm kiếm
   $("#search-input").on("input", function () {
     state.q = $(this).val();
     render();
   });
   $("#search-form").on("submit", function (e) { e.preventDefault(); });


   // nút lọc (vùng miền + danh mục)
   $("#filter-region, #filter-category").on("click", ".filter-btn", function () {
     var $btn = $(this);
     var $group = $btn.closest(".filter-row");
     $group.find(".filter-btn").removeClass("active");
     $btn.addClass("active");
     state[$group.attr("id") === "filter-region" ? "region" : "category"] = $btn.data("value");
     render();
   });


   $("#btn-reset-filter").on("click", function () {
     state = { q: "", region: "all", category: "all" };
     $("#search-input").val("");
     $(".filter-row .filter-btn").removeClass("active");
     $(".filter-row .filter-btn[data-value='all']").addClass("active");
     render();
   });


   // xóa điểm đến do người dùng thêm
   $("#destination-list").on("click", ".btn-delete", function () {
     var id = Number($(this).data("id"));
     if (!window.confirm("Bạn có chắc muốn xóa điểm đến này?")) { return; }
     save(KEY_DEST, $.grep(load(KEY_DEST, []), function (d) { return d.id !== id; }));
     render();
   });


   // modal thêm điểm đến
   var $modal = $("#add-modal");
   var openModal = function () {
     $modal.addClass("open").attr("aria-hidden", "false");
     $("#add-name").trigger("focus");
   };
   var closeModal = function () {
     $modal.removeClass("open").attr("aria-hidden", "true");
   };
   $("#btn-open-add").on("click", openModal);
   $modal.on("click", ".modal-close, .modal-cancel", closeModal);
   $modal.on("click", function (e) { if (e.target === this) { closeModal(); } });
   $(document).on("keydown", function (e) { if (e.key === "Escape") { closeModal(); } });


   $("#add-form").on("submit", function (e) {
     e.preventDefault();
     var $f = $(this);
     var name = $.trim($("#add-name").val());
     var region = $("#add-region").val();
     var category = $("#add-category").val();
     var desc = $.trim($("#add-desc").val());
     var image = $.trim($("#add-image").val());


     if (name.length < 2) { return showMsg($f, "Tên điểm đến cần ít nhất 2 ký tự.", false); }
     if (!region) { return showMsg($f, "Vui lòng chọn vùng miền.", false); }
     if (!category) { return showMsg($f, "Vui lòng chọn danh mục.", false); }
     if (desc.length < 10) { return showMsg($f, "Mô tả cần ít nhất 10 ký tự.", false); }


     var all = load(KEY_DEST, []);
     var dup = $.grep(all, function (d) { return norm(d.name) === norm(name); }).length;
     if (dup) { return showMsg($f, "Điểm đến này đã có trong danh sách.", false); }


     var nextId = 1;
     $.each(all, function (_, d) { if (d.id >= nextId) { nextId = d.id + 1; } });


     all.unshift({
       id: nextId,
       name: name,
       region: region,
       category: category,
       description: desc,
       image: image || "images/no-image.jpg",
       custom: true
     });
     save(KEY_DEST, all);


     $f[0].reset();
     $f.find(".msg").hide();
     closeModal();
     $("#btn-reset-filter").trigger("click"); // về "Tất cả" để thấy điểm vừa thêm
   });


   render();
 }


 /* ---------- 5. TRANG LIÊN HỆ (contact.html) ---------- */
 if ($("#form-feedback").length) {


   // --- chuyển tab ---
   var switchTab = function (name) {
     $(".tab-btn").removeClass("active").filter("[data-tab='" + name + "']").addClass("active");
     $(".tab-panel").removeClass("active").filter("#tab-" + name).addClass("active");
     $(".tab-panel .msg").hide();
   };
   $(".tabs").on("click", ".tab-btn", function () { switchTab($(this).data("tab")); });


   // --- trạng thái tài khoản ---
   var refreshAccount = function () {
     var user = load(KEY_CUR, null);
     if (user) {
       $("#account-status").html(
         '<span>Xin chào, <strong>' + esc(user.name) + "</strong> (" + esc(user.email) + ")</span>" +
         '<button type="button" class="btn btn-primary btn-small" id="btn-logout">Đăng xuất</button>'
       );
       if (!$("#fb-name").val()) { $("#fb-name").val(user.name); }
       if (!$("#fb-email").val()) { $("#fb-email").val(user.email); }
     } else {
       $("#account-status").html("<span>Bạn chưa đăng nhập.</span>");
     }
   };


   $("#account-status").on("click", "#btn-logout", function () {
     remove(KEY_CUR);
     refreshAccount();
     switchTab("login");
   });


   // --- đăng ký ---
   $("#form-register").on("submit", function (e) {
     e.preventDefault();
     var $f = $(this);
     var name = $.trim($("#reg-name").val());
     var email = $.trim($("#reg-email").val()).toLowerCase();
     var pass = $("#reg-pass").val();
     var pass2 = $("#reg-pass2").val();


     if (name.length < 2) { return showMsg($f, "Vui lòng nhập họ tên.", false); }
     if (!isEmail(email)) { return showMsg($f, "Email không hợp lệ.", false); }
     if (pass.length < 6) { return showMsg($f, "Mật khẩu cần ít nhất 6 ký tự.", false); }
     if (pass !== pass2) { return showMsg($f, "Mật khẩu nhập lại không khớp.", false); }


     var users = load(KEY_USERS, []);
     var taken = $.grep(users, function (u) { return u.email === email; }).length;
     if (taken) { return showMsg($f, "Email này đã được đăng ký.", false); }


     users.push({ name: name, email: email, password: hashPw(pass) });
     save(KEY_USERS, users);


     $f[0].reset();
     switchTab("login");
     $("#login-email").val(email);
     showMsg($("#form-login"), "Đăng ký thành công! Hãy đăng nhập.", true);
   });


   // --- đăng nhập ---
   $("#form-login").on("submit", function (e) {
     e.preventDefault();
     var $f = $(this);
     var email = $.trim($("#login-email").val()).toLowerCase();
     var pass = $("#login-pass").val();


     var user = $.grep(load(KEY_USERS, []), function (u) {
       return u.email === email && u.password === hashPw(pass);
     })[0];


     if (!user) { return showMsg($f, "Email hoặc mật khẩu không đúng.", false); }


     save(KEY_CUR, { name: user.name, email: user.email });
     $f[0].reset();
     refreshAccount();
     showMsg($f, "Đăng nhập thành công. Xin chào " + user.name + "!", true);
   });


   // --- đổi mật khẩu ---
   $("#form-change-pass").on("submit", function (e) {
     e.preventDefault();
     var $f = $(this);
     var cur = load(KEY_CUR, null);
     if (!cur) { return showMsg($f, "Bạn cần đăng nhập trước khi đổi mật khẩu.", false); }


     var oldPw = $("#cp-old").val();
     var newPw = $("#cp-new").val();
     var newPw2 = $("#cp-new2").val();


     var users = load(KEY_USERS, []);
     var idx = -1;
     $.each(users, function (i, u) { if (u.email === cur.email) { idx = i; } });


     if (idx < 0 || users[idx].password !== hashPw(oldPw)) { return showMsg($f, "Mật khẩu cũ không đúng.", false); }
     if (newPw.length < 6) { return showMsg($f, "Mật khẩu mới cần ít nhất 6 ký tự.", false); }
     if (newPw === oldPw) { return showMsg($f, "Mật khẩu mới phải khác mật khẩu cũ.", false); }
     if (newPw !== newPw2) { return showMsg($f, "Mật khẩu mới nhập lại không khớp.", false); }


     users[idx].password = hashPw(newPw);
     save(KEY_USERS, users);
     $f[0].reset();
     showMsg($f, "Đổi mật khẩu thành công.", true);
   });


   // --- liên hệ / góp ý ---
   $("#form-feedback").on("submit", function (e) {
     e.preventDefault();
     var $f = $(this);
     var name = $.trim($("#fb-name").val());
     var email = $.trim($("#fb-email").val());
     var content = $.trim($("#fb-content").val());


     if (name.length < 2) { return showMsg($f, "Vui lòng nhập họ tên.", false); }
     if (!isEmail(email)) { return showMsg($f, "Email không hợp lệ.", false); }
     if (content.length < 10) { return showMsg($f, "Nội dung cần ít nhất 10 ký tự.", false); }


     var list = load(KEY_FB, []);
     list.push({
       id: Date.now(),
       name: name,
       email: email,
       content: content,
       time: new Date().toLocaleString("vi-VN")
     });
     save(KEY_FB, list);


     $("#fb-content").val("");
     showMsg($f, "Cảm ơn bạn! Góp ý đã được lưu (" + list.length + " góp ý trong máy này).", true);
   });


   refreshAccount();
   switchTab("login");
 }
});



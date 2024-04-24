// Kiểm tra đăng nhập
function login() {
    // Lấy dữ liệu từ form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Kiểm tra dữ liệu hợp lệ
    if (!username || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return false; // Trả về false để ngăn chặn sự kiện mặc định của form
    }

    // Kiểm tra dữ liệu mặc định trước
    if (username === "admin" && password === "admin") {
        // Đăng nhập thành công
        alert("Chúc mừng! Bạn đã đăng nhập thành công.");
        return true; // Trả về true để cho phép gửi form
    }

    // Kiểm tra xem có dữ liệu người dùng trong localStorage không
    var storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        var user = JSON.parse(storedUser);
        if (username === user.username && password === user.password) {
            // Đăng nhập thành công
            alert("Chúc mừng! Bạn đã đăng nhập thành công.");
            return true; // Trả về true để cho phép gửi form
        }
    }

    // Sai thông tin đăng nhập
    alert("Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.");
    return false; // Trả về false để ngăn chặn sự kiện mặc định của form
}

// Hiển thị trang đăng ký
function showRegister() {
    window.location.href = 'register.html'; // Chuyển hướng sang trang register.html
}

// Thêm event listener cho nút "Đăng ký"
document.getElementById('register-button').addEventListener('click', function() {
    showRegister();
});
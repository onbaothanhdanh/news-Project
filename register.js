// File register.js

// Hàm đăng ký người dùng mới
function register() {
    // Lấy dữ liệu từ form
    var newUsername = document.getElementById('new-username').value;
    var newPassword = document.getElementById('new-password').value;

    // Kiểm tra xem nếu dữ liệu trống và không phải từ nút quay lại thì hiển thị cảnh báo
    if ((!newUsername || !newPassword) && event.target.id !== 'go-back-btn') {
        alert("Vui lòng điền đầy đủ thông tin!");
        return false;
    }

    // Kiểm tra xem tên người dùng đã tồn tại trong localStorage chưa
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var existingUser = users.find(user => user.username === newUsername);
    if (existingUser) {
        alert("Tên người dùng đã tồn tại. Vui lòng chọn tên khác!");
        return false;
    }

    // Lưu dữ liệu vào localStorage
    var newUser = {
        username: newUsername,
        password: newPassword
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Lưu thông tin đăng nhập vào localStorage để sử dụng ở trang login
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Chuyển hướng về trang login.html
    showLogin();
}

// Hàm quay lại trang login.html
function goBack() {
    showLogin();
}
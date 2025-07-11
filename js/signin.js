const form = document.getElementById("login-form");
const message = document.getElementById("login-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username]) {
    message.style.color = "red";
    message.textContent = "❌ Tai khoan ko ton tai";
    return;
  }

  if (users[username].password !== password) {
    message.style.color = "red";
    message.textContent = "❌ Sai mat khau";
    return;
  }

  message.style.color = "green";
  message.textContent = "✅ Dang nhap thanh cong";
  localStorage.setItem("currentUser", username);
  form.reset();

  setTimeout(() => {
  window.location.href = "index.html";
    }, 3000);
});





emailjs.init("KEd2hB3aYswtUNd4b"); 

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const email = emailInput.value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    message.style.color = "red";
    message.textContent = "❌ Tên đăng nhập đã được sử dụng rồi";
    return;
  }

  users[username] = { password, email };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", username);


  sendVerificationEmail(username, email);

  message.style.color = "green";
  message.textContent = "✅ Tài khoản đã được tạo thành công";

  form.reset();

  setTimeout(() => {
  window.location.href = "index.html";
    }, 3000);


  setTimeout(() => {
    message.textContent = "";
  }, 10000);
});

function sendVerificationEmail(username, email) {
  emailjs.send("service_4b34rbr", "template_m5s5nop", {
    username: username,
    email: email
  }).then(() => {
    console.log("✅ Email sent successfully");
  }).catch((error) => {
    console.error("❌ Failed to send email", error);
  });
}



const currentUser = localStorage.getItem("currentUser");
const authButtons = document.getElementById("auth-buttons");
const welcomeUser = document.getElementById("welcome-user");
const usernameDisplay = document.getElementById("username-display");
const profileIcon = document.getElementById("profile-icon");
const userDropdown = document.getElementById("user-dropdown");
const logoutBtn = document.getElementById("logout-btn");

if (currentUser) {
  authButtons.style.display = "none";
  welcomeUser.style.display = "flex";
  usernameDisplay.textContent = currentUser;
}

profileIcon?.addEventListener("click", (e) => {
  e.stopPropagation();
  userDropdown.style.display =
    userDropdown.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", () => {
  userDropdown.style.display = "none";
});

logoutBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  window.location.reload();
});




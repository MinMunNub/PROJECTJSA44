const currentUser = localStorage.getItem("currentUser") || "User";
document.getElementById("username").textContent = currentUser;

let collectedPoints = 100;
let voucherPoints = 0;
const maxVoucherPoints = 100;

const collectedDisplay = document.getElementById("collectedPoints");
const voucherDisplay = document.getElementById("voucherPoints");
const progressBar = document.getElementById("progressBar");

function updateUI() {
  collectedDisplay.textContent = collectedPoints;
  voucherDisplay.textContent = voucherPoints;
  progressBar.style.width = (voucherPoints / maxVoucherPoints) * 100 + "%";
}

function addPoints() {
  if (collectedPoints > 0 && voucherPoints < maxVoucherPoints) {
    collectedPoints -= 10;
    voucherPoints += 10;
    if (voucherPoints > maxVoucherPoints) {
      voucherPoints = maxVoucherPoints;
    }
    updateUI();
  }
}

function resetVoucher() {
  collectedPoints += voucherPoints;
  voucherPoints = 0;
  updateUI();
}

function generateRandomCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function calculateDiscount() {
  return Math.min(Math.floor(voucherPoints / 10) * 2, 20);
}

function showVoucher() {
  const code = generateRandomCode();
  const discount = calculateDiscount();
  document.getElementById("voucherCode").textContent = code;
  document.getElementById("discountInfo").textContent = `Giảm giá: ${discount}%`;
  document.getElementById("voucherModal").style.display = "flex";
}

function closeVoucher() {
  document.getElementById("voucherModal").style.display = "none";
}

function printVoucher() {
  const printContents = document.getElementById("printableArea").innerHTML;
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>In voucher</title></head><body>');
  printWindow.document.write(printContents);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function copyCode() {
  const code = document.getElementById("voucherCode").textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert("Đã sao chép mã voucher!");
  });
}

function openLinkPopup() {
  document.getElementById("linkPopup").style.display = "flex";
}

function closeLinkPopup() {
  document.getElementById("linkPopup").style.display = "none";
  document.getElementById("cardNumber").value = "";
  document.getElementById("bankSelect").value = "";
}

function maskCardNumber(num) {
  return "**** **** **** " + num.slice(-4);
}

function createCard() {
  const bank = document.getElementById("bankSelect").value;
  const card = document.getElementById("cardNumber").value.replace(/\s/g, '');

  if (!bank || card.length < 12) {
    alert("Vui lòng nhập đúng số thẻ hợp lệ.");
    return;
  }

  const last4 = card.slice(-4);
  const linked = JSON.parse(localStorage.getItem("linkedCards") || "[]");
  if (linked.find(c => c.bank === bank)) {
    alert(`Bạn đã liên kết 1 thẻ của ${bank}. Chỉ được phép 1 thẻ mỗi ngân hàng.`);
    return;
  }

  saveCardToStorage(bank, last4, false);
  renderCard(bank, last4, false);
  closeLinkPopup();
}

function renderCard(bank, last4, locked) {
  const container = document.getElementById("userCards");
  const cardHTML = `
    <div class="user-card${locked ? ' locked' : ''}" data-bank="${bank}">
      <img src="logo/${bank.toLowerCase().replaceAll(' ', '')}.jpg" alt="${bank}" class="bank-logo">
      <h4>${bank}</h4>
      <p>${maskCardNumber(last4)}</p>
      <div class="card-menu">
        <img src="images/more.png" class="menu-icon" onclick="toggleMenu(this)">
        <div class="menu-options">
          <div onclick="deleteCard('${bank}')">Xóa</div>
        </div>
      </div>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", cardHTML);
  setupCardClick();
}

function toggleMenu(el) {
  const menu = el.nextElementSibling;
  const isVisible = menu.style.display === "block";
  document.querySelectorAll('.menu-options').forEach(m => m.style.display = "none");
  if (!isVisible) menu.style.display = "block";
}

function deleteCard(bank) {
  const card = document.querySelector(`.user-card[data-bank="${bank}"]`);
  if (card) card.remove();
  removeCardFromStorage(bank);
}

function saveCardToStorage(bank, last4, locked = false) {
  let cards = JSON.parse(localStorage.getItem("linkedCards") || "[]");
  cards.push({ bank, card: last4, locked });
  localStorage.setItem("linkedCards", JSON.stringify(cards));
}

function saveCardState(bank, locked) {
  let cards = JSON.parse(localStorage.getItem("linkedCards") || "[]");
  cards = cards.map(c => c.bank === bank ? { ...c, locked } : c);
  localStorage.setItem("linkedCards", JSON.stringify(cards));
}

function removeCardFromStorage(bank) {
  let cards = JSON.parse(localStorage.getItem("linkedCards") || "[]");
  cards = cards.filter(c => c.bank !== bank);
  localStorage.setItem("linkedCards", JSON.stringify(cards));
}

function loadCardsFromStorage() {
  const cards = JSON.parse(localStorage.getItem("linkedCards") || "[]");
  cards.forEach(c => renderCard(c.bank, c.card, c.locked));
}

function setupCardClick() {
  const cards = document.querySelectorAll(".user-card:not(.locked)");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".user-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
    });
  });
}

// Load everything on page start
window.onload = function () {
  updateUI();
  loadCardsFromStorage();
};

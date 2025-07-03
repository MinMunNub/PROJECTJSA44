// chuyen doi
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// cai dat
document.querySelectorAll('.msg-menu-icon').forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = icon.nextElementSibling;
    document.querySelectorAll('.msg-menu').forEach(m => {
      if (m !== menu) m.style.display = 'none';
    });
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  });
});

// xoa tin
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.closest('.message-card').remove();
  });
});

// chat popup
document.querySelectorAll('.message-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('msg-menu-icon') ||
      e.target.closest('.msg-menu') ||
      e.target.tagName === 'BUTTON'
    ) return;

    const content = card.getAttribute('data-content') || card.innerText.trim();
    const chatPopup = document.getElementById('chatPopup');
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = `<div class="chat-msg left">${content}</div>`;
    chatPopup.style.display = 'flex';
    document.getElementById('chatInput').focus();
  });
});

// nut gui
document.getElementById('chatSend').addEventListener('click', () => {
  const input = document.getElementById('chatInput');
  const value = input.value.trim();
  if (!value) return;
  const div = document.createElement('div');
  div.className = 'chat-msg right';
  div.textContent = value;
  document.getElementById('chatBody').appendChild(div);
  input.value = '';
  document.getElementById('chatBody').scrollTop = document.getElementById('chatBody').scrollHeight;
});

// nut x
document.getElementById('chatClose').addEventListener('click', () => {
  document.getElementById('chatPopup').style.display = 'none';
});

    const currentUser = localStorage.getItem("currentUser") || "User";
    document.getElementById("username").textContent = currentUser;

    // user test
    const mockData = {
      orders: 5,
      tier: "Đồng"
    };
    document.getElementById("orders").textContent = mockData.orders;
    document.getElementById("tier").textContent = mockData.tier;


  document.querySelectorAll('.favorites-section').forEach(section => {
    const list = section.querySelector('.favorites-list');
    const leftBtn = section.querySelector('.slide-btn.left');
    const rightBtn = section.querySelector('.slide-btn.right');

    leftBtn.addEventListener('click', () => {
      list.scrollBy({ left: -200, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      list.scrollBy({ left: 200, behavior: 'smooth' });
    });
  });

  

  document.getElementById('uploadPic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      document.getElementById('profilePic').src = imgURL;
    }
  });



  // popup
  const modal = document.getElementById('phoneModal');
  const addBtn = document.getElementById('addPhoneBtn');
  const cancelBtn = document.getElementById('cancelPhoneBtn');
  const saveBtn = document.getElementById('savePhoneBtn');
  const phoneInput = document.getElementById('phoneInput');
  const phoneDisplay = document.getElementById('phone-display');

  addBtn.onclick = () => {
    modal.style.display = 'flex';
    phoneInput.value = '';
  };

  cancelBtn.onclick = () => {
    modal.style.display = 'none';
  };

  saveBtn.onclick = () => {
    const phone = phoneInput.value.trim();
    if (phone && phone.length === 10) {
      localStorage.setItem('phoneNumber', phone);
      phoneDisplay.innerHTML = `Số điện thoại: <span id="phone">${phone}</span>`;
      modal.style.display = 'none';
    }
  };




  const profilePic = document.getElementById('profilePic');
  const uploadPic = document.getElementById('uploadPic');

  // saved prp
  window.addEventListener('DOMContentLoaded', () => {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
      profilePic.src = savedPic;
    }
  });

  // new
  uploadPic.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64Image = event.target.result;
        profilePic.src = base64Image;
        localStorage.setItem('profilePic', base64Image);
      };
      reader.readAsDataURL(file);
    }
  });








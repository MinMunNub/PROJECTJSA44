
document.addEventListener('DOMContentLoaded', function() {
  
// gan du lieu
  const activityData = [
    // tat ca
    { id: 1, type: 'placed', orderId: 'DH001', message: 'Đơn hàng đã được xác nhận và đang chuẩn bị', timestamp: '2025-07-04 14:25', icon: 'fas fa-shopping-cart' },
    { id: 2, type: 'placed', orderId: 'DH002', message: 'Đơn hàng mới đã được tạo thành công', timestamp: '2025-07-04 13:45', icon: 'fas fa-shopping-cart' },
    { id: 3, type: 'placed', orderId: 'DH003', message: 'Thanh toán thành công, đơn hàng đang xử lý', timestamp: '2025-07-04 12:30', icon: 'fas fa-shopping-cart' },
    { id: 4, type: 'placed', orderId: 'DH004', message: 'Đơn hàng đã được người bán xác nhận', timestamp: '2025-07-04 11:15', icon: 'fas fa-shopping-cart' },
    
    // da dat
    { id: 7, type: 'shipped', orderId: 'DH007', message: 'Đơn hàng đã được đóng gói và giao cho đơn vị vận chuyển', timestamp: '2025-07-04 08:30', icon: 'fas fa-box' },
    { id: 8, type: 'shipped', orderId: 'DH008', message: 'Hàng hóa đã rời khỏi kho và đang trên đường vận chuyển', timestamp: '2025-07-04 07:45', icon: 'fas fa-box' },
    
    // dang van chuyen
    { id: 13, type: 'out-for-delivery', orderId: 'DH013', message: 'Tài xế đang trên đường giao hàng đến địa chỉ của bạn', timestamp: '2025-07-04 02:25', icon: 'fas fa-truck' },
    { id: 14, type: 'out-for-delivery', orderId: 'DH014', message: 'Đơn hàng đã rời khỏi bưu cục và đang được giao', timestamp: '2025-07-04 01:45', icon: 'fas fa-truck' },
    { id: 15, type: 'out-for-delivery', orderId: 'DH015', message: 'Tài xế sẽ liên hệ với bạn trong 30 phút tới', timestamp: '2025-07-04 00:30', icon: 'fas fa-truck' },
    
    // da giao
    { id: 19, type: 'delivered', orderId: 'DH019', message: 'Đơn hàng đã được giao thành công đến người nhận', timestamp: '2025-07-03 20:30', icon: 'fas fa-check-circle' },
    { id: 20, type: 'delivered', orderId: 'DH020', message: 'Gói hàng đã được ký nhận và hoàn thành', timestamp: '2025-07-03 19:45', icon: 'fas fa-check-circle' },
    { id: 21, type: 'delivered', orderId: 'DH021', message: 'Đơn hàng đã giao thành công tại địa chỉ đã đăng ký', timestamp: '2025-07-03 18:20', icon: 'fas fa-check-circle' },
    
    // huy
    { id: 25, type: 'failed', orderId: 'DH025', message: 'Giao hàng thất bại: Không liên lạc được với người nhận', timestamp: '2025-07-03 14:25', icon: 'fas fa-exclamation-triangle' },
    { id: 26, type: 'failed', orderId: 'DH026', message: 'Giao hàng thất bại: Địa chỉ không chính xác', timestamp: '2025-07-03 13:45', icon: 'fas fa-exclamation-triangle' },
  ];
  
  // trang thai
  const statusLabels = {
    'placed': 'Đã đặt hàng',
    'shipped': 'Đã vận chuyển',
    'out-for-delivery': 'Đang giao hàng',
    'delivered': 'Đã giao thành công',
    'failed': 'Giao hàng thất bại'
  };
  
  // hoat dong hien tai
  let currentFilter = 'all';
  let currentPage = 1;
  let itemsPerPage = 10;
  let filteredData = [...activityData];
  
  // dom
  const activityFeed = document.getElementById('activityFeed');
  const statusTabs = document.querySelectorAll('.status-tab');
  const searchInput = document.getElementById('searchInput');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const currentPageSpan = document.getElementById('currentPage');
  const totalPagesSpan = document.getElementById('totalPages');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // render
  // hien thi du lieu ban dau
  renderActivities(); 
  // cap nhat trang   
  updatePagination();
  
  // chuc tang tab
  statusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // xoa active tab
      statusTabs.forEach(t => t.classList.remove('active'));
      
      // them tab
      tab.classList.add('active');
      
      // dat filter hien tai
      currentFilter = tab.dataset.status;
      currentPage = 1;
      
      // filter va render
      applyFilter();
      renderActivities();
      updatePagination();
    });
  });
  
  // chuc nang search
  searchInput.addEventListener('input', debounce(() => {
    currentPage = 1;
    applyFilter();
    renderActivities();
    updatePagination();
  }, 300));
  
  // nut them
  loadMoreBtn.addEventListener('click', () => {
    itemsPerPage += 10;
    renderActivities();
    updatePagination();
  });
  
  // pagination
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderActivities();
      updatePagination();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderActivities();
      updatePagination();
    }
  });
  
  // filter
  function applyFilter() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    filteredData = activityData.filter(item => {
      const matchesStatus = currentFilter === 'all' || item.type === currentFilter;
      const matchesSearch = !searchTerm || 
                          item.orderId.toLowerCase().includes(searchTerm) ||
                          item.message.toLowerCase().includes(searchTerm);
      
      return matchesStatus && matchesSearch;
    });
  }
  
  // render track
  function renderActivities() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);
    
    if (currentItems.length === 0) {
      activityFeed.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-search"></i>
          <h3>Không tìm thấy kết quả</h3>
          <p>Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
        </div>
      `;
      return;
    }
    
    activityFeed.innerHTML = currentItems.map((item, index) => `
      <div class="activity-item ${item.type}" style="animation-delay: ${index * 0.1}s">
        <div class="activity-header">
          <div class="activity-info">
            <div class="activity-title">
              <i class="${item.icon}"></i>
              ${statusLabels[item.type]}
            </div>
            <div class="activity-message">${item.message}</div>
            <div class="activity-details">
              <span class="activity-timestamp">
                <i class="fas fa-clock"></i>
                ${item.timestamp}
              </span>
              <span class="activity-order">
                <i class="fas fa-hashtag"></i>
                ${item.orderId}
              </span>
            </div>
          </div>
          <div class="status-badge ${item.type}">
            <i class="${item.icon}"></i>
            ${statusLabels[item.type]}
          </div>
        </div>
      </div>
    `).join('');
  }
  
  // update
  function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    currentPageSpan.textContent = currentPage;
    totalPagesSpan.textContent = totalPages;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // nut load
    if (currentPage * itemsPerPage >= filteredData.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }
  
  // search
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // anim
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    document.body.style.backgroundPositionY = `${rate}px`;
  });
  
  // anim
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  // dat observer demo
  function observeActivityItems() {
    const items = document.querySelectorAll('.activity-item');
    items.forEach(item => {
      observer.observe(item);
    });
  }
  
  // dat observer
  setTimeout(observeActivityItems, 100);
});
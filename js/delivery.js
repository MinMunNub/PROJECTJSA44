// Bien toan cuc
let currentStep = 1;
let orders = JSON.parse(localStorage.getItem('deliveryOrders')) || [];
let currentOrder = null;
let selectedServiceType = null;

// Khoi tao trang web
document.addEventListener('DOMContentLoaded', function() {
    loadOrdersFromStorage();
    setupEventListeners();
});

// Thiet lap cac su kien
function setupEventListeners() {
    // Su kien cho phuong thuc thanh toan
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const voucherSection = document.getElementById('voucherSection');
            if (this.value === 'voucher') {
                voucherSection.style.display = 'block';
            } else {
                voucherSection.style.display = 'none';
            }
        });
    });

    // Su kien submit form
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitOrder();
    });

    // Su kien dong modal khi click ben ngoai
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Hien thi modal dat hang
function showBookingForm(serviceType = null) {
    selectedServiceType = serviceType;
    document.getElementById('bookingModal').style.display = 'block';
    resetForm();
    
    // Cap nhat tieu de modal theo loai dich vu
    const modalTitle = document.querySelector('#bookingModal .modal-header h3');
    if (serviceType && modalTitle) {
        const serviceNames = {
            'standard': 'Đặt hàng - Giao hàng tiêu chuẩn',
            'express': 'Đặt hàng - Giao hàng nhanh',
            'same-day': 'Đặt hàng - Giao hàng trong ngày'
        };
        modalTitle.textContent = serviceNames[serviceType] || 'Đặt dịch vụ giao hàng';
    }
    
    // Tu dong chon loai dich vu neu co
    if (serviceType) {
        setTimeout(() => {
            const deliveryTimeSelect = document.getElementById('deliveryTime');
            if (deliveryTimeSelect) {
                deliveryTimeSelect.value = serviceType;
                // Disable truong nay de nguoi dung khong thay doi
                deliveryTimeSelect.style.backgroundColor = '#f0fdf4';
                deliveryTimeSelect.style.borderColor = '#10b981';
            }
        }, 100);
    }
}

// Dong modal dat hang
function closeBookingForm() {
    document.getElementById('bookingModal').style.display = 'none';
    resetForm();
}

// Reset form ve buoc dau
function resetForm() {
    currentStep = 1;
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step1').classList.add('active');
    document.getElementById('bookingForm').reset();
    document.getElementById('voucherSection').style.display = 'none';
    
    // Reset tieu de modal
    const modalTitle = document.querySelector('#bookingModal .modal-header h3');
    if (modalTitle) {
        modalTitle.textContent = 'Đặt dịch vụ giao hàng';
    }
    
    // Reset truong delivery time
    const deliveryTimeSelect = document.getElementById('deliveryTime');
    if (deliveryTimeSelect) {
        deliveryTimeSelect.style.backgroundColor = '';
        deliveryTimeSelect.style.borderColor = '';
    }
    
    // Xoa cac thong bao giam gia truoc do
    const discountInfo = document.querySelector('.discount-info');
    if (discountInfo) {
        discountInfo.remove();
    }
}

// Chuyen sang buoc tiep theo
function nextStep(step) {
    if (validateCurrentStep()) {
        currentStep = step;
        document.querySelectorAll('.form-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        document.getElementById(`step${step}`).classList.add('active');
    }
}

// Quay lai buoc truoc
function prevStep(step) {
    currentStep = step;
    document.querySelectorAll('.form-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    document.getElementById(`step${step}`).classList.add('active');
}

// Kiem tra tinh hop le cua buoc hien tai
function validateCurrentStep() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const requiredFields = currentStepEl.querySelectorAll('input[required], select[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            alert(`Vui long nhap ${field.previousElementSibling.textContent}`);
            return false;
        }
    }
    return true;
}

// Tinh gia cuoc
function calculatePrice() {
    if (!validateCurrentStep()) return;
    
    const packageSize = document.getElementById('packageSize').value;
    const deliveryTime = document.getElementById('deliveryTime').value;
    const pickupAddress = document.getElementById('pickupAddress').value;
    const dropoffAddress = document.getElementById('dropoffAddress').value;
    
    // Tao khoang cach ngau nhien (demo)
    const distance = Math.floor(Math.random() * 20) + 5; // 5-25km
    
    // Tinh gia theo kich thuoc va loai dich vu
    let basePrice = 0;
    let sizeMultiplier = 1;
    let timeMultiplier = 1;
    
    // Gia theo kich thuoc
    switch(packageSize) {
        case 'small':
            sizeMultiplier = 1;
            break;
        case 'medium':
            sizeMultiplier = 1.5;
            break;
        case 'large':
            sizeMultiplier = 2;
            break;
    }
    
    // Gia theo thoi gian
    switch(deliveryTime) {
        case 'standard':
            timeMultiplier = 1;
            break;
        case 'express':
            timeMultiplier = 1.5;
            break;
        case 'same-day':
            timeMultiplier = 2;
            break;
    }
    
    // Tinh gia co ban
    basePrice = distance * 3000 * sizeMultiplier * timeMultiplier;
    
    // Hien thi ket qua
    document.getElementById('distanceDisplay').textContent = distance + ' km';
    document.getElementById('serviceTypeDisplay').textContent = getServiceTypeName(deliveryTime);
    document.getElementById('basePrice').textContent = formatPrice(basePrice);
    document.getElementById('totalPrice').textContent = formatPrice(basePrice);
    
    // Chuyen sang buoc tiep theo
    nextStep(4);
}

// Lay ten loai dich vu
function getServiceTypeName(type) {
    switch(type) {
        case 'standard': return 'Tiêu chuẩn (2-4 giờ)';
        case 'express': return 'Nhanh (1-2 giờ)';
        case 'same-day': return 'Trong ngày (30-60 phút)';
        default: return '-';
    }
}

// Dinh dang gia tien
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Ap dung ma giam gia
function applyVoucher() {
    const voucherCode = document.getElementById('voucherCode').value.trim().toUpperCase();
    const totalPriceEl = document.getElementById('totalPrice');
    const basePriceText = document.getElementById('basePrice').textContent;
    const basePrice = parseFloat(basePriceText.replace(/[^\d]/g, ''));
    
    let discount = 0;
    let discountMessage = '';
    
    switch(voucherCode) {
        case 'GIAM20':
            discount = 0.2;
            discountMessage = 'Giam 20%';
            break;
        case 'FREESHIP':
            discount = 0.1;
            discountMessage = 'Mien phi ship';
            break;
        case 'WELCOME50':
            discount = 0.5;
            discountMessage = 'Giam 50% - Khach hang moi';
            break;
        default:
            alert('Ma giam gia khong hop le');
            return;
    }
    
    const finalPrice = basePrice * (1 - discount);
    totalPriceEl.textContent = formatPrice(finalPrice);
    
    // Hien thi thong bao giam gia
    const voucherSection = document.getElementById('voucherSection');
    let discountInfo = voucherSection.querySelector('.discount-info');
    if (!discountInfo) {
        discountInfo = document.createElement('div');
        discountInfo.className = 'discount-info';
        discountInfo.style.cssText = 'margin-top: 1rem; padding: 0.5rem; background: #10b981; color: white; border-radius: 5px;';
        voucherSection.appendChild(discountInfo);
    }
    discountInfo.textContent = `Da ap dung: ${discountMessage}`;
    
    alert(`Da ap dung ma giam gia ${voucherCode}: ${discountMessage}`);
}

// Su dung ma giam gia demo
function useVoucher(code) {
    document.getElementById('voucherCode').value = code;
    applyVoucher();
}

// Gui don hang
function submitOrder() {
    // Tao ma don hang
    const orderCode = generateOrderCode();
    
    // Lay thong tin don hang
    const orderData = {
        id: orderCode,
        pickupAddress: document.getElementById('pickupAddress').value,
        dropoffAddress: document.getElementById('dropoffAddress').value,
        packageSize: document.getElementById('packageSize').value,
        deliveryTime: document.getElementById('deliveryTime').value,
        shippingCompany: document.getElementById('shippingCompany').value,
        senderName: document.getElementById('senderName').value,
        senderPhone: document.getElementById('senderPhone').value,
        receiverName: document.getElementById('receiverName').value,
        receiverPhone: document.getElementById('receiverPhone').value,
        totalPrice: document.getElementById('totalPrice').textContent,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        status: 'requested',
        orderTime: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2 gio sau
    };
    
    // Luu don hang
    orders.push(orderData);
    currentOrder = orderData;
    saveOrdersToStorage();
    
    // Dong modal dat hang
    closeBookingForm();
    
    // Hien thi modal thanh cong
    showSuccessModal(orderCode);
}

// Tao ma don hang
function generateOrderCode() {
    const prefix = 'GE';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
}

// Hien thi modal thanh cong
function showSuccessModal(orderCode) {
    document.getElementById('orderCode').textContent = orderCode;
    document.getElementById('successModal').style.display = 'block';
    
    // Bat dau mo phong trang thai
    setTimeout(() => {
        updateOrderStatus(orderCode, 'accepted');
    }, 5000); // 5 giay
}

// Dong modal thanh cong
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Bat dau theo doi
function startTracking() {
    closeSuccessModal();
    showTrackingModal();
    if (currentOrder) {
        trackOrder(currentOrder.id);
    }
}

// Hien thi modal theo doi
function showTrackingModal() {
    document.getElementById('trackingModal').style.display = 'block';
}

// Dong modal theo doi
function closeTrackingModal() {
    document.getElementById('trackingModal').style.display = 'none';
}

// Theo doi don hang
function trackOrder(orderId) {
    if (!orderId) {
        orderId = document.getElementById('trackingCode').value.trim();
    }
    
    if (!orderId) {
        alert('Vui long nhap ma don hang');
        return;
    }
    
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        alert('Khong tim thay don hang');
        return;
    }
    
    // Hien thi thong tin theo doi
    displayTrackingResult(order);
}

// Hien thi ket qua theo doi
function displayTrackingResult(order) {
    const trackingResult = document.getElementById('trackingResult');
    trackingResult.style.display = 'block';
    
    // Tao tai xe ngau nhien
    const drivers = [
        { name: 'Nguyen Van A', phone: '0901234567', vehicle: 'Honda Wave' },
        { name: 'Tran Thi B', phone: '0907654321', vehicle: 'Yamaha Sirius' },
        { name: 'Le Van C', phone: '0912345678', vehicle: 'Honda Air Blade' }
    ];
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    
    // Tinh thoi gian con lai
    const estimatedTime = new Date(order.estimatedDelivery);
    const timeLeft = Math.max(0, Math.floor((estimatedTime - new Date()) / 60000)); // phut
    
    trackingResult.innerHTML = `
        <div class="tracking-map">
            <div class="map-placeholder">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🗺️</div>
                <div>Vi tri tai xe: Dang tren duong</div>
                <div>Khoang cach con lai: ${Math.floor(Math.random() * 10) + 1} km</div>
            </div>
        </div>
        
        <div class="driver-info">
            <h4>Thong tin tai xe</h4>
            <p><strong>Ten:</strong> ${driver.name}</p>
            <p><strong>So dien thoai:</strong> ${driver.phone}</p>
            <p><strong>Phuong tien:</strong> ${driver.vehicle}</p>
        </div>
        
        <div class="eta-info">
            <h4>Thoi gian giao hang du kien</h4>
            <p>${timeLeft > 0 ? `Con ${timeLeft} phut` : 'Dang giao hang'}</p>
        </div>
        
        <div class="order-status">
            <div class="status-item ${order.status === 'requested' ? 'active' : ''}">
                <span class="status-dot"></span>
                <span>Yeu cau</span>
            </div>
            <div class="status-item ${order.status === 'accepted' ? 'active' : ''}">
                <span class="status-dot"></span>
                <span>Chap nhan</span>
            </div>
            <div class="status-item ${order.status === 'picking' ? 'active' : ''}">
                <span class="status-dot"></span>
                <span>Dang lay hang</span>
            </div>
            <div class="status-item ${order.status === 'delivering' ? 'active' : ''}">
                <span class="status-dot"></span>
                <span>Dang giao</span>
            </div>
            <div class="status-item ${order.status === 'completed' ? 'active' : ''}">
                <span class="status-dot"></span>
                <span>Hoan thanh</span>
            </div>
        </div>
    `;
}

// Cap nhat trang thai don hang
function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveOrdersToStorage();
        
        // Cap nhat hien thi neu dang theo doi
        const trackingResult = document.getElementById('trackingResult');
        if (trackingResult.style.display === 'block' && currentOrder && currentOrder.id === orderId) {
            displayTrackingResult(order);
        }
        
        // Lap lich cap nhat tiep theo
        scheduleNextStatusUpdate(orderId, newStatus);
    }
}

// Lap lich cap nhat trang thai tiep theo
function scheduleNextStatusUpdate(orderId, currentStatus) {
    let nextStatus = '';
    let delay = 0;
    
    switch(currentStatus) {
        case 'requested':
            nextStatus = 'accepted';
            delay = 5000; // 5 giay
            break;
        case 'accepted':
            nextStatus = 'picking';
            delay = 10000; // 10 giay
            break;
        case 'picking':
            nextStatus = 'delivering';
            delay = 15000; // 15 giay
            break;
        case 'delivering':
            nextStatus = 'completed';
            delay = 20000; // 20 giay
            break;
    }
    
    if (nextStatus) {
        setTimeout(() => {
            updateOrderStatus(orderId, nextStatus);
        }, delay);
    }
}

// Luu don hang vao localStorage
function saveOrdersToStorage() {
    localStorage.setItem('deliveryOrders', JSON.stringify(orders));
}

// Tai don hang tu localStorage
function loadOrdersFromStorage() {
    const stored = localStorage.getItem('deliveryOrders');
    if (stored) {
        orders = JSON.parse(stored);
    }
}

// Xoa don hang
function deleteOrder(orderId) {
    orders = orders.filter(o => o.id !== orderId);
    saveOrdersToStorage();
}



// Thuc hien cleanup khi tai trang
document.addEventListener('DOMContentLoaded', function() {
    cleanupOldOrders();
    
    // Tu dong cap nhat trang thai cac don hang dang hoat dong
    orders.forEach(order => {
        if (order.status !== 'completed') {
            scheduleNextStatusUpdate(order.id, order.status);
        }
    });
});


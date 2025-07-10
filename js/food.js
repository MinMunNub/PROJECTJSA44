// du lieu nha hang va menu
const restaurantData = {
    1: {
        name: "Phở Hà Nội",
        rating: "⭐ 4.8",
        location: "📍 Quận 1, TP.HCM",
        menu: [
            { name: "Phở Bò Tái", price: "65.000đ", image: "food/phobotai.jpg" },
            { name: "Phở Gà", price: "55.000đ", image: "food/phoga.jpg" },
            { name: "Bún Bò Huế", price: "58.000đ", image: "food/bunbohue.jpg" }
        ]
    },
    2: {
        name: "Bún Bò Huế Sài Gòn",
        rating: "⭐ 4.6",
        location: "📍 Quận 3, TP.HCM",
        menu: [
            { name: "Bún Bò Huế Đặc Biệt", price: "75.000đ", image: "food/bunbohuedacbiet.jpg" },
            { name: "Bún Bò Huế Thường", price: "60.000đ", image: "food/bunbohuethuong.jpg" },
            { name: "Bánh Bèo", price: "45.000đ", image: "food/banhbeo.jpg" }
        ]
    },
    3: {
        name: "Bánh Mì Thịt Nướng",
        rating: "⭐ 4.7",
        location: "📍 Quận 2, TP.HCM",
        menu: [
            { name: "Bánh Mì Thịt Nướng", price: "25.000đ", image: "food/banhmithitnuong1.jpg" },
            { name: "Bánh Mì Pate", price: "20.000đ", image: "food/banhmipate.jpg" },
            { name: "Bánh Mì Chả Cá", price: "30.000đ", image: "food/banhmichaca.jpg" }
        ]
    },

    6: {
        name: "Bánh Mì Pate",
        rating: "⭐ 4.3",
        location: "📍 Quận 4, TP.HCM",
        menu: [
            { name: "Bánh Mì Pate Đặc Biệt", price: "30.000đ", image: "food/banhmipatedacbiet.jpg" },
            { name: "Bánh Mì Pate Thường", price: "25.000đ", image: "food/banhmipatethuong.jpg" },
            { name: "Bánh Mì Trứng", price: "20.000đ", image: "food/banhmitrung.jpg" }
        ]
    },
    7: {
        name: "Gà Rán Sài Gòn",
        rating: "⭐ 4.4",
        location: "📍 Quận 6, TP.HCM",
        menu: [
            { name: "Gà Rán Giòn", price: "80.000đ", image: "food/garangion.jpg" },
            { name: "Gà Sốt Cay", price: "85.000đ", image: "food/gasotcay.jpg" },
            { name: "Khoai Tây Chiên", price: "30.000đ", image: "food/khoaitaychien.jpg" }
        ]
    },
    8: {
        name: "Bánh Mì Thịt Nướng",
        rating: "⭐ 4.1",
        location: "📍 Quận 8, TP.HCM",
        menu: [
            { name: "Bánh Mì Thịt Nướng", price: "35.000đ", image: "food/banhmithitnuong1.jpg" },
            { name: "Bánh Mì Xíu Mại", price: "30.000đ", image: "food/banhmixiumai.jpg" },
            { name: "Bánh Mì Chả Lụa", price: "25.000đ", image: "food/banhmichalua.jpg" }
        ]
    },

    11: {
        name: "Bún Chả Hà Nội",
        rating: "⭐ 4.8",
        location: "📍 Quận 11, TP.HCM",
        menu: [
            { name: "Bún Chả Hà Nội", price: "70.000đ", image: "food/bunchahanoi1.jpg" },
            { name: "Bún Chả Đặc Biệt", price: "85.000đ", image: "food/bunchadacbiet.jpg" },
            { name: "Nem Cua Bể", price: "60.000đ", image: "food/nemcuabe.jpg" }
        ]
    },
    12: {
        name: "Mì Quảng Đà Nẵng",
        rating: "⭐ 4.7",
        location: "📍 Quận 12, TP.HCM",
        menu: [
            { name: "Mì Quảng Tôm Thịt", price: "75.000đ", image: "food/miquangtomthit.jpg" },
            { name: "Mì Quảng Gà", price: "70.000đ", image: "food/miquangga.jpg" },
            { name: "Bánh Tráng Nướng", price: "45.000đ", image: "food/banhtrangnuong.jpg" }
        ]
    },
    13: {
        name: "Bánh Xèo Miền Tây",
        rating: "⭐ 4.5",
        location: "📍 Quận Bình Thạnh, TP.HCM",
        menu: [
            { name: "Bánh Xèo Tôm Thịt", price: "65.000đ", image: "food/banhxeotomthit.jpg" },
            { name: "Bánh Khọt", price: "55.000đ", image: "food/banhkhot.jpg" },
            { name: "Gỏi Cuốn", price: "50.000đ", image: "food/goicuon.jpg" }
        ]
    },


};

// luu tru don hang trong localStorage
let orders = JSON.parse(localStorage.getItem('orders') || '[]');
let currentOrder = null;

// ham mo modal nha hang
function openRestaurantModal(restaurantId) {
    const restaurant = restaurantData[restaurantId];
    if (!restaurant) return;
    
    document.getElementById('restaurantName').textContent = restaurant.name;
    document.getElementById('restaurantRating').textContent = restaurant.rating;
    document.getElementById('restaurantLocation').textContent = restaurant.location;
    
    const menuItems = document.getElementById('menuItems');
    menuItems.innerHTML = '';
    
    restaurant.menu.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
    <div class="menu-item-info">
      <div class="menu-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="menu-item-details">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      </div>
    </div>
    <button class="order-btn" onclick="openOrderModal('${restaurant.name}', '${item.name}', '${item.price}')">
      Đặt hàng
    </button>
    `;
        menuItems.appendChild(menuItem);
    });

    
    document.getElementById('restaurantModal').style.display = 'block';
}

// ham dong modal nha hang
function closeRestaurantModal() {
    document.getElementById('restaurantModal').style.display = 'none';
}

// ham mo modal dat hang
function openOrderModal(restaurantName, dishName, price) {
    currentOrder = { restaurantName, dishName, price };
    
    document.getElementById('orderInfo').innerHTML = `
        <p><strong>Nhà hàng:</strong> ${restaurantName}</p>
        <p><strong>Món ăn:</strong> ${dishName}</p>
        <p><strong>Giá:</strong> ${price}</p>
    `;
    
    // xoa loi truoc do
    document.getElementById('addressError').style.display = 'none';
    document.getElementById('phoneError').style.display = 'none';
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
    
    document.getElementById('orderModal').style.display = 'block';
}

// ham dong modal dat hang
function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    currentOrder = null;
}

// ham xu ly form dat hang
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // xoa loi truoc do
    document.getElementById('addressError').style.display = 'none';
    document.getElementById('phoneError').style.display = 'none';
    
    let hasError = false;
    
    if (!address) {
        document.getElementById('addressError').textContent = 'Vui lòng nhập địa chỉ giao hàng';
        document.getElementById('addressError').style.display = 'block';
        hasError = true;
    }
    
    if (!phone) {
        document.getElementById('phoneError').textContent = 'Vui lòng nhập số điện thoại';
        document.getElementById('phoneError').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    // tao don hang moi
    const newOrder = {
        id: Date.now(),
        restaurantName: currentOrder.restaurantName,
        dishName: currentOrder.dishName,
        price: currentOrder.price,
        address: address,
        phone: phone,
        status: 'preparing',
        orderTime: new Date().toISOString()
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // dong modal
    closeOrderModal();
    
    // hien thi thong bao
    alert('Đặt hàng thành công! Đơn hàng của bạn đang được chuẩn bị.');
    
    // bat dau mo phong qua trinh giao hang
    startOrderSimulation(newOrder.id);
});

// ham mo phong qua trinh giao hang
function startOrderSimulation(orderId) {
    // sau 5 giay chuyen sang dang giao hang
    setTimeout(() => {
        updateOrderStatus(orderId, 'delivering');
    }, 5000);
    
    // sau 20 giay hoan thanh
    setTimeout(() => {
        updateOrderStatus(orderId, 'completed');
    }, 20000);
}

// ham cap nhat trang thai don hang
function updateOrderStatus(orderId, status) {
    orders = orders.map(order => {
        if (order.id === orderId) {
            order.status = status;
        }
        return order;
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // cap nhat giao dien neu dang mo modal lich su
    if (document.getElementById('historyModal').style.display === 'block') {
        displayOrderHistory();
    }
}

// ham huy don hang
function cancelOrder(orderId) {
    orders = orders.map(order => {
        if (order.id === orderId) {
            order.status = 'cancelled';
        }
        return order;
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // xoa don hang sau 3 giay
    setTimeout(() => {
        orders = orders.filter(order => order.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(orders));
        displayOrderHistory();
    }, 3000);
    
    displayOrderHistory();
}

// ham mo modal lich su
function openHistoryModal() {
    displayOrderHistory();
    document.getElementById('historyModal').style.display = 'block';
}

// ham dong modal lich su
function closeHistoryModal() {
    document.getElementById('historyModal').style.display = 'none';
}

// ham hien thi lich su don hang
function displayOrderHistory() {
    const historyContainer = document.getElementById('orderHistory');
    
    if (orders.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-history">
                <div>📝</div>
                <p>Chưa có đơn hàng nào</p>
            </div>
        `;
        return;
    }
    
    historyContainer.innerHTML = '';
    
    // sap xep theo thoi gian moi nhat
    const sortedOrders = [...orders].sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
    
    sortedOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        const statusText = getStatusText(order.status);
        const statusClass = getStatusClass(order.status);
        
        orderItem.innerHTML = `
            <div class="order-header">
                <div class="order-title">${order.restaurantName}</div>
                <div class="order-status ${statusClass}">${statusText}</div>
            </div>
            <div class="order-details">
                <p><strong>Món ăn:</strong> ${order.dishName}</p>
                <p><strong>Giá:</strong> ${order.price}</p>
                <p><strong>Địa chỉ:</strong> ${order.address}</p>
                <p><strong>Số điện thoại:</strong> ${order.phone}</p>
            </div>
            <div class="order-actions">
                <div class="order-time">
                    Thời gian đặt: ${new Date(order.orderTime).toLocaleString('vi-VN')}
                </div>
                ${order.status !== 'completed' && order.status !== 'cancelled' ? 
                    `<button class="cancel-btn" onclick="cancelOrder(${order.id})">Hủy đơn hàng</button>` : 
                    ''
                }
            </div>
        `;
        
        historyContainer.appendChild(orderItem);
    });
}

// ham lay text trang thai
function getStatusText(status) {
    const statusMap = {
        'preparing': 'Đang chuẩn bị',
        'delivering': 'Đang giao hàng',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

// ham lay class trang thai
function getStatusClass(status) {
    return `status-${status}`;
}

// dong modal khi click ben ngoai
window.onclick = function(event) {
    const restaurantModal = document.getElementById('restaurantModal');
    const orderModal = document.getElementById('orderModal');
    const historyModal = document.getElementById('historyModal');
    
    if (event.target === restaurantModal) {
        closeRestaurantModal();
    }
    if (event.target === orderModal) {
        closeOrderModal();
    }
    if (event.target === historyModal) {
        closeHistoryModal();
    }
}

// khoi dong ung dung
document.addEventListener('DOMContentLoaded', function() {
    // kiem tra don hang dang active va tiep tuc mo phong
    orders.forEach(order => {
        if (order.status === 'preparing') {
            const timePassed = Date.now() - new Date(order.orderTime).getTime();
            if (timePassed < 5000) {
                setTimeout(() => {
                    updateOrderStatus(order.id, 'delivering');
                }, 5000 - timePassed);
                
                setTimeout(() => {
                    updateOrderStatus(order.id, 'completed');
                }, 20000 - timePassed);
            } else if (timePassed < 20000) {
                updateOrderStatus(order.id, 'delivering');
                setTimeout(() => {
                    updateOrderStatus(order.id, 'completed');
                }, 20000 - timePassed);
            } else {
                updateOrderStatus(order.id, 'completed');
            }
        } else if (order.status === 'delivering') {
            const timePassed = Date.now() - new Date(order.orderTime).getTime();
            if (timePassed < 20000) {
                setTimeout(() => {
                    updateOrderStatus(order.id, 'completed');
                }, 20000 - timePassed);
            } else {
                updateOrderStatus(order.id, 'completed');
            }
        }
    });
});


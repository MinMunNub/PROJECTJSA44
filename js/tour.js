//  Du lieu mau tour
const sampleTours = [
    {
        id: 1,
        name: "Da Nang - Hoi An",
        location: "Quang Nam, Viet Nam",
        region: "VN",
        duration: "1-3 ngay",
        type: "Bien",
        price: 2000000,
        rating: 4.8,
        reviewCount: 120,
        description: "Kham pha ve dep tuyet voi cua Da Nang va pho co Hoi An voi nhieu trai nghiem thu vi.",
        itinerary: [
            "Ngay 1: Den Da Nang - Don tai san bay - Nhan phong khach san - Tham quan cau Rong - An toi tai nha hang",
            "Ngay 2: Tour Hoi An - Pho co Hoi An - Chua cau Nhat Ban - Lam den long - Cho dem Hoi An",
            "Ngay 3: Ba Na Hills - Cau Vang - Chua Linh Ung - Khu vui choi Fantasy Park - Ve san bay"
        ],
        includes: [
            "Ve may bay khu hoi",
            "Khach san 3 sao",
            "An sang tai khach san",
            "Huong dan vien",
            "Phuong tien di chuyen"
        ],
        imageUrl: "images/danang.jpg"
    },
    {
        id: 2,
        name: "Ha Long Bay",
        location: "Quang Ninh, Viet Nam",
        region: "VN",
        duration: "1-3 ngay",
        type: "Bien",
        price: 3500000,
        rating: 4.9,
        reviewCount: 89,
        description: "Trai nghiem ve dep hung vi cua Vinh Ha Long voi nhieu hoat dong thu vi tren bien.",
        itinerary: [
            "Ngay 1: Ha Noi - Ha Long - Tau thuyen tham quan vinh",
            "Ngay 2: Tham quan hang dong - Bai tam - Ve Ha Noi"
        ],
        includes: [
            "Xe du lich dieu hoa",
            "Khach san 4 sao",
            "An sang va trua",
            "Huong dan vien",
            "Tau tham quan"
        ],
        imageUrl: "images/halongbay.jpg"
    },
    {
        id: 3,
        name: "Sapa - Fansipan",
        location: "Lao Cai, Viet Nam",
        region: "VN",
        duration: "1-3 ngay",
        type: "Nui",
        price: 2800000,
        rating: 4.7,
        reviewCount: 156,
        description: "Chinh phuc dinh Fansipan va kham pha van hoa cac dan toc thieu so.",
        itinerary: [
            "Ngay 1: Ha Noi - Sapa - Tham quan ban Cat Cat",
            "Ngay 2: Chinh phuc dinh Fansipan bang cap treo",
            "Ngay 3: Cho tinh yeu - Ve Ha Noi"
        ],
        includes: [
            "Xe giuong nam",
            "Khach san 3 sao",
            "An sang va trua",
            "Huong dan vien",
            "Ve cap treo Fansipan"
        ],
        imageUrl: "images/sapa.jpg"
    },
    {
        id: 4,
        name: "Phu Quoc Island",
        location: "Kien Giang, Viet Nam",
        region: "VN",
        duration: "4-7 ngay",
        type: "Bien",
        price: 4200000,
        rating: 4.6,
        reviewCount: 203,
        description: "Nghi duong tai thien duong bien dao Phu Quoc voi nhieu hoat dong giai tri.",
        itinerary: [
            "Ngay 1: TP.HCM - Phu Quoc - Nhan phong resort",
            "Ngay 2: Tour 4 dao - Lan bien ngam san ho",
            "Ngay 3: Tham quan vuon tiep - Cho ye thi",
            "Ngay 4: Nghi duong tai resort - Ve TP.HCM"
        ],
        includes: [
            "Ve may bay khu hoi",
            "Resort 4 sao",
            "An sang tai resort",
            "Huong dan vien",
            "Tour 4 dao"
        ],
        imageUrl: "images/phuquoc.jpg"
    },
    {
        id: 5,
        name: "Nha Trang Beach",
        location: "Khanh Hoa, Viet Nam",
        region: "VN",
        duration: "1-3 ngay",
        type: "Bien",
        price: 2500000,
        rating: 4.5,
        reviewCount: 178,
        description: "Trai nghiem bai bien dep nhat Viet Nam voi nhieu hoat dong the thao nuoc.",
        itinerary: [
            "Ngay 1: Den Nha Trang - Tham quan Vinpearl Land",
            "Ngay 2: Tour 4 dao - Lan bien - Tham quan thap Po Nagar",
            "Ngay 3: Nghi duong - Ve tp"
        ],
        includes: [
            "Ve may bay khu hoi",
            "Khach san 3 sao",
            "An sang tai khach san",
            "Huong dan vien",
            "Ve Vinpearl Land"
        ],
        imageUrl: "images/nhatrang.jpg"
    },
    {
        id: 6,
        name: "Da Lat City",
        location: "Lam Dong, Viet Nam",
        region: "VN",
        duration: "1-3 ngay",
        type: "Nui",
        price: 1800000,
        rating: 4.8,
        reviewCount: 134,
        description: "Kham pha thanh pho nghin hoa voi khong khi mat me quanh nam.",
        itinerary: [
            "Ngay 1: TP.HCM - Da Lat - Tham quan thac Elephant",
            "Ngay 2: Vuon hoa Da Lat - Nha tho Con Ga - Cho Da Lat",
            "Ngay 3: Doi Chong - Ve TP.HCM"
        ],
        includes: [
            "Xe du lich dieu hoa",
            "Khach san 3 sao",
            "An sang tai khach san",
            "Huong dan vien",
            "Ve tham quan cac diem"
        ],
        imageUrl: "images/dalat.jpg"
    },
    {
        id: 7,
        name: "Hue Imperial City",
        location: "Thua Thien Hue, Viet Nam",
        region: "VN",
        duration: "1-3 ngay",
        type: "Van hoa",
        price: 2200000,
        rating: 4.7,
        reviewCount: 95,
        description: "Kham pha co do Hue voi nhieu di tich lich su van hoa.",
        itinerary: [
            "Ngay 1: Da Nang - Hue - Tham quan Dai Noi",
            "Ngay 2: Lang Khai Dinh - Chua Thien Mu - Song Huong",
            "Ngay 3: Ve Da Nang"
        ],
        includes: [
            "Xe du lich dieu hoa",
            "Khach san 3 sao",
            "An sang tai khach san",
            "Huong dan vien",
            "Ve tham quan cac diem"
        ],
        imageUrl: "images/hue.jpg"
    },
    {
        id: 8,
        name: "Can Tho - Mekong",
        location: "Can Tho, Viet Nam",
        region: "VN",
        duration: "1-3 ngay",
        type: "Phieu luu",
        price: 1900000,
        rating: 4.6,
        reviewCount: 87,
        description: "Kham pha mien Tay song nuoc voi nhieu trai nghiem doc dao.",
        itinerary: [
            "Ngay 1: TP.HCM - Can Tho - Tham quan cho noi Cai Rang",
            "Ngay 2: Vuon trai cay - Lam banh trang - Ve TP.HCM"
        ],
        includes: [
            "Xe du lich dieu hoa",
            "Khach san 3 sao",
            "An sang tai khach san",
            "Huong dan vien",
            "Thuyen tham quan"
        ],
        imageUrl: "images/cantho.jpg"
    }
];

//  Bien toan cuc
let currentTours = [...sampleTours];
let currentFilters = {
    region: '',
    duration: '',
    type: '',
    search: ''
};
let selectedTour = null;
let bookings = JSON.parse(localStorage.getItem('tourBookings')) || [];

//  Khoi tao trang
document.addEventListener('DOMContentLoaded', function() {
    loadTours();
    setupEventListeners();
    loadMyTours();
});

//  Thiet lap cac su kien
function setupEventListeners() {
    // Filter buttons - Nut bo loc
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    //Dieu huong
    document.querySelector('a[href="#my-tours"]').addEventListener('click', function(e) {
        e.preventDefault();
        showMyTours();
    });

    document.querySelector('.nav-brand h1').addEventListener('click', function() {
        showHomePage();
    });
}

//  Bat tat menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('show');
}

//  Tim kiem tour
function searchTours() {
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const people = document.getElementById('people').value;

    currentFilters.search = destination.toLowerCase();
    filterTours();
    
    // Hien thi thong bao ket qua tim kiem
    if (destination) {
        alert(`Tim kiem tour den "${destination}" cho ${people} nguoi`);
    }
}

// Ap dung bo loc
function applyFilters() {
    //  Lay bo loc khu vuc
    const regionCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const regions = Array.from(regionCheckboxes).map(cb => cb.value);
    currentFilters.region = regions.length > 0 ? regions[0] : '';

    // Lay bo loc thoi gian
    const durationRadio = document.querySelector('input[name="duration"]:checked');
    currentFilters.duration = durationRadio ? durationRadio.value : '';

    // Lay bo loc loai tour
    const activeTypeBtn = document.querySelector('.type-btn.active');
    currentFilters.type = activeTypeBtn ? activeTypeBtn.dataset.type : '';

    filterTours();
}

// Loc tour
function filterTours() {
    let filteredTours = [...sampleTours];

    if (currentFilters.region) {
        filteredTours = filteredTours.filter(tour => tour.region === currentFilters.region);
    }

    if (currentFilters.duration) {
        filteredTours = filteredTours.filter(tour => tour.duration === currentFilters.duration);
    }

    if (currentFilters.type) {
        filteredTours = filteredTours.filter(tour => tour.type === currentFilters.type);
    }

    if (currentFilters.search) {
        filteredTours = filteredTours.filter(tour => 
            tour.name.toLowerCase().includes(currentFilters.search) ||
            tour.location.toLowerCase().includes(currentFilters.search)
        );
    }

    currentTours = filteredTours;
    loadTours();
}

// Tai tour
function loadTours() {
    const toursGrid = document.getElementById('toursGrid');
    
    if (currentTours.length === 0) {
        toursGrid.innerHTML = '<div class="empty-state"><h3>Khong tim thay tour nao phu hop</h3><p>Vui long thu lai voi bo loc khac</p></div>';
        return;
    }

    toursGrid.innerHTML = currentTours.map(tour => `
        <div class="tour-card" onclick="showTourDetail(${tour.id})">
            <div class="tour-image">
                <img src="${tour.imageUrl}" alt="${tour.name}">
                <div class="tour-type-badge">${tour.type}</div>
            </div>
            <div class="tour-content">
                <h3 class="tour-name">${tour.name}</h3>
                <div class="tour-location">📍 ${tour.location}</div>
                <div class="tour-rating">⭐ ${tour.rating} (${tour.reviewCount} danh gia)</div>
                <div class="tour-price-section">
                    <div>
                        <span style="font-size: 14px; color: #6b7280;">Tu </span>
                        <span class="tour-price">${tour.price.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <button class="book-btn" onclick="event.stopPropagation(); openBookingModal(${tour.id})">Dat ngay</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Hien thi chi tiet tour
function showTourDetail(tourId) {
    const tour = sampleTours.find(t => t.id === tourId);
    if (!tour) return;

    selectedTour = tour;
    const modal = document.getElementById('tourModal');
    const tourDetails = document.getElementById('tourDetails');

    tourDetails.innerHTML = `
        <div style="margin-bottom: 24px;">
            <img src="${tour.imageUrl}" alt="${tour.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h2 style="font-size: 28px; font-weight: bold; margin: 0;">${tour.name}</h2>
            <span style="background: #f3f4f6; padding: 4px 12px; border-radius: 16px; font-size: 14px;">${tour.type}</span>
        </div>
        <div style="display: flex; gap: 24px; margin-bottom: 24px; font-size: 14px; color: #6b7280;">
            <span>📍 ${tour.location}</span>
            <span>⏰ ${tour.duration}</span>
            <span>⭐ ${tour.rating} (${tour.reviewCount} danh gia)</span>
        </div>
        <p style="margin-bottom: 24px; line-height: 1.6;">${tour.description}</p>
        
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Lich trinh tour</h3>
        <div style="margin-bottom: 24px;">
            ${tour.itinerary.map(item => `
                <div style="border-left: 4px solid hsl(158, 64%, 52%); padding-left: 16px; margin-bottom: 12px;">
                    <div style="font-size: 14px; color: #6b7280;">${item}</div>
                </div>
            `).join('')}
        </div>
        
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Tour bao gom:</h3>
        <ul style="margin-bottom: 24px;">
            ${tour.includes.map(item => `
                <li style="margin-bottom: 8px; display: flex; align-items: center;">
                    <span style="color: #10b981; margin-right: 8px;">✓</span>
                    ${item}
                </li>
            `).join('')}
        </ul>
        
        <div style="background: #f9fafb; padding: 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <div style="font-size: 24px; font-weight: bold; color: hsl(158, 64%, 52%);">${tour.price.toLocaleString('vi-VN')}đ</div>
                <div style="font-size: 14px; color: #6b7280;">/nguoi</div>
            </div>
            <button class="btn-primary" onclick="openBookingModal(${tour.id})" style="padding: 12px 24px;">Dat tour</button>
        </div>
    `;

    modal.style.display = 'block';
}

// Dong modal tour
function closeTourModal() {
    document.getElementById('tourModal').style.display = 'none';
}

// Mo modal dat tour
function openBookingModal(tourId) {
    const tour = sampleTours.find(t => t.id === tourId);
    if (!tour) return;

    selectedTour = tour;
    closeTourModal(); // Dong modal chi tiet neu dang mo
    
    const modal = document.getElementById('bookingModal');
    const tourInfo = document.getElementById('bookingTourInfo');

    tourInfo.innerHTML = `
        <img src="${tour.imageUrl}" alt="${tour.name}">
        <div>
            <h3 style="font-weight: 600; margin-bottom: 4px;">${tour.name}</h3>
            <p style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">Khoi hanh: Chua chon</p>
            <p style="font-size: 14px; color: hsl(158, 64%, 52%); font-weight: 500;">${tour.price.toLocaleString('vi-VN')}đ / nguoi</p>
        </div>
    `;

    updateTotalPrice();
    modal.style.display = 'block';
}

// Dong modal dat tour
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Cap nhat tong gia
function updateTotalPrice() {
    if (!selectedTour) return;

    const peopleCount = parseInt(document.getElementById('peopleCount').value) || 1;
    const totalPrice = selectedTour.price * peopleCount;
    
    document.getElementById('totalPrice').textContent = totalPrice.toLocaleString('vi-VN') + 'đ';
}

// Gui dat tour
function submitBooking(event) {
    event.preventDefault();
    
    if (!selectedTour) {
        alert('Khong co tour duoc chon');
        return;
    }

    // Lay du lieu form
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const peopleCount = parseInt(document.getElementById('peopleCount').value);
    const departureDate = document.getElementById('bookingDepartureDate').value;
    const returnDate = document.getElementById('bookingReturnDate').value;
    const notes = document.getElementById('notes').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const agreeTerms = document.getElementById('agreeTerms').checked;

    //Kiem tra form
    if (!fullName || !phone || !email || !departureDate || !returnDate) {
        alert('Vui long dien day du thong tin bat buoc');
        return;
    }

    if (!paymentMethod) {
        alert('Vui long chon phuong thuc thanh toan');
        return;
    }

    if (!agreeTerms) {
        alert('Vui long dong y voi dieu khoan dich vu');
        return;
    }

    // Tao booking
    const booking = {
        id: bookings.length + 1,
        tourId: selectedTour.id,
        tourName: selectedTour.name,
        tourLocation: selectedTour.location,
        tourImage: selectedTour.imageUrl,
        fullName,
        phone,
        email,
        peopleCount,
        departureDate,
        returnDate,
        notes,
        paymentMethod: paymentMethod.value,
        totalAmount: selectedTour.price * peopleCount,
        status: 'pending', // Trang thai
        bookingDate: new Date().toISOString().split('T')[0]
    };

    //  Luu booking
    bookings.push(booking);
    localStorage.setItem('tourBookings', JSON.stringify(bookings));

    // Hien thi thong bao thanh cong
    alert('Dat tour thanh cong! Chung toi se lien he voi ban trong thoi gian som nhat.');
    
    //  Dong modal va reset form
    closeBookingModal();
    document.querySelector('.booking-form').reset();
    
    //  Tai lai tour cua toi neu dang xem
    if (document.getElementById('my-tours').style.display !== 'none') {
        loadMyTours();
    }
}

//  Hien thi trang Tour cua toi
function showMyTours() {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.getElementById('my-tours').style.display = 'block';
    
    loadMyTours();
}

//  Hien thi trang chu
function showHomePage() {
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.main-content').style.display = 'grid';
    document.querySelector('.footer').style.display = 'block';
    document.getElementById('my-tours').style.display = 'none';
}

// Tai Tour cua toi
function loadMyTours() {
    const myToursList = document.getElementById('myToursList');
    
    if (bookings.length === 0) {
        myToursList.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 64px; margin-bottom: 16px;">📅</div>
                <h3>Chua co tour nao</h3>
                <p>Ban chua dat tour nao. Hay kham pha cac tour tuyet voi cua chung toi!</p>
            </div>
        `;
        return;
    }

    myToursList.innerHTML = bookings.map(booking => `
        <div class="my-tour-card">
            <div class="my-tour-content">
                <img src="${booking.tourImage}" alt="${booking.tourName}" class="my-tour-image">
                <div class="my-tour-details">
                    <div class="my-tour-header">
                        <h3 class="my-tour-name">${booking.tourName}</h3>
                        <span class="status-badge ${booking.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}">
                            ${booking.status === 'confirmed' ? 'Xac nhan' : 'Cho xu ly'}
                        </span>
                    </div>
                    <div class="my-tour-location">📍 ${booking.tourLocation}</div>
                    <div class="my-tour-info-grid">
                        <div class="info-item">
                            <span>📅</span>
                            <div>
                                <div class="info-label">Ngay di</div>
                                <div class="info-value">${booking.departureDate}</div>
                            </div>
                        </div>
                        <div class="info-item">
                            <span>📅</span>
                            <div>
                                <div class="info-label">Ngay ve</div>
                                <div class="info-value">${booking.returnDate}</div>
                            </div>
                        </div>
                        <div class="info-item">
                            <span>👥</span>
                            <div>
                                <div class="info-label">So nguoi</div>
                                <div class="info-value">${booking.peopleCount} nguoi</div>
                            </div>
                        </div>
                        <div class="info-item">
                            <span>💳</span>
                            <div>
                                <div class="info-label">Thanh toan</div>
                                <div class="info-value">${getPaymentMethodText(booking.paymentMethod)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-tour-price">
                    <div class="price-amount">${booking.totalAmount.toLocaleString('vi-VN')}đ</div>
                    <div class="price-label">Tong tien</div>
                </div>
            </div>
            <div class="my-tour-footer">
                <div class="tour-status">
                    ${booking.status === 'confirmed' ? 
                        '<span style="color: #10b981;">✓</span> Tour da duoc xac nhan' : 
                        '<span style="color: #f59e0b;">⏰</span> Dang cho xu ly'
                    }
                </div>
                <div class="tour-actions">
                    <button onclick="viewBookingDetails(${booking.id})">Xem chi tiet</button>
                    ${booking.status === 'confirmed' ? 
                        '<button onclick="cancelBooking(' + booking.id + ')" style="color: #ef4444;">Huy dat</button>' : 
                        ''
                    }
                </div>
            </div>
        </div>
    `).join('');
}

//  Lay text phuong thuc thanh toan
function getPaymentMethodText(method) {
    switch (method) {
        case 'momo':
            return 'Momo / ZaloPay / ViettelPay';
        case 'atm':
            return 'ATM noi dia';
        case 'card':
            return 'The tin dung (Visa/Master)';
        default:
            return method;
    }
}

// Xem chi tiet dat tour
function viewBookingDetails(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    alert(`Chi tiet dat tour:
    
Tour: ${booking.tourName}
Khach hang: ${booking.fullName}
So dien thoai: ${booking.phone}
Email: ${booking.email}
So nguoi: ${booking.peopleCount}
Ngay di: ${booking.departureDate}
Ngay ve: ${booking.returnDate}
Phuong thuc thanh toan: ${getPaymentMethodText(booking.paymentMethod)}
Tong tien: ${booking.totalAmount.toLocaleString('vi-VN')}đ
Trang thai: ${booking.status === 'confirmed' ? 'Da xac nhan' : 'Dang cho xu ly'}
Ngay dat: ${booking.bookingDate}
${booking.notes ? 'Ghi chu: ' + booking.notes : ''}`);
}

//  Huy dat tour
function cancelBooking(bookingId) {
    if (!confirm('Ban co chac chan muon huy dat tour nay?')) {
        return;
    }

    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        bookings[bookingIndex].status = 'cancelled';
        localStorage.setItem('tourBookings', JSON.stringify(bookings));
        loadMyTours();
        alert('Da huy dat tour thanh cong.');
    }
}

// Dong modal khi click ben ngoai
window.onclick = function(event) {
    const tourModal = document.getElementById('tourModal');
    const bookingModal = document.getElementById('bookingModal');
    
    if (event.target === tourModal) {
        tourModal.style.display = 'none';
    }
    if (event.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
}

// dong modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTourModal();
        closeBookingModal();
    }
});

// Tu dong xac nhan mot so booking de demo
setTimeout(() => {
    if (bookings.length > 0 && bookings[0].status === 'pending') {
        bookings[0].status = 'confirmed';
        localStorage.setItem('tourBookings', JSON.stringify(bookings));
    }
}, 5000);
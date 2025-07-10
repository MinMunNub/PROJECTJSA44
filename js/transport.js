// bien toan cuc
let currentTrip = null;
let searchTimeout = null;
let tripHistory = JSON.parse(localStorage.getItem('tripHistory')) || [];

// du lieu mau tai xe
const sampleDrivers = [
    {
        id: 1,
        name: "Nguyen Van A",
        rating: 4.8,
        reviewCount: 127,
        vehicle: "Honda City",
        licensePlate: "30A-12345",
        avatar: "👨‍💼"
    },
    {
        id: 2,
        name: "Tran Thi B",
        rating: 4.9,
        reviewCount: 89,
        vehicle: "Toyota Vios",
        licensePlate: "29B-67890",
        avatar: "👩‍💼"
    },
    {
        id: 3,
        name: "Le Van C",
        rating: 4.7,
        reviewCount: 156,
        vehicle: "Honda Wave",
        licensePlate: "30C-11111",
        avatar: "👨‍💼"
    }
];

// du lieu xe
const vehicleData = {
    'xe om': { icon: '🏍️', basePrice: 35000, type: 'motorbike' },
    'taxi 4 cho': { icon: '🚕', basePrice: 65000, type: 'car' },
    'taxi 7 cho': { icon: '🚐', basePrice: 85000, type: 'van' }
};

// khoi tao trang
document.addEventListener('DOMContentLoaded', function() {
    loadUsername();
    setupEventListeners();
});

// tai ten nguoi dung tu localStorage
function loadUsername() {
    const currentUser = localStorage.getItem("currentUser") || "user";
    document.getElementById("username").textContent = currentUser;
}

// thiet lap cac su kien
function setupEventListeners() {
    // dong modal khi click ben ngoai
    window.onclick = function(event) {
        const vehicleModal = document.getElementById('vehicleModal');
        const driverModal = document.getElementById('driverModal');
        const historyModal = document.getElementById('historyModal');
        const successModal = document.getElementById('successModal');
        
        if (event.target === vehicleModal) {
            closeVehicleModal();
        }
        if (event.target === driverModal) {
            cancelSearch();
        }
        if (event.target === historyModal) {
            closeHistoryModal();
        }
        if (event.target === successModal) {
            closeSuccessModal();
        }
    };

    // phim escape de dong modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeVehicleModal();
            cancelSearch();
            closeHistoryModal();
            closeSuccessModal();
        }
    });
}

// chon diem den
function selectDestination(destination) {
    document.getElementById('destination').value = destination;
}

// tim kiem xe
function searchVehicles(event) {
    event.preventDefault();
    
    const pickup = document.getElementById('pickup').value.trim();
    const destination = document.getElementById('destination').value.trim();
    
    if (!pickup || !destination) {
        alert('vui long nhap day du diem don va diem den');
        return;
    }
    
    if (pickup === destination) {
        alert('diem don va diem den khong duoc giong nhau');
        return;
    }
    
    // luu thong tin chuyen di
    const distance = calculateDistance();
    currentTrip = {
        pickup: pickup,
        destination: destination,
        distance: distance,
        estimatedTime: calculateEstimatedTime(distance)
    };
    
    // cap nhat noi dung modal
    document.getElementById('pickupDisplay').textContent = pickup;
    document.getElementById('destinationDisplay').textContent = destination;
    document.getElementById('estimatedDistance').textContent = currentTrip.distance + ' km';
    
    // hien thi modal chon xe
    document.getElementById('vehicleModal').style.display = 'block';
}

// tinh khoang cach mo phong
function calculateDistance() {
    // mo phong tinh khoang cach
    const distances = ['3.2', '4.5', '6.8', '8.1', '5.3', '7.2', '9.4'];
    return distances[Math.floor(Math.random() * distances.length)];
}

// tinh thoi gian uoc tinh
function calculateEstimatedTime(distance) {
    const dist = parseFloat(distance);
    const timeMin = Math.floor(dist * 1.5);
    const timeMax = Math.floor(dist * 2.2);
    return `${timeMin}-${timeMax} phut`;
}

// dong modal chon xe
function closeVehicleModal() {
    document.getElementById('vehicleModal').style.display = 'none';
}

// chon xe
function selectVehicle(vehicleType, price, icon) {
    if (!currentTrip) return;
    
    // tinh gia cuoi dua tren khoang cach
    const distance = parseFloat(currentTrip.distance);
    const finalPrice = Math.floor(price * (0.8 + distance * 0.1));
    
    // cap nhat thong tin chuyen di
    currentTrip.vehicleType = vehicleType;
    currentTrip.price = finalPrice;
    currentTrip.icon = icon;
    
    // dong modal chon xe
    closeVehicleModal();
    
    // hien thi modal tim tai xe
    showDriverFinding();
}

// hien thi modal tim tai xe
function showDriverFinding() {
    const modal = document.getElementById('driverModal');
    const driverFound = document.getElementById('driverFound');
    
    // reset trang thai modal
    driverFound.style.display = 'none';
    document.querySelector('.driver-search').style.display = 'block';
    
    // cap nhat thong tin xe da chon
    document.getElementById('selectedVehicleIcon').textContent = currentTrip.icon;
    document.getElementById('selectedVehicleName').textContent = currentTrip.vehicleType;
    document.getElementById('selectedVehiclePrice').textContent = currentTrip.price.toLocaleString('vi-VN') + 'đ';
    
    // bat dau mo phong tim kiem
    startDriverSearch();
    
    modal.style.display = 'block';
}

// bat dau mo phong tim kiem tai xe
function startDriverSearch() {
    let progress = 0;
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.getElementById('progressText');
    const statusText = document.getElementById('searchStatusText');
    const statusSubtext = document.getElementById('searchStatusSubtext');
    
    const searchSteps = [
        { text: 'dang tim tai xe gan ban...', subtext: 'vui long cho trong giay lat' },
        { text: 'tim thay 3 tai xe...', subtext: 'dang lien he voi tai xe' },
        { text: 'tai xe dang phan hoi...', subtext: 'sap hoan thanh' },
        { text: 'tim thay tai xe!', subtext: 'dang ket noi...' }
    ];
    
    let currentStep = 0;
    
    const searchInterval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        progressText.textContent = `tim kiem... ${Math.floor(progress)}%`;
        
        // cap nhat text trang thai
        if (progress > 25 && currentStep < 1) {
            currentStep = 1;
            statusText.textContent = searchSteps[currentStep].text;
            statusSubtext.textContent = searchSteps[currentStep].subtext;
        } else if (progress > 50 && currentStep < 2) {
            currentStep = 2;
            statusText.textContent = searchSteps[currentStep].text;
            statusSubtext.textContent = searchSteps[currentStep].subtext;
        } else if (progress > 75 && currentStep < 3) {
            currentStep = 3;
            statusText.textContent = searchSteps[currentStep].text;
            statusSubtext.textContent = searchSteps[currentStep].subtext;
        }
        
        if (progress >= 100) {
            clearInterval(searchInterval);
            setTimeout(() => {
                showDriverFound();
            }, 1000);
        }
    }, 200);
    
    // luu interval de huy
    searchTimeout = searchInterval;
}

// hien thi tim thay tai xe
function showDriverFound() {
    const driver = sampleDrivers[Math.floor(Math.random() * sampleDrivers.length)];
    
    // cap nhat thong tin tai xe
    document.getElementById('driverName').textContent = driver.name;
    document.querySelector('.avatar-circle').textContent = driver.avatar;
    document.querySelector('.rating-score').textContent = `${driver.rating} (${driver.reviewCount} danh gia)`;
    document.getElementById('driverVehicleInfo').textContent = `${driver.vehicle} - ${driver.licensePlate}`;
    
    // cap nhat tom tat chuyen di
    document.getElementById('tripDistance').textContent = currentTrip.distance + ' km';
    document.getElementById('tripDuration').textContent = currentTrip.estimatedTime;
    document.getElementById('tripPrice').textContent = currentTrip.price.toLocaleString('vi-VN') + 'đ';
    
    // luu thong tin tai xe
    currentTrip.driver = driver;
    
    // an tim kiem, hien tim thay tai xe
    document.querySelector('.driver-search').style.display = 'none';
    document.getElementById('driverFound').style.display = 'block';
}

// huy tim kiem
function cancelSearch() {
    if (searchTimeout) {
        clearInterval(searchTimeout);
        searchTimeout = null;
    }
    document.getElementById('driverModal').style.display = 'none';
    currentTrip = null;
}

// huy chuyen di
function cancelTrip() {
    if (confirm('ban co chac chan muon huy chuyen di nay?')) {
        cancelSearch();
    }
}

// xac nhan chuyen di
function confirmTrip() {
    if (!currentTrip) return;
    
    // tao ma chuyen di
    const tripCode = 'bex' + String(Date.now()).slice(-6);
    currentTrip.code = tripCode;
    currentTrip.date = new Date().toISOString().split('T')[0];
    currentTrip.time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    currentTrip.status = 'completed';
    
    // luu vao lich su
    tripHistory.unshift(currentTrip);
    localStorage.setItem('tripHistory', JSON.stringify(tripHistory));
    
    // dong modal tai xe
    document.getElementById('driverModal').style.display = 'none';
    
    // hien thi modal thanh cong
    document.getElementById('tripCode').textContent = tripCode;
    document.getElementById('successModal').style.display = 'block';
    
    // reset form
    document.getElementById('pickup').value = '';
    document.getElementById('destination').value = '';
    currentTrip = null;
}

// dong modal thanh cong
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// hien thi lich su
function showHistory() {
    loadHistory();
    document.getElementById('historyModal').style.display = 'block';
}

// dong modal lich su
function closeHistoryModal() {
    document.getElementById('historyModal').style.display = 'none';
}

// tai lich su
function loadHistory() {
    const historyList = document.getElementById('historyList');
    
    if (tripHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <h4>chua co lich su chuyen di</h4>
                <p>cac chuyen di cua ban se hien thi o day</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = tripHistory.map(trip => `
        <div class="history-item">
            <div class="history-icon">${trip.icon}</div>
            <div class="history-details">
                <h4>${trip.vehicleType}</h4>
                <div class="history-route">
                    ${trip.pickup} → ${trip.destination}
                </div>
                <div class="history-date">
                    ${trip.date} luc ${trip.time}
                </div>
            </div>
            <div class="history-price">
                ${trip.price.toLocaleString('vi-VN')}đ
            </div>
        </div>
    `).join('');
}


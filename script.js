// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
      });
    });
  }
});

// ===== BRAND DATA =====
const brandData = {
  'TV': ['Samsung', 'LG', 'Sony', 'Hisense', 'TCL', 'Panasonic', 'Philips', 'Toshiba', 'Sharp', 'Skyworth', 'Other Brand'],
  'Woofer': ['JBL', 'Sony', 'Bose', 'Samsung', 'LG', 'Harman Kardon', 'Marshall', 'Other Brand'],
  'Washing Machine': ['LG', 'Samsung', 'Whirlpool', 'Bosch', 'Haier', 'Midea', 'Other Brand'],
  'Radio': ['Sony', 'Panasonic', 'Philips', 'Sangean', 'Tecsun', 'Other Brand'],
  'Oven': ['Samsung', 'LG', 'Whirlpool', 'Bosch', 'Midea', 'Other Brand'],
  'Plotter': ['HP', 'Canon', 'Epson', 'Roland', 'Other Brand'],
  'Camera': ['Hikvision', 'Dahua', 'Reolink', 'TP-Link', 'Xiaomi', 'Other Brand'],
  'Electric Fence': ['Nemtek', 'JVA', 'Stafix', 'Gallagher', 'Other Brand'],
  'Fan': ['Panasonic', 'LG', 'Samsung', 'Havells', 'Orient', 'Other Brand'],
  'Air Fryer': ['Philips', 'Tefal', 'Ninja', 'Cosori', 'Xiaomi', 'Other Brand'],
  'Stage Lights': ['ADJ', 'Chauvet', 'Martin', 'BeamZ', 'Other Brand'],
  'Microwave': ['Samsung', 'LG', 'Panasonic', 'Whirlpool', 'Sharp', 'Other Brand'],
  'Amplifier': ['Yamaha', 'Denon', 'Pioneer', 'Sony', 'Marantz', 'Other Brand'],
  'Home Theater': ['Sony', 'Samsung', 'LG', 'JBL', 'Yamaha', 'Bose', 'Other Brand']
};

// ===== DEVICE SELECTION (Services Page) =====
function selectDevice(device) {
  // Update hidden input
  const deviceInput = document.getElementById('deviceInput');
  if (deviceInput) deviceInput.value = device;

  // Update display
  const display = document.getElementById('selectedDeviceDisplay');
  if (display) display.textContent = device;

  // Highlight selected card
  document.querySelectorAll('.service-card.clickable').forEach(card => {
    card.classList.remove('selected');
    if (card.getAttribute('data-device') === device) {
      card.classList.add('selected');
    }
  });

  // Populate brand dropdown
  const brandSelect = document.getElementById('brandSelect');
  if (brandSelect) {
    brandSelect.innerHTML = '<option value="">-- Select Brand --</option>';
    const brands = brandData[device] || [];
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
    brandSelect.disabled = false;
  }

  // Hide other brand input
  const otherBrandGroup = document.getElementById('otherBrandGroup');
  if (otherBrandGroup) otherBrandGroup.style.display = 'none';

  // Clear other brand input
  const otherBrandInput = document.getElementById('otherBrand');
  if (otherBrandInput) otherBrandInput.value = '';

  // Scroll to form
  const formSection = document.getElementById('repairFormSection');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== CHECK IF "OTHER BRAND" SELECTED =====
function checkOtherBrand() {
  const brandSelect = document.getElementById('brandSelect');
  const otherBrandGroup = document.getElementById('otherBrandGroup');

  if (brandSelect && otherBrandGroup) {
    if (brandSelect.value === 'Other Brand') {
      otherBrandGroup.style.display = 'block';
    } else {
      otherBrandGroup.style.display = 'none';
    }
  }
}

// ===== REPAIR FORM SUBMISSION =====
const repairForm = document.getElementById('repairForm');
if (repairForm) {
  repairForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const device = document.getElementById('deviceInput').value;
    const brandSelect = document.getElementById('brandSelect');
    const brand = brandSelect ? brandSelect.value : '';
    const otherBrand = document.getElementById('otherBrand') ? document.getElementById('otherBrand').value.trim() : '';
    const model = document.getElementById('model') ? document.getElementById('model').value.trim() : '';
    const problem = document.getElementById('problem').value.trim();

    // Determine final brand
    let finalBrand = brand;
    if (brand === 'Other Brand' && otherBrand) {
      finalBrand = otherBrand;
    }

    // Build message
    let message = '🔧 *New Repair Request*%0A%0A';
    message += '*Name:* ' + name + '%0A';
    message += '*Phone:* ' + phone + '%0A';
    message += '*Device:* ' + device + '%0A';
    message += '*Brand:* ' + finalBrand + '%0A';
    if (model) message += '*Model:* ' + model + '%0A';
    message += '*Problem:* ' + problem;

    const whatsappURL = 'https://wa.me/256755432091?text=' + message;
    window.open(whatsappURL, '_blank');
  });
}

// ===== SHOP FILTERS =====
function filterProducts(category) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase().includes(category) ||
      (category === 'all' && btn.textContent === 'All Products')) {
      btn.classList.add('active');
    }
  });

  // Filter products
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    if (category === 'all' || product.getAttribute('data-category') === category) {
      product.style.display = 'block';
      product.style.animation = 'fadeIn 0.5s ease';
    } else {
      product.style.display = 'none';
    }
  });
}

// Add fadeIn animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);
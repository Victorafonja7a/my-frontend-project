// ========================================
// PRODUCT DATABASE
// ========================================
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'audio',
    price: 79.99,
    rating: 5,
    reviews: 124,
    image: 'Images/product1.jpg',
    description: 'Premium sound quality with active noise cancellation. 40-hour battery life and comfort-fit ear cushions.',
    features: [
      'Active Noise Cancellation',
      '40-hour battery life',
      'Bluetooth 5.0',
      'Premium leather cushions',
      'Foldable design',
      'Built-in microphone'
    ],
    specs: {
      'Brand': 'ModernAudio',
      'Color': 'Black',
      'Weight': '250g',
      'Battery': '40 hours',
      'Bluetooth': '5.0',
      'Warranty': '1 year'
    }
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'electronics',
    price: 149.99,
    rating: 4,
    reviews: 89,
    image: 'Images/product2.jpg',
    description: 'Track your fitness journey with style. Advanced health monitoring and GPS tracking.',
    features: [
      'Heart rate monitoring',
      'Built-in GPS',
      'Water resistant 50m',
      '7-day battery life',
      'Customizable watch faces',
      'Sleep tracking'
    ],
    specs: {
      'Brand': 'TechFit',
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Rating': '50m',
      'OS': 'WearOS',
      'Warranty': '1 year'
    }
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    category: 'accessories',
    price: 59.99,
    rating: 4,
    reviews: 56,
    image: 'Images/product3.jpg',
    description: 'Durable and spacious backpack with USB charging port and water-resistant material.',
    features: [
      'Fits 17" laptops',
      'USB charging port',
      'Water-resistant',
      'Anti-theft pocket',
      'Breathable back panel',
      'Luggage strap'
    ],
    specs: {
      'Brand': 'CarryPro',
      'Material': 'Polyester',
      'Capacity': '30L',
      'Laptop Size': 'Up to 17"',
      'Weight': '850g',
      'Warranty': '2 years'
    }
  },
  {
    id: 4,
    name: 'Portable Charger',
    category: 'electronics',
    price: 39.99,
    rating: 5,
    reviews: 203,
    image: 'Images/product4.jpg',
    description: '20,000mAh high capacity with fast charging technology and multiple ports.',
    features: [
      '20,000mAh capacity',
      'Fast charging PD 3.0',
      'Three output ports',
      'LED power display',
      'Compact design',
      'Multiple protections'
    ],
    specs: {
      'Brand': 'PowerMax',
      'Capacity': '20,000mAh',
      'Input': 'USB-C',
      'Output': '18W Max',
      'Weight': '380g',
      'Warranty': '1 year'
    }
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    category: 'audio',
    price: 89.99,
    rating: 5,
    reviews: 167,
    image: 'Images/product5.jpg',
    description: '360° surround sound with deep bass. Waterproof design perfect for outdoor use.',
    features: [
      '360° sound',
      'IPX7 waterproof',
      '20-hour playtime',
      'TWS pairing',
      'Power bank function',
      'Voice assistant'
    ],
    specs: {
      'Brand': 'SoundWave',
      'Power': '30W',
      'Bluetooth': '5.0',
      'Battery': '20 hours',
      'Waterproof': 'IPX7',
      'Warranty': '1 year'
    }
  },
  {
    id: 6,
    name: 'USB-C Cable',
    category: 'accessories',
    price: 19.99,
    rating: 4,
    reviews: 92,
    image: 'Images/product6.jpg',
    description: 'High-quality braided cable with fast charging up to 60W and durable design.',
    features: [
      '6ft length',
      'Fast charging 60W',
      'Data transfer 480Mbps',
      'Braided nylon',
      'Aluminum connectors',
      'Universal compatibility'
    ],
    specs: {
      'Brand': 'ConnectPlus',
      'Length': '6 feet',
      'Max Power': '60W',
      'Data Speed': '480Mbps',
      'Material': 'Nylon',
      'Warranty': '1 year'
    }
  },
  {
    id: 7,
    name: 'Wireless Mouse',
    category: 'office',
    price: 29.99,
    rating: 4,
    reviews: 78,
    image: 'Images/product7.jpg',
    description: 'Ergonomic wireless mouse with silent clicks and adjustable DPI.',
    features: [
      'Ergonomic design',
      'Silent click technology',
      '2.4GHz wireless',
      'Adjustable DPI',
      '18-month battery',
      'Windows & Mac compatible'
    ],
    specs: {
      'Brand': 'ErgoTech',
      'DPI': '800-2400',
      'Buttons': '6 programmable',
      'Battery': '18 months',
      'Weight': '95g',
      'Warranty': '1 year'
    }
  },
  {
    id: 8,
    name: 'Phone Stand',
    category: 'accessories',
    price: 24.99,
    rating: 3,
    reviews: 45,
    image: 'Images/product8.jpg',
    description: 'Adjustable aluminum stand with non-slip pads. Perfect for video calls.',
    features: [
      'Adjustable angle',
      'Aluminum construction',
      'Non-slip pads',
      'Fits 4-8" devices',
      'Cable management',
      'Portable & foldable'
    ],
    specs: {
      'Brand': 'StandPro',
      'Material': 'Aluminum',
      'Compatibility': '4-8 inches',
      'Weight': '180g',
      'Color': 'Silver',
      'Warranty': '1 year'
    }
  },
  {
    id: 9,
    name: 'LED Desk Lamp',
    category: 'office',
    price: 44.99,
    rating: 5,
    reviews: 134,
    image: 'Images/product9.jpg',
    description: 'Modern LED lamp with adjustable brightness and color temperature.',
    features: [
      '5 brightness levels',
      'Color temperature control',
      'Touch controls',
      'USB charging port',
      'Memory function',
      'Flicker-free LED'
    ],
    specs: {
      'Brand': 'LightWork',
      'Power': '12W LED',
      'Color Temp': '3000K-6000K',
      'Brightness': '800 lumens',
      'Material': 'Aluminum',
      'Warranty': '2 years'
    }
  }
];

// ========================================
// STATE
// ========================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';
let currentSort = 'default';
let currentSearch = '';
let theme = localStorage.getItem('theme') || 'light';

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFloatingMenu();
  initNavigation();
  initProductModal();
  initCart();
  renderProducts();
  updateCartUI();
});

// ========================================
// THEME TOGGLE
// ========================================
function initTheme() {
  document.documentElement.setAttribute('data-theme', theme);
  
  document.getElementById('themeToggle').addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    showToast(theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
  });
}

// ========================================
// FLOATING MENU
// ========================================
function initFloatingMenu() {
  const btn = document.getElementById('floatingMenuBtn');
  const menu = document.getElementById('floatingMenu');
  const overlay = document.getElementById('floatingMenuOverlay');
  const close = document.getElementById('floatingMenuClose');
  
  btn.addEventListener('click', () => {
    menu.classList.add('active');
    overlay.classList.add('active');
  });
  
  close.addEventListener('click', closeFloatingMenu);
  overlay.addEventListener('click', closeFloatingMenu);
  
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      switchSection(section);
      closeFloatingMenu();
    });
  });
}

function closeFloatingMenu() {
  document.getElementById('floatingMenu').classList.remove('active');
  document.getElementById('floatingMenuOverlay').classList.remove('active');
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
  document.querySelectorAll('[data-section]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const section = el.dataset.section;
      switchSection(section);
    });
  });
  
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderProducts();
    });
  });
  
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });
  
  document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    renderProducts();
  });
}

function switchSection(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === sectionId) {
      link.classList.add('active');
    }
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// RENDER PRODUCTS
// ========================================
function renderProducts() {
  let filtered = products;
  
  // Filter by category
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  
  // Filter by search
  if (currentSearch) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(currentSearch));
  }
  
  // Sort
  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }
  
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const resultCount = document.getElementById('resultCount');
  
  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.classList.add('active');
    resultCount.textContent = 'No products found';
  } else {
    noResults.classList.remove('active');
    resultCount.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
    
    grid.innerHTML = filtered.map(product => `
      <div class="product-card" onclick="openProductModal(${product.id})">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          <span class="product-badge">New</span>
        </div>
        <div class="product-info">
          <div class="product-category">${capitalizeFirst(product.category)}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description.substring(0, 60)}...</p>
          <div class="product-rating">${'⭐'.repeat(product.rating)} (${product.reviews})</div>
          <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// ========================================
// PRODUCT MODAL
// ========================================
function initProductModal() {
  document.getElementById('modalClose').addEventListener('click', closeProductModal);
  document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeProductModal();
  });
  
  document.getElementById('qtyMinus').addEventListener('click', () => {
    const input = document.getElementById('qtyInput');
    if (input.value > 1) input.value = parseInt(input.value) - 1;
  });
  
  document.getElementById('qtyPlus').addEventListener('click', () => {
    const input = document.getElementById('qtyInput');
    if (input.value < 10) input.value = parseInt(input.value) + 1;
  });
}

function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalCategory').textContent = capitalizeFirst(product.category);
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalRating').textContent = '⭐'.repeat(product.rating) + ` (${product.reviews} reviews)`;
  document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('modalDescription').textContent = product.description;
  
  document.getElementById('modalFeatures').innerHTML = product.features
    .map(f => `<li>${f}</li>`).join('');
  
  document.getElementById('modalSpecs').innerHTML = Object.entries(product.specs)
    .map(([key, val]) => `<div><strong>${key}:</strong> ${val}</div>`).join('');
  
  document.getElementById('qtyInput').value = 1;
  
  document.getElementById('modalAddCart').onclick = () => {
    const qty = parseInt(document.getElementById('qtyInput').value);
    for (let i = 0; i < qty; i++) {
      addToCart(productId);
    }
    closeProductModal();
    showToast(`${qty} ${product.name} added to cart`);
  };
  
  document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

// ========================================
// CART
// ========================================
function initCart() {
  document.getElementById('clearCart').addEventListener('click', () => {
    if (confirm('Clear entire cart?')) {
      cart = [];
      saveCart();
      updateCartUI();
      showToast('Cart cleared');
    }
  });
  
  document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Cart is empty');
      return;
    }
    showToast('Checkout successful!');
    cart = [];
    saveCart();
    updateCartUI();
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast('Item removed');
}

function updateQuantity(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  
  item.quantity += change;
  if (item.quantity < 1) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
  
  const cartItems = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartSummary = document.getElementById('cartSummary');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '';
    emptyCart.classList.add('active');
    cartSummary.classList.remove('active');
  } else {
    emptyCart.classList.remove('active');
    cartSummary.classList.add('active');
    
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-controls">
            <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="cart-item-qty">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE';
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }
}

// ========================================
// UTILITIES
// ========================================
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductModal();
    closeFloatingMenu();
  }
});

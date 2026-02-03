// ===== STATE MANAGEMENT =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';
let currentSearchQuery = '';
let currentFilters = {
  priceMin: 0,
  priceMax: 200,
  inStock: true,
  rating: null
};
let currentSort = 'default';
let isSignedIn = false;
let currentProduct = null;

// Product Database with detailed information
const productsDatabase = {
  '1': {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Audio',
    price: 79.99,
    rating: 5,
    ratingCount: 124,
    description: 'Experience premium sound quality with our advanced wireless headphones. Featuring active noise cancellation, 40-hour battery life, and comfort-fit ear cushions for all-day wear.',
    features: [
      'Active Noise Cancellation (ANC) technology',
      '40-hour battery life on single charge',
      'Bluetooth 5.0 with multipoint connection',
      'Premium leather ear cushions',
      'Foldable design with carrying case',
      'Built-in microphone for calls'
    ],
    specs: {
      'Brand': 'ModernAudio',
      'Color': 'Matte Black',
      'Weight': '250g',
      'Driver Size': '40mm',
      'Frequency Range': '20Hz - 20kHz',
      'Impedance': '32 Ohm'
    }
  },
  '2': {
    id: '2',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 149.99,
    rating: 4,
    ratingCount: 89,
    description: 'Track your fitness journey with style. This smartwatch features advanced health monitoring, GPS tracking, and seamless smartphone integration for the perfect companion.',
    features: [
      'Heart rate and SpO2 monitoring',
      'Built-in GPS for accurate tracking',
      'Water resistant up to 50m',
      '7-day battery life',
      'Customizable watch faces',
      'Sleep tracking and analysis'
    ],
    specs: {
      'Brand': 'TechFit',
      'Display': '1.4" AMOLED',
      'Resolution': '454 x 454',
      'Battery': '300mAh',
      'Compatibility': 'iOS & Android',
      'Weight': '45g'
    }
  },
  '3': {
    id: '3',
    name: 'Laptop Backpack',
    category: 'Accessories',
    price: 59.99,
    rating: 4,
    ratingCount: 56,
    description: 'A durable and spacious backpack designed for modern professionals. Features multiple compartments, USB charging port, and water-resistant material.',
    features: [
      'Fits laptops up to 17 inches',
      'USB charging port for convenience',
      'Water-resistant polyester material',
      'Anti-theft hidden zipper pocket',
      'Breathable back panel',
      'Luggage strap for easy travel'
    ],
    specs: {
      'Brand': 'CarryPro',
      'Material': 'Water-resistant Polyester',
      'Capacity': '30L',
      'Dimensions': '18" x 12" x 7"',
      'Weight': '850g',
      'Color': 'Charcoal Gray'
    }
  },
  '4': {
    id: '4',
    name: 'Portable Charger',
    category: 'Electronics',
    price: 39.99,
    rating: 5,
    ratingCount: 203,
    description: 'Never run out of battery again with our high-capacity portable charger. Fast charging technology and multiple ports keep all your devices powered.',
    features: [
      '20,000mAh high capacity',
      'Fast charging (PD 3.0 & QC 3.0)',
      'Three output ports',
      'LED power display',
      'Compact and lightweight',
      'Multiple safety protections'
    ],
    specs: {
      'Brand': 'PowerMax',
      'Capacity': '20,000mAh',
      'Input': 'USB-C & Micro USB',
      'Output': '2x USB-A, 1x USB-C',
      'Max Output': '18W',
      'Weight': '380g'
    }
  },
  '5': {
    id: '5',
    name: 'Bluetooth Speaker',
    category: 'Audio',
    price: 89.99,
    rating: 5,
    ratingCount: 167,
    description: 'Immerse yourself in 360° surround sound with deep bass. Waterproof design makes it perfect for outdoor adventures and pool parties.',
    features: [
      '360° surround sound technology',
      'IPX7 waterproof rating',
      '20-hour playtime',
      'True Wireless Stereo (TWS) pairing',
      'Built-in power bank function',
      'Voice assistant compatible'
    ],
    specs: {
      'Brand': 'SoundWave',
      'Power Output': '30W',
      'Bluetooth': 'v5.0',
      'Battery': '5200mAh',
      'Waterproof': 'IPX7',
      'Weight': '680g'
    }
  },
  '6': {
    id: '6',
    name: 'USB-C Cable',
    category: 'Accessories',
    price: 19.99,
    rating: 4,
    ratingCount: 92,
    description: 'High-quality braided USB-C cable with fast charging capability. Durable design tested for 10,000+ bend cycles.',
    features: [
      '6ft length for convenience',
      'Fast charging up to 60W',
      'Data transfer up to 480Mbps',
      'Braided nylon design',
      'Aluminum connector housing',
      'Universal compatibility'
    ],
    specs: {
      'Brand': 'ConnectPlus',
      'Length': '6 feet (1.8m)',
      'Max Power': '60W (20V/3A)',
      'Data Speed': '480Mbps',
      'Connector': 'USB-C to USB-C',
      'Color': 'Space Gray'
    }
  },
  '7': {
    id: '7',
    name: 'Wireless Mouse',
    category: 'Office',
    price: 29.99,
    rating: 4,
    ratingCount: 78,
    description: 'Ergonomic wireless mouse designed for comfort during long work sessions. Silent clicking and precise tracking on any surface.',
    features: [
      'Ergonomic design reduces wrist strain',
      'Silent click technology',
      '2.4GHz wireless connection',
      'Adjustable DPI (800-2400)',
      '18-month battery life',
      'Compatible with Windows & Mac'
    ],
    specs: {
      'Brand': 'ErgoTech',
      'DPI': '800 / 1200 / 1600 / 2400',
      'Buttons': '6 programmable',
      'Battery': '1x AA (included)',
      'Weight': '95g',
      'Color': 'Matte Black'
    }
  },
  '8': {
    id: '8',
    name: 'Phone Stand',
    category: 'Accessories',
    price: 24.99,
    rating: 3,
    ratingCount: 45,
    description: 'Adjustable aluminum phone stand with sturdy construction. Perfect for video calls, watching content, or as a charging station.',
    features: [
      'Adjustable viewing angle',
      'Aluminum alloy construction',
      'Non-slip silicone pads',
      'Fits phones 4" to 8"',
      'Cable management slot',
      'Portable and foldable'
    ],
    specs: {
      'Brand': 'StandPro',
      'Material': 'Aluminum Alloy',
      'Compatibility': '4" - 8" devices',
      'Weight': '180g',
      'Color': 'Silver',
      'Dimensions': '4.7" x 3.5" x 0.5"'
    }
  },
  '9': {
    id: '9',
    name: 'LED Desk Lamp',
    category: 'Office',
    price: 44.99,
    rating: 5,
    ratingCount: 134,
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. Eye-care technology reduces strain during long work hours.',
    features: [
      'Adjustable brightness (5 levels)',
      'Color temperature control',
      'Touch-sensitive controls',
      'USB charging port',
      'Memory function',
      'Flicker-free LED technology'
    ],
    specs: {
      'Brand': 'LightWork',
      'Power': '12W LED',
      'Color Temp': '3000K - 6000K',
      'Brightness': 'Up to 800 lumens',
      'Arm Rotation': '180°',
      'Material': 'ABS + Aluminum'
    }
  }
};

// ===== DOM ELEMENTS =====
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartShippingElement = document.getElementById('cart-shipping');
const cartTotalElement = document.getElementById('cart-total');
const emptyCartElement = document.getElementById('empty-cart');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('search-input');
const categoryTabs = document.querySelectorAll('.category-tab');
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');
const closeFilter = document.getElementById('close-filter');
const sortSelect = document.getElementById('sort-select');
const resultsCount = document.getElementById('results-count');
const productsGrid = document.getElementById('products-grid');
const noResults = document.getElementById('no-results');
const resetSearchBtn = document.getElementById('reset-search');
const priceMinSlider = document.getElementById('price-min');
const priceMaxSlider = document.getElementById('price-max');
const priceMinLabel = document.getElementById('price-min-label');
const priceMaxLabel = document.getElementById('price-max-label');
const resetFiltersBtn = document.getElementById('reset-filters');
const applyFiltersBtn = document.getElementById('apply-filters');

// Floating Menu Elements
const floatingMenuBtn = document.getElementById('floating-menu-btn');
const floatingMenu = document.getElementById('floating-menu');
const closeFloatingMenu = document.getElementById('close-floating-menu');
const floatingMenuOverlay = document.getElementById('floating-menu-overlay');
const floatingMenuItems = document.querySelectorAll('.floating-menu-item');

// Product Detail Modal Elements
const productDetailModal = document.getElementById('product-detail-modal');
const closeProductDetail = document.getElementById('close-product-detail');
const detailMainImage = document.getElementById('detail-main-image');
const detailCategory = document.getElementById('detail-category');
const detailName = document.getElementById('detail-name');
const detailRating = document.getElementById('detail-rating');
const detailPrice = document.getElementById('detail-price');
const detailDescription = document.getElementById('detail-description');
const detailFeatures = document.getElementById('detail-features');
const detailSpecs = document.getElementById('detail-specs');
const detailQtyInput = document.getElementById('detail-qty-input');
const detailQtyDecrease = document.getElementById('detail-qty-decrease');
const detailQtyIncrease = document.getElementById('detail-qty-increase');
const detailAddToCart = document.getElementById('detail-add-to-cart');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeCart();
  initializeMobileMenu();
  initializeContactForm();
  initializeSearch();
  initializeCategories();
  initializeFilters();
  initializeSort();
  initializeFloatingMenu();
  initializeProductDetail();
  updateCartDisplay();
  filterAndSortProducts();
  preventMobileScrolling();
});

// ===== FLOATING MENU =====
function initializeFloatingMenu() {
  // Open floating menu
  floatingMenuBtn.addEventListener('click', () => {
    floatingMenu.classList.add('active');
    floatingMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close floating menu
  closeFloatingMenu.addEventListener('click', closeFloatingMenuPanel);
  floatingMenuOverlay.addEventListener('click', closeFloatingMenuPanel);

  // Handle floating menu actions
  floatingMenuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const action = item.dataset.action;
      handleFloatingMenuAction(action);
      closeFloatingMenuPanel();
    });
  });
}

function closeFloatingMenuPanel() {
  floatingMenu.classList.remove('active');
  floatingMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function handleFloatingMenuAction(action) {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  switch (action) {
    case 'products':
      switchSection('products', navLinks, sections);
      showToast('Navigated to Products');
      break;

    case 'filter':
      // Go to products section and open filter panel
      switchSection('products', navLinks, sections);
      setTimeout(() => {
        filterPanel.classList.add('active');
        createFilterOverlay();
      }, 300);
      showToast('Filter panel opened');
      break;

    case 'support':
      switchSection('contact', navLinks, sections);
      showToast('Navigated to Support');
      break;

    case 'signin':
      if (!isSignedIn) {
        handleSignIn();
      } else {
        showToast('You are already signed in!');
      }
      break;

    case 'signout':
      if (isSignedIn) {
        handleSignOut();
      } else {
        showToast('You are not signed in!');
      }
      break;
  }
}

function handleSignIn() {
  // Simulate sign in
  isSignedIn = true;
  updateUserStatus('John Doe', 'john.doe@email.com');
  showToast('Successfully signed in!');
}

function handleSignOut() {
  // Simulate sign out
  isSignedIn = false;
  updateUserStatus('Guest User', 'Not signed in');
  showToast('Successfully signed out!');
}

function updateUserStatus(name, email) {
  const userName = document.querySelector('.user-name');
  const userEmail = document.querySelector('.user-email');
  if (userName) userName.textContent = name;
  if (userEmail) userEmail.textContent = email;
}

// ===== NAVIGATION =====
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const cartBtn = document.querySelector('.cart-btn');
  const sections = document.querySelectorAll('.content-section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      switchSection(sectionId, navLinks, sections);
      
      if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  });

  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection('cart', navLinks, sections);
    
    if (window.innerWidth <= 768) {
      nav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
  });

  const heroBtn = document.querySelector('.hero-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchSection('products', navLinks, sections);
    });
  }

  const shopNowLink = document.querySelector('.shop-now-link');
  if (shopNowLink) {
    shopNowLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchSection('products', navLinks, sections);
    });
  }
}

function switchSection(sectionId, navLinks, sections) {
  sections.forEach(section => {
    section.classList.remove('active');
    if (section.id === sectionId) {
      section.classList.add('active');
      // Scroll to top of section smoothly
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === sectionId) {
      link.classList.add('active');
    }
  });

  if (sectionId === 'cart') {
    updateCartDisplay();
  }
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// ===== PREVENT MOBILE HORIZONTAL SCROLLING =====
function preventMobileScrolling() {
  // Prevent horizontal scroll on touch devices
  let startX;
  let scrollLeft;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = window.pageXOffset;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!startX) return;
    
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    
    // Prevent horizontal scroll
    if (Math.abs(walk) > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  // Ensure viewport is locked
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  }
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
  searchInput.addEventListener('input', debounce((e) => {
    currentSearchQuery = e.target.value.toLowerCase();
    filterAndSortProducts();
  }, 300));

  resetSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearchQuery = '';
    currentCategory = 'all';
    resetFiltersToDefault();
    
    categoryTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.category === 'all') {
        tab.classList.add('active');
      }
    });
    
    filterAndSortProducts();
  });
}

// ===== CATEGORY FUNCTIONALITY =====
function initializeCategories() {
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      filterAndSortProducts();
    });
  });
}

// ===== FILTER FUNCTIONALITY =====
function initializeFilters() {
  // Filter panel toggle
  filterToggle.addEventListener('click', () => {
    filterPanel.classList.add('active');
    createFilterOverlay();
  });

  closeFilter.addEventListener('click', () => {
    filterPanel.classList.remove('active');
    removeFilterOverlay();
  });

  // Price sliders
  priceMinSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value <= parseInt(priceMaxSlider.value)) {
      priceMinLabel.textContent = value;
      currentFilters.priceMin = value;
    }
  });

  priceMaxSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value >= parseInt(priceMinSlider.value)) {
      priceMaxLabel.textContent = value;
      currentFilters.priceMax = value;
    }
  });

  // Apply filters button
  applyFiltersBtn.addEventListener('click', () => {
    currentFilters.inStock = document.getElementById('filter-in-stock').checked;
    
    const ratingFilters = document.querySelectorAll('.rating-filter:checked');
    currentFilters.rating = ratingFilters.length > 0 
      ? Math.max(...Array.from(ratingFilters).map(f => parseInt(f.value)))
      : null;
    
    filterAndSortProducts();
    filterPanel.classList.remove('active');
    removeFilterOverlay();
    showToast('Filters applied!');
  });

  // Reset filters button
  resetFiltersBtn.addEventListener('click', () => {
    resetFiltersToDefault();
    filterAndSortProducts();
    showToast('Filters reset!');
  });
}

function resetFiltersToDefault() {
  currentFilters = {
    priceMin: 0,
    priceMax: 200,
    inStock: true,
    rating: null
  };
  
  priceMinSlider.value = 0;
  priceMaxSlider.value = 200;
  priceMinLabel.textContent = 0;
  priceMaxLabel.textContent = 200;
  
  document.getElementById('filter-in-stock').checked = true;
  document.querySelectorAll('.rating-filter').forEach(f => f.checked = false);
}

function createFilterOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'filter-overlay active';
  overlay.addEventListener('click', () => {
    filterPanel.classList.remove('active');
    removeFilterOverlay();
  });
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

function removeFilterOverlay() {
  const overlay = document.querySelector('.filter-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
  document.body.style.overflow = '';
}

// ===== SORT FUNCTIONALITY =====
function initializeSort() {
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    filterAndSortProducts();
  });
}

// ===== FILTER AND SORT PRODUCTS =====
function filterAndSortProducts() {
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  let visibleProducts = [];

  productCards.forEach(card => {
    const name = card.dataset.productName.toLowerCase();
    const price = parseFloat(card.dataset.productPrice);
    const category = card.dataset.category;
    const rating = parseInt(card.dataset.rating);

    // Apply filters
    const matchesSearch = !currentSearchQuery || name.includes(currentSearchQuery);
    const matchesCategory = currentCategory === 'all' || category === currentCategory;
    const matchesPrice = price >= currentFilters.priceMin && price <= currentFilters.priceMax;
    const matchesRating = !currentFilters.rating || rating >= currentFilters.rating;

    if (matchesSearch && matchesCategory && matchesPrice && matchesRating) {
      card.classList.remove('hidden');
      visibleProducts.push(card);
    } else {
      card.classList.add('hidden');
    }
  });

  // Apply sorting
  if (currentSort !== 'default') {
    visibleProducts.sort((a, b) => {
      const priceA = parseFloat(a.dataset.productPrice);
      const priceB = parseFloat(b.dataset.productPrice);
      const nameA = a.dataset.productName;
      const nameB = b.dataset.productName;

      switch (currentSort) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'name-asc':
          return nameA.localeCompare(nameB);
        case 'name-desc':
          return nameB.localeCompare(nameA);
        default:
          return 0;
      }
    });

    // Reorder products in grid
    visibleProducts.forEach(card => {
      productsGrid.appendChild(card);
    });
  }

  // Update results count
  updateResultsCount(visibleProducts.length);

  // Show/hide no results message
  if (visibleProducts.length === 0) {
    noResults.classList.add('active');
  } else {
    noResults.classList.remove('active');
  }
}

function updateResultsCount(count) {
  if (count === 0) {
    resultsCount.textContent = 'No products found';
  } else if (count === 1) {
    resultsCount.textContent = 'Showing 1 product';
  } else {
    resultsCount.textContent = `Showing ${count} products`;
  }
}

// ===== CART FUNCTIONALITY =====
function initializeCart() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const productId = productCard.dataset.productId;
      const productName = productCard.dataset.productName;
      const productPrice = parseFloat(productCard.dataset.productPrice);
      const productImage = productCard.querySelector('img').src;

      addToCart(productId, productName, productPrice, productImage);
    });
  });

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        showToast('Cart cleared successfully!');
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
      }
      
      const total = calculateTotal();
      showToast(`Checkout successful! Total: $${total.toFixed(2)}`);
      
      setTimeout(() => {
        cart = [];
        saveCart();
        updateCartDisplay();
      }, 2000);
    });
  }
}

function addToCart(id, name, price, image) {
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      quantity: 1
    });
  }

  saveCart();
  updateCartDisplay();
  showToast(`${name} added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartDisplay();
  showToast('Item removed from cart');
}

function updateQuantity(id, change) {
  const item = cart.find(item => item.id === id);
  
  if (item) {
    item.quantity += change;
    
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
      updateCartDisplay();
    }
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsElement.innerHTML = '';
    if (emptyCartElement) {
      emptyCartElement.style.display = 'block';
    }
    document.querySelector('.cart-summary').style.display = 'none';
  } else {
    if (emptyCartElement) {
      emptyCartElement.style.display = 'none';
    }
    document.querySelector('.cart-summary').style.display = 'block';
    renderCartItems();
    updateCartSummary();
  }
}

function renderCartItems() {
  cartItemsElement.innerHTML = cart.map(item => `
    <div class="cart-item" data-item-id="${item.id}">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">-</button>
        <span class="cart-item-quantity">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
        <button class="remove-item" onclick="removeFromCart('${item.id}')" aria-label="Remove item">Remove</button>
      </div>
    </div>
  `).join('');
}

function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateTotal() {
  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 10 : 0;
  return subtotal + shipping;
}

function updateCartSummary() {
  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const total = calculateTotal();

  if (cartSubtotalElement) {
    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
  
  if (cartShippingElement) {
    cartShippingElement.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE';
  }
  
  if (cartTotalElement) {
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ===== CONTACT FORM =====
function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully! We\'ll get back to you soon.');
      contactForm.reset();
    });
  }
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== HANDLE WINDOW RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768) {
      nav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }, 250);
});

// ===== ACCESSIBILITY: ESC KEY TO CLOSE PANELS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (filterPanel.classList.contains('active')) {
      filterPanel.classList.remove('active');
      removeFilterOverlay();
    }
    if (floatingMenu.classList.contains('active')) {
      closeFloatingMenuPanel();
    }
  }
});

// ===== PERFORMANCE: DEBOUNCE FUNCTION =====
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

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// ===== PRODUCT DETAIL MODAL =====
function initializeProductDetail() {
  // Add click listeners to product clickable areas
  const clickableAreas = document.querySelectorAll('.product-clickable-area');
  clickableAreas.forEach(area => {
    area.addEventListener('click', (e) => {
      const productId = area.dataset.productId;
      openProductDetail(productId);
    });
  });

  // Close modal listeners
  closeProductDetail.addEventListener('click', closeProductDetailModal);
  
  productDetailModal.addEventListener('click', (e) => {
    if (e.target === productDetailModal || e.target.classList.contains('product-detail-overlay')) {
      closeProductDetailModal();
    }
  });

  // Quantity controls
  detailQtyDecrease.addEventListener('click', () => {
    const currentQty = parseInt(detailQtyInput.value);
    if (currentQty > 1) {
      detailQtyInput.value = currentQty - 1;
    }
  });

  detailQtyIncrease.addEventListener('click', () => {
    const currentQty = parseInt(detailQtyInput.value);
    if (currentQty < 10) {
      detailQtyInput.value = currentQty + 1;
    }
  });

  // Add to cart from detail
  detailAddToCart.addEventListener('click', () => {
    if (currentProduct) {
      const quantity = parseInt(detailQtyInput.value);
      for (let i = 0; i < quantity; i++) {
        addToCart(
          currentProduct.id,
          currentProduct.name,
          currentProduct.price,
          `Images/product${currentProduct.id}.jpg`
        );
      }
      closeProductDetailModal();
      showToast(`${quantity}x ${currentProduct.name} added to cart!`);
    }
  });

  // Thumbnail image switching
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('thumbnail')) {
      document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      detailMainImage.src = e.target.src;
    }
  });
}

function openProductDetail(productId) {
  const product = productsDatabase[productId];
  if (!product) return;

  currentProduct = product;
  
  // Populate modal with product data
  detailMainImage.src = `Images/product${productId}.jpg`;
  detailMainImage.alt = product.name;
  
  // Set thumbnail images (using same image for demo)
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb, index) => {
    thumb.src = `Images/product${productId}.jpg`;
    thumb.classList.toggle('active', index === 0);
  });
  
  detailCategory.textContent = product.category;
  detailName.textContent = product.name;
  
  // Rating
  const stars = '⭐'.repeat(product.rating);
  detailRating.querySelector('.stars').textContent = stars;
  detailRating.querySelector('.rating-count').textContent = `(${product.ratingCount} reviews)`;
  
  detailPrice.textContent = `$${product.price.toFixed(2)}`;
  detailDescription.textContent = product.description;
  
  // Features
  detailFeatures.innerHTML = product.features
    .map(feature => `<li>${feature}</li>`)
    .join('');
  
  // Specifications
  detailSpecs.innerHTML = Object.entries(product.specs)
    .map(([label, value]) => `
      <div class="spec-item">
        <div class="spec-label">${label}</div>
        <div class="spec-value">${value}</div>
      </div>
    `).join('');
  
  // Reset quantity
  detailQtyInput.value = 1;
  
  // Show modal
  productDetailModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductDetailModal() {
  productDetailModal.classList.remove('active');
  document.body.style.overflow = '';
  currentProduct = null;
}

// Close detail modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (filterPanel.classList.contains('active')) {
      filterPanel.classList.remove('active');
      removeFilterOverlay();
    }
    if (floatingMenu.classList.contains('active')) {
      closeFloatingMenuPanel();
    }
    if (productDetailModal.classList.contains('active')) {
      closeProductDetailModal();
    }
  }
});

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
  updateCartDisplay();
  filterAndSortProducts();
});

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
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    mobileMenuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
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
}

function removeFilterOverlay() {
  const overlay = document.querySelector('.filter-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
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

// ===== SCROLL TO TOP ON PAGE LOAD =====
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// ===== HANDLE WINDOW RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768) {
      nav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
  }, 250);
});

// ===== ACCESSIBILITY: ESC KEY TO CLOSE PANELS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
    if (filterPanel.classList.contains('active')) {
      filterPanel.classList.remove('active');
      removeFilterOverlay();
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

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Floating Action Button with more animations
const fabMain = document.getElementById('fabMain');
const fabOptions = document.getElementById('fabOptions');
let fabOpen = false;

fabMain.addEventListener('click', () => {
    fabOpen = !fabOpen;
    
    if (fabOpen) {
        fabOptions.classList.add('active');
        fabMain.style.transform = 'scale(1.15) rotate(135deg)';
        fabMain.innerHTML = '<i class="fas fa-times"></i>';
        
        // Animate each option with stagger
        const options = document.querySelectorAll('.fab-option');
        options.forEach((option, index) => {
            setTimeout(() => {
                option.style.transform = 'scale(1) translateY(0)';
                option.style.opacity = '1';
            }, index * 100);
        });
    } else {
        fabOptions.classList.remove('active');
        fabMain.style.transform = 'scale(1) rotate(0deg)';
        fabMain.innerHTML = '<i class="fas fa-phone"></i>';
        
        // Reset options
        const options = document.querySelectorAll('.fab-option');
        options.forEach(option => {
            option.style.transform = 'scale(0.8) translateY(20px)';
            option.style.opacity = '0';
        });
    }
});

// Close FAB when clicking outside with animation
document.addEventListener('click', (e) => {
    if (!fabMain.contains(e.target) && !fabOptions.contains(e.target) && fabOpen) {
        fabOpen = false;
        fabOptions.classList.remove('active');
        fabMain.style.transform = 'scale(1) rotate(0deg)';
        fabMain.innerHTML = '<i class="fas fa-phone"></i>';
        
        const options = document.querySelectorAll('.fab-option');
        options.forEach(option => {
            option.style.transform = 'scale(0.8) translateY(20px)';
            option.style.opacity = '0';
        });
    }
});

// Initialize FAB options
document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.fab-option');
    options.forEach(option => {
        option.style.transform = 'scale(0.8) translateY(20px)';
        option.style.opacity = '0';
        option.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Enhanced form handling with bilingual support
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const service = document.getElementById('service').value;
    
    // Get current language
    const currentLang = i18n.getCurrentLanguage();
    
    // Validation messages
    const messages = {
        en: {
            fillFields: 'Please fill in all fields',
            invalidPhone: 'Please enter a valid 10-digit mobile number',
            success: 'Thank you! You will be redirected to WhatsApp to confirm your booking.'
        },
        hi: {
            fillFields: 'कृपया सभी फ़ील्ड भरें',
            invalidPhone: 'कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें',
            success: 'धन्यवाद! आपकी बुकिंग की पुष्टि के लिए आपको WhatsApp पर भेजा जाएगा।'
        }
    };
    
    // Basic validation
    if (!name || !phone || !address || !service) {
        alert(messages[currentLang].fillFields);
        return;
    }
    
    // Phone validation (Indian mobile number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert(messages[currentLang].invalidPhone);
        return;
    }
    
    // Service names in both languages
    const serviceNames = {
        'wash-fold': {
            en: 'Wash & Fold',
            hi: 'धुलाई और तह'
        },
        'dry-clean': {
            en: 'Dry Cleaning', 
            hi: 'ड्राई क्लीनिंग'
        },
        'ironing': {
            en: 'Ironing Only',
            hi: 'केवल इस्त्री'
        },
        'home-textiles': {
            en: 'Home Textiles',
            hi: 'घरेलू वस्त्र'
        }
    };
    
    // Create WhatsApp message in current language
    const serviceName = serviceNames[service][currentLang];
    
    const message = currentLang === 'hi' 
        ? `नमस्ते! मैं ${serviceName} के लिए पिकअप बुक करना चाहता/चाहती हूं।

नाम: ${name}
फोन: ${phone}
पता: ${address}
सेवा: ${serviceName}

कृपया पिकअप का समय बताएं। धन्यवाद!`
        : `Hi! I'd like to book a pickup for ${serviceName}.

Name: ${name}
Phone: ${phone}
Address: ${address}
Service: ${serviceName}

Please confirm the pickup time. Thank you!`;
    
    const whatsappUrl = `https://wa.me/918233853727?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert(messages[currentLang].success);
    
    // Reset form
    this.reset();
});

// Enhanced animations with more attractive effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Add special effects for different elements
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.animation = 'slideInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            } else if (entry.target.classList.contains('pricing-card')) {
                entry.target.style.animation = 'zoomIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            } else if (entry.target.classList.contains('step')) {
                entry.target.style.animation = 'slideInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation with stagger effect
document.querySelectorAll('.service-card, .step, .pricing-card, .stat, .feature-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Enhanced counter animation with easing
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const startTime = performance.now();
        
        const easeOutQuart = (t) => 1 - (--t) * t * t * t;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            const current = Math.floor(easedProgress * target);
            counter.textContent = current + (counter.textContent.includes('%') ? '%' : '+');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
                // Add a celebration effect
                counter.style.animation = 'pulse 0.5s ease-in-out';
            }
        };
        
        // Stagger the counter animations
        setTimeout(() => {
            requestAnimationFrame(updateCounter);
        }, index * 200);
    });
};

// Add particle effect on hover for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        createParticles(e.target);
    });
});

function createParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-50px) scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }).onfinish = () => particle.remove();
    }
}

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    sectionObserver.observe(section);
});

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Enhanced header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        header.style.borderBottom = '1px solid rgba(102, 126, 234, 0.3)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        header.style.borderBottom = '1px solid rgba(102, 126, 234, 0.2)';
    }
});

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('featured')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('popular')) {
            card.style.transform = 'scale(1.05) translateY(-10px)';
        } else {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('popular')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0)';
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Close FAB
        fabOptions.classList.remove('active');
        fabMain.style.transform = 'rotate(0deg)';
    }
});

// Focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll(focusableElements));
        const index = focusable.indexOf(document.activeElement);
        
        if (e.shiftKey) {
            const prevIndex = index > 0 ? index - 1 : focusable.length - 1;
            focusable[prevIndex].focus();
        } else {
            const nextIndex = index < focusable.length - 1 ? index + 1 : 0;
            focusable[nextIndex].focus();
        }
    }
});

console.log('GenZ Laundry website loaded successfully!');

// Price Calculator – category-wise data
const PRICE_CALCULATOR_DATA = {
    deliveryFee: 30,
    freeDeliveryThreshold: 300,
    categories: [
        {
            id: 'tops-basics',
            name: 'Tops & Basics',
            icon: '👕',
            items: [
                { id: 'tshirt', name: 'T-shirt', price: 20 },
                { id: 'shirt', name: 'Shirt', price: 20 },
                { id: 'kurti', name: 'Kurti', price: 20 },
                { id: 'underwear', name: 'Underwear', price: 20 },
                { id: 'banyan', name: 'Banyan', price: 20 }
            ]
        },
        {
            id: 'warm-wear',
            name: 'Warm Wear',
            icon: '🧥',
            items: [
                { id: 'sweater', name: 'Sweater', price: 50 },
                { id: 'hoodie', name: 'Hoodie', price: 50 },
                { id: 'sweatshirt', name: 'Sweatshirt', price: 50 }
            ]
        },
        {
            id: 'bottoms',
            name: 'Bottoms',
            icon: '👖',
            items: [
                { id: 'jeans', name: 'Jeans', price: 20 },
                { id: 'pant_trouser', name: 'Pant / Trouser', price: 20 },
                { id: 'track_pant', name: 'Track Pant', price: 20 },
                { id: 'joggers', name: 'Joggers', price: 20 },
                { id: 'leggings', name: 'Leggings', price: 20 },
                { id: 'jeggings', name: 'Jeggings', price: 20 },
                { id: 'shorts', name: 'Shorts', price: 20 },
                { id: 'skirt', name: 'Skirt', price: 20 },
                { id: 'pyjama', name: 'Pyjama', price: 20 }
            ]
        },
        {
            id: 'ethnic',
            name: 'Ethnic',
            icon: '👘',
            items: [
                { id: 'salwar', name: 'Salwar', price: 50 },
                { id: 'dupatta', name: 'Dupatta', price: 20 }
            ]
        },
        {
            id: 'outerwear',
            name: 'Outerwear',
            icon: '🧥',
            items: [
                { id: 'jacket_light', name: 'Jacket (Light)', price: 50 },
                { id: 'jacket_heavy', name: 'Jacket (Heavy)', price: 80 },
                { id: 'coat_pant', name: 'Coat Pant', price: 400 },
                { id: 'shawl', name: 'Shawl', price: 100 }
            ]
        },
        {
            id: 'bedding-accessories',
            name: 'Bedding & Accessories',
            icon: '🛏️',
            items: [
                { id: 'sock', name: 'Sock', price: 15 },
                { id: 'blanket', name: 'Blanket', price: 200 },
                { id: 'blanket_double_bed', name: 'Blanket (Double Bed)', price: 300 }
            ]
        }
    ]
};

class PriceCalculator {
    constructor() {
        this.data = PRICE_CALCULATOR_DATA;
        this.prices = {};
        this.data.categories.forEach(cat => {
            cat.items.forEach(it => { this.prices[it.id] = it.price; });
        });
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.render();
            this.setupEventListeners();
            this.setupCategoryToggles();
            this.setupSearch();
            this.setupReset();
            this.setupCopy();
            this.updateTotal();
            this.updateItemCount();
        });
    }

    render() {
        const root = document.getElementById('calculator-root');
        if (!root) return;

        const formTitle = root.dataset.formTitle || 'Calculate Your Order Cost';
        const subtotalLabel = root.dataset.subtotal || 'Subtotal:';
        const totalLabel = root.dataset.total || 'Total:';
        const bookLabel = root.dataset.bookLabel || 'Book These Items';

        let html = `
            <h3 class="calculator-form-title">${formTitle}</h3>
            <div class="calc-toolbar">
                <div class="calc-search-wrap">
                    <i class="fas fa-search"></i>
                    <input type="text" class="calc-search" id="calc-search" placeholder="Search items..." aria-label="Search items">
                </div>
                <div class="calc-actions">
                    <button type="button" class="calc-btn-aux" id="calc-reset" title="Clear all">
                        <i class="fas fa-undo-alt"></i> Reset
                    </button>
                    <span class="calc-item-count" id="calc-item-count" title="Total pieces">0</span>
                </div>
            </div>
            <div class="calc-category-tabs" role="tablist">
                ${this.data.categories.map((cat, i) => `
                    <button type="button" class="calc-tab ${i === 0 ? 'active' : ''}" data-category="${cat.id}" role="tab" aria-selected="${i === 0}">
                        <span class="calc-tab-icon">${cat.icon}</span>
                        <span class="calc-tab-name">${cat.name}</span>
                    </button>
                `).join('')}
            </div>
            <div class="calc-panels">
                ${this.data.categories.map((cat, i) => `
                    <div class="calc-panel ${i === 0 ? 'active' : ''}" id="panel-${cat.id}" role="tabpanel" ${i !== 0 ? 'hidden' : ''}>
                        <div class="calc-panel-header">
                            <span class="calc-panel-icon">${cat.icon}</span>
                            <h4 class="calc-panel-title">${cat.name}</h4>
                        </div>
                        <div class="calc-grid">
                            ${cat.items.map(it => `
                                <div class="calc-item" data-item="${it.id}" data-item-name="${(it.name || '').toLowerCase()}">
                                    <label for="qty-${it.id}">${it.name}</label>
                                    <div class="quantity-control">
                                        <button type="button" class="qty-btn" data-action="decrease" data-item="${it.id}" aria-label="Decrease ${it.name}">−</button>
                                        <input type="number" id="qty-${it.id}" value="0" min="0" readonly aria-label="Quantity ${it.name}">
                                        <button type="button" class="qty-btn" data-action="increase" data-item="${it.id}" aria-label="Increase ${it.name}">+</button>
                                    </div>
                                    <span class="item-price">₹${it.price} <small>each</small></span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="calc-total">
                <div class="total-breakdown">
                    <div class="subtotal"><span>${subtotalLabel}</span><span id="subtotal">₹0</span></div>
                    <div class="total"><span>${totalLabel}</span><span id="total-amount">₹0</span></div>
                </div>
                <div class="calc-copy-wrap">
                    <button type="button" class="calc-btn-copy" id="calc-copy" title="Copy estimate to clipboard">
                        <i class="fas fa-copy"></i> Copy estimate
                    </button>
                </div>
                <button type="button" class="btn btn-primary btn-full btn-book-calc" id="btn-book-calc">
                    <i class="fas fa-calendar-check"></i>
                    <span>${bookLabel}</span>
                </button>
            </div>
            <div class="calc-toast" id="calc-toast" aria-live="polite">✓ Copied to clipboard!</div>
        `;
        root.innerHTML = html;
    }

    setupCategoryToggles() {
        const tabs = document.querySelectorAll('.calc-tab');
        const panels = document.querySelectorAll('.calc-panel');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const id = tab.dataset.category;
                tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
                panels.forEach(p => {
                    const on = p.id === `panel-${id}`;
                    p.classList.toggle('active', on);
                    p.hidden = !on;
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            });
        });
    }

    setupSearch() {
        const search = document.getElementById('calc-search');
        if (!search) return;
        search.addEventListener('input', () => {
            const q = (search.value || '').trim().toLowerCase();
            document.querySelectorAll('.calc-item').forEach(el => {
                const name = (el.dataset.itemName || '').toLowerCase();
                const match = !q || name.includes(q);
                el.style.display = match ? '' : 'none';
            });
        });
    }

    setupReset() {
        const btn = document.getElementById('calc-reset');
        if (!btn) return;
        btn.addEventListener('click', () => {
            Object.keys(this.prices).forEach(id => {
                const input = document.getElementById(`qty-${id}`);
                if (input) input.value = '0';
            });
            this.updateTotal();
            this.updateItemCount();
            const search = document.getElementById('calc-search');
            if (search) { search.value = ''; search.dispatchEvent(new Event('input')); }
        });
    }

    setupCopy() {
        const btn = document.getElementById('calc-copy');
        const toast = document.getElementById('calc-toast');
        if (!btn || !toast) return;
        btn.addEventListener('click', () => {
            const items = this.getCalculatedItems();
            const sub = document.getElementById('subtotal')?.textContent || '₹0';
            const tot = document.getElementById('total-amount')?.textContent || '₹0';
            const lines = ['GenZ Laundry – Price estimate', ''];
            if (items.length) lines.push('Items:', ...items.map(i => '  • ' + i), '');
            lines.push('Total: ' + tot);
            const text = lines.join('\n');
            navigator.clipboard.writeText(text).then(() => {
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2000);
            }).catch(() => {});
        });
    }

    updateItemCount() {
        let n = 0;
        Object.keys(this.prices).forEach(id => {
            const input = document.getElementById(`qty-${id}`);
            n += parseInt(input?.value, 10) || 0;
        });
        const el = document.getElementById('calc-item-count');
        if (el) el.textContent = n;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.qty-btn');
            if (!btn) return;
            const action = btn.dataset.action;
            const itemId = btn.dataset.item;
            const input = document.getElementById(`qty-${itemId}`);
            if (!input) return;
            let value = parseInt(input.value, 10) || 0;
            if (action === 'increase') value++;
            else if (action === 'decrease' && value > 0) value--;
            input.value = value;
            this.updateTotal();
            this.updateItemCount();
            this.animateButton(btn);
        });

        const bookBtn = document.getElementById('btn-book-calc');
        if (bookBtn) bookBtn.addEventListener('click', () => window.bookWithCalculatedItems && window.bookWithCalculatedItems());
    }

    animateButton(el) {
        if (!el) return;
        el.style.transform = 'scale(0.9)';
        setTimeout(() => { el.style.transform = ''; }, 150);
    }

    updateTotal() {
        let subtotal = 0;
        Object.keys(this.prices).forEach(id => {
            const input = document.getElementById(`qty-${id}`);
            const qty = parseInt(input?.value, 10) || 0;
            subtotal += qty * this.prices[id];
        });
        const total = subtotal;

        const subEl = document.getElementById('subtotal');
        const totEl = document.getElementById('total-amount');
        if (subEl) subEl.textContent = `₹${subtotal}`;
        if (totEl) totEl.textContent = `₹${total}`;
    }

    getCalculatedItems() {
        const items = [];
        this.data.categories.forEach(cat => {
            cat.items.forEach(it => {
                const input = document.getElementById(`qty-${it.id}`);
                const qty = parseInt(input?.value, 10) || 0;
                if (qty > 0) items.push(`${qty} x ${it.name}`);
            });
        });
        return items;
    }
}

const calculator = new PriceCalculator();

window.bookWithCalculatedItems = function() {
    const items = calculator.getCalculatedItems();
    if (!items.length) {
        alert('Please select at least one item to book.');
        return;
    }
    const total = document.getElementById('total-amount')?.textContent || '₹0';
    const message = `Hi! I'd like to book a pickup with the following items:\n\n${items.join('\n')}\n\nEstimated Total: ${total}\n\nPlease confirm pickup time and final pricing. Thank you!`;
    window.open(`https://wa.me/918233853727?text=${encodeURIComponent(message)}`, '_blank');
};

// FAQ Functionality
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupFAQ();
        });
    }

    setupFAQ() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');

                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
}

// Initialize FAQ
new FAQManager();

// Live Chat Widget
class ChatWidget {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createChatWidget();
        });
    }

    createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-bubble" onclick="openWhatsAppChat()">
                <i class="fab fa-whatsapp"></i>
                <span>Need Help?</span>
            </div>
        `;
        document.body.appendChild(chatWidget);

        // Add animation
        setTimeout(() => {
            chatWidget.style.animation = 'slideInRight 0.5s ease-out';
        }, 2000);
    }
}

// Initialize Chat Widget
new ChatWidget();

// WhatsApp Chat Function
window.openWhatsAppChat = function() {
    const message = "Hi! I have a question about your laundry services. Can you help me?";
    const whatsappUrl = `https://wa.me/918233853727?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

// Enhanced Review Animation
class ReviewAnimator {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.animateReviews();
        });
    }

    animateReviews() {
        const reviewCards = document.querySelectorAll('.review-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 200);
                }
            });
        });

        reviewCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            observer.observe(card);
        });
    }
}

// Initialize Review Animator
new ReviewAnimator();

// Gallery Hover Effects
class GalleryManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupGalleryEffects();
        });
    }

    setupGalleryEffects() {
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createSparkles(card);
            });
        });
    }

    createSparkles(element) {
        for (let i = 0; i < 3; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.fontSize = '1rem';
            sparkle.style.zIndex = '1000';
            
            const rect = element.getBoundingClientRect();
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(sparkle);
            
            sparkle.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-30px) scale(0)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }).onfinish = () => sparkle.remove();
        }
    }
}

// Initialize Gallery Manager
new GalleryManager();

// Notification System
class NotificationManager {
    constructor() {
        this.init();
    }

    init() {
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            background: ${this.getColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.getElementById('notification-container').appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            this.remove(notification);
        }, duration);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.remove(notification);
        });
    }

    remove(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    getIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        return colors[type] || '#17a2b8';
    }
}

// Initialize Notification Manager
const notifications = new NotificationManager();

// Show welcome notification after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        notifications.show('Welcome to GenZ Laundry! 🧺', 'success', 4000);
    }, 2000);
});

console.log('🚀 All enhanced features loaded successfully!');

// Mobile-specific optimizations
class MobileOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.detectMobile();
        this.optimizeForMobile();
        this.handleOrientationChange();
        this.improveScrolling();
        this.optimizeTouch();
    }

    detectMobile() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.innerWidth <= 768;
        
        if (isMobile || isSmallScreen) {
            document.body.classList.add('mobile-device');
        }
    }

    optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Reduce animation complexity on mobile
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
            
            // Optimize images loading
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.loading = 'lazy';
            });
            
            // Optimize iframe loading
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                iframe.loading = 'lazy';
            });
        }
    }

    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Recalculate viewport height
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
                
                // Close mobile menu on orientation change
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 100);
        });
    }

    improveScrolling() {
        // Smooth scrolling for mobile
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    // Update header on scroll
                    const header = document.querySelector('.header');
                    if (header) {
                        if (window.scrollY > 50) {
                            header.classList.add('scrolled');
                        } else {
                            header.classList.remove('scrolled');
                        }
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }

    optimizeTouch() {
        // Improve touch responsiveness
        document.addEventListener('touchstart', () => {}, { passive: true });
        
        // Add touch feedback to buttons
        const touchElements = document.querySelectorAll('.btn, .service-card, .review-card, .gallery-card, .faq-question');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            }, { passive: true });
        });
    }
}

// Initialize mobile optimizer
new MobileOptimizer();

// Viewport height fix for mobile browsers
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Improve form experience on mobile
const optimizeForms = () => {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Prevent zoom on focus for iOS
        input.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            }
        });
        
        input.addEventListener('blur', () => {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }
            }
        });
    });
};

// Initialize form optimizations
document.addEventListener('DOMContentLoaded', optimizeForms);

// Performance monitoring for mobile
const monitorPerformance = () => {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime > 3000 && window.innerWidth <= 768) {
                console.log('Mobile performance could be improved. Load time:', loadTime + 'ms');
                
                // Show performance notification if needed
                if (loadTime > 5000) {
                    setTimeout(() => {
                        if (typeof notifications !== 'undefined') {
                            notifications.show('Slow connection detected. Some features may load gradually.', 'info', 5000);
                        }
                    }, 2000);
                }
            }
        });
    }
};

monitorPerformance();

// Enhanced accessibility for mobile
const improveAccessibility = () => {
    // Add skip link for mobile
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('tabindex', '-1');
    }
};

improveAccessibility();

console.log('🚀 Mobile optimizations loaded successfully!');
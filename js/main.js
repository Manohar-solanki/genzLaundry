// ============================================
// GenZ Laundry — Clean Professional JavaScript
// ============================================

// --- Mobile Navigation ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: target.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// --- Active Nav Highlighting ---
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// --- Header Scroll Effect ---
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    header.classList.toggle('scrolled', scrolled);

    if (window.scrollY > lastScroll && window.scrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = window.scrollY;
});

// --- Floating Action Button ---
const fabMain = document.getElementById('fabMain');
const fabOptions = document.getElementById('fabOptions');
let fabOpen = false;

fabMain.addEventListener('click', () => {
    fabOpen = !fabOpen;
    fabOptions.classList.toggle('active', fabOpen);
    fabMain.style.transform = fabOpen ? 'rotate(135deg)' : 'rotate(0deg)';
    fabMain.innerHTML = fabOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-phone"></i>';
});

document.addEventListener('click', (e) => {
    if (!fabMain.contains(e.target) && !fabOptions.contains(e.target) && fabOpen) {
        fabOpen = false;
        fabOptions.classList.remove('active');
        fabMain.style.transform = 'rotate(0deg)';
        fabMain.innerHTML = '<i class="fas fa-phone"></i>';
    }
});

// --- Scroll Reveal (IntersectionObserver) ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

// --- Counter Animation ---
const animateCounters = () => {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const text = counter.textContent;
        const hasDecimal = text.includes('.');
        const target = hasDecimal ? parseFloat(text) : parseInt(text);
        const suffix = text.includes('%') ? '%' : (text.includes('+') ? '+' : '');
        const duration = 2000;
        const startTime = performance.now();

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = hasDecimal ? (eased * target).toFixed(1) : Math.floor(eased * target);
            counter.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target + suffix;
        };
        requestAnimationFrame(update);
    });
};

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObs.unobserve(entry.target);
            }
        });
    });
    statsObs.observe(statsSection);
}

// --- Form Handling ---
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const service = document.getElementById('service').value;

    const currentLang = typeof i18n !== 'undefined' ? i18n.getCurrentLanguage() : 'en';

    if (!name || !phone || !address || !service) {
        alert(currentLang === 'hi' ? 'कृपया सभी फ़ील्ड भरें' : 'Please fill in all fields');
        return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert(currentLang === 'hi' ? 'कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
        return;
    }

    const serviceNames = {
        'wash-fold': { en: 'Wash & Fold', hi: 'धुलाई और तह' },
        'dry-clean': { en: 'Dry Cleaning', hi: 'ड्राई क्लीनिंग' },
        'ironing': { en: 'Ironing Only', hi: 'केवल इस्त्री' },
        'home-textiles': { en: 'Home Textiles', hi: 'घरेलू वस्त्र' }
    };

    const serviceName = serviceNames[service][currentLang];
    const message = currentLang === 'hi'
        ? `नमस्ते! मैं ${serviceName} के लिए पिकअप बुक करना चाहता/चाहती हूं।\n\nनाम: ${name}\nफोन: ${phone}\nपता: ${address}\nसेवा: ${serviceName}\n\nकृपया पिकअप का समय बताएं। धन्यवाद!`
        : `Hi! I'd like to book a pickup for ${serviceName}.\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nService: ${serviceName}\n\nPlease confirm the pickup time. Thank you!`;

    const whatsappUrl = `https://wa.me/918233853727?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => this.reset(), 1000);
});

// --- Keyboard Accessibility ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
        fabOptions.classList.remove('active');
        fabMain.style.transform = 'rotate(0deg)';
    }
});

// ============================================
// Price Calculator
// ============================================
const PRICE_CALCULATOR_DATA = {
    deliveryFee: 30,
    freeDeliveryThreshold: 300,
    categories: [
        {
            id: 'tops-basics', name: 'Tops & Basics', icon: '👕',
            items: [
                { id: 'tshirt', name: 'T-shirt', price: 20 },
                { id: 'shirt', name: 'Shirt', price: 20 },
                { id: 'kurti', name: 'Kurti', price: 20 },
                { id: 'underwear', name: 'Underwear', price: 20 },
                { id: 'banyan', name: 'Banyan', price: 20 }
            ]
        },
        {
            id: 'warm-wear', name: 'Warm Wear', icon: '🧥',
            items: [
                { id: 'sweater', name: 'Sweater', price: 50 },
                { id: 'hoodie', name: 'Hoodie', price: 50 },
                { id: 'sweatshirt', name: 'Sweatshirt', price: 50 }
            ]
        },
        {
            id: 'bottoms', name: 'Bottoms', icon: '👖',
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
            id: 'ethnic', name: 'Ethnic', icon: '👘',
            items: [
                { id: 'salwar', name: 'Salwar', price: 50 },
                { id: 'dupatta', name: 'Dupatta', price: 20 }
            ]
        },
        {
            id: 'outerwear', name: 'Outerwear', icon: '🧥',
            items: [
                { id: 'jacket_light', name: 'Jacket (Light)', price: 50 },
                { id: 'jacket_heavy', name: 'Jacket (Heavy)', price: 80 },
                { id: 'coat_pant', name: 'Coat Pant', price: 400 },
                { id: 'shawl', name: 'Shawl', price: 100 }
            ]
        },
        {
            id: 'bedding-accessories', name: 'Bedding & Accessories', icon: '🛏️',
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

        root.innerHTML = `
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
                el.style.display = !q || (el.dataset.itemName || '').includes(q) ? '' : 'none';
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
            const tot = document.getElementById('total-amount')?.textContent || '₹0';
            const lines = ['GenZ Laundry – Price estimate', ''];
            if (items.length) lines.push('Items:', ...items.map(i => '  • ' + i), '');
            lines.push('Total: ' + tot);
            navigator.clipboard.writeText(lines.join('\n')).then(() => {
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2000);
            }).catch(() => {});
        });
    }

    updateItemCount() {
        let n = 0;
        Object.keys(this.prices).forEach(id => {
            n += parseInt(document.getElementById(`qty-${id}`)?.value, 10) || 0;
        });
        const el = document.getElementById('calc-item-count');
        if (el) el.textContent = n;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.qty-btn');
            if (!btn) return;
            const input = document.getElementById(`qty-${btn.dataset.item}`);
            if (!input) return;
            let value = parseInt(input.value, 10) || 0;
            if (btn.dataset.action === 'increase') value++;
            else if (btn.dataset.action === 'decrease' && value > 0) value--;
            input.value = value;
            this.updateTotal();
            this.updateItemCount();
        });

        const bookBtn = document.getElementById('btn-book-calc');
        if (bookBtn) bookBtn.addEventListener('click', () => window.bookWithCalculatedItems && window.bookWithCalculatedItems());
    }

    updateTotal() {
        let subtotal = 0;
        Object.keys(this.prices).forEach(id => {
            subtotal += (parseInt(document.getElementById(`qty-${id}`)?.value, 10) || 0) * this.prices[id];
        });
        const subEl = document.getElementById('subtotal');
        const totEl = document.getElementById('total-amount');
        if (subEl) subEl.textContent = `₹${subtotal}`;
        if (totEl) totEl.textContent = `₹${subtotal}`;
    }

    getCalculatedItems() {
        const items = [];
        this.data.categories.forEach(cat => {
            cat.items.forEach(it => {
                const qty = parseInt(document.getElementById(`qty-${it.id}`)?.value, 10) || 0;
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

// ============================================
// FAQ Accordion
// ============================================
class FAQManager {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => this.setup());
    }

    setup() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                const answer = faqItem.querySelector('.faq-answer');
                const icon = question.querySelector('i');

                // Close all other items
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                        const a = item.querySelector('.faq-answer');
                        if (a) a.style.maxHeight = '0';
                    }
                });

                // Toggle current
                if (!isActive) {
                    faqItem.classList.add('active');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    faqItem.classList.remove('active');
                    if (answer) answer.style.maxHeight = '0';
                }
            });
        });
    }
}

new FAQManager();

console.log('GenZ Laundry website loaded successfully.');
// ══════════════════════════════════════════════════════════
//   GEN-Z LAUNDRY — BLUE CITY THEME JS ENGINE
//   Sticky navbar, mobile drawer, reviews loader, FAQ, form,
//   and 10-Step Garment Care Video Showcase with HD Lightbox
// ══════════════════════════════════════════════════════════

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // ── 1. Announcement Bar Dismissal ──
    const annBar = document.getElementById('announcementBar');
    const annDismiss = document.getElementById('annDismiss');
    if (annBar && annDismiss) {
      if (localStorage.getItem('genz_ann_dismissed') === 'true') {
        annBar.style.display = 'none';
      } else {
        annDismiss.addEventListener('click', function () {
          annBar.style.display = 'none';
          localStorage.setItem('genz_ann_dismissed', 'true');
        });
      }
    }

    // ── 2. Sticky Header with Scroll Shadow ──
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', function () {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide mobile floating CTA button when at top hero to prevent overlapping review card
      if (window.innerWidth <= 768) {
        const floatWa = document.querySelector('.floating-wa');
        if (floatWa) {
          floatWa.classList.toggle('scrolled-visible', window.scrollY > 380);
        }
      }
    }, { passive: true });

    // ── 3. Mobile Hamburger Navigation ──
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const siteHeader = document.getElementById('siteHeader');
    if (hamburger && navMenu) {
      function closeMobileNav() {
        navMenu.classList.remove('active');
        if (siteHeader) siteHeader.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      }

      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isActive = navMenu.classList.toggle('active');
        if (siteHeader) siteHeader.classList.toggle('menu-open', isActive);
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        hamburger.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = isActive ? 'hidden' : '';
      });

      // Close when clicking nav links
      navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMobileNav);
      });

      // Close when pressing Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          closeMobileNav();
        }
      });
    }

    // ── 4. FAQ Accordion ──
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      const headerEl = item.querySelector('.faq-header') || item.querySelector('.faq-header-btn') || item.querySelector('.faq-question');
      if (headerEl) {
        headerEl.addEventListener('click', function () {
          const isOpen = item.classList.contains('active');
          // Close others
          faqItems.forEach(function (other) { other.classList.remove('active'); });
          if (!isOpen) item.classList.add('active');
        });
      }
    });

    // ── 5. Booking Form Submission to WhatsApp ──
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameEl = document.getElementById('bookingName') || document.getElementById('name');
        const phoneEl = document.getElementById('bookingPhone') || document.getElementById('phone');
        const addressEl = document.getElementById('bookingAddress') || document.getElementById('address');
        const serviceEl = document.getElementById('bookingService') || document.getElementById('service');
        const dateEl = document.getElementById('bookingDate');

        const name = nameEl ? nameEl.value.trim() : '';
        const phone = phoneEl ? phoneEl.value.trim() : '';
        const address = addressEl ? addressEl.value.trim() : '';
        const service = serviceEl ? serviceEl.value : '';
        const date = dateEl ? dateEl.value : '';

        // Validation
        if (!name) {
          alert('Please enter your full name.');
          if (nameEl) nameEl.focus();
          return;
        }
        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
          alert('Please enter a valid 10-digit Indian phone number.');
          if (phoneEl) phoneEl.focus();
          return;
        }
        if (!address) {
          alert('Please enter your hotel, hostel or doorstep pickup address in Jodhpur.');
          if (addressEl) addressEl.focus();
          return;
        }
        if (!service) {
          alert('Please select a service.');
          if (serviceEl) serviceEl.focus();
          return;
        }

        const serviceNames = {
          'wash-fold': 'Wash & Fold',
          'wash-iron': 'Wash & Iron',
          'dry-cleaning': 'Dry Cleaning',
          'express': 'Express 6-Hour Service',
          'shoe-cleaning': 'Shoe Cleaning',
          'sofa-cleaning': 'Sofa Cleaning',
          'steam-iron': 'Steam Ironing'
        };

        const serviceLabel = serviceNames[service] || service;

        let msg = `Hi Gen-Z Laundry Team! 👕✨\n\nI want to book a laundry pickup in Jodhpur:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Address: ${address}\n🧺 Service: ${serviceLabel}`;
        if (date) msg += `\n📅 Preferred Date/Time: ${date}`;
        msg += `\n\nPlease confirm my pickup. Thank you!`;

        const waUrl = `https://wa.me/918233853727?text=${encodeURIComponent(msg)}`;
        
        // Inline confirmation
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Opening WhatsApp...';
          submitBtn.style.background = '#15803D';
          setTimeout(function () {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            bookingForm.reset();
          }, 3000);
        }

        window.open(waUrl, '_blank');
      });
    }

    // ── 5b. Service Card & Hero Availability Bar Pre-Selection ──
    const svcButtons = document.querySelectorAll('.svc-card-btn-wa[data-service]');
    const serviceMap = {
      'Wash & Fold': 'wash-fold',
      'Wash & Steam Iron': 'wash-iron',
      'Delicate Dry Clean': 'dry-cleaning',
      '6-Hour Express': 'express',
      'Shoe Cleaning': 'shoe-cleaning',
      'Sofa Cleaning': 'sofa-cleaning'
    };

    svcButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const rawSvc = btn.getAttribute('data-service');
        const mappedVal = serviceMap[rawSvc] || '';
        const serviceSelect = document.getElementById('bookingService');
        if (serviceSelect && mappedVal) {
          serviceSelect.value = mappedVal;
        }
      });
    });

    const habBtn = document.getElementById('habCheckBtn');
    if (habBtn) {
      habBtn.addEventListener('click', function () {
        const locVal = (document.getElementById('habLocation') || {}).value || '';
        const habSvc = (document.getElementById('habService') || {}).value || '';
        const addressEl = document.getElementById('bookingAddress');
        const serviceSelect = document.getElementById('bookingService');
        if (locVal && addressEl && !addressEl.value) {
          addressEl.value = locVal;
        }
        if (habSvc && serviceSelect) {
          if (habSvc.includes('Fold')) serviceSelect.value = 'wash-fold';
          else if (habSvc.includes('Dry Clean')) serviceSelect.value = 'dry-cleaning';
          else if (habSvc.includes('Press') || habSvc.includes('Iron')) serviceSelect.value = 'wash-iron';
          else serviceSelect.value = 'wash-fold';
        }
      });
    }

    // ── 6. Load Reviews Dynamically from data/reviews.json ──
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (reviewsContainer) {
      fetch('data/reviews.json')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.reviews && data.reviews.length > 0) {
            reviewsContainer.innerHTML = data.reviews.map(function (rev) {
              return `
                <div class="review-card">
                  <div class="review-stars">★★★★★</div>
                  <p class="review-text">"${rev.text}"</p>
                  <div class="review-author">
                    <div class="review-avatar" style="background:${rev.avatarColor || '#2563EB'}">
                      ${rev.avatarText || rev.author.substring(0, 2).toUpperCase()}
                    </div>
                    <div class="review-meta">
                      <strong>${rev.author}</strong>
                      <span>${rev.source} · ✓ Verified Customer</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('');
          }
        })
        .catch(function (err) {
          console.log('Using static review fallback:', err);
        });
    }

    // ── 7. 10-Step Process Video Showcase & Fullscreen Lightbox Modal ──
    const processTrack = document.getElementById('processVideoTrack');
    const prevBtn = document.getElementById('processPrevBtn');
    const nextBtn = document.getElementById('processNextBtn');
    const videoCards = document.querySelectorAll('.video-step-card');
    const stepPills = document.querySelectorAll('.step-nav-pill');
    
    // Lightbox modal elements
    const modal = document.getElementById('videoLightboxModal');
    const modalBackdrop = document.getElementById('lightboxBackdrop');
    const modalCloseBtn = document.getElementById('lightboxCloseBtn');
    const modalPlayer = document.getElementById('lightboxVideoPlayer');
    const modalStepBadge = document.getElementById('lightboxStepBadge');
    const modalTitle = document.getElementById('lightboxTitle');
    const modalDesc = document.getElementById('lightboxDesc');
    const modalPrevBtn = document.getElementById('modalPrevStepBtn');
    const modalNextBtn = document.getElementById('modalNextStepBtn');
    const heroVideoBtn = document.getElementById('heroVideoActionBtn') || document.getElementById('heroVideoTeaserBtn');

    let currentStepIndex = 1;
    const totalSteps = videoCards.length || 10;

    function getCardData(stepNum) {
      const card = document.querySelector(`.video-step-card[data-step="${stepNum}"]`);
      if (!card) return null;
      return {
        step: stepNum,
        video: card.getAttribute('data-video'),
        title: card.getAttribute('data-title'),
        desc: card.getAttribute('data-desc')
      };
    }

    function openModalForStep(stepNum) {
      const data = getCardData(stepNum);
      if (!data || !modal || !modalPlayer) return;
      currentStepIndex = stepNum;
      
      modalStepBadge.textContent = `STEP ${String(stepNum).padStart(2, '0')} OF ${String(totalSteps).padStart(2, '0')}`;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      
      modalPlayer.pause();
      modalPlayer.innerHTML = `
        <source src="${data.video}" type="video/mp4">
        <source src="public/${data.video}" type="video/mp4">
      `;
      modalPlayer.load();
      modalPlayer.currentTime = 0;
      modalPlayer.muted = true;
      modalPlayer.volume = 0;
      
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      const playPromise = modalPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // Autoplay policy fallback with muted state
          modalPlayer.muted = true;
          modalPlayer.play();
        });
      }
    }

    function closeModal() {
      if (!modal || !modalPlayer) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      modalPlayer.pause();
      modalPlayer.muted = true;
      document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    if (modalPrevBtn) {
      modalPrevBtn.addEventListener('click', function () {
        const prev = currentStepIndex > 1 ? currentStepIndex - 1 : totalSteps;
        openModalForStep(prev);
      });
    }

    if (modalNextBtn) {
      modalNextBtn.addEventListener('click', function () {
        const next = currentStepIndex < totalSteps ? currentStepIndex + 1 : 1;
        openModalForStep(next);
      });
    }

    // Connect cards to modal
    videoCards.forEach(function (card) {
      card.addEventListener('click', function () {
        const step = parseInt(card.getAttribute('data-step'), 10);
        openModalForStep(step);
      });
    });

    // Hero Video Action Button click
    if (heroVideoBtn) {
      heroVideoBtn.addEventListener('click', function (e) {
        const target = document.getElementById('process');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          setTimeout(function () {
            openModalForStep(1);
          }, 600);
        }
      });
    }

    // Step Nav Pills smooth scroll
    stepPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const step = pill.getAttribute('data-step');
        const targetCard = document.querySelector(`.video-step-card[data-step="${step}"]`);
        if (targetCard && processTrack) {
          stepPills.forEach(function (p) { p.classList.remove('active'); p.setAttribute('aria-selected', 'false'); });
          pill.classList.add('active');
          pill.setAttribute('aria-selected', 'true');
          
          const cardOffset = targetCard.offsetLeft - processTrack.offsetLeft - 10;
          processTrack.scrollTo({ left: cardOffset, behavior: 'smooth' });
        }
      });
    });

    // Carousel arrows
    if (prevBtn && processTrack) {
      prevBtn.addEventListener('click', function () {
        processTrack.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }
    if (nextBtn && processTrack) {
      nextBtn.addEventListener('click', function () {
        processTrack.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }

    // Sync active step pill on horizontal track scroll & auto-preview videos
    if (processTrack && 'IntersectionObserver' in window) {
      const cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          const video = entry.target.querySelector('video');
          if (entry.isIntersecting) {
            // Autoplay card preview video muted
            if (video && video.paused) {
              const p = video.play();
              if (p !== undefined) p.catch(function () {});
            }
            // Update active pill
            const step = entry.target.getAttribute('data-step');
            const stepNav = document.getElementById('processStepNav');
            stepPills.forEach(function (pill) {
              if (pill.getAttribute('data-step') === step) {
                pill.classList.add('active');
                pill.setAttribute('aria-selected', 'true');
                if (stepNav) {
                  stepNav.scrollTo({ left: pill.offsetLeft - stepNav.offsetLeft - 16, behavior: 'smooth' });
                }
              } else {
                pill.classList.remove('active');
                pill.setAttribute('aria-selected', 'false');
              }
            });
          } else {
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
      }, {
        root: processTrack,
        threshold: 0.6
      });

      videoCards.forEach(function (card) {
        cardObserver.observe(card);
      });
    }

    // ── 8. Interactive Order Price Calculator ──
    const calcRoot = document.getElementById('calculator-root');
    if (calcRoot) {
      const CALC_DATA = {
        categories: [
          {
            id: 'tops-basics', name: 'Tops & Basics', icon: '👕',
            items: [
              { id: 'tshirt',        name: 'T-Shirt (Wash & Iron)',         price: 50 },
              { id: 'vest',          name: 'Vest / Banyan',                 price: 40 },
              { id: 'formal_shirt',  name: 'Formal Shirt (Wash & Iron)',    price: 50 },
              { id: 'casual_shirt',  name: 'Casual Shirt (Wash & Iron)',    price: 50 },
              { id: 'white_shirt',   name: 'White Shirt (Wash & Iron)',     price: 60 },
              { id: 'kurti',         name: 'Kurti (Wash & Iron)',           price: 60 },
              { id: 'womens_top',    name: "Women's Casual Top",            price: 50 },
              { id: 'undergarment',  name: 'Undergarment (Wash & Fold)',    price: 30 }
            ]
          },
          {
            id: 'bottoms', name: 'Bottoms & Pants', icon: '👖',
            items: [
              { id: 'jeans',        name: 'Jeans (Wash & Iron)',            price: 50 },
              { id: 'trousers',     name: 'Trousers (Wash & Iron)',         price: 50 },
              { id: 'chinos',       name: 'Chinos (Wash & Iron)',           price: 50 },
              { id: 'track_pants',  name: 'Track Pants (Wash & Iron)',      price: 60 },
              { id: 'joggers',      name: 'Joggers (Wash & Iron)',          price: 50 },
              { id: 'shorts',       name: 'Shorts (Wash & Iron)',           price: 40 },
              { id: 'pyjama',       name: 'Pyjama (Wash & Iron)',           price: 40 },
              { id: 'leggings',     name: 'Leggings (Wash & Iron)',         price: 50 }
            ]
          },
          {
            id: 'winter', name: 'Winter Wear', icon: '❄️',
            items: [
              { id: 'woolen_sweater',  name: 'Woolen Sweater (Dry Clean)',  price: 200 },
              { id: 'pullover',        name: 'Pullover (Dry Clean)',        price: 180 },
              { id: 'hoodie',          name: 'Hoodie (Dry Clean)',          price: 150 },
              { id: 'sweatshirt',      name: 'Sweatshirt (Dry Clean)',      price: 100 },
              { id: 'wool_shawl',      name: 'Pure Wool Shawl (Dry Clean)', price: 220 },
              { id: 'wool_stole',      name: 'Pure Wool Stole (Dry Clean)', price: 80 },
              { id: 'heavy_jacket',    name: 'Heavy Winter Jacket (Dry Clean)', price: 380 },
              { id: 'parka',           name: 'Parka (Dry Clean)',           price: 420 }
            ]
          },
          {
            id: 'suits', name: 'Suits & Blazers', icon: '👔',
            items: [
              { id: 'suit_2pc',      name: '2-Piece Suit (Dry Clean)',      price: 400 },
              { id: 'suit_3pc',      name: '3-Piece Suit (Dry Clean)',      price: 500 },
              { id: 'blazer',        name: 'Blazer (Dry Clean)',            price: 250 },
              { id: 'nehru_jacket',  name: 'Nehru Jacket (Dry Clean)',      price: 150 }
            ]
          },
          {
            id: 'ethnic', name: 'Ethnic & Wedding', icon: '👘',
            items: [
              { id: 'kurta_pajama',    name: 'Kurta Pajama (Cotton Dry Clean)', price: 200 },
              { id: 'salwar_kurti_2pc',name: 'Salwar Kurti 2pc (Dry Clean)',   price: 150 },
              { id: 'silk_saree',      name: 'Silk Saree (Dry Clean)',         price: 300 },
              { id: 'chiffon_saree',   name: 'Chiffon Saree (Dry Clean)',      price: 250 },
              { id: 'banarasi_saree',  name: 'Banarasi Saree (Dry Clean)',     price: 280 },
              { id: 'bridal_lehenga',  name: 'Bridal Heavy Lehenga (Dry Clean)', price: 500 },
              { id: 'royal_sherwani',  name: 'Royal Groom Sherwani (Dry Clean)', price: 550 },
              { id: 'royal_achkan',    name: 'Royal Groom Achkan (Dry Clean)', price: 600 },
              { id: 'dupatta',         name: 'Dupatta (Wash & Iron)',          price: 50 },
              { id: 'stole',           name: 'Stole (Dry Clean)',              price: 60 }
            ]
          },
          {
            id: 'bedding', name: 'Bedding & Linens', icon: '🛏️',
            items: [
              { id: 'single_bedsheet',  name: 'Single Bedsheet (Wash & Iron)', price: 50 },
              { id: 'double_bedsheet',  name: 'Double Bedsheet (Wash & Iron)', price: 80 },
              { id: 'king_bedsheet',    name: 'King Size Bedsheet (Wash & Iron)', price: 100 },
              { id: 'blanket_single',   name: 'Single Bed Blanket (Dry Clean)', price: 200 },
              { id: 'blanket_double',   name: 'Double Bed Blanket (Dry Clean)', price: 300 },
              { id: 'heavy_razai',      name: 'Double Bed Heavy Razai (Dry Clean)', price: 400 },
              { id: 'curtain',          name: 'Curtains per panel (Wash & Iron)', price: 80 },
              { id: 'pillow_cover',     name: 'Pillow Cover (Wash & Fold)',     price: 20 },
              { id: 'sofa_cover',       name: 'Sofa Cover (Wash & Fold)',       price: 80 }
            ]
          },
          {
            id: 'specialized', name: 'Specialized Care', icon: '✨',
            items: [
              { id: 'shoes_spa',        name: 'Shoes Deep Spa (Per Pair)',      price: 250 },
              { id: 'sofa_seat',        name: 'Sofa Home Service (Per Seat)',   price: 250 },
              { id: 'carpet_clean',     name: 'Carpet Deep Clean',              price: 600 }
            ]
          }
        ]
      };

      const prices = {};
      CALC_DATA.categories.forEach(function (cat) {
        cat.items.forEach(function (it) { prices[it.id] = it.price; });
      });

      // Render calculator UI
      calcRoot.innerHTML = `
        <div class="order-calc-card">
          <div class="calc-header">
            <span class="calc-badge"><i class="fas fa-calculator"></i> INSTANT ORDER ESTIMATOR</span>
            <h2 class="calc-title">Interactive Order Price Calculator</h2>
            <p class="calc-sub">Transparent pricing with no hidden charges &mdash; calculate your order cost instantly</p>
          </div>

          <div class="calc-student-note">
            <i class="fas fa-user-graduate"></i>
            <span>Prices shown are student friendly &amp; regular rates. Professional luxury care pricing may vary.</span>
          </div>
        
        <div class="calc-express-notice">
          <div class="express-notice-left">
            <i class="fas fa-bolt express-notice-icon"></i>
            <div>
              <span class="express-notice-title">⚡ Express 4-Hour Delivery Available</span>
              <span class="express-notice-desc">Need it fast? Express delivery available across all Jodhpur locations.</span>
            </div>
          </div>
          <a href="https://wa.me/918233853727?text=Hi%20Gen-Z%20Laundry!%20I%20want%20to%20know%20about%20Express%204-Hour%20service%20pricing." target="_blank" rel="noopener noreferrer" class="express-notice-btn">
            <i class="fab fa-whatsapp"></i> Ask Price
          </a>
        </div>

        <div class="calc-toolbar">
          <div class="calc-search-wrap">
            <i class="fas fa-search"></i>
            <input type="text" class="calc-search" id="calcSearchInput" placeholder="Search garment (e.g. Jeans, Shirt, Hoodie)..." aria-label="Search items">
          </div>
          <div class="calc-actions">
            <button type="button" class="calc-btn-aux" id="calcResetBtn" title="Reset all counts">
              <i class="fas fa-undo-alt"></i> Reset
            </button>
            <span class="calc-item-count" id="calcItemCountBadge" title="Total pieces">0 pieces</span>
          </div>
        </div>

        <div class="calc-category-tabs" role="tablist">
          ${CALC_DATA.categories.map(function (cat, i) {
            return `
              <button type="button" class="calc-tab ${i === 0 ? 'active' : ''}" data-cat="${cat.id}">
                <span>${cat.icon}</span> <span>${cat.name}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="calc-panels">
          ${CALC_DATA.categories.map(function (cat, i) {
            return `
              <div class="calc-panel ${i === 0 ? 'active' : ''}" id="panel-${cat.id}">
                <div class="calc-grid">
                  ${cat.items.map(function (it) {
                    return `
                      <div class="calc-item" data-item-id="${it.id}" data-item-name="${it.name.toLowerCase()}">
                        <div>
                          <label for="qty-${it.id}">${it.name}</label>
                          <span class="calc-item-price">₹${it.price}/pc</span>
                        </div>
                        <div class="quantity-control">
                          <button type="button" class="qty-btn" data-act="dec" data-id="${it.id}">−</button>
                          <input type="text" id="qty-${it.id}" class="qty-input" value="0" readonly>
                          <button type="button" class="qty-btn" data-act="inc" data-id="${it.id}">+</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="calc-summary-bar">
          <div class="calc-total-box">
            <span class="calc-total-label">Estimated Total:</span>
            <span class="calc-total-val" id="calcTotalVal">₹0</span>
          </div>
          <div class="calc-summary-actions">
            <button type="button" class="calc-copy-btn" id="calcCopyBtn">
              <i class="fas fa-copy"></i> Copy Estimate
            </button>
            <a href="https://wa.me/918233853727?text=Hi%20Gen-Z%20Laundry!%20I%20want%20to%20book%20a%20pickup." target="_blank" rel="noopener noreferrer" class="calc-whatsapp-btn" id="calcWhatsAppBtn">
              <i class="fab fa-whatsapp"></i> Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;

      function updateTotal() {
        let total = 0;
        let count = 0;
        const selectedItems = [];

        Object.keys(prices).forEach(function (id) {
          const inp = document.getElementById('qty-' + id);
          const q = inp ? parseInt(inp.value, 10) || 0 : 0;
          if (q > 0) {
            count += q;
            const cost = q * prices[id];
            total += cost;
            // find name
            let itemName = id;
            CALC_DATA.categories.forEach(function (c) {
              c.items.forEach(function (item) {
                if (item.id === id) itemName = item.name;
              });
            });
            selectedItems.push(`${itemName} x ${q} (₹${cost})`);
          }
        });

        const totalEl = document.getElementById('calcTotalVal');
        if (totalEl) totalEl.textContent = '₹' + total;

        const countBadge = document.getElementById('calcItemCountBadge');
        if (countBadge) countBadge.textContent = count + ' ' + (count === 1 ? 'piece' : 'pieces');

        // Update WhatsApp Link
        const waBtn = document.getElementById('calcWhatsAppBtn');
        if (waBtn) {
          if (selectedItems.length > 0) {
            let msg = `Hi Gen-Z Laundry! 🧺\n\nI calculated my order on your website:\n` + selectedItems.map(function (s) { return '• ' + s; }).join('\n') + `\n\nEstimated Total: ₹${total}\n\nPlease schedule my doorstep pickup!`;
            waBtn.href = `https://wa.me/918233853727?text=${encodeURIComponent(msg)}`;
          } else {
            waBtn.href = `https://wa.me/918233853727?text=Hi%20Gen-Z%20Laundry!%20I%20want%20to%20book%20a%20pickup.`;
          }
        }
      }

      // Quantity buttons
      calcRoot.addEventListener('click', function (e) {
        const btn = e.target.closest('.qty-btn');
        if (!btn) return;
        const id = btn.getAttribute('data-id');
        const act = btn.getAttribute('data-act');
        const inp = document.getElementById('qty-' + id);
        if (!inp) return;
        let val = parseInt(inp.value, 10) || 0;
        if (act === 'inc') val++;
        if (act === 'dec' && val > 0) val--;
        inp.value = val;
        updateTotal();
      });

      // Category tab toggle
      const tabs = calcRoot.querySelectorAll('.calc-tab');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          const catId = tab.getAttribute('data-cat');
          const panels = calcRoot.querySelectorAll('.calc-panel');
          panels.forEach(function (p) {
            p.classList.remove('active');
            if (p.id === 'panel-' + catId) p.classList.add('active');
          });
        });
      });

      // Search filter
      const searchInput = document.getElementById('calcSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', function (e) {
          const q = e.target.value.toLowerCase().trim();
          const items = calcRoot.querySelectorAll('.calc-item');
          items.forEach(function (item) {
            const name = item.getAttribute('data-item-name') || '';
            item.style.display = (name.indexOf(q) !== -1 || q === '') ? 'flex' : 'none';
          });
        });
      }

      // Reset
      const resetBtn = document.getElementById('calcResetBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          Object.keys(prices).forEach(function (id) {
            const inp = document.getElementById('qty-' + id);
            if (inp) inp.value = '0';
          });
          if (searchInput) {
            searchInput.value = '';
            const items = calcRoot.querySelectorAll('.calc-item');
            items.forEach(function (item) { item.style.display = 'flex'; });
          }
          updateTotal();
        });
      }

      // Copy Estimate
      const copyBtn = document.getElementById('calcCopyBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          let total = 0;
          const lines = ['🧺 Gen-Z Laundry — Price Estimate:'];
          Object.keys(prices).forEach(function (id) {
            const inp = document.getElementById('qty-' + id);
            const q = inp ? parseInt(inp.value, 10) || 0 : 0;
            if (q > 0) {
              const cost = q * prices[id];
              total += cost;
              let itemName = id;
              CALC_DATA.categories.forEach(function (c) {
                c.items.forEach(function (item) {
                  if (item.id === id) itemName = item.name;
                });
              });
              lines.push(`• ${itemName} x ${q} = ₹${cost}`);
            }
          });
          lines.push(`Total: ₹${total}`);
          lines.push('Book at: https://genzlaundry.com/ or call +91 82338 53727');

          navigator.clipboard.writeText(lines.join('\n')).then(function () {
            const orig = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(function () { copyBtn.innerHTML = orig; }, 2000);
          }).catch(function () {});
        });
      }
    }

    console.log('🏰 Gen-Z Laundry Blue City Theme & 10-Step Video Showcase initialized.');
  });
})();

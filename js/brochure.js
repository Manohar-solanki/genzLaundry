// ═══════════════════════════════════════════════════
//   GEN-Z LAUNDRY — E-BROCHURE INTERACTIVE MODULE
//   Auto-injects floating E-Brochure button & modal
// ═══════════════════════════════════════════════════

(function () {
  'use strict';

  function initBrochure() {
    // 1. Inject CSS link if not already present
    if (!document.getElementById('brochure-css')) {
      const link = document.createElement('link');
      link.id = 'brochure-css';
      link.rel = 'stylesheet';
      link.href = 'css/brochure.css';
      document.head.appendChild(link);
    }

    // 2. Inject Floating Button if not present
    if (!document.getElementById('openBrochureBtn')) {
      const floatBtn = document.createElement('div');
      floatBtn.className = 'brochure-floating-btn';
      floatBtn.id = 'openBrochureBtn';
      floatBtn.setAttribute('title', 'View Official Price List & E-Brochure');
      floatBtn.innerHTML = `
        <i class="fas fa-file-invoice"></i>
        <span>E-Brochure</span>
        <span class="brochure-pulse-badge">NEW</span>
      `;
      document.body.appendChild(floatBtn);
    }

    // 3. Inject Modal HTML if not present
    if (!document.getElementById('ebrochureModal')) {
      const modalOverlay = document.createElement('div');
      modalOverlay.className = 'ebrochure-modal-overlay';
      modalOverlay.id = 'ebrochureModal';
      modalOverlay.innerHTML = `
        <div class="ebrochure-modal-container">
          <!-- Header Bar -->
          <div class="ebrochure-header-bar">
            <div class="ebrochure-header-title">
              <i class="fas fa-book-open"></i>
              <span>GenZ Laundry Official Price List &amp; E-Brochure</span>
            </div>
            <div class="ebrochure-header-actions">
              <button class="ebrochure-btn ebrochure-btn-print" id="printBrochureBtn">
                <i class="fas fa-download"></i> Save / Print
              </button>
              <a href="https://api.whatsapp.com/send/?phone=918233853727&text=Hi%20Gen-Z%20Laundry!%20Please%20send%20me%20the%20Official%20E-Brochure%20%26%20Price%20List." target="_blank" rel="noopener noreferrer" class="ebrochure-btn ebrochure-btn-wa">
                <i class="fab fa-whatsapp"></i> Share on WhatsApp
              </a>
              <button class="ebrochure-btn ebrochure-btn-close" id="closeBrochureBtn" aria-label="Close modal">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Body / 3-Panel Brochure -->
          <div class="ebrochure-body">
            <div class="ebrochure-grid">
              
              <!-- PANEL 1: COVER & WHY CHOOSE -->
              <div class="ebrochure-panel">
                <div class="ebr-brand-cover">
                  <img src="public/logo.png" alt="GenZ Laundry Logo" class="ebr-logo">
                  <h3 class="ebr-brand-title">GEN-Z</h3>
                  <div class="ebr-brand-tagline">LAUNDRY &amp; CLEANERS</div>
                </div>

                <div class="ebr-hero-img-wrap">
                  <img src="public/gallery/folded_clothes.png" alt="Folded Clothes Laundry Care">
                </div>

                <div class="ebr-hero-banner">
                  <h4>EXPERIENCE THE BEST CARE FOR YOUR CLOTHES</h4>
                  <p>Premium Care | Hygienic Cleaning | Perfect Finish</p>
                </div>

                <div class="ebr-section-title">
                  <i class="fas fa-star"></i> WHY CHOOSE GEN-Z? <i class="fas fa-star"></i>
                </div>

                <div class="ebr-why-grid">
                  <div class="ebr-why-item">
                    <i class="fas fa-truck-loading"></i>
                    <span>Free Pickup &amp; Delivery</span>
                  </div>
                  <div class="ebr-why-item">
                    <i class="fas fa-clock"></i>
                    <span>24-48 Hour Service</span>
                  </div>
                  <div class="ebr-why-item">
                    <i class="fas fa-bolt"></i>
                    <span>Express 6-Hour Wash</span>
                  </div>
                  <div class="ebr-why-item">
                    <i class="fas fa-leaf"></i>
                    <span>Eco Friendly</span>
                  </div>
                  <div class="ebr-why-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Safe &amp; Hygienic</span>
                  </div>
                  <div class="ebr-why-item">
                    <i class="fas fa-tshirt"></i>
                    <span>Premium Fabric Care</span>
                  </div>
                  <div class="ebr-why-item">
                    <i class="fas fa-microchip"></i>
                    <span>AI Powered Wash</span>
                  </div>
                  <div class="ebr-why-item">
                    <i class="fas fa-temperature-high"></i>
                    <span>Steam Ironing</span>
                  </div>
                </div>

                <div class="ebr-scooter-footer">
                  <i class="fas fa-motorcycle"></i>
                  <div>WE PICK. WE CLEAN.<br>WE DELIVER. YOU RELAX.</div>
                </div>
              </div>

              <!-- PANEL 2: SERVICES & PRICE LIST -->
              <div class="ebrochure-panel">
                <div class="ebr-section-title" style="margin-top:4px;">
                  <i class="fas fa-list-alt"></i> OUR SERVICES &amp; PRICE LIST
                </div>

                <div class="ebr-service-list">
                  <div class="ebr-service-row">
                    <div class="ebr-srow-left">
                      <img src="public/gallery/folded_clothes.png" alt="Wash & Iron" class="ebr-srow-img">
                      <span class="ebr-srow-name">WASH &amp; IRON</span>
                    </div>
                    <span class="ebr-srow-price">₹29/pc</span>
                  </div>
                  <div class="ebr-service-row">
                    <div class="ebr-srow-left">
                      <img src="public/gallery/Folded_dresses.png" alt="White Clothes" class="ebr-srow-img">
                      <span class="ebr-srow-name">WHITE CLOTHES</span>
                    </div>
                    <span class="ebr-srow-price">₹49/pc</span>
                  </div>
                  <div class="ebr-service-row">
                    <div class="ebr-srow-left">
                      <img src="public/gallery/Dry_Cleaning.png" alt="Dry Cleaning" class="ebr-srow-img">
                      <span class="ebr-srow-name">DRY CLEANING</span>
                    </div>
                    <span class="ebr-srow-price">₹49-159/pc</span>
                  </div>
                  <div class="ebr-service-row">
                    <div class="ebr-srow-left">
                      <img src="public/gallery/Dry_Cleaning.png" alt="Curtain Cleaning" class="ebr-srow-img">
                      <span class="ebr-srow-name">CURTAIN CLEANING</span>
                    </div>
                    <span class="ebr-srow-price">₹49-119/pc</span>
                  </div>
                  <div class="ebr-service-row">
                    <div class="ebr-srow-left">
                      <img src="public/gallery/Shoe_Cleaning.png" alt="Shoe Cleaning" class="ebr-srow-img">
                      <span class="ebr-srow-name">SHOE CLEANING</span>
                    </div>
                    <span class="ebr-srow-price">FROM ₹249/pc</span>
                  </div>
                  <div class="ebr-service-row">
                    <div class="ebr-srow-left">
                      <img src="public/gallery/Sofa_Cleaning.png" alt="Sofa Cleaning" class="ebr-srow-img">
                      <span class="ebr-srow-name">SOFA CLEANING</span>
                    </div>
                    <span class="ebr-srow-price">FROM ₹499/pc</span>
                  </div>
                </div>

                <div class="ebr-section-title">
                  <i class="fas fa-sparkles"></i> OUR EXPERT SERVICES
                </div>

                <div class="ebr-expert-grid">
                  <div class="ebr-expert-card">
                    <i class="fas fa-soap"></i>
                    <span>WASH</span>
                  </div>
                  <div class="ebr-expert-card">
                    <i class="fas fa-user-tie"></i>
                    <span>DRY CLEAN</span>
                  </div>
                  <div class="ebr-expert-card">
                    <i class="fas fa-scroll"></i>
                    <span>CURTAIN</span>
                  </div>
                  <div class="ebr-expert-card">
                    <i class="fas fa-shoe-prints"></i>
                    <span>SHOE</span>
                  </div>
                  <div class="ebr-expert-card">
                    <i class="fas fa-couch"></i>
                    <span>SOFA</span>
                  </div>
                  <div class="ebr-expert-card">
                    <i class="fas fa-blanket"></i>
                    <span>BLANKET</span>
                  </div>
                  <div class="ebr-expert-card">
                    <i class="fas fa-border-all"></i>
                    <span>CARPET</span>
                  </div>
                  <div class="ebr-expert-card">
                    <i class="fas fa-temperature-high"></i>
                    <span>STEAM IRON</span>
                  </div>
                </div>

                <div class="ebr-guarantee-strip">
                  <div class="ebr-guar-item"><i class="fas fa-check-circle"></i> Advanced Machines</div>
                  <div class="ebr-guar-item"><i class="fas fa-check-circle"></i> Trained Professionals</div>
                  <div class="ebr-guar-item"><i class="fas fa-check-circle"></i> High Quality Products</div>
                  <div class="ebr-guar-item"><i class="fas fa-check-circle"></i> Safe For All Fabrics</div>
                </div>
              </div>

              <!-- PANEL 3: LADIES & MENS WEAR + FOOTER -->
              <div class="ebrochure-panel">
                <div class="ebr-wear-section">
                  <div class="ebr-wear-header">
                    <i class="fas fa-female"></i> LADIES GARMENTS
                  </div>
                  <div class="ebr-wear-grid">
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">PALAZZO SUIT</span>
                      <span class="ebr-wprice">₹99/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">SALWAR SUIT</span>
                      <span class="ebr-wprice">₹99/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">SHARARA</span>
                      <span class="ebr-wprice">₹119/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">JUMPER</span>
                      <span class="ebr-wprice">₹129/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">SAREE</span>
                      <span class="ebr-wprice">FROM ₹199/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">POSHAK</span>
                      <span class="ebr-wprice">₹249/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">LEHENGA</span>
                      <span class="ebr-wprice">FROM ₹449/pc</span>
                    </div>
                  </div>
                </div>

                <div class="ebr-wear-section">
                  <div class="ebr-wear-header ebr-wear-header-mens">
                    <i class="fas fa-user-tie"></i> MEN'S WEAR
                  </div>
                  <div class="ebr-wear-grid">
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">WASH &amp; IRON</span>
                      <span class="ebr-wprice ebr-wprice-mens">₹29/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">FORMAL WEAR</span>
                      <span class="ebr-wprice ebr-wprice-mens">FROM ₹49/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">KURTA PAJAMA</span>
                      <span class="ebr-wprice ebr-wprice-mens">₹159/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">COAT PANT</span>
                      <span class="ebr-wprice ebr-wprice-mens">₹379/pc</span>
                    </div>
                    <div class="ebr-wear-row">
                      <span class="ebr-wname">ACHKAN</span>
                      <span class="ebr-wprice ebr-wprice-mens">₹549/pc</span>
                    </div>
                  </div>
                </div>

                <div class="ebr-contact-strip">
                  <div class="ebr-addr">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>2nd Floor, Sabji Mandi Circle, Above Mahadev Ice Factory, Ratanada, Jodhpur, Rajasthan 342011</div>
                  </div>

                  <div class="ebr-footer-bottom">
                    <div class="ebr-phones">
                      <div><i class="fas fa-phone-alt"></i> <a href="tel:+918233853727">82688 53727</a></div>
                      <div><i class="fas fa-phone-alt"></i> <a href="tel:+918854935727">88549 35727</a></div>
                      <div><i class="fas fa-globe"></i> www.genzlaundry.com</div>
                    </div>

                    <div class="ebr-qr-wrap">
                      <img src="public/gallery/Location_qr.png" alt="Scan to Book Service">
                      <div class="ebr-qr-text">SCAN TO BOOK SERVICE</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalOverlay);
    }

    // 4. Attach Event Listeners
    const openBtn = document.getElementById('openBrochureBtn');
    const modal = document.getElementById('ebrochureModal');
    const closeBtn = document.getElementById('closeBrochureBtn');
    const printBtn = document.getElementById('printBrochureBtn');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    console.log('📜 GenZ Laundry E-Brochure Module — initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrochure);
  } else {
    initBrochure();
  }
})();

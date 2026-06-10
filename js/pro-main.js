// ═══════════════════════════════════════════════════
//   GenZ Laundry — Professional Redesign JS
//   pro-main.js  |  v2.0
// ═══════════════════════════════════════════════════

// Guard: prevent double-initialisation (e.g. if script is loaded twice)
if (window._proMainLoaded) {
  throw new Error('pro-main.js already loaded — skipping duplicate init');
}

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    'use strict';

    // ────────────────────────────────────────────────
    // 1. HEADER
    // ────────────────────────────────────────────────
    const header   = document.querySelector('.pro-header');
    const annBar   = document.querySelector('.announcement-bar');
    let   lastScrollY = 0;

    function getBarHeight() { return annBar ? annBar.offsetHeight : 0; }
    function updateHeaderTop() { if (header) header.style.top = getBarHeight() + 'px'; }

    updateHeaderTop();
    window.addEventListener('resize', updateHeaderTop, { passive: true });

    window.addEventListener('scroll', function () {
      if (!header) return;
      const y    = window.scrollY;
      const barH = getBarHeight();
      header.classList.toggle('scrolled', y > 60);
      if (y > lastScrollY && y > 200) {
        header.style.transform = 'translateY(-110%)';
      } else {
        header.style.transform = 'translateY(0)';
        if (!header.classList.contains('scrolled')) header.style.top = barH + 'px';
      }
      lastScrollY = y <= 0 ? 0 : y;
    }, { passive: true });

    // ────────────────────────────────────────────────
    // 2. MOBILE NAV
    // ────────────────────────────────────────────────
    const hamburger = document.getElementById('proHamburger');
    const navMenu   = document.getElementById('proNavMenu');
    const overlay   = document.getElementById('mobNavOverlay');

    function openNav() {
      if (!hamburger || !navMenu) return;
      navMenu.classList.add('active');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (overlay) overlay.classList.add('active');
    }
    function closeNav() {
      if (!hamburger || !navMenu) return;
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (overlay) overlay.classList.remove('active');
      // close all submenus
      document.querySelectorAll('.mob-submenu.open').forEach(function(el) {
        el.classList.remove('open');
      });
      document.querySelectorAll('.mob-expandable.mob-open').forEach(function(el) {
        el.classList.remove('mob-open');
      });
    }

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function () {
        navMenu.classList.contains('active') ? closeNav() : openNav();
      });

      // Close when a direct page link is clicked (not an expander)
      navMenu.querySelectorAll('a').forEach(function (link) {
        // Skip mob-expandable triggers — they toggle submenus
        if (!link.classList.contains('mob-expandable')) {
          link.addEventListener('click', closeNav);
        }
      });

      // Overlay click closes nav
      if (overlay) {
        overlay.addEventListener('click', closeNav);
      }

      // Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) closeNav();
      });

      document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('active') &&
            !hamburger.contains(e.target) && !navMenu.contains(e.target) &&
            !(overlay && overlay.contains(e.target))) {
          closeNav();
        }
      });
    }

    // ── Mobile submenu toggles ────────────────────
    document.querySelectorAll('.mob-expandable').forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        // Only act as toggler on mobile
        if (window.innerWidth > 768) return;
        e.preventDefault();
        var targetId = trigger.getAttribute('data-mob-target');
        var panel    = document.getElementById(targetId);
        if (!panel) return;
        var isOpen   = panel.classList.contains('open');

        // Close all other open panels
        document.querySelectorAll('.mob-submenu.open').forEach(function(p) {
          if (p !== panel) {
            p.classList.remove('open');
            var parentLink = document.querySelector('[data-mob-target="' + p.id + '"]');
            if (parentLink) parentLink.classList.remove('mob-open');
          }
        });

        // Toggle this one
        if (isOpen) {
          panel.classList.remove('open');
          trigger.classList.remove('mob-open');
        } else {
          panel.classList.add('open');
          trigger.classList.add('mob-open');
        }
      });
    });

    // ────────────────────────────────────────────────
    // 3. SMOOTH SCROLL (offset-aware)
    // ────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 72;
        const top     = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      });
    });

    // ────────────────────────────────────────────────
    // 4. ACTIVE NAV (IntersectionObserver)
    // ────────────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.pro-nav-link');

    if (sections.length && navLinks.length) {
      const activeNavObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(function (link) {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
      sections.forEach(function (sec) { activeNavObs.observe(sec); });
    }

    // ────────────────────────────────────────────────
    // 5. SCROLL REVEAL with sibling stagger
    // ────────────────────────────────────────────────
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el       = entry.target;
        const parent   = el.parentElement;
        const siblings = parent
          ? Array.from(parent.querySelectorAll(':scope > .fade-up'))
          : [];
        if (siblings.length > 1) {
          siblings.forEach(function (sib, idx) {
            sib.style.transitionDelay = (idx * 80) + 'ms';
            sib.classList.add('visible');
            revealObs.unobserve(sib);
          });
        } else {
          el.classList.add('visible');
          revealObs.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) { revealObs.observe(el); });

    // ────────────────────────────────────────────────
    // 6. COUNTER ANIMATION
    // ────────────────────────────────────────────────
    function animateCounter(el) {
      if (el._counterDone) return;
      el._counterDone = true;
      const raw           = el.textContent.trim();

      // Pure text values — skip animation, leave as-is
      if (raw === '24/7' || raw.indexOf('/') !== -1) return;

      const hasPlus       = raw.includes('+');
      const hasPct        = raw.includes('%');
      const hasStar       = raw.includes('★');
      const hasYellowStar = raw.includes('⭐');
      const hasDec        = raw.includes('.');

      let suffix = '';
      if (hasStar) suffix = raw.includes(' ★') ? ' ★' : '★';
      else if (hasYellowStar) suffix = raw.includes(' ⭐') ? ' ⭐' : '⭐';
      else if (hasPlus) suffix = '+';
      else if (hasPct) suffix = '%';

      const cleanRaw = suffix ? raw.slice(0, raw.lastIndexOf(suffix)) : raw;
      const numStr   = cleanRaw.replace(/[^0-9.]/g, '');
      const target   = hasDec ? parseFloat(numStr) : parseInt(numStr, 10);
      if (isNaN(target) || target === 0) return;
      const duration = 1800;
      const startTs  = performance.now();
      function tick(now) {
        const t     = Math.min((now - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val   = hasDec ? (eased * target).toFixed(1) : Math.floor(eased * target);
        el.textContent = val + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = (hasDec ? target.toFixed(1) : target) + suffix;
      }
      requestAnimationFrame(tick);
    }

    const statsObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.hstat-num, .prs-num, .ams strong, .rv-stat-num')
          .forEach(animateCounter);
        statsObs.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    ['.hero-stats-bar', '.pro-rating-summary', '.about-media-stats', '.rv-stats'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { statsObs.observe(el); });
    });

    // ────────────────────────────────────────────────
    // 7. FAQ ACCORDION
    // ────────────────────────────────────────────────
    function closeAllFaqs(except) {
      document.querySelectorAll('.pro-faq-item.active').forEach(function (item) {
        if (item === except) return;
        item.classList.remove('active');
        const ans = item.querySelector('.pro-faq-a');
        if (ans) ans.style.maxHeight = '0';
      });
    }

    document.querySelectorAll('.pro-faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        const item   = q.closest('.pro-faq-item') || q.parentElement;
        const ans    = item.querySelector('.pro-faq-a');
        const isOpen = item.classList.contains('active');
        closeAllFaqs(isOpen ? null : item);
        if (!isOpen) {
          item.classList.add('active');
          if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          if (ans) ans.style.maxHeight = '0';
        }
      });
    });

    // ────────────────────────────────────────────────
    // 8. FAB
    // ────────────────────────────────────────────────
    const fabMain = document.getElementById('proFabMain');
    const fabOpts = document.getElementById('proFabOpts');
    let   fabOpen = false;

    function openFab() {
      fabOpen = true;
      if (fabOpts) fabOpts.classList.add('active');
      if (fabMain) { fabMain.style.transform = 'rotate(135deg)'; fabMain.innerHTML = '<i class="fas fa-times"></i>'; }
    }
    function closeFab() {
      fabOpen = false;
      if (fabOpts) fabOpts.classList.remove('active');
      if (fabMain) { fabMain.style.transform = 'rotate(0deg)'; fabMain.innerHTML = '<i class="fas fa-headset"></i>'; }
    }

    if (fabMain) {
      fabMain.addEventListener('click', function (e) { e.stopPropagation(); fabOpen ? closeFab() : openFab(); });
    }
    document.addEventListener('click', function (e) {
      if (!fabOpen) return;
      if ((fabMain && fabMain.contains(e.target)) || (fabOpts && fabOpts.contains(e.target))) return;
      closeFab();
    });

    // ────────────────────────────────────────────────
    // 9. REVIEWS CAROUSEL
    // ────────────────────────────────────────────────
    (function initReviews() {
      const track    = document.getElementById('rvTrack');
      const dotsEl   = document.getElementById('rvDots');
      const viewport = document.getElementById('rvViewport');
      if (!track) return;
      const cards   = Array.from(track.querySelectorAll('.rv-card'));
      const total   = cards.length;
      if (total === 0) return;
      const INTERVAL = 3500;
      let current = 0, timer = null;

      function cardWidth() {
        if (!cards[0]) return 364;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
        return cards[0].offsetWidth + gap;
      }
      function viewW() { return viewport ? viewport.offsetWidth : window.innerWidth; }

      function goTo(index) {
        current = ((index % total) + total) % total;
        const cw = cardWidth(), vw = viewW();
        const offset = current * cw - (vw / 2 - cw / 2);
        track.style.transform = 'translateX(' + (-Math.max(0, offset)) + 'px)';
        cards.forEach(function (c, i) { c.classList.toggle('rv-active', i === current); });
        refreshDots();
      }

      function buildDots() {
        if (!dotsEl) return;
        dotsEl.innerHTML = '';
        for (let i = 0; i < total; i++) {
          (function (idx) {
            const d = document.createElement('button');
            d.className = 'rv-dot';
            d.setAttribute('aria-label', 'Go to review ' + (idx + 1));
            d.addEventListener('click', function () { goTo(idx); resetTimer(); });
            dotsEl.appendChild(d);
          })(i);
        }
      }

      function refreshDots() {
        if (!dotsEl) return;
        dotsEl.querySelectorAll('.rv-dot').forEach(function (d, i) {
          if (i === current) { d.classList.remove('rv-dot-active'); void d.offsetWidth; d.classList.add('rv-dot-active'); }
          else d.classList.remove('rv-dot-active');
        });
      }

      function startTimer() { clearInterval(timer); timer = setInterval(function () { goTo(current + 1); }, INTERVAL); }
      function resetTimer() { startTimer(); }

      if (viewport) {
        viewport.addEventListener('mouseenter', function () { clearInterval(timer); });
        viewport.addEventListener('mouseleave', startTimer, { passive: true });
      }
      cards.forEach(function (c, i) { c.addEventListener('click', function () { goTo(i); resetTimer(); }); });

      buildDots(); goTo(0); startTimer();
    })();

    // ────────────────────────────────────────────────
    // 10. BOOKING FORM — inline success, no alert
    // ────────────────────────────────────────────────
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameEl    = document.getElementById('name');
        const phoneEl   = document.getElementById('phone');
        const addressEl = document.getElementById('address');
        const serviceEl = document.getElementById('service');
        const name    = nameEl    ? nameEl.value.trim()    : '';
        const phone   = phoneEl   ? phoneEl.value.trim()   : '';
        const address = addressEl ? addressEl.value.trim() : '';
        const service = serviceEl ? serviceEl.value        : '';

        function setError(input, msg) {
          if (!input) return;
          input.style.borderColor = '#ef4444';
          input.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.12)';
          const p = input.parentElement;
          if (p) { let err = p.querySelector('.pbf-err'); if (!err) { err = document.createElement('p'); err.className='pbf-err'; err.style.cssText='color:#ef4444;font-size:0.78rem;margin-top:5px;'; p.appendChild(err); } err.textContent = msg; }
        }
        function clearErrors() {
          bookingForm.querySelectorAll('input,select,textarea').forEach(function (el) { el.style.borderColor=''; el.style.boxShadow=''; });
          bookingForm.querySelectorAll('.pbf-err').forEach(function (el) { el.remove(); });
        }

        clearErrors();
        let valid = true;
        if (!name)    { setError(nameEl,    'Please enter your full name'); valid = false; }
        if (!phone)   { setError(phoneEl,   'Please enter your phone number'); valid = false; }
        else if (!/^[6-9]\d{9}$/.test(phone)) { setError(phoneEl, 'Enter a valid 10-digit Indian mobile number'); valid = false; }
        if (!address) { setError(addressEl, 'Please enter your pickup address'); valid = false; }
        if (!service) { setError(serviceEl, 'Please select a service'); valid = false; }
        if (!valid) return;

        const serviceLabels = { 'wash-fold':'Wash & Fold','dry-clean':'Dry Cleaning','ironing':'Ironing Only','home-textiles':'Home Textiles','express':'Express 4-Hour Service' };
        const svcName = serviceLabels[service] || service;
        const msg = 'Hi GenZ Laundry Team! \uD83D\uDC55\u2728\n\nI\'d like to book a pickup:\n\nName: '+name+'\nPhone: '+phone+'\nAddress: '+address+'\nService: '+svcName+'\n\nPlease confirm pickup time. Thank you!';

        // Inline success
        let successEl = bookingForm.querySelector('.booking-success');
        if (!successEl) {
          successEl = document.createElement('div');
          successEl.className = 'booking-success';
          successEl.style.cssText = 'display:none;margin-top:16px;padding:16px 18px;border-radius:12px;background:#f0fdf4;border:1.5px solid #22c55e;color:#166534;font-weight:600;font-size:0.95rem;text-align:center;gap:8px;align-items:center;';
          bookingForm.appendChild(successEl);
        }
        successEl.innerHTML = '<i class="fas fa-check-circle" style="color:#22c55e;margin-right:8px;"></i>Booking sent! We\'ll call you within 30 minutes.';
        successEl.style.display = 'flex';

        window.open('https://wa.me/918233853727?text=' + encodeURIComponent(msg), '_blank');

        setTimeout(function () {
          bookingForm.reset();
          clearErrors();
          successEl.style.display = 'none';
        }, 1000);
      });
    }

    // ────────────────────────────────────────────────
    // 11. KEYBOARD — Escape closes everything
    // ────────────────────────────────────────────────
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (navMenu && navMenu.classList.contains('active')) closeNav();
      if (fabOpen) closeFab();
    });

    console.log('\uD83E\uDDFA GenZ Laundry Pro — v2.0 loaded');
  })();
});

window._proMainLoaded = true;

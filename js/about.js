// ═══════════════════════════════════════════════════
//   GenZ Laundry — About Page JS
// ═══════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Header scroll ──────────────────────────────
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    if (!header) return;
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 60);

    if (scrollY > lastScroll && scrollY > 200) {
      header.style.transform = 'translateY(-110%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = scrollY <= 0 ? 0 : scrollY;
  }, { passive: true });

  // ── Mobile nav ─────────────────────────────────
  const hamburger = document.getElementById('proHamburger');
  const navMenu   = document.getElementById('proNavMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll-reveal (fade-in) ─────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // stagger siblings inside the same grid parent
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        siblings.forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 90);
        });
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => revealObs.observe(el));

  // ── FAB ────────────────────────────────────────
  const fabMain = document.getElementById('proFabMain');
  const fabOpts = document.getElementById('proFabOpts');
  let fabOpen = false;

  if (fabMain && fabOpts) {
    fabMain.addEventListener('click', () => {
      fabOpen = !fabOpen;
      fabOpts.classList.toggle('active', fabOpen);
      fabMain.innerHTML = fabOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-headset"></i>';
    });

    document.addEventListener('click', e => {
      if (!fabMain.contains(e.target) && !fabOpts.contains(e.target) && fabOpen) {
        fabOpen = false;
        fabOpts.classList.remove('active');
        fabMain.innerHTML = '<i class="fas fa-headset"></i>';
      }
    });
  }

  // ── Keyboard ───────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (navMenu) { navMenu.classList.remove('active'); document.body.style.overflow = ''; }
      if (hamburger) hamburger.classList.remove('active');
    }
  });

  console.log('📖 GenZ Laundry About Page — loaded');

})();

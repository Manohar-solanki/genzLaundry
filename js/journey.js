// ═══════════════════════════════════════════════════
//   GenZ Laundry — Journey Page JS  |  v2.0
// ═══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    'use strict';

    // 1. HEADER
    var header     = document.querySelector('.pro-header');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      if (!header) return;
      var y = window.scrollY;
      header.classList.toggle('scrolled', y > 60);
      if (y > lastScroll && y > 200) header.style.transform = 'translateY(-110%)';
      else header.style.transform = 'translateY(0)';
      lastScroll = y <= 0 ? 0 : y;
    }, { passive: true });

    // 2. MOBILE NAV
    var hamburger = document.getElementById('proHamburger');
    var navMenu   = document.getElementById('proNavMenu');

    function openNav() { if (!hamburger||!navMenu) return; navMenu.classList.add('active'); hamburger.classList.add('active'); hamburger.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; }
    function closeNav() { if (!hamburger||!navMenu) return; navMenu.classList.remove('active'); hamburger.classList.remove('active'); hamburger.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function () { navMenu.classList.contains('active') ? closeNav() : openNav(); });
      navMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
      document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('active') && !hamburger.contains(e.target) && !navMenu.contains(e.target)) closeNav();
      });
    }

    // 3. SCROLL REVEAL with sibling stagger
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var parent = el.parentElement;
        var siblings = parent ? Array.from(parent.querySelectorAll(':scope > .jrn-reveal')) : [];
        if (siblings.length > 1) {
          siblings.forEach(function (sib, idx) {
            sib.style.transitionDelay = (idx * 90) + 'ms';
            sib.classList.add('visible');
            revealObs.unobserve(sib);
          });
        } else {
          el.classList.add('visible');
          revealObs.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    document.querySelectorAll('.jrn-reveal').forEach(function (el) { revealObs.observe(el); });

    // 4. COUNTER ANIMATION
    function animateNum(el) {
      if (el._done) return; el._done = true;
      var raw = el.textContent.trim();
      var hasPlus = raw.includes('+'), hasPct = raw.includes('%'), hasStar = raw.includes('★'), hasDec = raw.includes('.');
      var suffix = hasStar ? ' ★' : hasPlus ? '+' : hasPct ? '%' : '';
      var target = hasDec ? parseFloat(raw.replace(/[^0-9.]/g,'')) : parseInt(raw.replace(/[^0-9.]/g,''), 10);
      if (isNaN(target) || target === 0) return;
      var duration = 1600, startTs = performance.now();
      function tick(now) {
        var t = Math.min((now - startTs) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (hasDec ? (eased * target).toFixed(1) : Math.floor(eased * target)) + suffix;
        if (t < 1) requestAnimationFrame(tick); else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    }

    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.jrn-gs-num, .jrn-cc-num').forEach(animateNum);
        statObs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.jrn-growth-stats, .jrn-chapter-count').forEach(function (el) { statObs.observe(el); });

    // 5. FAB
    var fabMain = document.getElementById('proFabMain');
    var fabOpts = document.getElementById('proFabOpts');
    var fabOpen = false;

    function openFab() { fabOpen=true; if(fabOpts) fabOpts.classList.add('active'); if(fabMain){ fabMain.style.transform='rotate(135deg)'; fabMain.innerHTML='<i class="fas fa-times"></i>'; } }
    function closeFab() { fabOpen=false; if(fabOpts) fabOpts.classList.remove('active'); if(fabMain){ fabMain.style.transform='rotate(0deg)'; fabMain.innerHTML='<i class="fas fa-headset"></i>'; } }

    if (fabMain) { fabMain.addEventListener('click', function (e) { e.stopPropagation(); fabOpen ? closeFab() : openFab(); }); }
    document.addEventListener('click', function (e) {
      if (!fabOpen) return;
      if ((fabMain&&fabMain.contains(e.target))||(fabOpts&&fabOpts.contains(e.target))) return;
      closeFab();
    });

    // 6. SMOOTH ANCHOR SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var hdr = header;
        var offset = (hdr ? hdr.offsetHeight : 88) + 16;
        window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: 'smooth' });
      });
    });

    // 7. KEYBOARD
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (navMenu && navMenu.classList.contains('active')) closeNav();
      if (fabOpen) closeFab();
    });

    console.log('\uD83D\DE80 GenZ Laundry Journey — v2.0 loaded');
  })();
});

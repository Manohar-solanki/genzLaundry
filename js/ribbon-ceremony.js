/**
 * GEN-Z LAUNDRY - FULL PAGE GRAND INAUGURATION & VELVET CURTAIN CEREMONY
 * Full-screen Velvet Curtains, Spotlights, Ribbon Cut & Flower Shower Canvas
 */

(function () {
  'use strict';

  let isCut = false;
  let canvas, ctx;
  let animationFrameId;
  let particles = [];
  let audioCtx = null;

  function initDOM() {
    if (document.getElementById('inauguration-overlay')) return;

    // Fullscreen Canvas for Petals & Gold Confetti
    canvas = document.createElement('canvas');
    canvas.id = 'ceremony-canvas';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Fullscreen Inauguration Stage HTML
    const overlay = document.createElement('div');
    overlay.id = 'inauguration-overlay';
    overlay.innerHTML = `
      <!-- Spotlights -->
      <div class="spotlight left"></div>
      <div class="spotlight right"></div>

      <!-- Top Valance / Pelmet -->
      <div class="top-valance"></div>

      <!-- Velvet Stage Curtains -->
      <div class="curtain-container">
        <div class="curtain-panel left"></div>
        <div class="curtain-panel right"></div>
      </div>

      <!-- Close Button -->
      <button class="ceremony-close-btn" id="close-ceremony-btn" title="Close Stage">&times;</button>

      <!-- Center Fullscreen Stage Content -->
      <div class="inauguration-stage-content">
        <div class="crown-emblem">👑</div>

        <div class="stage-top-tag">
          ✨ GEN-Z OF JODHPUR ✨
        </div>

        <h1 class="stage-main-title">भव्य शुभारंभ</h1>
        <div class="stage-sub-invite">CORDIALLY INVITES YOU TO THE GRAND INAUGURATION</div>

        <div class="stage-brand-card">
          <h2 class="stage-brand-title">GEN-Z <span>LAUNDRY</span> & DRY CLEANER</h2>
          <div class="stage-brand-tagline">(Premium Garment Care & Express Service)</div>
        </div>

        <div class="stage-guest-card">
          <div class="stage-guest-label">
            <i class="fas fa-star"></i> CHIEF GUEST <i class="fas fa-star"></i>
          </div>
          <div class="stage-guest-name">RAVINDRA SINGH BHATI</div>
          <div class="stage-guest-desc">— Sheo MLA —</div>
        </div>

        <div class="stage-info-row">
          <div class="stage-info-pill">
            <i class="fas fa-calendar-alt"></i>
            <span>Saturday, 1 August 2026</span>
          </div>
          <div class="stage-info-pill">
            <i class="fas fa-map-marker-alt"></i>
            <span>Jodhpur, Rajasthan</span>
          </div>
        </div>

        <div class="stage-action-row">
          <a href="https://api.whatsapp.com/send/?phone=918233853727&text=Congratulations%20on%20the%20Grand%20Inauguration%20of%20Gen-Z%20Laundry!%20%F0%9F%8E%89%F0%9F%A7%BA" target="_blank" rel="noopener noreferrer" class="btn-stage-secondary">
            <i class="fab fa-whatsapp"></i> Send Inauguration Wishes
          </a>
          <button class="btn-stage-secondary" id="enter-site-btn">
            <i class="fas fa-globe"></i> Explore Website
          </button>
        </div>

        <!-- Bottom Grand Ribbon & Interactive Scissors -->
        <div class="stage-ribbon-bar" id="ribbon-bar">
          <div class="stage-ribbon-line"></div>
          <button class="stage-scissors-btn" id="cut-ribbon-trigger">
            <i class="fas fa-cut"></i> <span id="cut-btn-text">TAP TO CUT RIBBON & OPEN STAGE</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Floating Reopen Button on Website
    const reopenBtn = document.createElement('button');
    reopenBtn.id = 'reopen-ceremony-btn';
    reopenBtn.innerHTML = `<i class="fas fa-ribbon"></i> <span>Grand Inauguration (1 Aug)</span>`;
    document.body.appendChild(reopenBtn);

    // Event Listeners
    document.getElementById('close-ceremony-btn').addEventListener('click', closeOverlay);
    document.getElementById('enter-site-btn').addEventListener('click', closeOverlay);
    document.getElementById('reopen-ceremony-btn').addEventListener('click', openOverlay);
    document.getElementById('cut-ribbon-trigger').addEventListener('click', () => {
      if (isCut) {
        replayCeremony();
      } else {
        triggerRibbonCut();
      }
    });

    // Auto open on page load
    setTimeout(() => {
      openOverlay();
    }, 400);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Web Audio Festive Fanfare
  function playFestiveAudio() {
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      
      // Snip Sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.18);

      // Fanfare Chords
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const noteOsc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        const noteTime = now + 0.12 + (idx * 0.08);

        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, noteTime);

        noteGain.gain.setValueAtTime(0.25, noteTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.9);

        noteOsc.connect(noteGain);
        noteGain.connect(audioCtx.destination);

        noteOsc.start(noteTime);
        noteOsc.stop(noteTime + 0.9);
      });
    } catch (e) {
      console.log('Audio playback prevented');
    }
  }

  // Trigger Ribbon Cut & Curtain Reveal
  function triggerRibbonCut() {
    const overlay = document.getElementById('inauguration-overlay');
    if (!overlay || isCut) return;

    isCut = true;
    overlay.classList.add('curtains-open');

    playFestiveAudio();
    spawnFlowerShower();

    const btnText = document.getElementById('cut-btn-text');
    if (btnText) btnText.innerText = '🌸 REPLAY STAGE CEREMONY';
  }

  function replayCeremony() {
    const overlay = document.getElementById('inauguration-overlay');
    if (!overlay) return;

    overlay.classList.remove('curtains-open');
    isCut = false;

    setTimeout(() => {
      triggerRibbonCut();
    }, 250);
  }

  // Flower Petals & Gold Confetti Particle Shower
  function spawnFlowerShower() {
    particles = [];
    const colors = [
      '#ffa500', '#ff7f00', '#ffd700', // Marigold Gold/Orange
      '#e60026', '#b3001e', '#ff3355', // Red Rose
      '#ffffff', '#fff2a3'             // Jasmine & Gold Sparkles
    ];

    const count = window.innerWidth < 480 ? 90 : 160;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.3) - (canvas.height * 0.1),
        size: Math.random() * 14 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3.5 + 2,
        speedX: (Math.random() - 0.5) * 2.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 6,
        type: Math.random() > 0.4 ? 'petal' : 'confetti',
        opacity: 1
      });
    }

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animateParticles();
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;

    particles.forEach((p) => {
      if (p.y < canvas.height + 25) {
        activeParticles++;
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.02) * p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }

        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(animateParticles);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function openOverlay() {
    const overlay = document.getElementById('inauguration-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  }

  function closeOverlay() {
    const overlay = document.getElementById('inauguration-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDOM);
  } else {
    initDOM();
  }

})();

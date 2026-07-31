/**
 * GEN-Z LAUNDRY - GRAND INAUGURATION & RIBBON CEREMONY JAVASCRIPT
 * Interactive Ribbon Cutting, Canvas Flower Petal Shower & Festive Audio Synthesis
 */

(function () {
  'use strict';

  // State
  let isCut = false;
  let canvas, ctx;
  let animationFrameId;
  let particles = [];
  let audioCtx = null;

  // Configuration
  const EVENT_DATE = new Date('2026-08-01T10:00:00+05:30'); // 1 August 2026

  // DOM Structure Injection
  function initDOM() {
    if (document.getElementById('inauguration-overlay')) return;

    // Create Canvas element
    canvas = document.createElement('canvas');
    canvas.id = 'ceremony-canvas';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create Modal HTML
    const overlay = document.createElement('div');
    overlay.id = 'inauguration-overlay';
    overlay.innerHTML = `
      <div class="inauguration-card" id="inauguration-card">
        <div class="card-corner top-left"></div>
        <div class="card-corner top-right"></div>
        <div class="card-corner bottom-left"></div>
        <div class="card-corner bottom-right"></div>

        <button class="ceremony-close-btn" id="close-ceremony-btn" title="Close Overlay">&times;</button>

        <div class="ceremony-badge">
          <i class="fas fa-sparkles"></i> GEN-Z OF JODHPUR <i class="fas fa-sparkles"></i>
        </div>

        <h2 class="ceremony-title-hi">भव्य शुभारंभ</h2>
        <div class="ceremony-subtitle">CORDIALLY INVITES YOU TO THE GRAND INAUGURATION</div>

        <div class="brand-hero-box">
          <h1 class="brand-main-title">GEN-Z <span>LAUNDRY</span> & DRY CLEANER</h1>
          <div class="brand-tagline">(Premium Garment Care & Express Service)</div>
        </div>

        <div class="chief-guest-card">
          <div class="chief-guest-label">
            <i class="fas fa-crown"></i> CHIEF GUEST <i class="fas fa-crown"></i>
          </div>
          <div class="chief-guest-name">RAVINDRA SINGH BHATI</div>
          <div class="chief-guest-designation">— Sheo MLA —</div>
        </div>

        <div class="event-info-grid">
          <div class="info-pill">
            <i class="fas fa-calendar-star"></i>
            <div class="pill-val">1 August 2026</div>
            <div class="pill-lbl">Saturday</div>
          </div>
          <div class="info-pill">
            <i class="fas fa-map-marker-alt"></i>
            <div class="pill-val">Jodhpur</div>
            <div class="pill-lbl">Rajasthan</div>
          </div>
        </div>

        <div class="ceremony-actions">
          <button class="btn-ceremony-primary" id="snip-action-btn">
            <i class="fas fa-cut"></i> <span id="snip-btn-text">Snip Ribbon to Inaugurate!</span>
          </button>
          <a href="https://api.whatsapp.com/send/?phone=918233853727&text=Congratulations%20on%20the%20Grand%20Inauguration%20of%20Gen-Z%20Laundry!%20%F0%9F%8E%89%F0%9F%A7%BA" target="_blank" rel="noopener noreferrer" class="btn-ceremony-secondary">
            <i class="fab fa-whatsapp"></i> Send Inauguration Wishes
          </a>
        </div>

        <!-- Interactive Ribbon & Scissors Overlay -->
        <div class="ribbon-ceremony-stage" id="ribbon-stage">
          <div class="ribbon-half left"></div>
          <div class="ribbon-half right"></div>
          
          <div class="scissors-action-wrap" id="scissors-trigger" title="Tap to Cut Ribbon!">
            <svg class="golden-bow-svg" viewBox="0 0 100 100">
              <path d="M50 35 C 35 10, 10 30, 45 48 C 10 60, 35 90, 50 55 C 65 90, 90 60, 55 48 C 90 30, 65 10, 50 35 Z" fill="url(#goldGrad)" stroke="#fff" stroke-width="1.5"/>
              <circle cx="50" cy="48" r="8" fill="#ffd700" stroke="#b38f00" stroke-width="2"/>
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fff2a3"/>
                  <stop offset="50%" stop-color="#ffd700"/>
                  <stop offset="100%" stop-color="#b8860b"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="scissors-btn">
              <span class="scissors-icon">✂️</span>
              <span>TAP TO CUT</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Create Floating Reopen Button on Website
    const reopenBtn = document.createElement('button');
    reopenBtn.id = 'reopen-ceremony-btn';
    reopenBtn.innerHTML = `<i class="fas fa-ribbon"></i> <span>Grand Inauguration (1 Aug)</span>`;
    document.body.appendChild(reopenBtn);

    // Event Listeners
    document.getElementById('close-ceremony-btn').addEventListener('click', closeOverlay);
    document.getElementById('reopen-ceremony-btn').addEventListener('click', openOverlay);
    document.getElementById('scissors-trigger').addEventListener('click', triggerRibbonCut);
    document.getElementById('snip-action-btn').addEventListener('click', () => {
      if (isCut) {
        replayRibbonCut();
      } else {
        triggerRibbonCut();
      }
    });

    // Close on background click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeOverlay();
    });

    // Auto open on initial load
    setTimeout(() => {
      openOverlay();
    }, 600);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Web Audio Synthesizer for Festive Sound
  function playFestiveAudio() {
    try {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Snip Sound
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.15);

      // Fanfare Chime Chords
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const noteOsc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        const noteTime = now + 0.1 + (idx * 0.08);

        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, noteTime);

        noteGain.gain.setValueAtTime(0.2, noteTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.8);

        noteOsc.connect(noteGain);
        noteGain.connect(audioCtx.destination);

        noteOsc.start(noteTime);
        noteOsc.stop(noteTime + 0.8);
      });
    } catch (e) {
      console.log('Audio playback prevented or unsupported');
    }
  }

  // Ribbon Cut Trigger
  function triggerRibbonCut() {
    const stage = document.getElementById('ribbon-stage');
    if (!stage || isCut) return;

    isCut = true;
    stage.classList.add('snipped');
    
    playFestiveAudio();
    spawnFlowerShower();

    const snipBtnText = document.getElementById('snip-btn-text');
    if (snipBtnText) snipBtnText.innerText = '🌸 Replay Flower Ceremony';

    setTimeout(() => {
      stage.classList.add('completed');
    }, 900);
  }

  function replayRibbonCut() {
    const stage = document.getElementById('ribbon-stage');
    if (!stage) return;

    stage.classList.remove('snipped', 'completed');
    isCut = false;
    
    setTimeout(() => {
      triggerRibbonCut();
    }, 150);
  }

  // Flower Petal & Confetti Canvas Particle System
  function spawnFlowerShower() {
    particles = [];
    const colors = [
      '#ffa500', '#ff7f00', '#ffd700', // Marigold Gold/Orange
      '#e60026', '#b3001e', '#ff3355', // Red Rose
      '#ffffff', '#fff2a3'             // White Jasmine & Sparkles
    ];

    const particleCount = window.innerWidth < 480 ? 70 : 130;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4) - (canvas.height * 0.2),
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 5,
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
      if (p.y < canvas.height + 20) {
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
          // Oval Petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Confetti Rectangle shape
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

  // Initialize script on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDOM);
  } else {
    initDOM();
  }

})();

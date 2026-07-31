/**
 * GEN-Z LAUNDRY - ELEGANT GRAND INAUGURATION & ROYAL CURTAIN CEREMONY
 * Featuring exact store address, velvet curtains reveal, flower rain & audio synth
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

    // Canvas Element for Petals Rain
    canvas = document.createElement('canvas');
    canvas.id = 'ceremony-canvas';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Overlay HTML
    const overlay = document.createElement('div');
    overlay.id = 'inauguration-overlay';
    overlay.innerHTML = `
      <!-- Left & Right Royal Red Velvet Curtains -->
      <div class="curtain-wrap">
        <div class="curtain-panel left"></div>
        <div class="curtain-panel right"></div>
      </div>

      <!-- Main Luxury Invitation Card -->
      <div class="invitation-modal-card" id="invitation-card">
        <div class="card-corner top-left"></div>
        <div class="card-corner top-right"></div>
        <div class="card-corner bottom-left"></div>
        <div class="card-corner bottom-right"></div>

        <button class="ceremony-close-btn" id="close-ceremony-btn" title="Close Invitation">&times;</button>

        <div class="card-top-crest">
          ✨ GEN-Z OF JODHPUR ✨
        </div>

        <h2 class="card-title-hi">भव्य शुभारंभ</h2>
        <div class="card-subtitle">CORDIALLY INVITES YOU TO THE GRAND INAUGURATION</div>

        <div class="brand-box">
          <h1 class="brand-title-text">GEN-Z <span>LAUNDRY</span> & DRY CLEANER</h1>
          <div class="brand-sub-tag">(Premium Garment Care & Express Service)</div>
        </div>

        <div class="chief-guest-card">
          <div class="chief-guest-lbl">
            <i class="fas fa-crown"></i> CHIEF GUEST <i class="fas fa-crown"></i>
          </div>
          <div class="chief-guest-name">RAVINDRA SINGH BHATI</div>
          <div class="chief-guest-desig">— Sheo MLA —</div>
        </div>

        <div class="event-pills-row">
          <div class="pill-card">
            <i class="fas fa-calendar-star"></i>
            <div class="pill-val">1 August 2026</div>
            <div class="pill-sub">Saturday</div>
          </div>
          <div class="pill-card">
            <i class="fas fa-map-marker-alt"></i>
            <div class="pill-val">Ratanada</div>
            <div class="pill-sub">Jodhpur</div>
          </div>
        </div>

        <div class="venue-address-box">
          <div class="venue-hdr"><i class="fas fa-location-dot"></i> VENUE ADDRESS</div>
          <div class="venue-text">
            2nd floor, Sabji Mandi Circle, Above Mahadev Barf Factory, Ratanada, Jodhpur, Rajasthan (342011)
          </div>
        </div>

        <!-- Satin Ribbon Banner Overlay -->
        <div class="ribbon-banner-wrap">
          <div class="ribbon-satin-strip"></div>
          <button class="btn-snip-ribbon" id="snip-trigger-btn">
            <i class="fas fa-cut"></i> <span>TAP TO CUT RIBBON & OPEN STAGE</span>
          </button>
        </div>

        <div class="card-actions-grid">
          <a href="https://api.whatsapp.com/send/?phone=918233853727&text=Congratulations%20on%20the%20Grand%20Inauguration%20of%20Gen-Z%20Laundry!%20%F0%9F%8E%89%F0%9F%A7%BA" target="_blank" rel="noopener noreferrer" class="btn-action-sec">
            <i class="fab fa-whatsapp"></i> Send Inauguration Wishes
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Reopen Button on Website
    const reopenBtn = document.createElement('button');
    reopenBtn.id = 'reopen-ceremony-btn';
    reopenBtn.innerHTML = `<i class="fas fa-ribbon"></i> <span>Grand Inauguration (1 Aug)</span>`;
    document.body.appendChild(reopenBtn);

    // Event Handlers
    document.getElementById('close-ceremony-btn').addEventListener('click', closeOverlay);
    document.getElementById('reopen-ceremony-btn').addEventListener('click', openOverlay);
    document.getElementById('snip-trigger-btn').addEventListener('click', triggerRibbonCutAndEnter);

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

  // Web Audio Synthesizer
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
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.15);

      // Fanfare Chords
      const notes = [523.25, 659.25, 783.99, 1046.50];
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
      console.log('Audio playback prevented');
    }
  }

  // Trigger Ribbon Cut -> Curtains Slide Open -> Flower Rain -> Enter Website!
  function triggerRibbonCutAndEnter() {
    const overlay = document.getElementById('inauguration-overlay');
    if (!overlay) return;

    isCut = true;

    // 1. Slide Curtains Open
    overlay.classList.add('curtains-open');

    // 2. Play Audio Fanfare & Cut Sound
    playFestiveAudio();

    // 3. Start Flower Rain over the entire screen & website
    spawnFlowerShower();

    // 4. Smoothly fade out overlay after curtains part so user enters website directly!
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 600);
  }

  // Particle Flower Petals & Gold Confetti System
  function spawnFlowerShower() {
    particles = [];
    const colors = [
      '#ffa500', '#ff7f00', '#ffd700', // Marigold Gold/Orange
      '#e60026', '#b3001e', '#ff3355', // Red Rose
      '#ffffff', '#fff2a3'             // Jasmine & Gold Sparkles
    ];

    const count = window.innerWidth < 480 ? 100 : 180;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4) - (canvas.height * 0.2),
        size: Math.random() * 13 + 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3.5 + 2,
        speedX: (Math.random() - 0.5) * 2.5,
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
      overlay.classList.remove('curtains-open');
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

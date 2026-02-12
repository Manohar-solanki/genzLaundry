// ============================================
// Dynamic Enhancements - Making it feel handcrafted
// ============================================

// 1. Parallax Scrolling Effect
class ParallaxManager {
    constructor() {
        this.init();
    }

    init() {
        const isMobile = window.innerWidth <= 768;
        const baseSpeed = isMobile ? 0.2 : 0.5; // Reduced speed on mobile
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-card, .service-icon, .gallery-icon');
            
            parallaxElements.forEach((el, index) => {
                const speed = baseSpeed + (index * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }
}

// 2. Interactive Cursor Effect (Desktop only)
class CursorFollower {
    constructor() {
        // Only on desktop and if not touch device
        if (window.innerWidth > 768 && !('ontouchstart' in window)) {
            this.init();
        }
    }

    init() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid #0D9488;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        cursorDot.style.cssText = `
            width: 6px;
            height: 6px;
            background: #0D9488;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.05s ease;
            display: none;
        `;
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.display = 'block';
            cursorDot.style.display = 'block';
        });

        // Smooth cursor following
        function animate() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;

            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            cursorDot.style.left = dotX - 3 + 'px';
            cursorDot.style.top = dotY - 3 + 'px';

            requestAnimationFrame(animate);
        }
        animate();

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .review-card, .gallery-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#F59E0B';
                cursorDot.style.background = '#F59E0B';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#0D9488';
                cursorDot.style.background = '#0D9488';
            });
        });
    }
}

// 3. Dynamic Text Typing Effect
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.speed / 2 : this.speed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// 4. Interactive Service Cards with 3D Tilt
class TiltCards {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.service-card, .review-card, .gallery-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
                card.style.transition = 'none';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'all 0.5s ease';
            });
        });
    }
}

// 5. Dynamic Background Particles
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(13, 148, 136, ${Math.random() * 0.5 + 0.2})`
            });
        }

        this.animate(ctx, canvas);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    animate(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        // Connect nearby particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(13, 148, 136, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate(ctx, canvas));
    }
}

// 6. Interactive Price Calculator with Real-time Animations
class EnhancedCalculator {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const qtyBtn = e.target.closest('.qty-btn');
            if (qtyBtn) {
                this.animateButton(qtyBtn);
                this.updateTotalWithAnimation();
            }
        });
    }

    animateButton(btn) {
        btn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            btn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        }, 100);
    }

    updateTotalWithAnimation() {
        const totalEl = document.getElementById('total-amount');
        if (totalEl) {
            totalEl.style.transform = 'scale(1.2)';
            totalEl.style.color = '#F59E0B';
            setTimeout(() => {
                totalEl.style.transform = '';
                totalEl.style.color = '';
            }, 300);
        }
    }
}

// 7. Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.init();
    }

    init() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #0D9488, #F59E0B);
            z-index: 10000;
            transform-origin: left;
            width: 0%;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// 8. Dynamic Stats Counter with Celebration
class EnhancedCounter {
    constructor() {
        this.init();
    }

    init() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.about-stats, .review-summary');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }

    animateCounters(container) {
        const counters = container.querySelectorAll('.stat-number');
        
        counters.forEach((counter, index) => {
            const text = counter.textContent.trim();
            const hasDecimal = text.includes('.');
            
            // Extract number (with decimal if present)
            const numberMatch = text.match(/[\d.]+/);
            if (!numberMatch) return;
            
            const number = hasDecimal ? parseFloat(numberMatch[0]) : parseInt(numberMatch[0]);
            const suffix = text.replace(/[\d.]/g, '').trim();
            
            if (isNaN(number)) return;
            
            let current = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                current = hasDecimal 
                    ? (easeOutCubic * number).toFixed(1)
                    : Math.floor(easeOutCubic * number);
                
                counter.textContent = current + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = number + suffix;
                    // Celebration effect
                    this.celebrate(counter);
                }
            };
            
            setTimeout(() => {
                requestAnimationFrame(updateCounter);
            }, index * 200);
        });
    }

    celebrate(element) {
        element.style.transform = 'scale(1.3)';
        element.style.color = '#F59E0B';
        setTimeout(() => {
            element.style.transform = '';
            element.style.color = '';
        }, 500);
    }
}

// 9. Interactive Form with Real-time Validation
class EnhancedForm {
    constructor() {
        this.init();
    }

    init() {
        const form = document.getElementById('bookingForm');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
                this.createRipple(input);
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = '';
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    createRipple(input) {
        const ripple = document.createElement('div');
        ripple.className = 'input-ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(13, 148, 136, 0.2);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = input.getBoundingClientRect();
        ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = -Math.max(rect.width, rect.height) / 2 + 'px';
        ripple.style.marginTop = -Math.max(rect.width, rect.height) / 2 + 'px';
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        
        if (type === 'tel') {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (value && !phoneRegex.test(value)) {
                input.style.borderColor = '#dc3545';
                this.showError(input, 'Please enter a valid 10-digit mobile number');
            } else {
                input.style.borderColor = '#0D9488';
                this.hideError(input);
            }
        } else if (value) {
            input.style.borderColor = '#0D9488';
            this.hideError(input);
        }
    }

    showError(input, message) {
        let errorEl = input.parentElement.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.style.cssText = `
                color: #dc3545;
                font-size: 0.85rem;
                margin-top: 0.5rem;
                animation: slideDown 0.3s ease;
            `;
            input.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    hideError(input) {
        const errorEl = input.parentElement.querySelector('.error-message');
        if (errorEl) {
            errorEl.remove();
        }
    }
}

// 10. Dynamic Service Card Interactions
class ServiceCardEnhancer {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.service-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateIcon(card);
                this.highlightFeatures(card);
            });
        });
    }

    animateIcon(card) {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                icon.style.animation = '';
            }, 600);
        }
    }

    highlightFeatures(card) {
        const features = card.querySelectorAll('li');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateX(10px)';
                feature.style.color = '#0D9488';
                setTimeout(() => {
                    feature.style.transform = '';
                    feature.style.color = '';
                }, 300);
            }, index * 100);
        });
    }
}

// 11. Dynamic Testimonials Carousel
class TestimonialsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.init();
    }

    init() {
        const reviews = document.querySelectorAll('.review-card');
        if (reviews.length < 2) return;

        // Auto-rotate reviews
        setInterval(() => {
            this.rotateReviews(reviews);
        }, 5000);

        // Add hover pause
        reviews.forEach(review => {
            review.addEventListener('mouseenter', () => {
                this.paused = true;
            });
            review.addEventListener('mouseleave', () => {
                this.paused = false;
            });
        });
    }

    rotateReviews(reviews) {
        if (this.paused) return;

        reviews[this.currentIndex].style.opacity = '0.5';
        reviews[this.currentIndex].style.transform = 'scale(0.95)';
        
        this.currentIndex = (this.currentIndex + 1) % reviews.length;
        
        reviews[this.currentIndex].style.opacity = '1';
        reviews[this.currentIndex].style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            reviews.forEach(review => {
                review.style.transition = 'all 0.5s ease';
            });
        }, 100);
    }
}

// 12. Dynamic Button Ripple Effect
class RippleEffect {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.btn, .qty-btn, .calc-tab');
            if (button) {
                this.createRipple(e, button);
            }
        });
    }

    createRipple(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // Initialize all features
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        new CursorFollower();
    }
    
    // Parallax works on all devices but with reduced intensity on mobile
    new ParallaxManager();
    
    new ParticleSystem();
    new TiltCards();
    new EnhancedCalculator();
    new ScrollProgress();
    new EnhancedCounter();
    new EnhancedForm();
    new ServiceCardEnhancer();
    new TestimonialsCarousel();
    new RippleEffect();

    // Typing effect for hero (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const originalText = heroTitle.textContent;
        // You can customize this with different text variations
    }
});

console.log('🎨 Dynamic enhancements loaded!');


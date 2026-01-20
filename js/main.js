// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Floating Action Button with more animations
const fabMain = document.getElementById('fabMain');
const fabOptions = document.getElementById('fabOptions');
let fabOpen = false;

fabMain.addEventListener('click', () => {
    fabOpen = !fabOpen;
    
    if (fabOpen) {
        fabOptions.classList.add('active');
        fabMain.style.transform = 'scale(1.15) rotate(135deg)';
        fabMain.innerHTML = '<i class="fas fa-times"></i>';
        
        // Animate each option with stagger
        const options = document.querySelectorAll('.fab-option');
        options.forEach((option, index) => {
            setTimeout(() => {
                option.style.transform = 'scale(1) translateY(0)';
                option.style.opacity = '1';
            }, index * 100);
        });
    } else {
        fabOptions.classList.remove('active');
        fabMain.style.transform = 'scale(1) rotate(0deg)';
        fabMain.innerHTML = '<i class="fas fa-phone"></i>';
        
        // Reset options
        const options = document.querySelectorAll('.fab-option');
        options.forEach(option => {
            option.style.transform = 'scale(0.8) translateY(20px)';
            option.style.opacity = '0';
        });
    }
});

// Close FAB when clicking outside with animation
document.addEventListener('click', (e) => {
    if (!fabMain.contains(e.target) && !fabOptions.contains(e.target) && fabOpen) {
        fabOpen = false;
        fabOptions.classList.remove('active');
        fabMain.style.transform = 'scale(1) rotate(0deg)';
        fabMain.innerHTML = '<i class="fas fa-phone"></i>';
        
        const options = document.querySelectorAll('.fab-option');
        options.forEach(option => {
            option.style.transform = 'scale(0.8) translateY(20px)';
            option.style.opacity = '0';
        });
    }
});

// Initialize FAB options
document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.fab-option');
    options.forEach(option => {
        option.style.transform = 'scale(0.8) translateY(20px)';
        option.style.opacity = '0';
        option.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Enhanced form handling with bilingual support
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const service = document.getElementById('service').value;
    
    // Get current language
    const currentLang = i18n.getCurrentLanguage();
    
    // Validation messages
    const messages = {
        en: {
            fillFields: 'Please fill in all fields',
            invalidPhone: 'Please enter a valid 10-digit mobile number',
            success: 'Thank you! You will be redirected to WhatsApp to confirm your booking.'
        },
        hi: {
            fillFields: 'कृपया सभी फ़ील्ड भरें',
            invalidPhone: 'कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें',
            success: 'धन्यवाद! आपकी बुकिंग की पुष्टि के लिए आपको WhatsApp पर भेजा जाएगा।'
        }
    };
    
    // Basic validation
    if (!name || !phone || !address || !service) {
        alert(messages[currentLang].fillFields);
        return;
    }
    
    // Phone validation (Indian mobile number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert(messages[currentLang].invalidPhone);
        return;
    }
    
    // Service names in both languages
    const serviceNames = {
        'wash-fold': {
            en: 'Wash & Fold',
            hi: 'धुलाई और तह'
        },
        'dry-clean': {
            en: 'Dry Cleaning', 
            hi: 'ड्राई क्लीनिंग'
        },
        'ironing': {
            en: 'Ironing Only',
            hi: 'केवल इस्त्री'
        },
        'home-textiles': {
            en: 'Home Textiles',
            hi: 'घरेलू वस्त्र'
        }
    };
    
    // Create WhatsApp message in current language
    const serviceName = serviceNames[service][currentLang];
    
    const message = currentLang === 'hi' 
        ? `नमस्ते! मैं ${serviceName} के लिए पिकअप बुक करना चाहता/चाहती हूं।

नाम: ${name}
फोन: ${phone}
पता: ${address}
सेवा: ${serviceName}

कृपया पिकअप का समय बताएं। धन्यवाद!`
        : `Hi! I'd like to book a pickup for ${serviceName}.

Name: ${name}
Phone: ${phone}
Address: ${address}
Service: ${serviceName}

Please confirm the pickup time. Thank you!`;
    
    const whatsappUrl = `https://wa.me/918233853727?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert(messages[currentLang].success);
    
    // Reset form
    this.reset();
});

// Enhanced animations with more attractive effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Add special effects for different elements
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.animation = 'slideInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            } else if (entry.target.classList.contains('pricing-card')) {
                entry.target.style.animation = 'zoomIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            } else if (entry.target.classList.contains('step')) {
                entry.target.style.animation = 'slideInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation with stagger effect
document.querySelectorAll('.service-card, .step, .pricing-card, .stat, .feature-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Enhanced counter animation with easing
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const startTime = performance.now();
        
        const easeOutQuart = (t) => 1 - (--t) * t * t * t;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            const current = Math.floor(easedProgress * target);
            counter.textContent = current + (counter.textContent.includes('%') ? '%' : '+');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
                // Add a celebration effect
                counter.style.animation = 'pulse 0.5s ease-in-out';
            }
        };
        
        // Stagger the counter animations
        setTimeout(() => {
            requestAnimationFrame(updateCounter);
        }, index * 200);
    });
};

// Add particle effect on hover for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        createParticles(e.target);
    });
});

function createParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-50px) scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }).onfinish = () => particle.remove();
    }
}

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    sectionObserver.observe(section);
});

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Enhanced header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        header.style.borderBottom = '1px solid rgba(102, 126, 234, 0.3)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        header.style.borderBottom = '1px solid rgba(102, 126, 234, 0.2)';
    }
});

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('featured')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (card.classList.contains('popular')) {
            card.style.transform = 'scale(1.05) translateY(-10px)';
        } else {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('popular')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0)';
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Close FAB
        fabOptions.classList.remove('active');
        fabMain.style.transform = 'rotate(0deg)';
    }
});

// Focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll(focusableElements));
        const index = focusable.indexOf(document.activeElement);
        
        if (e.shiftKey) {
            const prevIndex = index > 0 ? index - 1 : focusable.length - 1;
            focusable[prevIndex].focus();
        } else {
            const nextIndex = index < focusable.length - 1 ? index + 1 : 0;
            focusable[nextIndex].focus();
        }
    }
});

console.log('GenZ Laundry website loaded successfully!');
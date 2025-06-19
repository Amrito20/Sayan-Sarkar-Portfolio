/**
 * Modern Animations and Effects for Sayan Sarkar's Portfolio
 * Using Vanta.js for 3D backgrounds and Anime.js for smooth animations
 */

let vantaEffect = null;

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeVantaBackground();
    initializePageAnimations();
    initializeScrollAnimations();
    initializeButtonAnimations();
    initializeCardAnimations();
    initializeTypingEffect();
});

// Handle theme changes for Vanta background
document.addEventListener('themeChanged', function() {
    updateVantaTheme();
});

/**
 * Initialize Vanta.js 3D animated background
 */
function initializeVantaBackground() {
    const vantaBg = document.getElementById('vanta-bg');
    if (!vantaBg || !window.VANTA) return;

    // Destroy existing effect if any
    if (vantaEffect) {
        vantaEffect.destroy();
    }

    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    vantaEffect = VANTA.NET({
        el: vantaBg,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: isDarkTheme ? 0x0088ff : 0x005577,
        backgroundColor: isDarkTheme ? 0x001122 : 0x111111,
        points: isDarkTheme ? 10.00 : 8.00,
        maxDistance: isDarkTheme ? 20.00 : 15.00,
        spacing: isDarkTheme ? 15.00 : 12.00
    });
}

/**
 * Update Vanta background based on theme
 */
function updateVantaTheme() {
    if (!vantaEffect) return;
    
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    vantaEffect.setOptions({
        color: isDarkTheme ? 0x0088ff : 0x005577,
        backgroundColor: isDarkTheme ? 0x001122 : 0x111111,
        points: isDarkTheme ? 10.00 : 8.00,
        maxDistance: isDarkTheme ? 20.00 : 15.00,
        spacing: isDarkTheme ? 15.00 : 12.00
    });
}

/**
 * Initialize page entrance animations
 */
function initializePageAnimations() {
    if (!window.anime) return;

    // Animate navigation
    anime({
        targets: '.nav-logo, .nav-link, .theme-toggle, .mobile-theme-toggle',
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutCubic'
    });

    // Animate hero content
    anime({
        targets: '.hero-title',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 300,
        easing: 'easeOutCubic'
    });

    anime({
        targets: '.hero-description',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 600,
        easing: 'easeOutCubic'
    });

    anime({
        targets: '.hero-buttons .btn',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(150, {start: 900}),
        easing: 'easeOutCubic'
    });

    anime({
        targets: '.social-link',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(100, {start: 1200}),
        easing: 'easeOutBack'
    });

    // Animate profile image
    anime({
        targets: '.profile-photo',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        delay: 400,
        easing: 'easeOutCubic'
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initializeScrollAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateOnScroll(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, .skill-card, .experience-card, .timeline-item, .about-content p, .contact-method, .network-card'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll(element) {
    if (element.classList.contains('animated') || !window.anime) return;
    element.classList.add('animated');

    if (element.classList.contains('section-title')) {
        anime({
            targets: element,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutCubic'
        });
    } else if (element.classList.contains('skill-card')) {
        anime({
            targets: element,
            translateY: [40, 0],
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 600,
            easing: 'easeOutCubic'
        });
    } else if (element.classList.contains('experience-card') || element.classList.contains('timeline-item')) {
        anime({
            targets: element,
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutCubic'
        });
    } else if (element.classList.contains('contact-method') || element.classList.contains('network-card')) {
        anime({
            targets: element,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            delay: Math.random() * 200,
            easing: 'easeOutCubic'
        });
    } else {
        anime({
            targets: element,
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutCubic'
        });
    }
}

/**
 * Initialize button hover animations
 */
function initializeButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (window.anime) {
                anime({
                    targets: this,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            }
        });

        button.addEventListener('mouseleave', function() {
            if (window.anime) {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            }
        });

        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Initialize card hover animations
 */
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.skill-card, .experience-card, .timeline-content, .contact-method, .network-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.anime) {
                anime({
                    targets: this,
                    translateY: -5,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }
        });

        card.addEventListener('mouseleave', function() {
            if (window.anime) {
                anime({
                    targets: this,
                    translateY: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }
        });
    });
}

/**
 * Initialize typing effect for hero title
 */
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle || !window.anime) return;

    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    // Add cursor
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    cursor.textContent = '|';
    heroTitle.appendChild(cursor);

    // Typing animation
    anime({
        targets: cursor,
        opacity: [0, 1],
        duration: 500,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    // Type out the text
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent = originalText.slice(0, i + 1);
            heroTitle.appendChild(cursor);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 1000);
}

/**
 * Enhanced scroll to section with smooth animation
 */
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (!element) return;

    const offsetTop = element.offsetTop - 70;
    
    anime({
        targets: document.documentElement,
        scrollTop: offsetTop,
        duration: 800,
        easing: 'easeInOutCubic'
    });
}

/**
 * Cleanup function for page navigation
 */
function cleanupAnimations() {
    if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = null;
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (vantaEffect) {
            vantaEffect.setOptions({ mouseControls: false });
        }
    } else {
        // Resume animations when page is visible
        if (vantaEffect) {
            vantaEffect.setOptions({ mouseControls: true });
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (vantaEffect) {
        vantaEffect.resize();
    }
});

// Export functions for use in other files
window.portfolioAnimations = {
    initializeVantaBackground,
    updateVantaTheme,
    smoothScrollTo,
    cleanupAnimations
}; 
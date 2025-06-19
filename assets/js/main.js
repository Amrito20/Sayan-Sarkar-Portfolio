/**
 * Main JavaScript file for Sayan Sarkar's Portfolio Website
 * Handles theme toggling, mobile navigation, smooth scrolling, and animations
 */

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeSmoothScrolling();
    initializeAnimations();
});

/**
 * Theme Toggle Functionality
 */
function initializeTheme() {
    // Check for saved theme preference or default to dark theme for first-time visitors
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Update all theme icons
    const allThemeIcons = document.querySelectorAll('.theme-icon');
    
    if (savedTheme === 'light') {
        // Light theme: remove dark-theme class to activate light theme styles
        document.body.classList.remove('dark-theme');
        allThemeIcons.forEach(icon => {
            if (icon.textContent) {
                icon.textContent = '☀️';
            } else {
                icon.className = 'fas fa-sun theme-icon';
            }
        });
    } else {
        // Dark theme (default): add dark-theme class to ensure dark theme is active
        document.body.classList.add('dark-theme');
        allThemeIcons.forEach(icon => {
            if (icon.textContent) {
                icon.textContent = '🌙';
            } else {
                icon.className = 'fas fa-moon theme-icon';
            }
        });
    }
    
    // Theme toggle event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark-theme');
    const allThemeIcons = document.querySelectorAll('.theme-icon');
    
    if (isDarkMode) {
        document.body.classList.remove('dark-theme');
        allThemeIcons.forEach(icon => {
            if (icon.textContent) {
                icon.textContent = '☀️';
            } else {
                icon.className = 'fas fa-sun theme-icon';
            }
        });
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-theme');
        allThemeIcons.forEach(icon => {
            if (icon.textContent) {
                icon.textContent = '🌙';
            } else {
                icon.className = 'fas fa-moon theme-icon';
            }
        });
        localStorage.setItem('theme', 'dark');
    }
    
    // Add rotation animation to theme toggle buttons
    [themeToggle, mobileThemeToggle].forEach(button => {
        if (button) {
            button.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                button.style.transform = 'rotate(0deg)';
            }, 300);
        }
    });

    // Update Vanta background theme if available
    if (window.portfolioAnimations && window.portfolioAnimations.updateVantaTheme) {
        window.portfolioAnimations.updateVantaTheme();
    }

    // Dispatch custom event for theme change
    document.dispatchEvent(new CustomEvent('themeChanged'));
}

/**
 * Mobile Navigation Menu
 */
function initializeMobileMenu() {
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar && navbar.contains(event.target);
        if (!isClickInsideNav && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (navMenu) navMenu.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu && navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Scroll Effects for Navigation Bar
 */
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for background effect
        if (navbar) {
            if (scrollTop > 150) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
}

/**
 * Update Active Navigation Link Based on Scroll Position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's nav link
            const activeNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
        }
    });
}

/**
 * Smooth Scrolling for Internal Links
 */
function initializeSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/**
 * Initialize Scroll Animations
 */
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill progress bars
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const width = progressBar.getAttribute('data-width') || '0%';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-card, .experience-card, .timeline-item, .about-content, .philosophy-card, .interest-item, .skill-item, .soft-skill-card, .learning-card, .contact-method, .network-card, .timeline-card, .education-item, .development-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Initialize skill progress bars
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    skillProgressBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

// Handle resize events
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
    // Theme toggle with keyboard shortcut (Ctrl/Cmd + Shift + T)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

// Loading Animation
window.addEventListener('load', function() {
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-text, .hero-image');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

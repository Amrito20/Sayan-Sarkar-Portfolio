/**
 * Page-specific animations and vanta effects for consistent experience
 * Ensures all pages use the same NET effect and proper theme handling
 */

let pageVantaEffect = null;

// Initialize page animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePageVantaBackground();
});

// Handle theme changes
document.addEventListener('themeChanged', function() {
    updatePageVantaTheme();
});

/**
 * Initialize Vanta.js NET background for all pages
 */
function initializePageVantaBackground() {
    const vantaBg = document.getElementById('vanta-bg');
    if (!vantaBg || !window.VANTA || !window.VANTA.NET) {
        console.log('Vanta NET not available, skipping background animation');
        return;
    }

    // Destroy existing effect if any
    if (pageVantaEffect) {
        pageVantaEffect.destroy();
    }

    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    try {
        pageVantaEffect = VANTA.NET({
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
        
        console.log('Vanta NET effect initialized successfully');
    } catch (error) {
        console.error('Error initializing Vanta NET effect:', error);
    }
}

/**
 * Update Vanta background based on theme
 */
function updatePageVantaTheme() {
    if (!pageVantaEffect) {
        // Try to reinitialize if effect doesn't exist
        initializePageVantaBackground();
        return;
    }
    
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    try {
        pageVantaEffect.setOptions({
            color: isDarkTheme ? 0x0088ff : 0x005577,
            backgroundColor: isDarkTheme ? 0x001122 : 0x111111,
            points: isDarkTheme ? 10.00 : 8.00,
            maxDistance: isDarkTheme ? 20.00 : 15.00,
            spacing: isDarkTheme ? 15.00 : 12.00
        });
    } catch (error) {
        console.error('Error updating Vanta theme:', error);
        // Reinitialize if update fails
        initializePageVantaBackground();
    }
}

/**
 * Clean up vanta effect on page unload
 */
window.addEventListener('beforeunload', function() {
    if (pageVantaEffect) {
        pageVantaEffect.destroy();
    }
});

// Make functions available globally for debugging
window.portfolioPageAnimations = {
    initializePageVantaBackground,
    updatePageVantaTheme
}; 
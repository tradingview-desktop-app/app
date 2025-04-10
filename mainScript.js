// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Cookie Consent Management
function createCookieBanner() {
    if (document.querySelector('.cookie-banner')) {
        return document.querySelector('.cookie-banner');
    }

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-text">
                <p>We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. View our <a href="cookie-policy.html">Cookie Policy</a> for more information.</p>
            </div>
            <div class="cookie-buttons">
                <button class="cookie-button cookie-accept-all">Accept All</button>
                <button class="cookie-button cookie-reject-all">Reject All</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    return banner;
}

function saveCookiePreferences(accepted) {
    localStorage.setItem('cookieConsent', JSON.stringify({
        timestamp: new Date().toISOString(),
        accepted: accepted
    }));
}

function getCookiePreferences() {
    const consent = localStorage.getItem('cookieConsent');
    return consent ? JSON.parse(consent) : null;
}

function initCookieConsent() {
    const existingConsent = getCookiePreferences();
    
    if (!existingConsent) {
        const banner = createCookieBanner();
        
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                banner.classList.add('show');
            });
        });

        banner.querySelector('.cookie-accept-all').addEventListener('click', () => {
            saveCookiePreferences(true);
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        });

        banner.querySelector('.cookie-reject-all').addEventListener('click', () => {
            saveCookiePreferences(false);
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 300);
        });
    }
}

// Add cookie settings link to footer
function addCookieSettingsLink() {
    const footerLinks = document.querySelector('.footer-links');
    if (footerLinks) {
        const settingsLink = document.createElement('a');
        settingsLink.href = '#';
        settingsLink.textContent = 'Cookie Settings';
        settingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('cookieConsent');
            initCookieConsent();
        });
        footerLinks.appendChild(settingsLink);
    }
}

// Initialize cookie consent banner and settings
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure proper initialization
    setTimeout(() => {
        initCookieConsent();
        addCookieSettingsLink();
    }, 100);
});
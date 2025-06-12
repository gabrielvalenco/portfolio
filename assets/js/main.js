// Main JavaScript file for portfolio functionality
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.handleLoading();
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initAOS();
            this.setupNavigation();
            this.setupScrollEffects();
            this.setupTypingEffect();
            this.setupBackToTop();
            this.hideLoading();
        });

        // Window Load
        window.addEventListener('load', () => {
            this.hideLoading();
        });

        // Scroll Events
        window.addEventListener('scroll', this.throttle(() => {
            this.updateScrollProgress();
            this.updateNavbarOnScroll();
            this.updateActiveNavLink();
            this.toggleBackToTop();
        }, 16));

        // Resize Events
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    initializeComponents() {
        // Initialize all components
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupProjectCards();
        this.setupContactMethods();
    }

    // Loading Screen
    handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Simulate loading time
            setTimeout(() => {
                this.hideLoading();
            }, 1500);
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // AOS (Animate On Scroll) Initialization
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                disable: window.innerWidth < 768 ? 'mobile' : false
            });
        }
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // Scroll Effects
    setupScrollEffects() {
        this.updateScrollProgress();
        this.updateNavbarOnScroll();
    }

    updateScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        if (scrollProgress) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    updateNavbarOnScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Typing Effect
    setupTypingEffect() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;

        const texts = [
            'Full-Stack Developer',
            'Laravel Specialist',
            'Python Developer',
            'JavaScript Expert',
            'Flutter Developer',
            'Problem Solver'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        // Already handled in CSS with scroll-behavior: smooth
        // This is a fallback for browsers that don't support it
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 70;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Back to Top Button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    toggleBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    // Project Cards
    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, false);
            });
        });
    }

    animateProjectCard(card, isHover) {
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        
        if (isHover) {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.opacity = '1';
            }
        } else {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.opacity = '0';
            }
        }
    }

    // Contact Methods
    setupContactMethods() {
        const contactMethods = document.querySelectorAll('.contact-method');
        
        contactMethods.forEach(method => {
            method.addEventListener('click', (e) => {
                // Add click animation
                method.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    method.style.transform = '';
                }, 150);
            });
        });
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Handle Resize
    handleResize() {
        // Reinitialize AOS on resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that need animation
        const animateElements = document.querySelectorAll('.tech-item, .project-card, .contact-method');
        animateElements.forEach(el => observer.observe(el));
    }

    // Performance optimizations
    preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Error handling
    handleErrors() {
        window.addEventListener('error', (e) => {
            console.error('Portfolio Error:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }
}

// Initialize the portfolio app
const portfolioApp = new PortfolioApp();

// Additional utility functions
const Utils = {
    // Smooth scroll to element
    scrollToElement(elementId, offset = 70) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy text: ', err);
            return false;
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, Utils };
}


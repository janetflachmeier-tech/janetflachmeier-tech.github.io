// Janet Flachmeier Portfolio - JavaScript Enhancements
// Enhanced interactivity and animations

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initSmoothScrolling();
    initTypingAnimation();
    initScrollAnimations();
    initFormValidation();
    initActiveNavigation();
    
});

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.Navbar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation
                updateActiveNav(this);
            }
        });
    });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const quoteElement = document.querySelector('.Video_Text q');
    if (!quoteElement) return;
    
    const originalText = quoteElement.textContent;
    const typingSpeed = 50; // milliseconds per character
    
    // Clear the text initially
    quoteElement.textContent = '';
    quoteElement.style.borderRight = '2px solid #333333';
    quoteElement.style.paddingRight = '5px';
    
    let charIndex = 0;
    
    function typeCharacter() {
        if (charIndex < originalText.length) {
            quoteElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                quoteElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeCharacter, 1500);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.Row, .Video_Text');
    sections.forEach(section => {
        section.classList.add('scroll-animate');
        observer.observe(section);
    });
}

// ===== ACTIVE NAVIGATION =====
function initActiveNavigation() {
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('.Navbar a');
    
    // Create intersection observer for navigation highlighting
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                const currentLink = document.querySelector(`.Navbar a[href="#${currentId}"]`);
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current link
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
}

function updateActiveNav(clickedLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.Navbar a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    clickedLink.classList.add('active');
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('input[placeholder*="name"]');
    const emailInput = document.querySelector('#Email');
    const messageInput = document.querySelector('#Message');
    const submitButton = document.querySelector('input[type="submit"]');
    
    if (!form) return;
    
    // Add real-time validation
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateName(nameInput));
        nameInput.addEventListener('input', () => clearError(nameInput));
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => validateEmail(emailInput));
        emailInput.addEventListener('input', () => clearError(emailInput));
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', () => validateMessage(messageInput));
        messageInput.addEventListener('input', () => clearError(messageInput));
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isValidName = validateName(nameInput);
        const isValidEmail = validateEmail(emailInput);
        const isValidMessage = validateMessage(messageInput);
        
        if (isValidName && isValidEmail && isValidMessage) {
            // Show success message
            showFormSuccess();
        } else {
            // Show error message
            showFormError();
        }
    });
}

function validateName(input) {
    if (!input) return false;
    
    const name = input.value.trim();
    if (name.length < 2) {
        showError(input, 'Name must be at least 2 characters long');
        return false;
    }
    showSuccess(input);
    return true;
}

function validateEmail(input) {
    if (!input) return false;
    
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showError(input, 'Please enter a valid email address');
        return false;
    }
    showSuccess(input);
    return true;
}

function validateMessage(input) {
    if (!input) return false;
    
    const message = input.value.trim();
    if (message.length < 10) {
        showError(input, 'Message must be at least 10 characters long');
        return false;
    }
    showSuccess(input);
    return true;
}

function showError(input, message) {
    clearError(input);
    input.style.borderColor = '#e74c3c';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorDiv);
}

function showSuccess(input) {
    clearError(input);
    input.style.borderColor = '#27ae60';
}

function clearError(input) {
    input.style.borderColor = '#ccc';
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showFormSuccess() {
    const form = document.querySelector('form');
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <p style="color: #27ae60; font-weight: bold; text-align: center; padding: 15px; background: #d4edda; border-radius: 5px; margin-top: 10px;">
            ✓ Thank you! Your message has been sent successfully.
        </p>
    `;
    
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-success, .form-error');
    if (existingMessage) existingMessage.remove();
    
    form.appendChild(successDiv);
    
    // Reset form after success
    setTimeout(() => {
        form.reset();
        successDiv.remove();
        // Clear all validation styling
        const inputs = form.querySelectorAll('input[type="text"]');
        inputs.forEach(input => clearError(input));
    }, 3000);
}

function showFormError() {
    const form = document.querySelector('form');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <p style="color: #e74c3c; font-weight: bold; text-align: center; padding: 15px; background: #f8d7da; border-radius: 5px; margin-top: 10px;">
            ✗ Please fix the errors above before submitting.
        </p>
    `;
    
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-success, .form-error');
    if (existingMessage) existingMessage.remove();
    
    form.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// ===== UTILITY FUNCTIONS =====

// Add loading animation for better UX
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Add parallax effect to video background
function initParallaxEffect() {
    const video = document.querySelector('#Typing_Video');
    if (!video) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        video.style.transform = `translateY(${rate}px)`;
    });
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
});
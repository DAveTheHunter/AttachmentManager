/**
 * Horizon Digital Solutions - Main JavaScript
 * Handles interactive elements and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && !event.target.closest('nav') && !event.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('.scroll-btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                }
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const message = form.querySelector('#message');
            
            if (name && name.value.trim() === '') {
                valid = false;
                showError(name, 'Please enter your name');
            } else if (name) {
                removeError(name);
            }
            
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email.value.trim() === '') {
                    valid = false;
                    showError(email, 'Please enter your email');
                } else if (!emailRegex.test(email.value.trim())) {
                    valid = false;
                    showError(email, 'Please enter a valid email');
                } else {
                    removeError(email);
                }
            }
            
            if (message && message.value.trim() === '') {
                valid = false;
                showError(message, 'Please enter your message');
            } else if (message) {
                removeError(message);
            }
            
            if (valid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                // Insert after form
                form.parentNode.insertBefore(successMessage, form.nextSibling);
                
                // Reset form
                form.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    });
    
    // Helper functions for form validation
    function showError(input, message) {
        // Remove any existing error
        removeError(input);
        
        // Create error message
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        
        // Insert error after input
        input.parentNode.insertBefore(error, input.nextSibling);
        
        // Add error class to input
        input.classList.add('error');
    }
    
    function removeError(input) {
        // Remove error message if exists
        const parent = input.parentNode;
        const error = parent.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        
        // Remove error class from input
        input.classList.remove('error');
    }
    
    // Animation for timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {threshold: 0.2});
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Initialize counters for stats
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetValue = parseInt(target.textContent.replace(/\D/g, ''));
                    
                    animateCounter(target, targetValue);
                    
                    // Unobserve after animation starts
                    statObserver.unobserve(target);
                }
            });
        }, {threshold: 0.5});
        
        stats.forEach(stat => {
            statObserver.observe(stat);
        });
    }
    
    function animateCounter(element, targetValue) {
        let currentValue = 0;
        const increment = Math.ceil(targetValue / 50); // Adjust for smoother animation
        const plus = element.textContent.includes('+') ? '+' : '';
        
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                clearInterval(interval);
                currentValue = targetValue;
            }
            element.textContent = currentValue + plus;
        }, 30);
    }
    
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    navLinks2.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            currentLocation.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
    
    // Add fixed class to header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        });
    }
    
    // Add CSS styles for error and success messages
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: #e74c3c;
            font-size: 1.4rem;
            margin-top: 5px;
        }
        input.error, textarea.error {
            border-color: #e74c3c;
        }
        .success-message {
            background-color: #2ecc71;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
        }
        .fixed {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
});

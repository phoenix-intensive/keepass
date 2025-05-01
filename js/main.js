document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-toggle').textContent = '+';
                }
            });

            // Toggle current item
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.display = 'block';
                toggle.textContent = '-';
            } else {
                answer.style.display = 'none';
                toggle.textContent = '+';
            }
        });
    });

    const cookieConsent = document.getElementById("cookieConsent")
    const acceptCookies = document.getElementById("acceptCookies")
    const declineCookies = document.getElementById("declineCookies")

    // Check if user has already made a choice
    const cookieChoice = document.cookie.split(";").some((item) => item.trim().startsWith("cookieConsent="))

    // If no choice has been made, show the banner
    if (!cookieChoice) {
        cookieConsent.classList.add("show")
    }

    // Accept cookies
    acceptCookies.addEventListener("click", () => {
        // Set cookie to remember user's choice (expires in 365 days)
        document.cookie = "cookieConsent=accepted; max-age=" + 60 * 60 * 24 * 365 + "; path=/; SameSite=Lax"
        document.cookie = "cookiePreference=all; max-age=" + 60 * 60 * 24 * 365 + "; path=/; SameSite=Lax"

        // Hide the banner
        cookieConsent.classList.remove("show")

        // Enable all cookies/tracking (in a real implementation, this would activate various tracking scripts)
        enableAllCookies()
    })

    // Decline non-essential cookies
    declineCookies.addEventListener("click", () => {
        // Set cookie to remember user's choice (expires in 365 days)
        document.cookie = "cookieConsent=declined; max-age=" + 60 * 60 * 24 * 365 + "; path=/; SameSite=Lax"
        document.cookie = "cookiePreference=essential; max-age=" + 60 * 60 * 24 * 365 + "; path=/; SameSite=Lax"

        // Hide the banner
        cookieConsent.classList.remove("show")

        // Disable non-essential cookies/tracking
        disableNonEssentialCookies()
    })

    // Function to enable all cookies (placeholder)
    function enableAllCookies() {
        console.log("All cookies enabled")
        // In a real implementation, this would initialize analytics, ads, etc.
    }

    // Function to disable non-essential cookies (placeholder)
    function disableNonEssentialCookies() {
        console.log("Only essential cookies enabled")
        // In a real implementation, this would ensure only essential cookies are used
    }

    // Check existing preference and apply appropriate settings
    if (document.cookie.split(";").some((item) => item.trim().startsWith("cookiePreference=all"))) {
        enableAllCookies()
    } else if (document.cookie.split(";").some((item) => item.trim().startsWith("cookiePreference=essential"))) {
        disableNonEssentialCookies()
    }

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');

    if (testimonials.length > 0 && dots.length > 0) {
        let currentSlide = 0;

        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Function to show a specific slide
        function showSlide(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });

            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Show the selected testimonial and activate the corresponding dot
            testimonials[index].style.display = 'block';
            dots[index].classList.add('active');

            // Update current slide index
            currentSlide = index;
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Event listeners for prev/next buttons
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) {
                    newIndex = testimonials.length - 1;
                }
                showSlide(newIndex);
            });

            nextButton.addEventListener('click', () => {
                let newIndex = currentSlide + 1;
                if (newIndex >= testimonials.length) {
                    newIndex = 0;
                }
                showSlide(newIndex);
            });
        }

        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Close mobile menu if open
                    if (navList && navList.classList.contains('active')) {
                        navList.classList.remove('active');
                    }

                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const formElements = this.elements;

            // Basic validation
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else if (formElements[i].type === 'email' && formElements[i].value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(formElements[i].value.trim())) {
                        isValid = false;
                        formElements[i].classList.add('error');
                    } else {
                        formElements[i].classList.remove('error');
                    }
                } else {
                    formElements[i].classList.remove('error');
                }
            }

            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;

                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';

                // Simulate API call
                setTimeout(function() {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;

                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';

                    contactForm.appendChild(successMessage);

                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }

    // Add CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: var(--error-color) !important;
        }
        
        .form-success {
            background-color: var(--success-color);
            color: white;
            padding: var(--spacing-sm);
            border-radius: var(--border-radius-md);
            margin-top: var(--spacing-md);
            text-align: center;
        }
    `;

    document.head.appendChild(style);

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .step, .feature-item, .plugin-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .benefit-card, .step, .feature-item, .plugin-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .benefit-card.animate, .step.animate, .feature-item.animate, .plugin-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .benefit-card:nth-child(2), .step:nth-child(2), .feature-item:nth-child(2), .plugin-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .benefit-card:nth-child(3), .step:nth-child(3), .feature-item:nth-child(3), .plugin-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .benefit-card:nth-child(4), .step:nth-child(4), .feature-item:nth-child(4), .plugin-card:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;

    document.head.appendChild(animationStyle);

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '&uarr;';
    document.body.appendChild(backToTopButton);

    // Add styles for back to top button
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 999;
            box-shadow: var(--shadow-md);
            transition: background-color var(--transition-normal);
        }
        
        .back-to-top:hover {
            background-color: var(--primary-dark);
        }
        
        .back-to-top.visible {
            display: block;
        }
    `;

    document.head.appendChild(backToTopStyle);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
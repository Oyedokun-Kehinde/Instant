 // Mobile Responsive JavaScript
        
        document.addEventListener('DOMContentLoaded', function() {
            // Create mobile menu toggle button
            const navbar = document.querySelector('.navbar');
            const navList = navbar.querySelector('ul');
            
            // Create toggle button if it doesn't exist
            if (!navbar.querySelector('.mobile-menu-toggle')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'mobile-menu-toggle';
                toggleBtn.setAttribute('aria-label', 'Toggle mobile menu');
                navbar.appendChild(toggleBtn);
                
                // Add click event to toggle button
                toggleBtn.addEventListener('click', function() {
                    navList.classList.toggle('active');
                    toggleBtn.classList.toggle('active');
                });
            }
            
            // Close mobile menu when clicking on a link
            const navLinks = navList.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navList.classList.remove('active');
                    const toggleBtn = navbar.querySelector('.mobile-menu-toggle');
                    if (toggleBtn) {
                        toggleBtn.classList.remove('active');
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navbar.contains(event.target)) {
                    navList.classList.remove('active');
                    const toggleBtn = navbar.querySelector('.mobile-menu-toggle');
                    if (toggleBtn) {
                        toggleBtn.classList.remove('active');
                    }
                }
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navList.classList.remove('active');
                    const toggleBtn = navbar.querySelector('.mobile-menu-toggle');
                    if (toggleBtn) {
                        toggleBtn.classList.remove('active');
                    }
                }
            });
            
            // Smooth scrolling for mobile
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            // Touch-friendly button effects
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                });
                
                button.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
            
            // Optimize images for mobile
            function optimizeImagesForMobile() {
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                });
            }
            
            optimizeImagesForMobile();
            
            // Mobile-specific form handling
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    // Add mobile-friendly input handling
                    input.addEventListener('focus', function() {
                        // Scroll input into view on mobile
                        if (window.innerWidth <= 768) {
                            setTimeout(() => {
                                this.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                });
                            }, 300);
                        }
                    });
                });
            });
            
            // Mobile swipe detection for testimonials (optional enhancement)
            let touchStartX = 0;
            let touchEndX = 0;
            
            const testimonialContainer = document.querySelector('.testimonial-container');
            if (testimonialContainer) {
                testimonialContainer.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                });
                
                testimonialContainer.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                });
                
                function handleSwipe() {
                    const swipeThreshold = 50;
                    const diff = touchStartX - touchEndX;
                    
                    if (Math.abs(diff) > swipeThreshold) {
                        // Add swipe functionality here if needed
                        console.log(diff > 0 ? 'Swiped left' : 'Swiped right');
                    }
                }
            }
            
            // Lazy loading for mobile performance
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '50px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, observerOptions);
            
            // Observe images for lazy loading
            document.querySelectorAll('img[data-src]').forEach(img => {
                observer.observe(img);
            });
            
            // Mobile viewport height fix for iOS
            function setMobileHeight() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
            
            setMobileHeight();
            window.addEventListener('resize', setMobileHeight);
            window.addEventListener('orientationchange', setMobileHeight);
        });
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }
    });

    // Scroll Animation Observer
    const animateElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // WhatsApp Form Submission
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const serviceSelect = document.getElementById('service');
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
            const message = document.getElementById('message').value;
            
            const whatsappNumber = '254729292990';
            const text = `Hello Eco Septic Ventures,%0A%0AI would like to make an inquiry from your website:%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${serviceText}%0A*Message:* ${message}`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // Portfolio Slider Navigation
    const projectSections = document.querySelectorAll('.project-section');
    projectSections.forEach(section => {
        const track = section.querySelector('.slider-track');
        const prevBtn = section.querySelector('.prev-btn');
        const nextBtn = section.querySelector('.next-btn');

        if (track && prevBtn && nextBtn) {
            const scrollAmount = 315; // slide width (300) + gap (15)

            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            // Touch/swipe support is handled natively by overflow-x: auto
            // Auto-slide on mobile for engagement
            let autoSlideInterval;
            const startAutoSlide = () => {
                autoSlideInterval = setInterval(() => {
                    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                        track.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }, 4000);
            };

            const stopAutoSlide = () => {
                clearInterval(autoSlideInterval);
            };

            // Start auto-slide, pause on hover/touch
            startAutoSlide();
            track.addEventListener('mouseenter', stopAutoSlide);
            track.addEventListener('mouseleave', startAutoSlide);
            track.addEventListener('touchstart', stopAutoSlide, { passive: true });
            track.addEventListener('touchend', () => {
                setTimeout(startAutoSlide, 3000);
            }, { passive: true });

            // Pause auto-slide when buttons are used
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                setTimeout(startAutoSlide, 6000);
            });
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                setTimeout(startAutoSlide, 6000);
            });
        }
    });
});

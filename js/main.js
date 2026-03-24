/**
 * MrKingBon Portfolio - Main JavaScript
 * Handles animations, particles, scroll effects, and interactions
 */

(function() {
    'use strict';

    // ============================================
    // Configuration
    // ============================================
    const CONFIG = {
        scrollOffset: 80,
        revealThreshold: 0.1,
        navBreakpoint: 768,
        typeSpeed: 80,
        typeWords: [
            'Payment Gateways',
            'Gaming Platforms',
            'Digital Experiences',
            'API Architecture',
            'Scalable Systems'
        ]
    };

    // ============================================
    // DOM Elements
    // ============================================
    const elements = {
        navbar: document.getElementById('navbar'),
        navToggle: document.getElementById('nav-toggle'),
        navLinks: document.getElementById('nav-links'),
        backToTop: document.getElementById('back-to-top'),
        typedText: document.getElementById('typed-text'),
        year: document.getElementById('year'),
        canvas: document.getElementById('particles-canvas'),
        sections: document.querySelectorAll('section[id]'),
        revealElements: document.querySelectorAll('.reveal, .skill-category, .project-card')
    };

    // ============================================
    // Initialize
    // ============================================
    function init() {
        setCurrentYear();
        initParticles();
        initTypewriter();
        initScrollEffects();
        initNavigation();
        initBackToTop();
        initSmoothScroll();
        initRevealAnimations();
    }

    // ============================================
    // Set Current Year
    // ============================================
    function setCurrentYear() {
        if (elements.year) {
            elements.year.textContent = new Date().getFullYear();
        }
    }

    // ============================================
    // Particle Canvas Background
    // ============================================
    function initParticles() {
        if (!elements.canvas) return;

        const ctx = elements.canvas.getContext('2d');
        let particles = [];
        let animationFrame;
        let mouse = { x: null, y: null, radius: 150 };

        // Resize canvas
        function resizeCanvas() {
            elements.canvas.width = window.innerWidth;
            elements.canvas.height = window.innerHeight;
            initParticlesArray();
        }

        // Initialize particles
        function initParticlesArray() {
            particles = [];
            const particleCount = Math.floor((elements.canvas.width * elements.canvas.height) / 15000);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * elements.canvas.width,
                    y: Math.random() * elements.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 0.5,
                    color: Math.random() > 0.5 ? 'rgba(0, 242, 255, 0.3)' : 'rgba(124, 58, 237, 0.3)',
                    alpha: Math.random() * 0.5 + 0.1
                });
            }
        }

        // Draw particles
        function draw() {
            ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);

            particles.forEach((p, i) => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Boundary check
                if (p.x < 0 || p.x > elements.canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > elements.canvas.height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - p.x;
                    const dy = particles[j].y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 242, 255, ${0.1 * (1 - distance / 120)})`;
                        ctx.globalAlpha = 0.1 * (1 - distance / 120);
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Mouse interaction
                if (mouse.x !== null) {
                    const mdx = mouse.x - p.x;
                    const mdy = mouse.y - p.y;
                    const mDistance = Math.sqrt(mdx * mdx + mdy * mdy);

                    if (mDistance < mouse.radius) {
                        ctx.beginPath();
                        const angle = Math.atan2(mdy, mdx);
                        const force = (mouse.radius - mDistance) / mouse.radius;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(
                            p.x + Math.cos(angle) * force * 30,
                            p.y + Math.sin(angle) * force * 30
                        );
                        ctx.strokeStyle = 'rgba(0, 242, 255, 0.3)';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });

            animationFrame = requestAnimationFrame(draw);
        }

        // Mouse move handler
        elements.canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        elements.canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200);
        });

        // Start
        resizeCanvas();
        draw();
    }

    // ============================================
    // Typewriter Effect
    // ============================================
    function initTypewriter() {
        if (!elements.typedText) return;

        const words = CONFIG.typeWords;
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeTimeout;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                elements.typedText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                elements.typedText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = CONFIG.typeSpeed;

            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            typeTimeout = setTimeout(type, typeSpeed);
        }

        type();
    }

    // ============================================
    // Scroll Effects (Navbar & Back to Top)
    // ============================================
    function initScrollEffects() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Navbar background
            if (currentScroll > 50) {
                elements.navbar.classList.add('scrolled');
            } else {
                elements.navbar.classList.remove('scrolled');
            }

            // Back to top button
            if (currentScroll > 500) {
                elements.backToTop.classList.add('visible');
            } else {
                elements.backToTop.classList.remove('visible');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // Navigation (Mobile Toggle)
    // ============================================
    function initNavigation() {
        // Toggle button
        elements.navToggle.addEventListener('click', () => {
            elements.navToggle.classList.toggle('active');
            elements.navLinks.classList.toggle('active');
            document.body.style.overflow = elements.navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                elements.navToggle.classList.remove('active');
                elements.navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Active link on scroll
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    // ============================================
    // Back to Top Button
    // ============================================
    function initBackToTop() {
        elements.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offset = CONFIG.scrollOffset;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Reveal Animations on Scroll
    // ============================================
    function initRevealAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: CONFIG.revealThreshold
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Stagger animation for cards
                    if (entry.target.classList.contains('skill-category') ||
                        entry.target.classList.contains('project-card')) {
                        const siblings = entry.target.parentElement.querySelectorAll(
                            '.skill-category, .project-card'
                        );
                        siblings.forEach((sibling, index) => {
                            if (sibling !== entry.target) {
                                const delay = (index - [...siblings].indexOf(entry.target)) * 100;
                                sibling.style.transitionDelay = `${Math.abs(delay)}ms`;
                            }
                        });
                    }
                }
            });
        }, observerOptions);

        elements.revealElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // Counter Animation for Stats
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Start animation when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }

    // ============================================
    // Run on DOM Ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Run counter animation after a delay
    setTimeout(animateCounters, 1000);

})();
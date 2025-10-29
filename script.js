// Configuración de Particles.js para el hero
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Animación de fade-in al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Animación del hero al cargar
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content .fade-in');
        if (heroContent) {
            heroContent.classList.add('visible');
        }
    }, 500);

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajustar por el header fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Formulario de contacto con integración Make
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Validación básica
            if (!data.name || !data.email || !data.message || !data.service) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }

            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }

            // Preparar datos para el webhook
            const webhookData = {
                name: data.name,
                email: data.email,
                company: data.company || '',
                service: data.service,
                budget: data.budget || '',
                message: data.message,
                timestamp: new Date().toISOString(),
                source: 'portfolio_web'
            };

            // Cambiar estado del botón
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            submitBtn.disabled = true;

            try {
                // Enviar datos al webhook de Make
                const response = await fetch('https://hook.eu2.make.com/fmneaimq30r6ryr9skbht53nxce36amf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(webhookData)
                });

                if (response.ok) {
                    // Éxito
                    showNotification('¡Mensaje enviado exitosamente! Me pondré en contacto contigo pronto.', 'success');

                    // Limpiar formulario
                    this.reset();

                    // Enviar evento a analytics si está disponible
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submission', {
                            event_category: 'engagement',
                            event_label: 'contact_form'
                        });
                    }
                } else {
                    throw new Error('Error en el envío');
                }

            } catch (error) {
                console.error('Error al enviar formulario:', error);
                showNotification('Error al enviar el mensaje. Por favor intenta de nuevo o contáctame directamente.', 'error');
            } finally {
                // Restaurar botón
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        if (type === 'success') {
            notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
        } else if (type === 'error') {
            notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
        } else {
            notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
        }

        // Agregar al DOM
        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Animación de números en estadísticas
    function animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Efecto de parallax en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-bg');
        
        if (hero && window.innerWidth > 768) {
            const speed = scrolled * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        }
    });

    // Activar animaciones cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        // Animación de escritura para el título principal
        const mainTitle = document.querySelector('h1');
        if (mainTitle) {
            const originalText = mainTitle.textContent;
            // typeWriter(mainTitle, originalText, 50);
        }

        // Animación de aparición de elementos del portafolio
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Cerrar menú móvil al hacer click en un enlace
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Animación de carga de la página
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animar elementos del hero
        const heroElements = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content .btn');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Prevenir el comportamiento por defecto del formulario si JavaScript está deshabilitado
    if (typeof window.addEventListener === 'function') {
        // JavaScript está habilitado, el formulario funcionará normalmente
    } else {
        // JavaScript está deshabilitado, mostrar mensaje alternativo
        const form = document.getElementById('contact-form');
        if (form) {
            form.innerHTML = '<p class="text-center text-gray-600">Por favor habilita JavaScript para usar el formulario de contacto.</p>';
        }
    }

    // Función para manejar el estado de carga de la página
    function handlePageLoad() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }

    // Agregar clase para ocultar el loader cuando la página esté completamente cargada
    window.addEventListener('load', handlePageLoad);

    // Funcionalidad adicional para mejorar la experiencia del usuario
    
    // Detectar cuando el usuario se acerca al final de la página
    window.addEventListener('scroll', function() {
        const scrollPosition = window.innerHeight + window.scrollY;
        const bodyHeight = document.body.offsetHeight;
        
        // Si el usuario está cerca del final, mostrar CTA flotante
        if (scrollPosition > bodyHeight - 1000) {
            showFloatingCTA();
        } else {
            hideFloatingCTA();
        }
    });

    // CTA flotante
    function showFloatingCTA() {
        let floatingCTA = document.getElementById('floating-cta');
        if (!floatingCTA) {
            floatingCTA = document.createElement('div');
            floatingCTA.id = 'floating-cta';
            floatingCTA.className = 'fixed bottom-6 right-6 z-40 transform translate-x-full transition-transform duration-300';
            floatingCTA.innerHTML = `
                <a href="https://fiverr.com" target="_blank" class="btn-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center">
                    <i class="fab fa-fiverr mr-2"></i>
                    Contratar en Fiverr
                </a>
            `;
            document.body.appendChild(floatingCTA);
        }
        
        setTimeout(() => {
            floatingCTA.classList.remove('translate-x-full');
        }, 100);
    }

    function hideFloatingCTA() {
        const floatingCTA = document.getElementById('floating-cta');
        if (floatingCTA) {
            floatingCTA.classList.add('translate-x-full');
        }
    }

    // Mejorar la accesibilidad
    document.addEventListener('keydown', function(e) {
        // Permitir navegación con teclado en el menú móvil
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });

    // Optimización de rendimiento y Core Web Vitals
    let ticking = false;

    function updateOnScroll() {
        // Actualizar animaciones basadas en scroll
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Optimización de Largest Contentful Paint (LCP)
    function optimizeLCP() {
        // Precargar imagen del hero
        const heroImage = document.querySelector('.hero-bg');
        if (heroImage) {
            const img = new Image();
            img.src = 'hero-image.png';
        }

        // Priorizar carga de contenido above the fold
        const criticalImages = document.querySelectorAll('img[loading="eager"]');
        criticalImages.forEach(img => {
            img.decoding = 'sync';
            img.fetchPriority = 'high';
        });
    }

    // Optimización de Cumulative Layout Shift (CLS)
    function preventLayoutShift() {
        // Reservar espacio para imágenes
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
                img.style.aspectRatio = '16/9'; // Ratio común para evitar CLS
            }
        });
    }

    // Ejecutar optimizaciones al cargar
    optimizeLCP();
    preventLayoutShift();

    // Función para manejar errores de carga de recursos
    window.addEventListener('error', function(e) {
        console.warn('Error al cargar recurso:', e.target);
        // Intentar cargar recursos alternativos si falla alguno
    }, true);

    // Funcionalidad del carrusel de portafolio con lazy loading
    function initPortfolioCarousel() {
        const carousels = document.querySelectorAll('.carousel-container');

        carousels.forEach(carousel => {
            const imagesContainer = carousel.querySelector('.carousel-images');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            const indicators = carousel.querySelectorAll('.indicator');

            let currentIndex = 0;
            const totalImages = imagesContainer.children.length;

            function updateCarousel() {
                imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

                // Actualizar indicadores
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });

                // Lazy loading: precargar imagen siguiente
                preloadNextImage();
            }

            function preloadNextImage() {
                const nextIndex = (currentIndex + 1) % totalImages;
                const nextImage = imagesContainer.children[nextIndex];
                if (nextImage && nextImage.tagName === 'IMG') {
                    const img = new Image();
                    img.src = nextImage.src;
                }
            }

            function nextImage() {
                currentIndex = (currentIndex + 1) % totalImages;
                updateCarousel();
            }

            function prevImage() {
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                updateCarousel();
            }

            // Event listeners para botones
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    nextImage();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    prevImage();
                });
            }

            // Event listeners para indicadores
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = index;
                    updateCarousel();
                });
            });

            // Auto-play opcional (cada 5 segundos)
            let autoPlayInterval = setInterval(nextImage, 5000);

            // Pausar auto-play al hover
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            carousel.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextImage, 5000);
            });
        });
    }

    // Inicializar carrusel cuando el DOM esté listo
    initPortfolioCarousel();

    console.log('✅ Sitio web cargado correctamente. ¡Bienvenido a mi portfolio!');
});
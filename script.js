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
    
    // Chatbot de FAQ basado en reglas
    class FAQChatbot {
        constructor() {
            this.faqData = null;
            this.chatContainer = null;
            this.isOpen = false;
            window.faqChatbot = this;
            this.init();
        }

        async init() {
            try {
                // Cargar datos del FAQ
                const response = await fetch('faq.json');
                this.faqData = await response.json();

                // Crear interfaz del chatbot
                this.createChatInterface();

                // Agregar event listeners
                this.addEventListeners();

                console.log('🤖 Chatbot FAQ inicializado correctamente');
            } catch (error) {
                console.error('Error al inicializar el chatbot:', error);
            }
        }

        createChatInterface() {
            // Crear contenedor principal del chatbot flotante
            this.chatContainer = document.createElement('div');
            this.chatContainer.id = 'faq-chatbot';
            this.chatContainer.className = 'fixed bottom-6 right-6 z-50';

            // HTML del chatbot flotante
            this.chatContainer.innerHTML = `
                <div class="chatbot-toggle bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
                    <i class="fas fa-comments text-lg"></i>
                </div>

                <div class="chatbot-window hidden bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 h-96 flex flex-col overflow-hidden absolute bottom-16 right-0">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                                <i class="fas fa-robot text-sm"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-sm">Asistente Virtual</h3>
                                <p class="text-xs opacity-90">Preguntas Frecuentes</p>
                            </div>
                        </div>
                        <button class="chatbot-close text-white hover:text-gray-200 transition-colors">
                            <i class="fas fa-times text-sm"></i>
                        </button>
                    </div>

                    <!-- Chat Messages -->
                    <div class="chat-messages flex-1 p-3 overflow-y-auto bg-gray-50">
                        <div class="message bot-message mb-3">
                            <div class="message-content bg-white p-2 rounded-lg shadow-sm border text-sm">
                                <p class="text-gray-800">¡Hola! Soy el asistente de Carlos. ¿En qué puedo ayudarte?</p>
                                <p class="text-xs text-gray-500 mt-1">Pregunta sobre servicios o precios</p>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Input -->
                    <div class="chat-input p-3 bg-white border-t border-gray-200">
                        <div class="flex gap-2">
                            <input type="text" placeholder="Escribe tu pregunta..." class="chat-input-field flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent">
                            <button class="chat-send-btn bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors">
                                <i class="fas fa-paper-plane text-xs"></i>
                            </button>
                        </div>
                        <div class="suggested-questions mt-2 flex flex-wrap gap-1">
                            <button class="suggested-btn text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-green-100 transition-colors">Servicios</button>
                            <button class="suggested-btn text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-green-100 transition-colors">Precios</button>
                            <button class="suggested-btn text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-green-100 transition-colors">Tiempo</button>
                        </div>
                    </div>
                </div>
            `;

            // Agregar al DOM
            document.body.appendChild(this.chatContainer);
        }

        addEventListeners() {
            const toggleBtn = this.chatContainer.querySelector('.chatbot-toggle');
            const closeBtn = this.chatContainer.querySelector('.chatbot-close');
            const sendBtn = this.chatContainer.querySelector('.chat-send-btn');
            const inputField = this.chatContainer.querySelector('.chat-input-field');
            const suggestedBtns = this.chatContainer.querySelectorAll('.suggested-btn');

            // Toggle chatbot
            toggleBtn.addEventListener('click', () => this.toggleChat());

            // Close chatbot
            closeBtn.addEventListener('click', () => this.closeChat());

            // Send message
            sendBtn.addEventListener('click', () => this.sendMessage());

            // Enter key to send
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            // Suggested questions
            suggestedBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const question = e.target.textContent;
                    this.sendSuggestedQuestion(question);
                });
            });
        }

        toggleChat() {
            const chatWindow = this.chatContainer.querySelector('.chatbot-window');
            const toggleBtn = this.chatContainer.querySelector('.chatbot-toggle');

            if (this.isOpen) {
                this.closeChat();
            } else {
                chatWindow.classList.remove('hidden');
                toggleBtn.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    toggleBtn.style.transform = 'scale(1)';
                }, 150);
                this.isOpen = true;
            }
        }

        closeChat() {
            const chatWindow = this.chatContainer.querySelector('.chatbot-window');
            const toggleBtn = this.chatContainer.querySelector('.chatbot-toggle');

            chatWindow.classList.add('hidden');
            toggleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 150);
            this.isOpen = false;
        }

        sendMessage() {
            const inputField = this.chatContainer.querySelector('.chat-input-field');
            const message = inputField.value.trim();

            if (message) {
                this.addMessage(message, 'user');
                inputField.value = '';

                // Procesar la pregunta y responder
                setTimeout(() => {
                    const response = this.processQuestion(message);
                    this.addMessage(response, 'bot');
                }, 500);
            }
        }

        sendSuggestedQuestion(question) {
            this.addMessage(question, 'user');

            setTimeout(() => {
                const response = this.processQuestion(question);
                this.addMessage(response, 'bot');
            }, 500);
        }

        addMessage(content, type) {
            const messagesContainer = this.chatContainer.querySelector('.chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}-message mb-4`;

            if (type === 'user') {
                messageDiv.innerHTML = `
                    <div class="message-content bg-blue-500 text-white p-3 rounded-lg shadow-sm ml-auto max-w-xs">
                        <p>${content}</p>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-content bg-white p-3 rounded-lg shadow-sm border max-w-xs">
                        <p class="text-gray-800">${content}</p>
                    </div>
                `;
            }

            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        processQuestion(question) {
            if (!this.faqData || !this.faqData.faqs) {
                return "Lo siento, no puedo acceder a la información en este momento. Por favor, contacta directamente con Carlos.";
            }

            const userQuestion = question.toLowerCase();

            // Buscar coincidencias por palabras clave
            for (const faq of this.faqData.faqs) {
                for (const keyword of faq.keywords) {
                    if (userQuestion.includes(keyword.toLowerCase())) {
                        return faq.answer;
                    }
                }
            }

            // Si no encuentra coincidencia exacta, buscar similitudes
            const bestMatch = this.findBestMatch(question);
            if (bestMatch) {
                return bestMatch.answer;
            }

            // Respuesta por defecto
            return "No encontré una respuesta exacta para tu pregunta. Te recomiendo revisar la sección de servicios o contactar directamente con Carlos para más información específica.";
        }

        findBestMatch(question) {
            let bestMatch = null;
            let bestScore = 0;

            for (const faq of this.faqData.faqs) {
                let score = 0;
                const questionWords = question.toLowerCase().split(' ');

                for (const word of questionWords) {
                    if (word.length > 2) { // Ignorar palabras muy cortas
                        for (const keyword of faq.keywords) {
                            if (keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())) {
                                score += 1;
                            }
                        }
                    }
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = faq;
                }
            }

            return bestScore > 0 ? bestMatch : null;
        }
    }

    // Inicializar el chatbot
    new FAQChatbot();

    console.log('🤖 Chatbot FAQ cargado correctamente');

    // Función global para abrir el chatbot desde botones externos
    function openChatbot() {
        if (window.faqChatbot) {
            window.faqChatbot.toggleChat();
        } else {
            // Si el chatbot no está inicializado, esperar un momento
            setTimeout(() => {
                if (window.faqChatbot) {
                    window.faqChatbot.toggleChat();
                }
            }, 500);
        }
    }

    // Exportar función global para uso en GitHub Pages
    window.openChatbot = openChatbot;
});

document.addEventListener('DOMContentLoaded', function() {
    setupYouTubeVideo();
    
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    
    if (heroTitle && heroSubtitle) {
        const splitTitle = heroTitle.textContent.split(' ');
        let titleHTML = '';
        
        splitTitle.forEach((word, index) => {
            titleHTML += `<span class="word" style="animation-delay: ${0.1 * index}s">${word}</span> `;
        });
        
        heroTitle.innerHTML = titleHTML;
        
        setTimeout(() => {
            document.querySelectorAll('.word').forEach(word => {
                word.classList.add('animate');
            });
        }, 500);
    }
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
    
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    const elementPositions = new Map();
    
    parallaxElements.forEach(element => {
        elementPositions.set(element, {
            current: 0,
            target: 0
        });
    });
    
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    function handleParallax() {
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.1;
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            const rect = element.getBoundingClientRect();
            const sectionTop = rect.top + scrollPosition;
            const sectionHeight = rect.height;
            
            const isInView = (scrollPosition + windowHeight > sectionTop - 100) && 
                            (scrollPosition < sectionTop + sectionHeight + 100);
            
            if (isInView) {
                const relativeScroll = scrollPosition - sectionTop + windowHeight;
                
                const maxOffset = 50;
                let targetPos = (relativeScroll * speed);
                targetPos = Math.max(Math.min(targetPos, maxOffset), -maxOffset);
                
                const posData = elementPositions.get(element);
                
                posData.target = targetPos;
                
                posData.current = lerp(posData.current, posData.target, 0.05);
                
                element.style.transform = `translateY(${posData.current}px)`;
                element.style.opacity = '1';
            }
        });
        
        requestAnimationFrame(handleParallax);
    }
    
    handleParallax();
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Thank you for your message! I will get back to you within 24 hours.');
            
            contactForm.reset();
        });
        
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            const formGroup = input.parentElement;
            const label = document.createElement('label');
            label.textContent = input.getAttribute('placeholder');
            label.classList.add('floating-label');
            
            input.placeholder = '';
            formGroup.appendChild(label);
            
            input.addEventListener('focus', function() {
                formGroup.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    formGroup.classList.remove('focused');
                }
            });
            
            if (input.value !== '') {
                formGroup.classList.add('focused');
            }
        });
    }
    
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
        
        ctaButton.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const imageGridItems = document.querySelectorAll('.image-grid-item');
    
    const observeElements = (elements, animationDelay = 0) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fadeIn');
                    }, animationDelay * index);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.92); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes wordAnimation {
            0% { opacity: 0; transform: translateY(50%); }
            100% { opacity: 1; transform: translateY(0); }
        }
        
        .word {
            display: inline-block;
            opacity: 0;
            transform: translateY(50%);
            margin-right: 0.2rem;
        }
        
        .word.animate {
            animation: wordAnimation 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
        }
        
        .service-card, .portfolio-item, .image-grid-item {
            opacity: 0;
        }
        
        .service-card.fadeIn {
            animation: fadeIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .portfolio-item.fadeIn {
            animation: scaleIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .image-grid-item.fadeIn {
            animation: fadeIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .floating-label {
            position: absolute;
            top: 50%;
            left: 12px;
            transform: translateY(-50%);
            font-size: 1rem;
            color: #777;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .form-group {
            position: relative;
        }
        
        .form-group.focused .floating-label {
            top: 0;
            font-size: 0.8rem;
            color: var(--highlight-color);
            background-color: white;
            padding: 0 5px;
        }
        
        textarea ~ .floating-label {
            top: 25px;
        }
        
        .form-group.focused textarea ~ .floating-label {
            top: 0;
        }
    `;
    document.head.appendChild(style);
    
    if (serviceCards.length > 0) {
        observeElements(serviceCards, 180);
    }
    
    if (portfolioItems.length > 0) {
        observeElements(portfolioItems, 150);
    }
    
    if (imageGridItems.length > 0) {
        observeElements(imageGridItems, 180);
    }
    
    function showToast(message, duration = 3000) {
        let toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            toastContainer.style.position = 'fixed';
            toastContainer.style.bottom = '20px';
            toastContainer.style.left = '50%';
            toastContainer.style.transform = 'translateX(-50%)';
            toastContainer.style.zIndex = '100000';
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '4px';
        toast.style.marginBottom = '10px';
        toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        toast.style.animation = 'fadeInUp 0.3s ease-out';
        
        toastContainer.appendChild(toast);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                toastContainer.removeChild(toast);
                
                if (toastContainer.children.length === 0) {
                    document.body.removeChild(toastContainer);
                }
            }, 300);
        }, duration);
    }
    
    const setupPortfolioItems = () => {
        const items = document.querySelectorAll('.portfolio-item');
        
        items.forEach(item => {
            let isClickable = true;
            
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPercent = x / rect.width;
                const yPercent = y / rect.height;
                
                const tiltX = (0.5 - yPercent) * 10;
                const tiltY = (xPercent - 0.5) * 10;
                
                this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
            
            item.addEventListener('click', function(e) {
                console.log('Portfolio item clicked, opening video modal');
                showToast('Opening video...', 2000);
                openVideoModal('_dB9JHq4qak');
            });
            
            item.style.cursor = 'pointer';
        });
    };
    
    setupPortfolioItems();
    
    function resizeVideoBackground() {
        const videoIframe = document.querySelector('.video-foreground iframe');
        if (videoIframe) {
            if (window.innerWidth < 768) {
                videoIframe.style.width = '300%';
                videoIframe.style.height = '150%';
            } else {
                videoIframe.style.width = '100vw';
                videoIframe.style.height = '56.25vw';
                videoIframe.style.minHeight = '100vh';
                videoIframe.style.minWidth = '177.77vh';
            }
        }
    }
    
    window.addEventListener('resize', resizeVideoBackground);
    resizeVideoBackground();
});

function setupYouTubeVideo() {
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    
    window.onYouTubeIframeAPIReady = function() {
        const videoBackground = document.querySelector('.video-background');
        const iframe = document.getElementById('youtube-video');
        
        if (iframe && videoBackground) {
            new YT.Player('youtube-video', {
                events: {
                    'onReady': function(event) {
                        event.target.mute();
                        event.target.playVideo();
                    },
                    'onStateChange': function(event) {
                        if (event.data === YT.PlayerState.PLAYING) {
                            setTimeout(function() {
                                videoBackground.classList.add('loaded');
                            }, 500);
                        }
                    }
                }
            });
        }
    };
    
    setTimeout(function() {
        const videoBackground = document.querySelector('.video-background');
        if (videoBackground && !videoBackground.classList.contains('loaded')) {
            console.log('YouTube API fallback triggered');
            videoBackground.classList.add('loaded');
        }
    }, 3000);
}

function openVideoModal(videoId) {
    const existingModal = document.querySelector('.video-modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    console.log('Opening video modal for:', videoId);
    
    if (!document.getElementById('modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            body.modal-open {
                overflow: hidden !important;
                position: fixed !important;
                width: 100% !important;
                height: 100% !important;
            }
            
            .video-modal {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background-color: rgba(0, 0, 0, 0.95) !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                z-index: 9999999 !important;
                overflow: hidden !important;
            }
            
            .video-modal-close {
                position: absolute !important;
                top: 20px !important;
                right: 20px !important;
                color: white !important;
                font-size: 36px !important;
                cursor: pointer !important;
                z-index: 10000000 !important;
                width: 40px !important;
                height: 40px !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                background-color: rgba(0, 0, 0, 0.7) !important;
                border-radius: 50% !important;
                transition: all 0.3s ease !important;
            }
            
            .video-modal-player {
                background-color: #000 !important;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5) !important;
                overflow: hidden !important;
                z-index: 10000000 !important;
                position: relative !important;
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    
    const closeBtn = document.createElement('div');
    closeBtn.className = 'video-modal-close';
    closeBtn.innerHTML = '&times;';
    
    const playerContainer = document.createElement('div');
    playerContainer.className = 'video-modal-player';
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatio = 16 / 9;
    
    let playerWidth, playerHeight;
    
    if (windowWidth / windowHeight > aspectRatio) {
        playerHeight = windowHeight * 0.9;
        playerWidth = playerHeight * aspectRatio;
    } else {
        playerWidth = windowWidth * 0.9;
        playerHeight = playerWidth / aspectRatio;
    }
    
    playerContainer.style.width = `${playerWidth}px`;
    playerContainer.style.height = `${playerHeight}px`;
    
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&vq=hd720`;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    playerContainer.appendChild(iframe);
    modal.appendChild(closeBtn);
    modal.appendChild(playerContainer);
    
    document.body.appendChild(modal);
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
    
    document.body.classList.add('modal-open');
    document.body.style.top = `0px`;
    document.body.style.paddingRight = `${parseInt(originalPaddingRight || 0) + scrollbarWidth}px`;
    
    void document.body.offsetHeight;
    
    function closeModal() {
        console.log('Closing video modal');
        
        const modalToRemove = document.querySelector('.video-modal');
        if (modalToRemove) {
            document.body.removeChild(modalToRemove);
        }
        
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        document.body.style.paddingRight = originalPaddingRight;
        
        window.scrollTo(0, scrollPosition);
        
        document.removeEventListener('keydown', keyHandler);
        window.removeEventListener('resize', handleResize);
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function keyHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    document.addEventListener('keydown', keyHandler);
    
    function handleResize() {
        const newWindowWidth = window.innerWidth;
        const newWindowHeight = window.innerHeight;
        
        let newPlayerWidth, newPlayerHeight;
        
        if (newWindowWidth / newWindowHeight > aspectRatio) {
            newPlayerHeight = newWindowHeight * 0.9;
            newPlayerWidth = newPlayerHeight * aspectRatio;
        } else {
            newPlayerWidth = newWindowWidth * 0.9;
            newPlayerHeight = newPlayerWidth / aspectRatio;
        }
        
        const player = document.querySelector('.video-modal-player');
        if (player) {
            player.style.width = `${newPlayerWidth}px`;
            player.style.height = `${newPlayerHeight}px`;
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    closeBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#00c2cb';
        this.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this.style.transform = 'scale(1)';
    });
}

window.testVideoModal = function() {
    openVideoModal('_dB9JHq4qak');
    console.log('Test video modal opened');
} 
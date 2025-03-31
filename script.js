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
            const delay = 0.1 * index;
            titleHTML += `<span class="word" style="animation-delay: ${delay}s">${word}</span> `;
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
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Initialize EmailJS with your public key
        (function() {
            emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
        })();
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.querySelector('.form-message');
            formMessage.textContent = "Sending message...";
            formMessage.style.color = "#333";
            
            // Get the form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: "sibotaxis@hotmail.com"
            };
            
            // Send the email using EmailJS
            emailjs.send('default_service', 'template_id', templateParams) // Replace with your service ID and template ID
                .then(function() {
                    formMessage.textContent = "Message sent successfully!";
                    formMessage.style.color = "green";
                    contactForm.reset();
                    setTimeout(() => {
                        formMessage.textContent = "";
                    }, 5000);
                }, function(error) {
                    formMessage.textContent = "Failed to send message. Please try again.";
                    formMessage.style.color = "red";
                    console.error('EmailJS error:', error);
                });
        });
        
        // Handle floating labels
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Skip hidden inputs
            if (input.type === 'hidden') return;
            
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
    
    if (serviceCards.length > 0) {
        observeElements(serviceCards, 180);
    }
    
    if (portfolioItems.length > 0) {
        observeElements(portfolioItems, 150);
    }
    
    if (imageGridItems.length > 0) {
        observeElements(imageGridItems, 180);
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
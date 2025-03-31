/**
 * Video Modal Functionality
 * Handles the creation, display, and behavior of the video modal
 */

// Function to open a video modal with a specific YouTube video ID
function openVideoModal(videoId) {
    // If modal already exists, remove it first
    const existingModal = document.querySelector('.video-modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    console.log('Opening video modal for:', videoId);
    
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
    document.body.style.top = `-${scrollPosition}px`;
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
}

// Helper function to show toast notifications
function showToast(message, duration = 3000) {
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast fade-in';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('fade-in');
        toast.classList.add('fade-out');
        setTimeout(() => {
            toastContainer.removeChild(toast);
            
            if (toastContainer.children.length === 0) {
                document.body.removeChild(toastContainer);
            }
        }, 300);
    }, duration);
}

// Test function for debugging
function testVideoModal() {
    openVideoModal('_dB9JHq4qak');
    console.log('Test video modal opened');
}

// Export functions for global access
window.openVideoModal = openVideoModal;
window.showToast = showToast;
window.testVideoModal = testVideoModal; 
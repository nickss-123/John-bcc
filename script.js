// ========== BIRTHDAY WEBSITE - MAIN JAVASCRIPT ==========

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE NAVIGATION TOGGLE ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navMenu.classList.remove('active');
            const icon = navToggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // ========== ACTIVE NAVIGATION HIGHLIGHT ON SCROLL ==========
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, header');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id') || 'home';
            
            if (window.scrollY >= sectionTop) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ========== COUNTDOWN TIMER (April 13, 2026) ==========
    const birthdayDate = new Date('April 13, 2026 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;
        
        if (distance < 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========== PHOTO CLICK - FLOATING MESSAGES ==========
    const photos = document.querySelectorAll('.photo-grid img');
    
    function showFloatingMessage(message, x, y) {
        const floatDiv = document.createElement('div');
        floatDiv.className = 'floating-message';
        floatDiv.textContent = message;
        
        // Position near click
        floatDiv.style.left = (x + 15) + 'px';
        floatDiv.style.top = (y - 40) + 'px';
        
        document.body.appendChild(floatDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            floatDiv.remove(10000);
        }, 10000);
    }

    photos.forEach(img => {
        img.addEventListener('click', function(event) {
            // Get message from data-message or alt
            let message = this.dataset.message;
            if (!message || message.trim() === '') {
                message = this.alt ? `📸 ${this.alt}` : 'Happy Birthday, Ate! 💖';
            }
            
            // Get click coordinates
            const x = event.clientX;
            const y = event.clientY;
            
            showFloatingMessage(message, x, y);
        });
    });

    // ========== BACKGROUND MUSIC CONTROL ==========
    const audio = document.getElementById('birthdaySong');
    const playBtn = document.getElementById('playPauseBtn');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    
    let isPlaying = false;
    
    // Try to autoplay (browsers may block this)
    if (audio) {
        audio.volume = 0.5; // Set volume to 50%
        
        audio.play().catch(error => {
            console.log("Autoplay prevented. User must click play.");
        });
    }
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                musicIcon.textContent = '🔇';
                musicText.textContent = 'Play Music';
                playBtn.classList.remove('playing');
            } else {
                audio.play();
                isPlaying = true;
                musicIcon.textContent = '🔊';
                musicText.textContent = 'Pause Music';
                playBtn.classList.add('playing');
            }
        });
    }
    
    // Handle audio ending
    audio.addEventListener('ended', () => {
        isPlaying = false;
        musicIcon.textContent = '🔇';
        musicText.textContent = 'Play Music';
        playBtn.classList.remove('playing');
    });

    // ========== WISH PHOTOS CLICK HANDLER ==========
    const wishImages = document.querySelectorAll('.wish-photo img');
    wishImages.forEach(img => {
        img.addEventListener('click', function(event) {
            const x = event.clientX;
            const y = event.clientY;
            showFloatingMessage('🌸 Sending you a birthday hug!', x, y);
        });
    });

    // ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== PARALLAX EFFECT FOR BACKGROUNDS (optional) ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    });

    // ========== CHECK IF IT'S BIRTHDAY AND CELEBRATE ==========
    function checkBirthday() {
        const today = new Date();
        const birthdayThisYear = new Date(today.getFullYear(), 3, 13); // April 13
        
        if (today.toDateString() === birthdayThisYear.toDateString()) {
            // It's birthday! Add confetti or special effects
            document.body.classList.add('birthday-mode');
            
            // Play music automatically if possible
            if (audio && !isPlaying) {
                audio.play().then(() => {
                    isPlaying = true;
                    musicIcon.textContent = '🔊';
                    musicText.textContent = 'Pause Music';
                    playBtn.classList.add('playing');
                }).catch(() => {});
            }
        }
    }
    
    checkBirthday();
    
    // ========== RESIZE HANDLER (close mobile menu) ==========
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const icon = navToggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
});
// Set your custom password here
const CORRECT_PASSWORD = "amore mio"; // Change this to your desired password (YYYYMM format example)

// Check if password has been verified in this session
let isVerified = sessionStorage.getItem('birthdayVerified');

// Elements
const modal = document.getElementById('passwordModal');
const mainContent = document.getElementById('mainContent');
const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');
const errorMsg = document.getElementById('errorMsg');

// If already verified in this session, show content directly
if (isVerified === 'true') {
    modal.style.display = 'none';
    mainContent.classList.remove('hidden');
    initializeBirthdayEffects();
} else {
    modal.style.display = 'flex';
}

// Password verification function
function verifyPassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === CORRECT_PASSWORD) {
        // Correct password
        sessionStorage.setItem('birthdayVerified', 'true');
        modal.style.display = 'none';
        mainContent.classList.remove('hidden');
        initializeBirthdayEffects();
        
        // Optional: Play a success sound (uncomment if you want to add sound)
        // playSuccessSound();
    } else {
        // Wrong password
        errorMsg.innerHTML = '❌ Wrong password! Please try again.';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Shake animation for error
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            modalContent.style.animation = '';
        }, 500);
    }
}

// Add shake animation for wrong password
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Event listeners
submitBtn.addEventListener('click', verifyPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verifyPassword();
    }
});

// Focus on input when modal appears
if (!isVerified) {
    setTimeout(() => {
        passwordInput.focus();
    }, 100);
}

// Initialize birthday effects
function initializeBirthdayEffects() {
    // Surprise button functionality
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    surpriseBtn.addEventListener('click', () => {
        createConfetti();
        showSurpriseMessage();
    });
    
    // Add floating animation to balloons
    animateBalloons();
    
    // Add random floating candles effect
    createFloatingCandles();
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];
    const container = document.body;
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = Math.random() * 8 + 4 + 'px';
        confetti.style.position = 'fixed';
        confetti.style.top = '-10px';
        confetti.style.animationDuration = Math.random() * 2 + 1 + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Show surprise message
function showSurpriseMessage() {
    const messages = [
        "🎉 You're amazing! 🎉",
        "🎂 Have a wonderful birthday! 🎂",
        "🎁 Here's a virtual hug! 🤗",
        "💝 You're the best! 💝",
        "🌟 May all your wishes come true! 🌟",
        "🎈 Party time! Let's celebrate! 🎈"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '20px 40px';
    messageDiv.style.borderRadius = '50px';
    messageDiv.style.fontSize = '24px';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.animation = 'fadeInOut 2s ease';
    messageDiv.style.whiteSpace = 'nowrap';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// Animate balloons
function animateBalloons() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
        balloon.style.animation = `float ${6 + index * 0.5}s ease-in-out infinite`;
    });
}

// Create floating candles effect
function createFloatingCandles() {
    const candleEmojis = ['🕯️', '🎂', '🎈', '🎉', '🎁', '✨', '🌟'];
    
    setInterval(() => {
        if (!mainContent.classList.contains('hidden')) {
            const candle = document.createElement('div');
            candle.textContent = candleEmojis[Math.floor(Math.random() * candleEmojis.length)];
            candle.style.position = 'fixed';
            candle.style.left = Math.random() * window.innerWidth + 'px';
            candle.style.bottom = '-50px';
            candle.style.fontSize = Math.random() * 20 + 20 + 'px';
            candle.style.opacity = '0.7';
            candle.style.pointerEvents = 'none';
            candle.style.zIndex = '999';
            candle.style.animation = 'floatUp ' + (Math.random() * 3 + 2) + 's linear forwards';
            
            document.body.appendChild(candle);
            
            setTimeout(() => {
                candle.remove();
            }, 5000);
        }
    }, 2000);
}

// Add floatUp animation
const floatUpAnimation = document.createElement('style');
floatUpAnimation.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        to {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
        }
    }
`;
document.head.appendChild(floatUpAnimation);

// Prevent right-click and inspect element (optional security)
document.addEventListener('contextmenu', (e) => {
    if (!isVerified) {
        e.preventDefault();
    }
});

// Optional: Add a function to change password (for admin use)
function changePassword(newPassword) {
    // This would typically be done on the server-side
    // For client-side only, you can modify the constant
    // But note: this is not secure for production
    console.log('Password change function - would require server-side implementation');
}

// Add a console warning for developers (optional)
console.log('%c🔒 This website is password protected!', 'color: #ff4444; font-size: 16px; font-weight: bold;');

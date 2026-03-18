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
            floatDiv.remove();
        }, 3000);
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

// script.js – interactive birthday magic (with floating messages)

document.addEventListener('DOMContentLoaded', function() {
    // ---------- COUNTDOWN to April 13, 2026 ----------
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        function updateCountdown() {
            const now = new Date();
            const targetBirthday = new Date(2026, 3, 13); // April 13, 2026
            const diff = targetBirthday - now;

            if (diff <= 0) {
                countdownEl.innerHTML = "🎉 It's your birthday! Happy Birthday, Ate! 🎉";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (86400000)) / (3600000));
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);

            countdownEl.innerHTML = `🎂 ${days}d ${hours}h ${minutes}m ${seconds}s until your birthday (April 13)! 🎂`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ---------- PHOTO CLICK – FLOATING MESSAGE ----------
    const photos = document.querySelectorAll('.photo-grid img');
    
    // Create a container for floating messages (optional, but we'll just append to body)
    function showFloatingMessage(message, x, y) {
        // Create the floating element
        const floatDiv = document.createElement('div');
        floatDiv.className = 'floating-message';
        floatDiv.textContent = message;
        
        // Position it near the click, slightly offset
        floatDiv.style.left = (x + 15) + 'px';
        floatDiv.style.top = (y - 40) + 'px';
        
        document.body.appendChild(floatDiv);
        
        // Inside showFloatingMessage function, replace the setTimeout line:

                setTimeout(() => {
                   floatDiv.remove();
                  } , 8000); // 8 seconds
                 }

    photos.forEach(img => {
        img.addEventListener('click', function(event) {
            // Get message from data-message or alt
            let message = this.dataset.message;
            if (!message || message.trim() === '') {
                message = this.alt ? `📸 ${this.alt}` : 'Happy birthday, Ate! 💖';
            }
            
            // Get click coordinates
            const x = event.clientX;
            const y = event.clientY;
            
            showFloatingMessage(message, x, y);
        });
    });

    // ---------- OPTIONAL: click on wish photos for extra love ----------
    const wishImages = document.querySelectorAll('.wish-photo img');
    wishImages.forEach(img => {
        img.addEventListener('click', function(event) {
            const x = event.clientX;
            const y = event.clientY;
            showFloatingMessage('🌸 Sending you a birthday hug!', x, y);
        });
    });
});

// Audio player functionality
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('birthdaySong');
    const playBtn = document.getElementById('playPauseBtn');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    
    let isPlaying = false;
    
    // Try to autoplay (note: most browsers block autoplay)
    audio.play().then(() => {
        isPlaying = true;
        updateButton();
    }).catch(error => {
        console.log("Autoplay prevented. User must click play.");
        // User will need to click the button to start
    });
    
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
        }
        updateButton();
    });
    
    function updateButton() {
        if (isPlaying) {
            musicIcon.textContent = '🔊';
            musicText.textContent = 'Pause Music';
            playBtn.classList.add('playing');
        } else {
            musicIcon.textContent = '🔇';
            musicText.textContent = 'Play Music';
            playBtn.classList.remove('playing');
        }
    }
    
    // Optional: Auto-play when countdown reaches 0
    const targetDate = new Date(2026, 3, 13, 0, 0, 0);
    
    function checkForBirthday() {
        const now = new Date();
        if (now >= targetDate && !isPlaying) {
            audio.play();
            isPlaying = true;
            updateButton();
        }
    }

    
    
    // Check every minute if it's birthday
    setInterval(checkForBirthday, 60000);
});

// --- KONAMI CODE EASTER EGG (SUPER SHADOW) ---
(function () {
    const SEQUENCE = [
        'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
        'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
        'b','a'
    ];
    let idx = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === SEQUENCE[idx]) {
            idx++;
            if (idx === SEQUENCE.length) {
                idx = 0;
                triggerEasterEgg();
            }
        } else {
            idx = (e.key === SEQUENCE[0]) ? 1 : 0;
        }
    });

    window.triggerEasterEgg = function() {
        const overlay = document.getElementById('easter-egg-overlay');
        if (!overlay || overlay.classList.contains('active')) return;

        // Ativa o visual dourado e partículas
        document.body.classList.add('super-shadow-mode');
        overlay.classList.add('active');

        // Swap the main background render to Super Shadow
        const mainRenderImg = document.querySelector('#dynamic-shadow-bg img');
        if (mainRenderImg) {
            mainRenderImg.style.opacity = '0';
            setTimeout(() => {
                mainRenderImg.src = 'imagens/characters/Super_Shadow.png';
                mainRenderImg.style.opacity = '1';
            }, 500); // smooth swap
        }

        // Play Music with Crossfade (from app.js)
        if(typeof window.crossfadeToSuper === 'function') {
            window.crossfadeToSuper();
        }

        const mainText  = document.getElementById('easter-main-text');
        const subLogo   = document.getElementById('easter-sub-logo');
        const quoteText = document.getElementById('easter-quote-text');

        // Modifica cores para dourado (Super Shadow)
        if(mainText) {
            mainText.style.color = '#ffd700';
            mainText.style.textShadow = '0 0 15px rgba(255, 215, 0, 0.8)';
        }

        const TARGET  = 'CHAOS... CONTROL!';
        const CHARS   = '!@#$%<>?/\\|{}[]~01SHADOW';
        let iterations = 0;
        const MAX      = 20;

        // Glitch reveal animation
        const glitchInterval = setInterval(() => {
            if (!mainText) { clearInterval(glitchInterval); return; }
            if (iterations >= MAX) {
                mainText.textContent = TARGET;
                clearInterval(glitchInterval);
                
                // Removed Camera shake effect to not scare the user
                
                // Fade in sub elements
                if (subLogo) {
                    subLogo.style.opacity   = '1';
                }
                if (quoteText) {
                    quoteText.innerHTML = '"This is the true power of the Ultimate Lifeform!"<br><span style="color:#888;">— Click anywhere to dismiss —</span>';
                    quoteText.style.opacity = '1';
                }
            } else {
                mainText.textContent = Array.from(TARGET).map((c) =>
                    c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
                ).join('');
                iterations++;
            }
        }, 70);

        // Click to close early
        overlay.addEventListener('click', () => {
            clearInterval(glitchInterval);
            overlay.classList.remove('active');
        }, { once: true });
        
        // Removed auto-close timer so the overlay stays as long as the user wants
    }
})();

// --- KONAMI CODE EASTER EGG ---
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

    function triggerEasterEgg() {
        const overlay = document.getElementById('easter-egg-overlay');
        if (!overlay || overlay.classList.contains('active')) return;

        overlay.classList.add('active');

        const mainText  = document.getElementById('easter-main-text');
        const subText   = document.getElementById('easter-sub-text');
        const quoteText = document.getElementById('easter-quote-text');

        const TARGET  = 'THE ULTIMATE LIFEFORM';
        const CHARS   = '!@#$%<>?/\\|{}[]~01SHADOW';
        let iterations = 0;
        const MAX      = 22;

        // Glitch reveal animation
        const glitchInterval = setInterval(() => {
            if (!mainText) { clearInterval(glitchInterval); return; }
            if (iterations >= MAX) {
                mainText.textContent = TARGET;
                clearInterval(glitchInterval);
                // Fade in sub elements
                if (subText)   subText.style.opacity   = '1';
                if (quoteText) quoteText.style.opacity = '1';
            } else {
                mainText.textContent = Array.from(TARGET).map((c) =>
                    c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
                ).join('');
                iterations++;
            }
        }, 70);

        // Auto-close after 5 seconds
        setTimeout(() => {
            overlay.classList.remove('active');
            if (mainText)  mainText.textContent  = '';
            if (subText)   subText.style.opacity  = '0';
            if (quoteText) quoteText.style.opacity = '0';
        }, 5000);

        // Click to close early
        overlay.addEventListener('click', () => {
            clearInterval(glitchInterval);
            overlay.classList.remove('active');
        }, { once: true });
    }
})();

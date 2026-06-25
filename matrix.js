const mCanvas = document.getElementById('matrix-canvas');
if (mCanvas) {
    const mCtx = mCanvas.getContext('2d');

    mCanvas.width = window.innerWidth;
    mCanvas.height = window.innerHeight;

    const chars = '01G.U.N.0123456789@#$%^&*()_+{}|[]<>?'.split('');
    const fontSize = 16;
    let columns = mCanvas.width / fontSize;
    let drops = [];

    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        const isSuper = document.body.classList.contains('super-shadow-mode');
        
        mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
        
        mCtx.fillStyle = isSuper ? '#cc9900' : '#880000'; // dark red normally, dark gold in super mode
        mCtx.font = fontSize + 'px VT323, monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Respeita quem prefere menos movimento: não anima e esconde o canvas
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        mCanvas.style.display = 'none';
    } else {
        setInterval(drawMatrix, 50);
    }

    window.addEventListener('resize', () => {
        mCanvas.width = window.innerWidth;
        mCanvas.height = window.innerHeight;
        columns = mCanvas.width / fontSize;
        drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    });
}

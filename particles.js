function setupParticles() {
const canvas = document.getElementById('particle-canvas');
if (!canvas) return;

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.height / 80) * (canvas.width / 80);
    createParticles();
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.baseDirectionX = directionX;
        this.baseDirectionY = directionY;
        this.size = size;
    }
    
    draw() {
        const isSuper = document.body.classList.contains('super-shadow-mode');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = isSuper ? '#ffd700' : '#880000';
        ctx.fill();
        
        if (isSuper) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffd700';
        } else {
            ctx.shadowBlur = 0;
        }
    }
    
    update() {
        const isSuper = document.body.classList.contains('super-shadow-mode');
        const speedMult = isSuper ? 3 : 1;
        
        if (this.x > canvas.width || this.x < 0) this.baseDirectionX = -this.baseDirectionX;
        if (this.y > canvas.height || this.y < 0) this.baseDirectionY = -this.baseDirectionY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 5;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 5;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5;
        }

        this.x += this.baseDirectionX * speedMult;
        this.y += this.baseDirectionY * speedMult;
        this.draw();
    }
}

function createParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 14000;
    
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.8) - 0.4;
        let directionY = (Math.random() * 0.8) - 0.4;

        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}

function connectParticles() {
    let opacityValue = 1;
    const isSuper = document.body.classList.contains('super-shadow-mode');
    
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                opacityValue = 1 - (distance / 15000);
                
                if (isSuper) {
                    ctx.strokeStyle = `rgba(255, 215, 0, ${opacityValue * 0.5})`;
                } else {
                    ctx.strokeStyle = `rgba(136, 0, 0, ${opacityValue * 0.3})`;
                }
                
                ctx.lineWidth = isSuper ? 1.5 : 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

// Respeita quem prefere menos movimento: não anima e esconde o canvas
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const pCanvas = document.getElementById('particle-canvas');
    if (pCanvas) pCanvas.style.display = 'none';
} else {
    createParticles();
    animateParticles();
}
}

setupParticles();

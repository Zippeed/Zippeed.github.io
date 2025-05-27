// Funções da galeria
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
        document.body.style.overflow = 'auto';
    }
});

// Fechar modal ao clicar fora da imagem
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Criar estrelas animadas
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Controle da música de fundo
let isBackgroundMusicPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');
const bgMusicIcon = document.getElementById('musicIcon');

function toggleBackgroundMusic() {
    if (isBackgroundMusicPlaying) {
        backgroundMusic.pause();
        bgMusicIcon.textContent = '🔊';
    } else {
        backgroundMusic.play();
        bgMusicIcon.textContent = '🔇';
    }
    isBackgroundMusicPlaying = !isBackgroundMusicPlaying;
}

// Alternar menu de idiomas
function toggleLanguageMenu() {
    const menu = document.querySelector('.language-menu');
    const dropdown = document.querySelector('.language-dropdown');
    menu.classList.toggle('active');
    dropdown.classList.toggle('show');
}

// Fechar o menu quando clicar fora
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.language-menu');
    const dropdown = document.querySelector('.language-dropdown');
    if (!menu.contains(event.target)) {
        menu.classList.remove('active');
        dropdown.classList.remove('show');
    }
});

// Inicializar tudo quando a página carregar
window.addEventListener('load', function () {
    createStars();

    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';

    let i = 0;
    const typeInterval = setInterval(() => {
        nameElement.textContent += originalText[i];
        i++;
        if (i >= originalText.length) {
            clearInterval(typeInterval);
        }
    }, 100);

    // Inicializar barras de progresso do tech stack
    const techLevels = document.querySelectorAll('.tech-level');
    techLevels.forEach(level => {
        const percentage = level.getAttribute('data-level');
        level.style.setProperty('--level', `${percentage}%`);
    });

    // Inicializar galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const modalId = `modal${index + 1}`;
        const img = item.querySelector('img');
        
        // Criar modal para cada imagem
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        };
        
        modal.innerHTML = `
            <span class="close-modal" onclick="closeModal('${modalId}')">&times;</span>
            <div class="modal-content">
                <img src="${img.getAttribute('src')}" alt="${img.alt}" class="modal-image">
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Adicionar evento de clique para abrir o modal
        item.addEventListener('click', () => openModal(modalId));
    });
});

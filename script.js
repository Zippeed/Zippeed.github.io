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

// Elementos do miniplayer
const miniplayer = document.getElementById('miniplayer');
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const miniTitle = document.getElementById('miniTitle');
const miniProgress = document.getElementById('miniProgress');
const miniProgressBar = document.getElementById('miniProgressBar');
const toggleBtn = document.getElementById('toggleBtn');
const timeDisplay = document.getElementById('timeDisplay');

// Lista de músicas
const tracks = [
    { name: 'When I Was A Boy', file: 'audio/When-I-Was-A-Boy(chosic.com).mp3' },
    { name: 'Magical Moments', file: 'audio/Magical-Moments-chosic.com_.mp3' },
    { name: 'Bedtime After A Coffee', file: 'audio/barradeen-bedtime-after-a-coffee(chosic.com).mp3' },
    { name: 'Lofi Chill', file: 'audio/lofi-chill-315216.mp3' },
    { name: 'Lofi Song', file: 'audio/lofi-song-330550.mp3' },
    { name: 'Whispering Vinyl Loops', file: 'audio/whispering-vinyl-loops-lofi-beats-281193.mp3' },
    { name: 'Lofi Background Music', file: 'audio/lofi-background-music-314199.mp3' },
    { name: 'Spring Lofi Vibes', file: 'audio/spring-lofi-vibes-lofi-music-340019.mp3' },
    { name: 'Rainy Lofi City', file: 'audio/rainy-lofi-city-lofi-music-332746.mp3' },
    { name: 'Good Night Lofi', file: 'audio/good-night-lofi-cozy-chill-music-160166.mp3' },
    { name: 'Lofi', file: 'audio/lofi.mp3' }
];

let currentTrackIndex = 0;

// Função para formatar o tempo em minutos:segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Função para obter o nome do arquivo sem extensão
function getFileNameWithoutExtension(path) {
    return path.split('/').pop().replace(/\.[^/.]+$/, '');
}

// Funções do player
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerHTML = '⏸';
    } else {
        audioPlayer.pause();
        playBtn.innerHTML = '▶';
    }
}

function updateTrackInfo() {
    const track = tracks[currentTrackIndex];
    miniTitle.textContent = track.name;
    audioPlayer.src = track.file;
    audioPlayer.load();
    if (!audioPlayer.paused) {
        audioPlayer.play();
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updateTrackInfo();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updateTrackInfo();
}

function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    miniProgressBar.style.width = `${progress}%`;
    
    // Atualizar tempo atual e total
    const currentTime = formatTime(audioPlayer.currentTime);
    const totalTime = formatTime(audioPlayer.duration);
    timeDisplay.textContent = `${currentTime} / ${totalTime}`;
}

function setProgress(e) {
    const width = miniProgress.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

function setVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

function toggleMiniplayer() {
    miniplayer.classList.toggle('minimized');
    if (miniplayer.classList.contains('minimized')) {
        toggleBtn.innerHTML = '⬆';
    } else {
        toggleBtn.innerHTML = '−';
    }
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextTrack);
miniProgress.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);
toggleBtn.addEventListener('click', toggleMiniplayer);

// Inicialização
audioPlayer.volume = volumeSlider.value / 100;
updateTrackInfo();

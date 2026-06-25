// --- ESTADO DA APLICAÇÃO ---
let state = {
    language: 'pt',
    activeSection: 'profile',
    translations: {},
    isMobileMenuOpen: false
};

const LASTFM_API_KEY = '31c08757e873df3470825f5bff492629';
const LASTFM_USER    = 'Zippeed';

// --- UTIL: escapa texto vindo de fontes externas antes de injetar via innerHTML ---
function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

// --- LAST.FM NOW PLAYING ---
async function fetchNowPlaying() {
    try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;
        const res  = await fetch(url);
        if (!res.ok) return;
        const data  = await res.json();
        const track = data.recenttracks?.track?.[0];
        if (!track) return;

        const isNowPlaying = track['@attr']?.nowplaying === 'true';
        const trackName    = escapeHtml(track.name              || '—');
        const artistName   = escapeHtml(track.artist?.['#text'] || '—');

        const el = document.getElementById('now-playing');
        if (!el) return;

        if (isNowPlaying) {
            el.innerHTML = `
                <div class="now-playing-label">
                    <span class="now-playing-dot"></span>
                    <span>LISTENING NOW</span>
                </div>
                <div class="now-playing-track" title="${trackName}">${trackName}</div>
                <div class="now-playing-artist" title="${artistName}">${artistName}</div>`;
        } else {
            el.innerHTML = `
                <div class="now-playing-label">
                    <i class="fas fa-history" style="font-size:0.55rem;color:#cc2222;"></i>
                    <span>LAST PLAYED</span>
                </div>
                <div class="now-playing-track" title="${trackName}">${trackName}</div>
                <div class="now-playing-artist" title="${artistName}">${artistName}</div>`;
        }
    } catch (_) {
        // silently fail — no API key / offline
    }
}

// --- FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO ---
function renderApp() {
    const t = state.translations;
    if (!t.menu) return;

    const contentWindow  = document.getElementById('content-window');
    const menuContainer  = document.getElementById('main-menu');

    menuContainer.innerHTML = Object.keys(t.menu).map(key => `
        <button data-section="${key}" class="menu-button flex items-center gap-3 p-2.5 text-left text-lg transition-all duration-200 ${state.activeSection === key ? 'bg-red-500/20 text-red-400' : 'text-gray-500 hover:bg-red-500/10 hover:text-red-400'}">
            <i class="${staticData.menuIcons[key]} text-xl"></i> <span>${t.menu[key]}</span>
        </button>
    `).join('');

    let contentHtml = '';
    switch (state.activeSection) {
        case 'profile':    contentHtml = renderProfile(t.profile);       break;
        case 'affinities': contentHtml = renderAffinities(t.affinities); break;
        case 'records':    contentHtml = renderRecords(t.records);       break;
        case 'gallery':    contentHtml = renderGallery();                break;
    }

    contentWindow.innerHTML = `<h2 class="text-xl sm:text-2xl text-red-500 mb-4 sm:mb-6 tracking-widest text-glow">${t[state.activeSection].title}</h2>${contentHtml}`;
    contentWindow.classList.remove('typewriter-reveal');
    void contentWindow.offsetWidth; // trigger reflow
    contentWindow.classList.add('typewriter-reveal');

    renderSystemStatus(t.status);

    const langContainer = document.getElementById('lang-buttons');
    langContainer.innerHTML = ['pt', 'en', 'es', 'ja'].map(lang => `
        <button data-lang="${lang}" class="lang-button px-2 sm:px-3 py-1 text-sm sm:text-base transition-colors ${state.language === lang ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">${lang.toUpperCase()}</button>
    `).join('');

    addEventListeners();
}

// --- EFEITOS SONOROS DE UI (WEB AUDIO API) ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let sfxCtx;

function playSFX(type) {
    if(!sfxCtx) sfxCtx = new AudioContext();
    if(sfxCtx.state === 'suspended') sfxCtx.resume();
    
    const osc = sfxCtx.createOscillator();
    const gain = sfxCtx.createGain();
    osc.connect(gain);
    gain.connect(sfxCtx.destination);
    
    // O volume dos efeitos sonoros escala com o globalVolume para não estourar o ouvido
    const maxVol = (window.globalVolume || 0.5) * 0.2; 
    
    if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, sfxCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, sfxCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(maxVol * 0.3, sfxCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, sfxCtx.currentTime + 0.05);
        osc.start();
        osc.stop(sfxCtx.currentTime + 0.05);
    } else if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, sfxCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, sfxCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(maxVol, sfxCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, sfxCtx.currentTime + 0.1);
        osc.start();
        osc.stop(sfxCtx.currentTime + 0.1);
    }
}

// --- GESTORES DE EVENTOS ---
function addEventListeners() {
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('mouseenter', () => playSFX('hover'));
        button.addEventListener('click', () => {
            playSFX('click');
            state.activeSection = button.dataset.section;
            renderApp();
            if (window.innerWidth < 1024) closeMobileMenu();
        });
    });

    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('mouseenter', () => playSFX('hover'));
        button.addEventListener('click', () => {
            playSFX('click');
            loadLanguage(button.dataset.lang);
        });
    });
}

// --- MENU MOBILE ---
function toggleMobileMenu() {
    state.isMobileMenuOpen ? closeMobileMenu() : openMobileMenu();
}

function openMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
    overlay.classList.remove('hidden');
    state.isMobileMenuOpen = true;
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    state.isMobileMenuOpen = false;
}

async function loadLanguage(lang) {
    state.language     = lang;
    state.translations = languageData[lang];
    renderApp();
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('main-container') || document.querySelector('main') || document.body;
    
    function getMobileMenuElements() {
        return {
            mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
            mobileMenuClose:  document.getElementById('mobile-menu-close'),
            mobileOverlay:    document.getElementById('mobile-overlay'),
        };
    }

    loadLanguage(state.language);

    const { mobileMenuToggle, mobileMenuClose, mobileOverlay } = getMobileMenuElements();
    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    if (mobileMenuClose)  mobileMenuClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay)    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Last.fm
    fetchNowPlaying();
    setInterval(fetchNowPlaying, 30000);

    // ── Uptime + sync clock ────────────────────────────────────────
    const pageStart = Date.now();
    setInterval(() => {
        const timeEl = document.getElementById('sync-time');
        if (timeEl) timeEl.textContent = new Date().toLocaleTimeString();

        const elapsed = Math.floor((Date.now() - pageStart) / 1000);
        const h = Math.floor(elapsed / 3600).toString().padStart(2, '0');
        const m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
        const s = (elapsed % 60).toString().padStart(2, '0');
        const uptimeEl = document.getElementById('uptime-display');
        if (uptimeEl) uptimeEl.textContent = `UPTIME: ${h}:${m}:${s}`;
    }, 1000);

    // ── Resize handler ─────────────────────────────────────────────
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && state.isMobileMenuOpen) closeMobileMenu();
    });

    // ── Partículas ─────────────────────────────────────────────────
    if(typeof initParticles === 'function') initParticles();


    // ── MUSIC PLAYER E CROSSFADE ───────────────────────────────
    window.bgmNormal = new Audio('audio/normal.mp3');
    window.bgmSuper = new Audio('audio/super.mp3');
    window.bgmAllHail = new Audio('audio/all_hail_shadow.mp3');
    
    window.playlist = [
        { id: 'normal', name: 'Theme of Zipped', audio: window.bgmNormal },
        { id: 'super', name: 'Super Shadow', audio: window.bgmSuper },
        { id: 'all_hail', name: 'All Hail Shadow', audio: window.bgmAllHail }
    ];
    window.currentTrackIndex = 0;

    window.playlist.forEach(t => t.audio.loop = true);

    // Recupera o volume salvo ou usa 5% como padrão
    const savedVol = localStorage.getItem('bgmVolume');
    window.globalVolume = savedVol !== null ? parseFloat(savedVol) : 0.05;
    
    window.playlist.forEach(t => t.audio.volume = 0);
    window.bgmNormal.volume = window.globalVolume;

    const playBtn = document.getElementById('bgm-play-btn');
    const prevBtn = document.getElementById('bgm-prev-btn');
    const nextBtn = document.getElementById('bgm-next-btn');
    const playIcon = document.getElementById('bgm-icon');
    const volSlider = document.getElementById('bgm-vol-slider');
    const volDisplay = document.getElementById('bgm-vol-display');
    const logoEl = document.getElementById('logo-header');
    const trackDisplay = document.getElementById('track-name-display');
    const visualizer = document.getElementById('audio-visualizer');

    let isPlaying = false;
    window.isAllHailMode = false;

    // Atualiza a UI do slider com o valor salvo assim que a página carrega
    if(volSlider) {
        volSlider.value = Math.round(window.globalVolume * 100);
        if(volDisplay) volDisplay.textContent = volSlider.value + '%';
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "00:00";
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateTrackDisplay() {
        if(trackDisplay) {
            const track = window.playlist[window.currentTrackIndex];
            const curr = formatTime(track.audio.currentTime);
            const total = formatTime(track.audio.duration);
            
            if (isPlaying) {
                trackDisplay.className = "text-red-500 font-mono text-sm text-glow whitespace-nowrap";
                trackDisplay.innerHTML = `&#9472; [${curr} / ${total}] ${track.name} &#9472;`;
            } else {
                trackDisplay.className = "text-gray-500 font-mono text-xs whitespace-nowrap";
                trackDisplay.innerHTML = `&#9472; ${track.name} (PAUSED) &#9472;`;
            }
        }
    }

    // Atualiza o display do tempo em tempo real
    window.playlist.forEach(t => {
        t.audio.addEventListener('timeupdate', () => {
            if (window.playlist[window.currentTrackIndex].id === t.id && isPlaying) {
                updateTrackDisplay();
            }
        });
        t.audio.addEventListener('loadedmetadata', () => {
            if (window.playlist[window.currentTrackIndex].id === t.id) {
                updateTrackDisplay();
            }
        });
    });

    window.switchTrack = function(newIndex) {
        // Pausa todos os audios
        window.playlist.forEach(t => t.audio.pause());
        
        window.currentTrackIndex = newIndex;
        
        // Define o volume e dá play se estiver tocando
        window.playlist.forEach((t, i) => {
            t.audio.volume = (i === window.currentTrackIndex) ? window.globalVolume : 0;
            t.audio.currentTime = 0;
        });
        
        // Mantemos os botões isolados dos efeitos visuais globais (dourado)
        // Removido: document.body.classList.add('super-shadow-mode');

        
        if (isPlaying) {
            window.playlist[window.currentTrackIndex].audio.play().catch(e => console.log(e));
        }
    };

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIdx = window.currentTrackIndex - 1;
            if(newIdx < 0) newIdx = window.playlist.length - 1;
            window.switchTrack(newIdx);
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIdx = (window.currentTrackIndex + 1) % window.playlist.length;
            window.switchTrack(newIdx);
        });
    }

    if(playBtn) {
        playBtn.addEventListener('click', () => {
            if(isPlaying) {
                window.playlist[window.currentTrackIndex].audio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
                if(visualizer) visualizer.classList.remove('visualizer-active');
                isPlaying = false;
                updateTrackDisplay();
            } else {
                window.playlist[window.currentTrackIndex].audio.play().catch(e => console.log(e));
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
                if(visualizer) visualizer.classList.add('visualizer-active');
                isPlaying = true;
                updateTrackDisplay();
            }
        });
    }

    if(volSlider) {
        volSlider.addEventListener('input', (e) => {
            const percent = parseInt(e.target.value) / 100;
            window.globalVolume = percent;
            localStorage.setItem('bgmVolume', percent);
            
            if(volDisplay) {
                volDisplay.textContent = e.target.value + '%';
            }
            window.playlist[window.currentTrackIndex].audio.volume = percent;
        });
    }

    window.crossfadeToSuper = function() {
        if(!isPlaying) {
            bgmSuper.volume = window.globalVolume;
            bgmSuper.play().catch(e => {});
            isPlaying = true;
            if(playIcon) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            }
            const visualizer = document.getElementById('audio-visualizer');
            if (visualizer) visualizer.classList.add('visualizer-active');
            return;
        }

        bgmSuper.volume = 0;
        bgmSuper.play().catch(e => {});

        let step = 0.05;
        let fadeInterval = setInterval(() => {
            let nVol = bgmNormal.volume - step;
            let sVol = bgmSuper.volume + step;

            if(nVol <= 0) {
                bgmNormal.volume = 0;
                bgmNormal.pause();
            } else {
                bgmNormal.volume = nVol;
            }

            if(sVol >= window.globalVolume) {
                bgmSuper.volume = window.globalVolume;
                clearInterval(fadeInterval);
                
                // Atualiza o player de música
                window.currentTrackIndex = 1;
                isPlaying = true;
                if (typeof updateTrackDisplay === 'function') updateTrackDisplay();
            } else {
                bgmSuper.volume = sVol;
            }
        }, 200);
    };

    // ── EFEITO PARALLAX DO SHADOW (MOUSE & GIROSCÓPIO) ──────────────
    const shadowBgImg = document.querySelector('#dynamic-shadow-bg img');
    if (shadowBgImg) {
        // Para PC (Mouse)
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30; // 30px max move
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            shadowBgImg.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Para Celular (Giroscópio)
        window.addEventListener('deviceorientation', (e) => {
            if (e.gamma === null || e.beta === null) return;
            // gamma = esq/dir (-90 a 90)
            // beta = frente/tras (-180 a 180)
            const x = (e.gamma / 90) * 40; 
            const y = ((e.beta - 45) / 90) * 40; // compensa o angulo de segurar o celular
            
            // Suavizar movimento
            shadowBgImg.style.transition = 'transform 0.1s ease-out';
            shadowBgImg.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

});

// --- BLACK ARMS LOGO EASTER EGG (ALL HAIL SHADOW) ---
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('black-arms-logo');
    let clickCount = 0;
    let clickTimeout;

    if(logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimeout);
            
            if(clickCount >= 3) {
                clickCount = 0;
                if(!window.isAllHailMode) {
                    window.isAllHailMode = true;
                    
                    // Pause other music
                    bgmNormal.pause();
                    bgmSuper.pause();
                    
                    // Play All Hail Shadow
                    bgmAllHail.volume = (window.globalVolume !== undefined ? window.globalVolume : 0.15);
                    bgmAllHail.currentTime = 0;
                    bgmAllHail.play().catch(e => console.log(e));
                    
                    // Sincroniza com o Player de Música
                    window.currentTrackIndex = 2;
                    isPlaying = true;
                    if (typeof updateTrackDisplay === 'function') updateTrackDisplay();
                    
                    // Update UI
                    const playIcon = document.getElementById('bgm-icon');
                    const visualizer = document.getElementById('audio-visualizer');
                    if(playIcon) {
                        playIcon.classList.remove('fa-play');
                        playIcon.classList.add('fa-pause');
                    }
                    if (visualizer) visualizer.classList.add('visualizer-active');
                    
                    // Visual changes
                    logo.classList.remove('filter', 'drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]');
                    logo.classList.add('filter', 'drop-shadow-[0_0_15px_rgba(255,215,0,1)]');
                    
                    // Terminal notification
                    const contentArea = document.getElementById('content-area');
                    if(contentArea) {
                        const msg = document.createElement('div');
                        msg.innerHTML = '<p class="text-yellow-500 font-mono font-bold mt-4 animate-pulse">> ALL HAIL SHADOW PROTOCOL OVERRIDE ACCEPTED.</p>';
                        contentArea.prepend(msg);
                    }
                }
            } else {
                clickTimeout = setTimeout(() => { clickCount = 0; }, 1000);
            }
        });
    }
});
// --- ESTADO DA APLICAÇÃO ---
let state = {
    language: 'pt',
    activeSection: 'profile',
    translations: {},
    isMobileMenuOpen: false
};

const LASTFM_API_KEY = '31c08757e873df3470825f5bff492629';
const LASTFM_USER    = 'Zippeed';

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
        const trackName    = track.name               || '—';
        const artistName   = track.artist?.['#text']  || '—';

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
    contentWindow.classList.add('fade-in');
    setTimeout(() => contentWindow.classList.remove('fade-in'), 350);

    renderSystemStatus(t.status);

    const langContainer = document.getElementById('lang-buttons');
    langContainer.innerHTML = ['pt', 'en', 'es', 'ja'].map(lang => `
        <button data-lang="${lang}" class="lang-button px-2 sm:px-3 py-1 text-sm sm:text-base transition-colors ${state.language === lang ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">${lang.toUpperCase()}</button>
    `).join('');

    addEventListeners();
}

// --- GESTORES DE EVENTOS ---
function addEventListeners() {
    document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', () => {
            state.activeSection = button.dataset.section;
            renderApp();
            if (window.innerWidth < 1024) closeMobileMenu();
        });
    });

    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('click', () => loadLanguage(button.dataset.lang));
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
    const mainContainer = document.getElementById('main-container');
    const bootScreen    = document.getElementById('boot-screen');
    const bootText      = document.getElementById('boot-text');

    function getMobileMenuElements() {
        return {
            mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
            mobileMenuClose:  document.getElementById('mobile-menu-close'),
            mobileOverlay:    document.getElementById('mobile-overlay'),
        };
    }

    // ── Boot sequence ──────────────────────────────────────────────
    const bootLines = [
        { text: '> INITIALIZING G.U.N. TERMINAL V5.0.0...', cls: 'text-red-500' },
        { text: '> LOADING SHADOW PROTOCOL...',              cls: 'text-red-500' },
        { text: '> SYNCING CHAOS EMERALD DATA...',           cls: 'text-red-500' },
        { text: '> AUTHENTICATING AGENT: ZIPPED...',        cls: 'text-red-400' },
        { text: '> ESTABLISHING SECURE CONNECTION...',      cls: 'text-red-400' },
        { text: '> ACCESS GRANTED.',                        cls: 'text-green-400' },
    ];

    bootText.style.display = 'none';
    const bootContainer = document.createElement('div');
    bootContainer.className = 'font-mono text-sm sm:text-base px-6 max-w-2xl w-full text-left';
    bootScreen.appendChild(bootContainer);

    function launchApp() {
        bootScreen.style.transition = 'opacity 0.3s ease';
        bootScreen.style.opacity    = '0';
        setTimeout(() => {
            bootScreen.style.display    = 'none';
            mainContainer.style.display = 'flex';
            loadLanguage(state.language);

            const { mobileMenuToggle, mobileMenuClose, mobileOverlay } = getMobileMenuElements();
            if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMobileMenu);
            if (mobileMenuClose)  mobileMenuClose.addEventListener('click', closeMobileMenu);
            if (mobileOverlay)    mobileOverlay.addEventListener('click', closeMobileMenu);

            // Last.fm
            fetchNowPlaying();
            setInterval(fetchNowPlaying, 30000);
        }, 320);
    }

    function typeLine(lineIndex) {
        if (lineIndex >= bootLines.length) {
            setTimeout(launchApp, 380);
            return;
        }
        const { text, cls } = bootLines[lineIndex];
        const lineEl = document.createElement('p');
        lineEl.className = `${cls} mb-1`;
        bootContainer.appendChild(lineEl);

        let i = 0;
        const interval = setInterval(() => {
            if (i >= text.length) {
                clearInterval(interval);
                lineEl.innerHTML = text;
                setTimeout(() => typeLine(lineIndex + 1), 55);
            } else {
                lineEl.innerHTML = text.substring(0, i + 1) + '<span class="animate-pulse">_</span>';
                i++;
            }
        }, 16);
    }

    typeLine(0);

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
    initParticles();
});
import { staticData, languageData } from './data.js';
import { icon } from './icons.js';
import { ui, languageNames, escapeHtml as esc, storage } from './ui.js';
import { AudioPlayer, formatTime } from './audio.js';
import { renderProfile, renderAffinities, renderRecords, renderGallery, renderStatus } from './renderers.js';

const $ = id => document.getElementById(id);
const savedLanguage = storage.get('language', 'pt');
const state = { language: Object.hasOwn(languageData, savedLanguage) ? savedLanguage : 'pt', section: 'profile', category: 0, emeralds: new Set(), menuOpen: false };
let listeningTrack = null;
let nowPlayingRequest = null;
let lightboxItems = [];
let imageIndex = 0;
let imageTrigger = null;
let savedScroll = 0;
const player = new AudioPlayer({ onChange: updatePlayer });
const mobile = matchMedia('(max-width: 960px)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const effectsPreference = storage.get('effects', 'off');
const u = () => ui[state.language];
const t = () => languageData[state.language];

function readRoute() {
  const [section, category] = location.hash.slice(1).split('/');
  state.section = Object.hasOwn(t().menu, section) ? section : 'profile';
  const index = Number(category);
  if (section === 'affinities' && category !== undefined) state.category = Number.isInteger(index) && index >= 0 && index < staticData.affinities.length ? index : 0;
}
function render({ focus = false } = {}) {
  const tr = t(), text = u();
  document.documentElement.lang = state.language === 'pt' ? 'pt-BR' : state.language;
  document.title = `${tr.menu[state.section]} | Zipped — P//SHADOW`;
  $('main-menu').innerHTML = Object.entries(tr.menu).map(([key, name]) => `<a href="#${key}" class="menu-button" ${state.section === key ? 'aria-current="page"' : ''}>${icon(key)}<span>${esc(name)}</span></a>`).join('');
  $('main-menu').setAttribute('aria-label', text.navigation);
  $('lang-buttons').innerHTML = Object.entries(languageNames).map(([lang, name]) => `<button class="lang-button" data-lang="${lang}" lang="${lang}" aria-label="${name}" aria-pressed="${lang === state.language}">${lang.toUpperCase()}</button>`).join('');
  $('lang-buttons').setAttribute('aria-label', text.language);
  $('section-label').textContent = tr.menu[state.section];
  $('space-label').textContent = text.home;
  $('skip-link').textContent = text.skip;
  $('footer-text').textContent = text.footer;
  $('content-window').innerHTML = state.section === 'profile' ? renderProfile(tr.profile, text, tr.status) : state.section === 'affinities' ? renderAffinities(tr.affinities, text, state.category) : state.section === 'records' ? renderRecords(tr.records, text) : renderGallery(tr.gallery, text);
  $('system-status-container').innerHTML = renderStatus(tr.status, text, state.emeralds);
  $('secret-description').textContent = text.secret;
  $('secret-close').textContent = text.return;
  $('lightbox-close').setAttribute('aria-label', text.close);
  $('lightbox-prev').setAttribute('aria-label', text.previousImage);
  $('lightbox-next').setAttribute('aria-label', text.nextImage);
  $('lightbox-error').textContent = text.imageError;
  $('mobile-overlay').setAttribute('aria-label', text.closeMenu);
  $('effects-toggle').setAttribute('aria-label', text.effects);
  $('effects-toggle').title = text.effects;
  updateMenuLabel();
  updateConnection();
  renderListening();
  updatePlayer();
  syncThemeImage();
  if (focus) {
    $('content-window').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function updatePlayer() {
  const text = u();
  const duration = player.audio?.duration;
  const elapsed = player.audio?.currentTime || 0;
  const status = player.error ? text.audioError : player.pending ? text.loading : player.playing ? text.playing : text.paused;
  $('track-name-display').textContent = player.track.name;
  $('player-track-title').textContent = player.track.name;
  $('track-state').textContent = status;
  $('player-toggle').classList.toggle('is-playing', player.playing);
  $('player-toggle').setAttribute('aria-label', `${text.soundtrack}: ${player.track.name}, ${status}`);
  $('player-toggle-icon').innerHTML = icon(player.playing ? 'pause' : 'play');
  $('bgm-play-btn').innerHTML = icon(player.desired || player.playing ? 'pause' : 'play');
  $('bgm-play-btn').setAttribute('aria-label', player.desired || player.playing ? text.pause : text.play);
  $('bgm-play-btn').setAttribute('aria-busy', String(player.pending));
  $('bgm-prev-btn').setAttribute('aria-label', text.previous);
  $('bgm-next-btn').setAttribute('aria-label', text.next);
  $('bgm-mute-btn').innerHTML = icon(player.muted || player.volume === 0 ? 'mute' : 'volume');
  $('bgm-mute-btn').setAttribute('aria-label', player.muted || player.volume === 0 ? text.unmute : text.mute);
  $('bgm-mute-btn').setAttribute('aria-pressed', String(player.muted || player.volume === 0));
  $('bgm-vol-slider').setAttribute('aria-label', text.volume);
  $('bgm-vol-slider').value = Math.round(player.volume * 100);
  $('bgm-vol-display').textContent = `${Math.round(player.volume * 100)}%`;
  $('elapsed').textContent = formatTime(elapsed);
  $('duration').textContent = formatTime(duration);
  $('bgm-seek').disabled = !Number.isFinite(duration) || duration <= 0;
  $('bgm-seek').value = Number.isFinite(duration) && duration > 0 ? elapsed / duration * 100 : 0;
  $('bgm-seek').setAttribute('aria-label', text.seek);
  $('bgm-seek').setAttribute('aria-valuetext', `${formatTime(elapsed)} / ${formatTime(duration)}`);
  $('track-count').textContent = `${String(player.index + 1).padStart(2, '0')} / 03`;
  $('soundtrack-label').textContent = text.soundtrack;
  $('music-player-container').setAttribute('aria-label', text.soundtrack);
  $('audio-message').textContent = player.error ? text.audioError : '';
  if ('mediaSession' in navigator) navigator.mediaSession.playbackState = player.playing ? 'playing' : 'paused';
}
function togglePlayer(force) {
  const open = force ?? $('music-player-container').hidden;
  $('music-player-container').hidden = !open;
  $('player-toggle').setAttribute('aria-expanded', String(open));
}
function updateMenuLabel() {
  $('mobile-menu-toggle').innerHTML = icon(state.menuOpen ? 'close' : 'menu');
  $('mobile-menu-toggle').setAttribute('aria-label', state.menuOpen ? u().closeMenu : u().openMenu);
  $('mobile-menu-toggle').setAttribute('aria-expanded', String(state.menuOpen));
}
function toggleMenu(open = !state.menuOpen, restoreFocus = true) {
  state.menuOpen = open;
  $('sidebar').classList.toggle('is-open', open);
  $('mobile-overlay').hidden = !open;
  $('sidebar').inert = mobile.matches && !open;
  $('main-content').inert = open;
  document.querySelector('.topbar-controls').inert = open;
  document.body.classList.toggle('modal-open', open);
  updateMenuLabel();
  if (open) { togglePlayer(false); $('sidebar').querySelector('a')?.focus(); }
  else if (restoreFocus && mobile.matches) $('mobile-menu-toggle').focus();
}
function updateConnection() {
  const online = navigator.onLine;
  $('connection-label').textContent = online ? u().online : u().offline;
  document.body.classList.toggle('is-offline', !online);
}
function renderListening() {
  const text = u();
  $('now-playing').setAttribute('aria-label', `${text.lastfm} (${text.external})`);
  $('now-playing').innerHTML = `<span class="listening-heading">${icon('music')}${listeningTrack ? (listeningTrack.now ? text.listening : text.lastPlayed) : 'Last.fm'}${icon('arrow')}</span><span class="listening-track">${esc(listeningTrack?.name || text.unavailable)}</span><span class="listening-artist">${esc(listeningTrack?.artist || '@Zippeed')}</span>`;
}
async function fetchNowPlaying() {
  if (document.hidden || !navigator.onLine || nowPlayingRequest) return;
  nowPlayingRequest = new AbortController();
  const timer = setTimeout(() => nowPlayingRequest?.abort(), 7000);
  try {
    const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Zippeed&api_key=31c08757e873df3470825f5bff492629&format=json&limit=1', { signal: nowPlayingRequest.signal });
    if (!response.ok) return;
    const data = await response.json();
    const track = data.recenttracks?.track?.[0];
    if (track) {
      listeningTrack = { name: track.name || '—', artist: track.artist?.['#text'] || '—', now: track['@attr']?.nowplaying === 'true' };
      renderListening();
    }
  } catch { /* Last.fm is optional; the rest of the page stays available. */ }
  finally { clearTimeout(timer); nowPlayingRequest = null; }
}
function openLightbox(index, trigger) {
  lightboxItems = state.section === 'gallery' ? staticData.gallery.map((src, i) => ({ image: src, name: `${u().photo} ${i + 1}` })) : staticData.affinities[state.category].items.filter(item => item.image);
  if (!lightboxItems[index]) return;
  imageIndex = index;
  imageTrigger = trigger;
  savedScroll = window.scrollY;
  updateLightbox();
  $('lightbox').showModal();
  document.body.classList.add('modal-open');
}
function updateLightbox() {
  const item = lightboxItems[imageIndex];
  $('lightbox-error').hidden = true;
  $('lightbox-img').hidden = false;
  $('lightbox-img').src = item.image;
  $('lightbox-img').alt = item.name;
  $('lightbox-caption').textContent = item.name + (item.artist ? ` — ${item.artist}` : '');
  $('lightbox-count').textContent = `${imageIndex + 1} / ${lightboxItems.length}`;
}
function navigateLightbox(direction) {
  imageIndex = (imageIndex + direction + lightboxItems.length) % lightboxItems.length;
  updateLightbox();
}
function syncThemeImage() {
  const image = $('hero-character');
  if (image) image.src = document.body.classList.contains('super-shadow-mode') ? 'imagens/characters/super-shadow.webp' : 'imagens/characters/shadow-hero.webp';
}
function activateSuper() {
  if ($('easter-egg-overlay').open) return;
  document.body.classList.add('super-shadow-mode');
  syncThemeImage();
  $('reset-theme').hidden = false;
  if ($('lightbox').open) $('lightbox').close();
  toggleMenu(false, false);
  $('easter-egg-overlay').showModal();
  document.body.classList.add('modal-open');
  player.select(1, true);
}
function syncEffects(enabled) {
  document.body.classList.toggle('effects-on', enabled && !reducedMotion.matches);
  $('effects-toggle').setAttribute('aria-pressed', String(enabled));
  $('effects-toggle').innerHTML = icon('motion');
}

$('skip-link').addEventListener('click', event => {
  event.preventDefault();
  $('content-window').focus();
  $('content-window').scrollIntoView({ block: 'start', behavior: 'instant' });
});
$('bgm-prev-btn').innerHTML = icon('prev');
$('bgm-next-btn').innerHTML = icon('next');
$('lightbox-close').innerHTML = icon('close');
$('lightbox-prev').innerHTML = icon('chevron');
$('lightbox-next').innerHTML = icon('chevron');
$('bgm-play-btn').addEventListener('click', () => player.toggle());
$('bgm-prev-btn').addEventListener('click', () => player.select(player.index - 1));
$('bgm-next-btn').addEventListener('click', () => player.select(player.index + 1));
$('bgm-mute-btn').addEventListener('click', () => player.toggleMute());
$('bgm-vol-slider').addEventListener('input', event => player.setVolume(Number(event.target.value) / 100));
$('bgm-seek').addEventListener('input', event => player.seek(Number(event.target.value)));
$('player-toggle').addEventListener('click', () => togglePlayer());
$('mobile-menu-toggle').addEventListener('click', () => toggleMenu());
$('mobile-overlay').addEventListener('click', () => toggleMenu(false));
$('effects-toggle').addEventListener('click', () => {
  const enabled = $('effects-toggle').getAttribute('aria-pressed') !== 'true';
  storage.set('effects', enabled ? 'on' : 'off');
  syncEffects(enabled);
});
reducedMotion.addEventListener('change', () => syncEffects(storage.get('effects', 'off') === 'on'));
mobile.addEventListener('change', () => { toggleMenu(false, false); });
$('lang-buttons').addEventListener('click', event => {
  const button = event.target.closest('[data-lang]');
  if (!button) return;
  state.language = button.dataset.lang;
  storage.set('language', state.language);
  render();
  $('lang-buttons').querySelector(`[data-lang="${state.language}"]`).focus();
});
$('content-window').addEventListener('click', event => {
  const category = event.target.closest('[data-category]');
  if (category) { location.hash = `affinities/${category.dataset.category}`; return; }
  const image = event.target.closest('[data-image]');
  if (image) openLightbox(Number(image.dataset.image), image);
});
$('content-window').addEventListener('toggle', event => {
  const details = event.target;
  if (!details.matches('.playlist-card')) return;
  const embed = details.querySelector('[data-embed]');
  if (details.open && !embed.querySelector('iframe') && embed.dataset.embed) {
    const iframe = document.createElement('iframe');
    iframe.src = embed.dataset.embed;
    iframe.title = embed.dataset.title;
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    embed.append(iframe);
  } else if (!details.open) embed.replaceChildren();
}, true);
$('content-window').addEventListener('error', event => {
  if (event.target.matches('.image-card img')) {
    const card = event.target.closest('.image-card');
    card.classList.add('image-failed');
    card.querySelector('.image-surface').dataset.error = u().imageError;
  }
}, true);
$('system-status-container').addEventListener('click', event => {
  const emerald = event.target.closest('[data-emerald]');
  if (emerald) {
    state.emeralds.add(Number(emerald.dataset.emerald));
    emerald.setAttribute('aria-pressed', 'true');
    document.querySelector('.energy-count').textContent = `${state.emeralds.size}/7`;
    if (state.emeralds.size === 7) activateSuper();
  }
  if (event.target.closest('#reset-theme')) {
    document.body.classList.remove('super-shadow-mode');
    state.emeralds.clear();
    $('system-status-container').innerHTML = renderStatus(t().status, u(), state.emeralds);
    syncThemeImage();
    player.select(0);
  }
});
let avatarClicks = 0, avatarTimer;
function secretTrack(event) {
  clearTimeout(avatarTimer);
  if (++avatarClicks === 3) { event.preventDefault(); avatarClicks = 0; player.select(2, true); togglePlayer(true); }
  avatarTimer = setTimeout(() => { avatarClicks = 0; }, 1000);
}
$('profile-secret').addEventListener('click', secretTrack);
document.querySelector('.brand').addEventListener('click', secretTrack);
$('lightbox-close').addEventListener('click', () => $('lightbox').close());
$('lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
$('lightbox-next').addEventListener('click', () => navigateLightbox(1));
$('lightbox').addEventListener('click', event => { if (event.target === $('lightbox')) $('lightbox').close(); });
$('lightbox').addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  imageTrigger?.isConnected && imageTrigger.focus({ preventScroll: true });
  window.scrollTo({ top: savedScroll, behavior: 'instant' });
});
$('lightbox-img').addEventListener('error', () => { $('lightbox-img').hidden = true; $('lightbox-error').hidden = false; });
$('secret-close').addEventListener('click', () => $('easter-egg-overlay').close());
$('easter-egg-overlay').addEventListener('close', () => document.body.classList.remove('modal-open'));
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (state.menuOpen) toggleMenu(false);
    if (!$('music-player-container').hidden) { togglePlayer(false); $('player-toggle').focus(); }
  }
  if ($('lightbox').open) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); navigateLightbox(event.key === 'ArrowLeft' ? -1 : 1); }
    return;
  }
  if (state.menuOpen && event.key === 'Tab') {
    const links = [...$('sidebar').querySelectorAll('a,button:not([hidden])')];
    const first = links[0], last = links.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (event.target.closest('input,textarea,select,[contenteditable]')) return;
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  konamiIndex = key === konami[konamiIndex] ? konamiIndex + 1 : key === konami[0] ? 1 : 0;
  if (konamiIndex === konami.length) { konamiIndex = 0; activateSuper(); }
});
document.addEventListener('click', event => {
  // SVG contents can be replaced by the transport handler before bubbling.
  // The original event path still knows the click occurred inside the player.
  if (!event.composedPath().some(node => node.classList?.contains('player-anchor'))) togglePlayer(false);
  if (state.menuOpen && event.target.closest('#main-menu a,.brand')) toggleMenu(false, false);
  const navigation = event.target.closest('#main-menu a,.brand');
  if (navigation && navigation.hash === location.hash && !event.defaultPrevented) {
    event.preventDefault();
    render({ focus: true });
  }
});
window.addEventListener('hashchange', () => {
  const previousSection = state.section;
  if (state.menuOpen) toggleMenu(false, false);
  readRoute();
  if ($('lightbox').open) $('lightbox').close();
  render({ focus: previousSection !== state.section });
  if (previousSection === state.section && state.section === 'affinities') $('content-window').querySelector(`[data-category="${state.category}"]`)?.focus({ preventScroll: true });
});
window.addEventListener('online', () => { updateConnection(); fetchNowPlaying(); });
window.addEventListener('offline', updateConnection);
document.addEventListener('visibilitychange', () => { if (!document.hidden) fetchNowPlaying(); });
setInterval(fetchNowPlaying, 60000);
if ('mediaSession' in navigator) {
  for (const [action, handler] of Object.entries({ play: () => player.play(), pause: () => player.pause(), previoustrack: () => player.select(player.index - 1), nexttrack: () => player.select(player.index + 1) })) {
    try { navigator.mediaSession.setActionHandler(action, handler); } catch { /* Optional browser integration. */ }
  }
}
readRoute();
render();
$('sidebar').inert = mobile.matches;
syncEffects(effectsPreference === 'on');
fetchNowPlaying();
// Local development always uses fresh assets. Production keeps the offline shell.
if ('serviceWorker' in navigator && !['localhost', '127.0.0.1'].includes(location.hostname)) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(() => {}));
}

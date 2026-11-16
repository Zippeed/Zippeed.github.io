// Small local SVG set: no icon font, network requests or runtime dependency.
const paths = {
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  records: '<path d="M4 3h12l4 4v14H4zM15 3v5h5M8 12h8M8 16h6"/>',
  gallery: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  play: '<path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
  prev: '<path d="M5 5v14M19 5 8 12l11 7Z"/>',
  next: '<path d="M19 5v14M5 5l11 7-11 7Z"/>',
  volume: '<path d="m11 5-6 4H2v6h3l6 4ZM15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/>',
  mute: '<path d="m11 5-6 4H2v6h3l6 4ZM16 9l6 6m0-6-6 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a20 20 0 0 1 0 18 20 20 0 0 1 0-18Z"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5"/><rect x="9" y="9" width="6" height="6"/>',
  game: '<path d="M7 7h10c4 0 5 5 5 10 0 3-3 3-6-1H8c-3 4-6 4-6 1 0-5 1-10 5-10ZM6 10v5m-2-2.5h4m8-1h.01M19 14h.01"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M12 17v4m-5 0h10"/>',
  music: '<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
  book: '<path d="M12 5C8 2 4 3 2 4v16c3-1 7-1 10 1 3-2 7-2 10-1V4c-2-1-6-2-10 1Zm0 0v16"/>',
  film: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4m10 0h4M3 16h4m10 0h4M7 12h10"/>',
  headset: '<path d="M3 14v-2a9 9 0 0 1 18 0v2M3 12h4v8H3Zm14 0h4v8h-4Z"/>',
  keyboard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10"/>',
  mouse: '<rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 2v7"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
  memory: '<path d="M2 6h20v12H2ZM6 18v3m4-3v3m4-3v3m4-3v3M6 10v4m4-4v4m4-4v4m4-4v4"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  spark: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>',
  signal: '<path d="M4 20v-4m5 4v-8m5 8V8m5 12V4"/>',
  motion: '<path d="M3 8h11a4 4 0 1 0-4-4M2 12h17a3 3 0 1 1-3 3M5 17h4a3 3 0 1 1-3 3"/>',
};
const aliases = { affinities: 'heart', 'fa-user': 'profile', 'fa-heart': 'heart', 'fa-gamepad': 'game', 'fa-tv': 'monitor', 'fa-film': 'film', 'fa-shield-halved': 'spark', 'fa-book-open': 'book', 'fa-book': 'book', 'fa-user-ninja': 'profile', 'fa-music': 'music', 'fa-headphones': 'headset', 'fa-microchip': 'cpu', 'fa-memory': 'memory', 'fa-keyboard': 'keyboard', 'fa-mouse': 'mouse', 'fa-headset': 'headset', 'fa-microphone': 'mic', 'fa-desktop': 'monitor', 'fa-mouse-pointer': 'mouse', 'fa-birthday-cake': 'spark', 'fa-venus-mars': 'profile', 'fa-map-marker-alt': 'pin' };
export function icon(name, className = '') {
  const key = name.split(' ').at(-1);
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[aliases[key] || key] || paths.arrow}</svg>`;
}

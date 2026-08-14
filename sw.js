// Service Worker — P//SHADOW
// Estratégia: app shell em cache-first; demais GETs em stale-while-revalidate.
// Bump a versão pra forçar atualização quando arquivos mudarem.
const CACHE = 'pshadow-v2';

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './tailwind.css',
  './data.js',
  './renderers.js',
  './particles.js',
  './matrix.js',
  './app.js',
  './easter-egg.js',
  './manifest.json',
  './imagens/characters/perfil.png',
  './imagens/characters/black_arms_logo.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // addAll falha tudo se 1 item falhar; usamos add individual tolerante a erro
      .then(cache => Promise.allSettled(APP_SHELL.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Só lida com GET do mesmo domínio (deixa Last.fm, fontes e CDNs passarem direto)
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req)
        .then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      // stale-while-revalidate: serve do cache se houver, atualiza em segundo plano
      return cached || network;
    })
  );
});

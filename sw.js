// Versioned offline shell. Network-first code avoids serving stale releases.
const CACHE = 'pshadow-v6';
const SHELL = ['./','./index.html','./styles.css','./app.js','./data.js','./ui.js','./icons.js','./audio.js','./renderers.js','./manifest.json','./imagens/characters/perfil.webp','./imagens/characters/black-arms.webp','./imagens/characters/shadow-hero.webp'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('pshadow-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin||req.headers.has('range')||/\.(mp3|ogg)$/.test(url.pathname))return;
  if(!SHELL.some(asset=>new URL(asset,self.registration.scope).pathname===url.pathname)&&!url.pathname.includes('/imagens/'))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try{
      const response=await fetch(req);
      if(response.ok&&response.type==='basic'){
        // Keep image cache bounded as the visitor browses collections.
        await cache.put(req,response.clone());
        if(url.pathname.includes('/imagens/')){
          const images=(await cache.keys()).filter(key=>new URL(key.url).pathname.includes('/imagens/')&&!SHELL.some(asset=>new URL(asset,self.registration.scope).href===key.url));
          await Promise.all(images.slice(0,Math.max(0,images.length-80)).map(key=>cache.delete(key)));
        }
      }
      return response;
    }catch{
      const cached=await cache.match(req);
      if(cached)return cached;
      if(req.mode==='navigate')return await cache.match('./index.html')||Response.error();
      return new Response('',{status:503,statusText:'Offline'});
    }
  })());
});

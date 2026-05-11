const CACHE_NAME = 'mi-dieta-v1';
const ASSETS = [
  './dieta_dermatitis_musculos.html',
  './manifest.json'
];

// Instalar y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activar y limpiar caches viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Responder desde cache (funciona sin internet)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

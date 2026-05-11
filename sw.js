const CACHE_NAME = 'cabata1-v1';
const urlsTo_CACHE = ['/CABATA1/', '/CABATA1/index.html', '/CABATA1/style.css', '/CABATA1/script.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsTo_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

const CACHE_NAME = 'dfwpogo-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/events.md',
  '/signature.md',
  '/campfire.md',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const networkFetch = fetch(event.request)
        .then(networkResponse => {
          // Put a copy in the cache for next time
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          }
          return networkResponse;
        }).catch(() => null);

      // Prefer cached response, otherwise network, otherwise fallback to network promise
      return cachedResponse || networkFetch;
    })
  );
});

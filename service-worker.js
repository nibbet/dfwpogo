self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('go-fest-cache').then(cache => {
      return cache.addAll([
        './index.html',
        './manifest.json',
        './img/icon-192.png',
        './img/icon-512.png'
        // Add other static assets here if needed
      ]);
    })
  );
  self.skipWaiting(); // Activate worker immediately
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Skip caching if response is invalid or a redirect
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type === 'opaqueredirect'
        ) {
          return networkResponse;
        }

        // Clone and cache valid response
        const responseClone = networkResponse.clone();
        caches.open('go-fest-cache').then(cache => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if fetch fails (e.g., offline)
        return caches.match(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  // Clean up old caches if you use versioning
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(cache => cache !== 'go-fest-cache')
          .map(cache => caches.delete(cache))
      )
    )
  );
  self.clients.claim(); // Take control of open tabs
});
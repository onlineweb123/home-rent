const CACHE_NAME = 'home-rent-v1';
const ASSETS = [
  'index.html',
  'login.html',
  'add-post.html',
  'profile.html',
  'reset.html',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png'
];

// Service Worker Install செய்தல்
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// பழைய கேச் கோப்புகளை நீக்குதல்
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// நெட்வொர்க் ரெக்வஸ்ட்களை கையாளுதல் (Offline Support)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});

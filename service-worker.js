const CACHE_NAME = 'omg-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/home.html',
  '/jeux.html',
  '/joueurs.html',
  '/parties.html',
  '/roue.html',
  '/groupes.html',
  '/styles.css',
  '/supabase-config.js',
  // Ajoutez ici les chemins de vos images importantes (ex: 'omg_img.png')
  // Ajoutez les chemins vers vos icônes de manifest (ex: '/img/icon-192x192.png')
];

// Installation du Service Worker et mise en cache des ressources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Récupération des ressources : si présent dans le cache, on sert le cache, sinon on fait une requête réseau
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non-GET et les requêtes Supabase/réseau externe
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - on retourne la réponse du cache
        if (response) {
          return response;
        }
        // Pas dans le cache - on fait une requête réseau
        return fetch(event.request);
      })
  );
});

// Mise à jour du Service Worker : suppression des anciens caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
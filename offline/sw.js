const CACHE_NAME = 'puzzle15V1';
const urlsToCache = [
    '/',
    '/game',
    '/static/images/banner.jpg',
    '/static/styles/main.css',
    '/static/styles/puzzle.css',
];

self.addEventListener('install', event => {
    const preLoaded = caches
        .open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache));
    event.waitUntil(preLoaded);
});

self.addEventListener('fetch', event => {
    const response = caches
        .match(event.request)
        .then(match => match || fetch(event.request));
    event.respondWith(response);
});

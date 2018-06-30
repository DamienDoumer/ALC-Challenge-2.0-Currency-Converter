
const cacheName = 'currency-converter-007-v1';

self.addEventListener('install', (event) => {

    event.waitUntil(
        //I cache the currencies
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                './',
                './js/main/idbManager.js',
                './js/idb.js',
                './styles/semantic.min.css',
                './js/main/converter.js',
                './js/main/main.js',
                './js/main/serviceWorker.js',
                'https://free.currencyconverterapi.com/api/v5/currencies',
            ]);
        })
    )
});

self.addEventListener('fetch', (event) => {

    let url = event.request.url;

    event.respondWith(
        //Respond with the cached response or if no response is saved,
        //respond with result from the network.
        caches.match(event.request).then((response) => {
            if(response) return response;
            return fetch(event.request);
        })
    )
});


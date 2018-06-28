
const cacheName = 'currency-converter-007-v1';

self.addEventListener('install', (event) => {

    event.waitUntil(
        //I cache the currencies
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                '/',
                'styles/semantic.min.css',
                'js/main/converter.js',
                'js/main/main.js',
                'js/main/serviceWorker.js',
                'https://free.currencyconverterapi.com/api/v5/currencies',
            ]);
        })
    )
});

self.addEventListener('fetch', (event) => {

    let url = event.request.url;
    
    //If the convert API is called
    // if(url.indexOf("v5/convert?") >= 0){

    //     let portion1 = url.substring(url.indexOf('=')+1);
    //     let query = portion1.slice(0, portion1.indexOf('&'));
        
    //     event.respondWith(
    //         caches.match(event.request).then(response => {
    //             if(response) return response;

    //             caches.open
    //         })
    //     );
    //     caches.match(url).then(response => {
    //         if(response) return response;

    //         caches.open(cacheName).then((cache) => {
    //             return cache.addAll(url);
    //         })

    //         return fetch(url);
    //     })
    // }

    event.respondWith(
        //Respond with the cached response or if no response is saved,
        //respond with result from the network.
        caches.match(event.request).then((response) => {
            if(response) return response;
            return fetch(event.request);
        })
    )
    
    // if(url == 'https://free.currencyconverterapi.com/api/v5/currencies'){
    //     console.log("Intercepted");
    // }
    
});


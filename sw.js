

self.addEventListener('fetch', function(event) {

    
    if(event.request.url == 'https://free.currencyconverterapi.com/api/v5/currencies'){
        console.log("Intercepted");
    }

    //If the convert API is called
    if(event.request.url.indexOf("convert") >= 0){

        let url = 'https://free.currencyconverterapi.com/api/v5/convert?q=APN_JKI&compact=ultra';
        let portion1 = url.substring(url.indexOf('=')+1);
        let query = portion1.slice(0, portion1.indexOf('&'));
        
    }
    
});




self.addEventListener('fetch', function(event) {

    let url = event.request.url;
    
    if(url == 'https://free.currencyconverterapi.com/api/v5/currencies'){
        console.log("Intercepted");
    }

    //If the convert API is called
    if(url.indexOf("v5/convert?") >= 0){

        let portion1 = url.substring(url.indexOf('=')+1);
        let query = portion1.slice(0, portion1.indexOf('&'));
        console.log(query);
    }
    
});


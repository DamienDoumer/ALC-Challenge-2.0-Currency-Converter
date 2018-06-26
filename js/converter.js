
class Converter
{
    constructor(doneButton)
    {
        this.doneButton = doneButton;

        this.doneButton.addEventListener("click", () => 
        {
            alert("Clicked");
        });
    }


    getAllCurrencies()
    {
        return fetch("https://free.currencyconverterapi.com/api/v5/currencies");
        // .then(response => 
        // { 
        //     response.json().then((jsonData) => {
        //         return jsonData;
        //     });
        // });
    }

    // convertCurrency()
    // {
    //     fetch("https://free.currencyconverterapi.com/api/v5/currencies").catch(e => 
    // {
    //     console.log(e);
    // }).then(data => 
    // {
        
    //     //console.log(JSON.stringify(data.json()));
    // })
    // }
    

    // convertCurrency(amount, fromCurrency, toCurrency, cb) {

    //     var apiKey = 'your-api-key-here';
      
    //     fromCurrency = encodeURIComponent(fromCurrency);
    //     toCurrency = encodeURIComponent(toCurrency);
    //     var query = fromCurrency + '_' + toCurrency;
      
    //     var url = 'https://www.currencyconverterapi.com/api/v5/convert?q='
    //               + query + '&compact=ultra&apiKey=' + apiKey;
      
    //     https.get(url, function(res){
    //         var body = '';
      
    //         res.on('data', function(chunk){
    //             body += chunk;
    //         });
      
    //         res.on('end', function(){
    //             try {
    //               var jsonObj = JSON.parse(body);
      
    //               var val = jsonObj[query];
    //               if (val) {
    //                 var total = val * amount;
    //                 cb(null, Math.round(total * 100) / 100);
    //               } else {
    //                 var err = new Error("Value not found for " + query);
    //                 console.log(err);
    //                 cb(err);
    //               }
    //             } catch(e) {
    //               console.log("Parse error: ", e);
    //               cb(e);
    //             }
    //         });
    //     }).on('error', function(e){
    //           console.log("Got an error: ", e);
    //           cb(e);
    //     });
    //   }
      
    //   //uncomment to test
    //   /*
    //   convertCurrency(10, 'USD', 'PHP', function(err, amount) {
    //     console.log(amount);
    //   });
    //   */
}


let submitButton = document.getElementById("submit_button");
let toSelect = document.getElementById("currency_to_dropdown");
let fromSelect = document.getElementById("currency_from_dropdown");

//create a converter object
let converter = new Converter(submitButton);

//Get all the currencies, then add them to the Drop downs on the index.html page
converter.getAllCurrencies().then(response => 
        { 
            response.json().then((jsonData) => {
                let data = jsonData.results;
                let set = {data};
                
                Object.keys(jsonData.results).forEach(function(key,index) {
                    console.log(jsonData.results[key]);
                    let currency = jsonData.results[key];
                    let option = document.createElement("option");
                    if(!currency.currencySymbol)
                    {    option.text = `(${currency.id}) ${currency.currencyName}`; }
                    else
                    {
                        option.text = `(${currency.id}) ${currency.currencyName} ${currency.currencySymbol}`;
                    }

                    option.value = currency;
                    toSelect.add(option, null);
                    fromSelect.add(option, null);
                });
            });
        });

import IDBManager from './idbManager.js';

export let lastQuery = '';

export default class Converter
{
    constructor(idbManager)
    {
        //the idb database to retrieve and save data to and from CACHE database
        this._idbManager = idbManager;
    }

    getAllCurrencies(callBack)
    {
        fetch("https://free.currencyconverterapi.com/api/v5/currencies")
        .then(response => callBack(null, response))
        .catch(error => callBack(error, null));
    }

    //Converts the currency
    convertCurrency(amount, fromCurrency, toCurrency, callBack)
    {
        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        const query = fromCurrency + '_' + toCurrency;
        lastQuery = query;

        //we build the URL
        const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

        //Inquire IDB for the objec'ts query
        this._idbManager.getQueryValueByID(query, (error, value) => {

            if(error){
                callBack(error);
                return;
            }

            //if the value was not found in idb, query the internet
            if(!value){

                fetch(url)
                .catch(error => callBack(error))
                .then(results => 
                {
                    //Invoke's the call back method of the upper layer using this class after 
                    //converting the result to json.
                    results.json().then(jsonData => 
                        {
                            //save the value and the query in idb first
                            this._idbManager.saveQueryInDatabase(query, jsonData[query]);

                            let total = jsonData[query] * amount;
                            callBack(null, (Math.round(total * 100) / 100));
                        });
                });                
            }
            //If the value was found in idb
            else{
                //get the value of the query
                let val = value['value'];
                let total = val * amount;
                callBack(null, (Math.round(total * 100) / 100));
            }
            //value.value

        })

    }
}



export let lastQuery = '';

export default class Converter
{
    constructor()
    {

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

        fetch(url)
        .catch(error => callBack(error))
        .then(results => 
        {
            //Invoke's the call back method of the upper layer using this class after 
            //converting the result to json.
            results.json().then(jsonData => 
                {
                    var total = jsonData[query] * amount;
                    callBack(null, (Math.round(total * 100) / 100));
                });
        });
    }
}


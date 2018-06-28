import Converter from './converter.js'
import lastQuery from './converter.js'
import ServiceWorker from './serviceWorker.js'


//Let's register the service worker.
let sw = new ServiceWorker();
sw.registerServiceWorker('./sw.js');

const submitButton = document.getElementById("submit_button");
const toSelect = document.getElementById("currency_to_dropdown");
const fromSelect = document.getElementById("currency_from_dropdown");
const amountEntry = document.getElementById('amount_entry');
const convertedValueEntry = document.getElementById('converted_value_entry');

//create a converter object
let converter = new Converter();

//Get all the currencies, then add them to the Drop downs on the index.html page
converter.getAllCurrencies( (error, response) => 
        { 
            if(response)
            {
                
                response.json().then((jsonData) => {
                    let data = jsonData.results;
                    let set = {data};
                
                    Object.keys(jsonData.results).forEach((key,index) => {
                    
                       let currency = jsonData.results[key];
                      let option1 = document.createElement("option");
                        let option2 = document.createElement("option");

                        //format the string which will be displayed in each
                        //drop down's options.
                        if(!currency.currencySymbol)
                        {    
                            option1.text = `(${currency.id}) ${currency.currencyName}`;
                            option2.text = `(${currency.id}) ${currency.currencyName}`;
                        }
                    
                        else
                        {
                            option1.text = `(${currency.id}) ${currency.currencyName} ${currency.currencySymbol}`;
                            option2.text = `(${currency.id}) ${currency.currencyName} ${currency.currencySymbol}`;
                        }

                        //Add currencies to both drop downs
                        option1.value = currency;
                        option2.value = currency;
                        toSelect.add(option1, null);
                        fromSelect.add(option2, null);
                    });
                });
            }
            else if(error)
            {
                alert("An error occured while fetching the currencies.");
            }
        });
        

//Listen to when the submit button is clicked
submitButton.addEventListener("click", () => 
{
    let amount = amountEntry.value;

    if(amount)
    {        
        let fromCurrency = fromSelect.options[fromSelect.selectedIndex].innerHTML;
        let toCurrency = toSelect.options[toSelect.selectedIndex].innerHTML;

        let regExp = /\(([^)]+)\)/;
        let fromCurrencyKey = regExp.exec(fromCurrency)[1];
        let toCurrencyKey = regExp.exec(toCurrency)[1];

        if(fromCurrencyKey == toCurrencyKey)
        {
            convertedValueEntry.value = amount;
        }
        else
        {
            converter.convertCurrency(amount, fromCurrencyKey, toCurrencyKey, (error, result) => 
            {
                convertedValueEntry.value = result;
                if(result)
                {
                    convertedValueEntry.value = result;
                }
                else
                {
                    alert("An error occured while making the request"+error);
                }
            });
        }
    }
    else
    {
        alert("please enter the amount which you wish to convert");
    }
});


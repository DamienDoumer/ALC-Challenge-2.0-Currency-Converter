import Converter from './converter.js';
import ServiceWorker from './serviceWorker.js';
import IDBManager from './idbManager.js';


//Let's register the service worker.
let sw = new ServiceWorker();
sw.registerServiceWorker('./sw.js');

//Create an IDb manager object for index db transactions
let idbMan = new IDBManager();

const submitButton = document.getElementById("submit_button");
const toSelect = document.getElementById("currency_to_dropdown");
const fromSelect = document.getElementById("currency_from_dropdown");
const amountEntry = document.getElementById('amount_entry');
const convertedValueEntry = document.getElementById('converted_value_entry');
const exchangeIcon = document.getElementById('exchange_icon');
const dimmerUno = document.getElementById('dimmer_uno');

//create a converter object
let converter = new Converter(idbMan);

//Get all the currencies, then add them to the Drop downs on the index.html page
converter.getAllCurrencies( (error, response) => 
        { 
            if(response)
            {
                setLoading
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
            setLoading();
            converter.convertCurrency(amount, fromCurrencyKey, toCurrencyKey, (error, result) => 
            {
                convertedValueEntry.value = result;
                if(result)
                {
                    convertedValueEntry.value = result;
                }
                else
                {
                    alert("An error occured while converting. Please do the conversion online first, before working offline as long as you wish.");
                }
                endLoading();
            });
        }
    }
    else
    {
        alert("Please enter the amount which you wish to convert");
    }
});

function setLoading(){
    exchangeIcon.style.visibility = 'hidden';
    dimmerUno.style.visibility = 'visible';
}
function endLoading(){
    exchangeIcon.style.visibility = 'visible';
    dimmerUno.style.visibility = 'hidden';
}
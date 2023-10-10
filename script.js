document.addEventListener('DOMContentLoaded', function () {

// Get Html Elements
const cryptoCard = document.querySelector('.crypto-cards');
const watchList = document.querySelector('.watchlist');
const name = document.querySelector('.name');
const rate = document.querySelector('.rate');

// Assign Endpoints and access Key
endpoint = 'live';
access_key = 'a0e178e366e4e0d663a7803cc0d0b628';

url = 'http://api.coinlayer.com/api/';

// Fuction for fetching currency data
function get_currencies() {
    fetch(url + endpoint + '?access_key=' + access_key)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        
        for (const currency in rates) {
           // console.log(`${currency}: ${rates[currency]}`);
            const symbolName = document.createElement('p');
            symbolName.textContent = currency;
            const symbolRate = document.createElement('p');
            symbolRate.textContent = rates[currency];
            //const symbolElement = document.createElement('div'); // Create a new HTML element
            //symbolElement.textContent = symbolName + symbolRate; // Set the text content of the element to the currency symbol.

            name.appendChild(symbolName);
            rate.appendChild(symbolRate);
            //cryptoCard.appendChild(symbolElement);
        }

        //cryptoCard.appendChild(symbolElement);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

get_currencies();

});


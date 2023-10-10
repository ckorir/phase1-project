document.addEventListener('DOMContentLoaded', function () {

// Get Html Elements
const cryptoCard = document.querySelector('.crypto-cards');
const watchList = document.querySelector('.watchlist');
const name = document.querySelector('.name');
const rate = document.querySelector('.rate');
const action = document.querySelector('.action');

// Assign Endpoints and access Key
endpoint = 'live';
access_key = 'a0e178e366e4e0d663a7803cc0d0b628';

url = 'http://api.coinlayer.com/api/';

// Fuction for fetching currency data
function get_currencies(topCount) {
    fetch(url + endpoint + '?access_key=' + access_key)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        // Sort the currencies by rate in descending order
        const sortedCurrencies = Object.keys(rates).sort((a, b) => rates[b] - rates[a]);
        
        // Loop through the currencies
        for (let i = 0; i < topCount; i++) {
            const currency = sortedCurrencies[i];
           // console.log(`${currency}: ${rates[currency]}`);
            const symbolName = document.createElement('p');
            const symbolRate = document.createElement('p');
            const favorite = document.createElement('p');
            favorite.className = 'watching';
            const watch = document.createElement('a');
            watch.className = 'watching';
            watch.textContent = 'Watch';
            symbolName.textContent = currency;
            symbolRate.textContent = rates[currency];
            
            // Appending data to DOM
            name.appendChild(symbolName);
            rate.appendChild(symbolRate);
            favorite.appendChild(watch);
            action.appendChild(favorite);

            watch.addEventListener('click', () => {
                console.log(currency);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Display a certain number of currencies
get_currencies(10);

});


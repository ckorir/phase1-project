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
function get_currencies() {
    fetch(url + endpoint + '?access_key=' + access_key)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        
        for (const currency in rates) {
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
            //symbolRate.appendChild(watch);
            // Appending data to DOM
            name.appendChild(symbolName);
            rate.appendChild(symbolRate);
            favorite.appendChild(watch);
            action.appendChild(favorite);

            watch.addEventListener('click', () => {
                console.log(currency);
            });
        }

        //cryptoCard.appendChild(symbolElement);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

get_currencies();

});


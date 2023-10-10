// Get Html Elements
const cryptoCard = document.getElementsByClassName('crypto-card');
const watchList = document.getElementsByClassName('watchlist');

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
            console.log(`${currency}: ${rates[currency]}`);
            const symbolName = currency;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

get_currencies();
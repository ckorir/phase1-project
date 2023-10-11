// document.addEventListener('DOMContentLoaded', function () {

// // Get Html Elements
// const cryptoCard = document.querySelector('.crypto-cards');
// const watchList = document.querySelector('.watchlist');
// const name = document.querySelector('.name');
// const rate = document.querySelector('.rate');
// const action = document.querySelector('.action');
// const watched = document.querySelector('.watched');
// const watchName = document.querySelector('.watch-name');
// const watchRate = document.querySelector('.watch-rate');
// const watchAction = document.querySelector('.watch-action');

// // Assign Endpoints and access Key
// endpoint = 'live';
// access_key = 'a0e178e366e4e0d663a7803cc0d0b628';

// url = 'http://api.coinlayer.com/api/';

// // Fuction for fetching currency data
// function get_currencies(topCount) {
//     fetch(url + endpoint + '?access_key=' + access_key)
//     .then(response => response.json())
//     .then(data => {
//         const rates = data.rates;
//         // Sort the currencies by rate in descending order
//         const sortedCurrencies = Object.keys(rates).sort((a, b) => rates[b] - rates[a]);
        
//         // Loop through the currencies
//         for (let i = 0; i < topCount; i++) {
//             const currency = sortedCurrencies[i];
//            // console.log(`${currency}: ${rates[currency]}`);
//             const symbolName = document.createElement('p');
//             const symbolRate = document.createElement('p');
//             const favorite = document.createElement('p');
//             favorite.className = 'watching';
//             const watch = document.createElement('a');
//             watch.className = 'watching';
//             watch.textContent = 'Watch';
//             symbolName.textContent = currency;
//             symbolRate.textContent = rates[currency];
            
//             // Appending data to DOM
//             name.appendChild(symbolName);
//             rate.appendChild(symbolRate);
//             favorite.appendChild(watch);
//             action.appendChild(favorite);

//             watch.addEventListener('click', () => {
//                 // Remove 'favorite' from its current location
//                 if (favorite.parentElement) {
//                     favorite.parentElement.removeChild(favorite);
//                 }
            
//                 // Move currency-related elements to watchlist
//                 watchName.appendChild(symbolName);
//                 watchRate.appendChild(symbolRate);
//                 favorite.appendChild(watch);
//                 watchAction.appendChild(favorite);
//             });
//             watchAction.addEventListener('click', () => {
//                 if (favorite.parentElement === watchAction) {
//                     watchAction.removeChild(favorite);
                    
//                     // Move currency-related elements back to the main section
//                     name.appendChild(symbolName);
//                     rate.appendChild(symbolRate);
//                     action.appendChild(favorite);
//                 }
//             })

//         }


//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }
// // Display a certain number of currencies
// get_currencies(10);

// });

document.addEventListener('DOMContentLoaded', function () {

    // Get Html Elements
   // const cryptoCard = document.querySelector('.crypto-cards');
   // const watchList = document.querySelector('.watchlist');
    const name = document.querySelector('.name');
    const rate = document.querySelector('.rate');
    const action = document.querySelector('.action');
    const watched = document.querySelector('.watched');
    const watchName = document.querySelector('.watch-name');
    const watchRate = document.querySelector('.watch-rate');
    const watchAction = document.querySelector('.watch-action');

    // An object to store symbols and their respective market caps
    let symbolData = {};

    function fetchCurrencyDetails() {
        const endpoint = '/api/v3/global';
        const url = 'https://api.coingecko.com';

        fetch(url + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const marketCaps = data.data.total_market_cap;
            //console.log(marketCaps);

            for (const currency in marketCaps) {
                const marketCap = marketCaps[currency];

                // Call the function to add a symbol with a watch event
                addSymbolWithWatch(currency, marketCap);
            }
        });
    }
    fetchCurrencyDetails();

    // Function to add a symbol with a watch event
    function addSymbolWithWatch(currency, marketCap) {
        const symbolName = document.createElement('p');
        const symbolRate = document.createElement('p');
        const favorite = document.createElement('p');
        favorite.className = 'watching';

        const remove = document.createElement('p');
        remove.className = 'watching';
        const unwatch = document.createElement('a');
        unwatch.className = 'watching';
        unwatch.textContent = 'Remove';
        remove.appendChild(unwatch);

        const watch = document.createElement('a');
        watch.className = 'watching';
        watch.textContent = 'Watch';
        symbolName.textContent = currency;
        symbolRate.textContent = marketCap;

        // Create a unique identifier (e.g., a timestamp) for the item
        const itemId = Date.now();
        favorite.id = `watch-item-${itemId}`;
        
        // Append data to the main section
        name.appendChild(symbolName);
        rate.appendChild(symbolRate);
        favorite.appendChild(watch);
        action.appendChild(favorite);

        // Add a click event to the Watch
        favorite.addEventListener('click', () => {
            // Move the symbol and market cap to the watchlist
            watchName.appendChild(symbolName);
            watchRate.appendChild(symbolRate);
            favorite.remove();            
            watchAction.appendChild(remove);
   
            // Store the item's data and identifier
            symbolData[itemId] = { currency, marketCap };
            console.log(symbolData);
        });      
        
        // Add a click event to the unwatch
        remove.addEventListener('click', () => {

            watchName.removeChild(symbolName);
            watchRate.removeChild(symbolRate);
            remove.remove();

            addSymbolWithWatch(currency, marketCap)
        
        });

    }
    

});


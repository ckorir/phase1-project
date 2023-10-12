// document.addEventListener('DOMContentLoaded', function () {

//     // Get Html Elements
//     const name = document.querySelector('.name');
//     const rate = document.querySelector('.rate');
//     const action = document.querySelector('.action');
//     const watchName = document.querySelector('.watch-name');
//     const watchRate = document.querySelector('.watch-rate');
//     const watchAction = document.querySelector('.watch-action');
//     const form = document.querySelector('form');
//     const searchResults = document.querySelector('.search-results');

//     function fetchCurrencyDetails() {
//         const endpoint = '/api/v3/global';
//         const url = 'https://api.coingecko.com';

//         fetch(url + endpoint, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             const marketCaps = data.data.total_market_cap;
//             //console.log(marketCaps);

//             for (const currency in marketCaps) {
//                 const marketCap = marketCaps[currency];
//                 // Call the function to add a symbol with a watch event
//                 addSymbolWithWatch(currency, marketCap);
//             }
//         });
//     }
//     fetchCurrencyDetails();

//     // Function to add a symbol with a watch event
//     function addSymbolWithWatch(currency, marketCap) {

//         // Create Symbol Data
//         const symbolName = document.createElement('p');
//         const symbolRate = document.createElement('p');
//         symbolName.textContent = currency;
//         symbolRate.textContent = marketCap;

//         // Create remove action
//         const remove = document.createElement('p');
//         remove.className = 'watching';
//         const unwatch = document.createElement('a');
//         unwatch.className = 'watching';
//         unwatch.textContent = 'Remove';
//         remove.appendChild(unwatch);

//         // Create watch action 
//         const favorite = document.createElement('p');
//         favorite.className = 'watching';
//         const watch = document.createElement('a');
//         watch.className = 'watching';
//         watch.textContent = 'Watch';

//         // Append data to the main section
//         name.appendChild(symbolName);
//         rate.appendChild(symbolRate);
//         favorite.appendChild(watch);
//         action.appendChild(favorite);

//         // Add a click event to the Watch
//         favorite.addEventListener('click', () => {
            
//             // Move the symbol and market cap to the watchlist
//             watchName.appendChild(symbolName);
//             watchRate.appendChild(symbolRate);
//             favorite.remove();            
//             watchAction.appendChild(remove);

//         });      
        
//         // Add a click event to the unwatch
//         remove.addEventListener('click', () => {

//             watchName.removeChild(symbolName);
//             watchRate.removeChild(symbolRate);
//             remove.remove();

//             addSymbolWithWatch(currency, marketCap)
        
//         });

//         // Add a eventlistener to the form
//         form.addEventListener('submit', (e) => {

//             e.preventDefault();
//             const searchValue = e.target.search.value;
//             searchCurrency(searchValue);
//             //console.log(input)

//             form.reset();
//         });

//         function searchCurrency(search) {
//             const searchEndpoint = '/api/v3/coins/markets';
//             const url = 'https://api.coingecko.com';
        
//             // Define the currency name you want to search for
//             const searchCurrencyName = search;
        
//             fetch(`${url}${searchEndpoint}?vs_currency=usd&ids=${searchCurrencyName}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             .then((response) => response.json())
//             .then((data) => {
//                 let searchResultHTML = ''; // Initialize the result HTML
        
//                 for (const currencyData of data) {
//                     const symbol = currencyData.symbol;
//                     const marketCap = currencyData.market_cap;
        
//                     if (currencyData.name.toLowerCase() === searchCurrencyName.toLowerCase()) {
//                         console.log(`Currency: ${searchCurrencyName}, Symbol: ${symbol}, Market Cap: ${marketCap}`);
//                         searchResultHTML = `
//                         <table class="searchlist">
//                             <tr>
//                                 <th class="head">Symbol</th>
//                                 <th>Market Cap</th>
//                             </tr>
//                             <td>${symbol}</td>
//                             <td>${marketCap}</td>
//                         </table>
//                         `;

//                         searchResults.innerHTML = searchResultHTML;
//                         break; // Exit the loop when a match is found
//                     }
//                 }
               
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//         }

//     }

// });


document.addEventListener('DOMContentLoaded', function () {

    // Get Html Elements
    const name = document.querySelector('.name');
    const rate = document.querySelector('.rate');
    const action = document.querySelector('.action');
    const watchName = document.querySelector('.watch-name');
    const watchRate = document.querySelector('.watch-rate');
    const watchAction = document.querySelector('.watch-action');
    const form = document.querySelector('form');
    const searchResults = document.querySelector('.search-results');

    const baseUrl = 'http://localhost:3000';
    const endpoint = '/total_market_cap';
    const url = baseUrl + endpoint;

    function fetchCurrencyDetails() {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const currencies = data;
    
            currencies.forEach(currency => {
                const {id, symbol, marketCap } = currency;
                //console.log(`ID: ${id}, Name: ${name}, Symbol: ${symbol}, Market Cap: ${marketCap}`);
                // Call the function to add a symbol with a watch event
                //console.log(currency)
                addSymbolWithWatch(currency);
            });
        });
    }
    fetchCurrencyDetails();

    // Function to add a symbol with a watch event
    function addSymbolWithWatch(currency){
        // Create Symbol Data
        const symbolName = document.createElement('p');
        const symbolRate = document.createElement('p');
        const symbolID = currency.id;
        symbolName.textContent = currency.symbol;
        symbolRate.textContent = currency.marketCap;

        // Create remove action
        const remove = document.createElement('p');
        remove.className = 'watching';
        const unwatch = document.createElement('a');
        unwatch.className = 'watching';
        unwatch.textContent = 'Remove';
        remove.appendChild(unwatch);

        // Create watch action 
        const favorite = document.createElement('p');
        favorite.className = 'watching';
        const watch = document.createElement('a');
        watch.className = 'watching';
        watch.textContent = 'Watch';

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
            //console.log(`${currency}: ${marketCap}`);

        });      
        
        // Add a click event to the unwatch
        remove.addEventListener('click', (e) => {
            e.preventDefault();
            watchRate.removeChild(symbolRate);
            watchName.removeChild(symbolName);
            remove.remove();

            // Call the removeCurrency function
            removeCurrency(symbolID);
        });

        // Function for deleting data from Database
        function removeCurrency(symbolID) {
            fetch(url+`/${symbolID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log('Data deleted successfully');
                } else {
                    console.log('Failed to delete data');
                }
            })
            .then(data => {
                console.log(data);
            });
        }

        // Add a eventlistener to the form
        form.addEventListener('submit', (e) => {

            e.preventDefault();
            const searchValue = e.target.search.value;
            searchCurrency(searchValue);
            //console.log(input)

            form.reset();
        });
    }

})
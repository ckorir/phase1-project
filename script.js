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
    const addForm = document.querySelector('#add-currency-form');

    const baseUrl = 'http://localhost:3000';
    const endpoint = '/total_market_cap';
    const url = baseUrl + endpoint;

    addForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting and refreshing the page

        // Get input values from the form
        const symbol = document.getElementById('symbol').value;
        const name = document.getElementById('name').value;
        const marketCap = parseFloat(document.getElementById('marketCap').value);

        // Create a data object to send in the POST request
        const currencyData = {
            symbol: symbol,
            name: name,
            marketCap: marketCap
        };

        // Send a POST request to add the currency
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currencyData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response as needed
            console.log('Currency added successfully:', data);
        })
        .catch(error => {
            console.error('Error adding currency:', error);
        });
    });

    // Function to fetch data from the server
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
                // Call the function to add a symbol with a watch even
                addSymbolWithWatch(currency);
            });
        });
    }
    fetchCurrencyDetails();

    // Function to add a symbol with a watch event
    function addSymbolWithWatch(currency){
        // Create Symbol Data
        let symbolName = document.createElement('p');
        let symbolRate = document.createElement('p');
        let symbolID = currency.id;
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
            // Call the addList function
            addList();
            favorite.remove();            
        });
        
        function addList(){
            watchName.appendChild(symbolName);
            watchRate.appendChild(symbolRate);
            watchAction.appendChild(remove);
        }
        
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
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        }

        // Add a eventlistener to the form
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchValue = e.target.search.value.toLowerCase();
            // Call the searchCurrency function
            searchCurrency(searchValue);
        });
   
            function searchCurrency(searchValue){
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const foundCurrency = data.find(item => item.name.toLowerCase() === searchValue);
                    if (foundCurrency) {
                        // Display the searched currency
                       searchResultHTML = `
                        <table class="searchlist">
                            <tr>
                                <th class="head">Symbol</th>
                                <th>Market Cap</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td class="n1 line">${foundCurrency.symbol}</td>
                                <td class="n2 line">${foundCurrency.marketCap}</td>
                                <td class ="add">Watch</td>
                            </tr> 
                        </table>
                        `;

                        searchResults.innerHTML = searchResultHTML;

                        function addToWatch(){
                            // Create Symbol Data
                            const add = document.querySelector('.add');
                            add.addEventListener('click', () =>{
                                symbolName.textContent = foundCurrency.symbol;
                                symbolRate.textContent = foundCurrency.marketCap;
                                // Call addList function
                                addList();
                            });  
                        }
                        addToWatch();
                    } else {
                        searchResults.innerHTML = `
                        <h5 style="margin-left: 2em; padding: 1em;">Currency not found.</h5>
                        `;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
    }
})
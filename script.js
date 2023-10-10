endpoint = 'live';
access_key = 'a0e178e366e4e0d663a7803cc0d0b628';

url = 'http://api.coinlayer.com/api/';

function get_currencies() {

fetch(url+endpoint+'?access_key='+access_key)
.then(response => response.json())
.then(currency => {
console.log(currency.rates);
})

}
get_currencies();
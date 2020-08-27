const axios = require('axios')

const FIXER_API_KEY = 'aa0060c3047f8a7b7fb88aafc28bc499'
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}&format=1`

const REST_COUNTRIES_API = 'https://restcountries.eu/rest/v2/currency/'

// Async/Await

// Fetch data about currencies
const getExchangeRate = (fromCurrency, toCurrency) => {
    const {data: {rates}} = await axios.get(FIXER_API)
    const euro = 1/ rates[fromCurrency]
    const exchangeRate = euro * rates[toCurrency]
}

getExchangeRate('USD','EUR')
// Fectch data about countries

//
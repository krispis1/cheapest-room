const agodaRequest = require('../src/json/agodaRequest.json');
const axios = require('axios');

module.exports = async function () {
    return axios
        .post('https://hotel-scraper-eu.onrender.com/api/rates', agodaRequest)
        .then(res => {
            return {
                price: res.data.rate.priceWithTaxes,
                currency: res.data.rate.currency,
                url: res.data.rate.redirect_url
            }
        })
        .catch(err => {
            console.error(err);
        })
}
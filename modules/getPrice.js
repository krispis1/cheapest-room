const agodaRequest = require('../src/json/agodaRequest.json');
const axios = require('axios');

module.exports = async function () {
    return axios
        .post('https://hotel-scraper-eu.onrender.com/api/rates', agodaRequest)
        .then(res => {
            return res.data.rate.priceWithTaxes;
        })
        .catch(err => {
            console.error(err);
        })
}
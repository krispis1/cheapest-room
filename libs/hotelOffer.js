const tripData = require('../assets/json/tripData.json');
const axios = require('axios');

module.exports = async (provider) => {
    const request = {
        provider: provider,
        server: "https://hotel-scraper-eu.onrender.com/api/",
        hotel_name: tripData.hotel_name,
        location: tripData.location,
        country: tripData.country,
        address: tripData.address,
        zip: tripData.zip,
        coordinates: tripData.coordinates,
        check_in: tripData.check_in,
        check_out: tripData.check_out,
        currency: tripData.currency,
        adults: tripData.adults,
        children: tripData.children,
        language: tripData.language,
        no_rooms: tripData.no_rooms
    }

    return axios
        .post('https://hotel-scraper-eu.onrender.com/api/rates', request, { timeout: 60000 })
        .then(res => {
            return {
                price: res.data.rate.priceWithTaxes,
                currency: res.data.rate.currency,
                url: res.data.rate.redirect_url
            }
        })
        .catch(err => {
            return err.message;
        });
}
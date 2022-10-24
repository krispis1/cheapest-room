const tripData = require("../assets/json/tripData.json");
const agodaOffer = require("../libs/agoda/agodaOffer");

module.exports = async (provider) => {
	const request = {
		provider: provider,
		hotelName: tripData.hotel_name,
		location: tripData.location,
		country: tripData.country,
		checkIn: tripData.check_in,
		checkOut: tripData.check_out,
		currency: tripData.currency,
		adults: tripData.adults,
		children: tripData.children,
		rooms: tripData.no_rooms,
	};

	switch (request.provider) {
		case "agoda":
			return await agodaOffer(request);
	}
};

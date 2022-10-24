const hotelOffer = require("./libs/hotelOffer");
const express = require("express");
const app = express();

app.get("/agoda", async (_, res) => {
	res.json(await hotelOffer("agoda"));
});

const server = app.listen(9001, () => {
	const host = server.address().address;
	const port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});

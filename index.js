const hotelOffer = require('./libs/hotelOffer');
const express = require('express');
const app = express();

app.get('/agoda', async (_, res) => {
  res.json(await hotelOffer('agoda'));
});

app.get('/booking', async (_, res) => {
  res.json(await hotelOffer('booking'));
});

const server = app.listen(5253, () => {
  const host = server.address().address;
  const port = server.address().port;
  
  console.log('Example app listening at http://%s:%s', host, port);
});
const hotelOffer = require('./libs/hotelOffer');
const express = require('express');
const timeout = require('connect-timeout');
const app = express();

app.use(timeout('60s'));
app.use(haltOnTimedout);

app.get('/agoda', async (_, res) => {
  res.json(await hotelOffer('agoda'));
});

app.get('/booking', async (_, res) => {
  res.json(await hotelOffer('booking'));
});

function haltOnTimedout(req, _, next){
  if (!req.timedout) next();
}

const server = app.listen(5253, () => {
  const host = server.address().address;
  const port = server.address().port;
  
  console.log('Example app listening at http://%s:%s', host, port);
});
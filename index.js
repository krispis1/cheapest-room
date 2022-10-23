const agoda = require('./modules/getAgodaPrice');
const express = require('express');
const app = express();

app.get('/', async (_, res) => {
  res.json(await agoda());
});

const server = app.listen(5253, function () {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Example app listening at http://%s:%s', host, port);
})

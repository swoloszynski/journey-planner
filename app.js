const express = require('express');
const app = express();
const config = require('./config');

app.get('/', function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
})

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port);
})

module.exports = app;

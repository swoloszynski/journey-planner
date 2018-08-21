const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/server/routes')(app);
app.get('*', function (req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('404: Oops! Route note found.');
})

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port);
})

module.exports = app;

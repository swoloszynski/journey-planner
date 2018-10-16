'use strict';

const config  = require('./config');
const express = require('express');

const bodyParser = require('body-parser');
const morgan     = require('morgan');

const app = express();

if (config.env === 'development') {
  // log every request
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/server/routes')(app);

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port);
});

module.exports = app;

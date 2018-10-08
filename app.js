'use strict';

const config   = require('./config');
const express  = require('express');
const app      = express();
const passport = require('passport');

const morgan     = require('morgan');
const bodyParser = require('body-parser');

if (config.env === 'development') {
  app.use(morgan('dev')); // log every request to the console
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/server/routes')(app);

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port);
});

module.exports = app;

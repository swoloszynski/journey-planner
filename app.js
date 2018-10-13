'use strict';

const config   = require('./config');
const PORT     = config.port;
const express  = require('express');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');

// Initialize app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (config.env === 'development') {
  app.use(morgan('dev')); // log every request to the console
}
app.use(cookieParser()); // read cookies (needed for auth)

// Require routes
require("./src/server/routes")(app);

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port);
});

module.exports = app;

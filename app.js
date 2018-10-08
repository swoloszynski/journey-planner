'use strict';

const config   = require('./config');
const express  = require('express');
const app      = express();
const passport = require('passport');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
// const session      = require('express-session');

if (config.env === 'development') {
  app.use(morgan('dev')); // log every request to the console
}

app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// required for passport
// app.use(session({ secret: config.sessionSecret })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

require('./src/server/routes')(app, passport);

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port);
});

module.exports = app;

'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/server/routes')(app);

app.listen(config.port, function () {
  console.log('App listening on port ' + config.port);
});

module.exports = app;

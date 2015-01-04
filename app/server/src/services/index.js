'use strict';

var database = require('./database');

module.exports = function(app, config) {
  app.services = {
    database: database(config)
  };
};

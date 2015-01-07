'use strict';

var HomeController = require('./home-controller');

module.exports = function(options) {
  options = options || {};

  if (!options.app) {
    throw new Error('app is required');
  }

  return {
    home: new HomeController({ app: options.app })
  };
};

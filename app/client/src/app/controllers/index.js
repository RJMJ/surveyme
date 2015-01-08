'use strict';

var HomeController = require('./home-controller');
var SurveyController = require('./survey-controller');

module.exports = function(options) {
  options = options || {};

  if (!options.app) {
    throw new Error('app is required');
  }

  return {
    home: new HomeController({ app: options.app }),
    survey: new SurveyController({ app: options.app })
  };
};

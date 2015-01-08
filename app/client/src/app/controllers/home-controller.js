'use strict';

var HomeIndexView = require('../views/home/index');

var HomeController = function(options) {
  options = options || {};

  if (!options.app) {
    throw new Error('app is required');
  }

  var app = options.app;

  return {
    index: function() {
      var view = new HomeIndexView({ app: app });
      app.renderView(view);
    }
  };
};

module.exports = HomeController;

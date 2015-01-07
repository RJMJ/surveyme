'use strict';

var HomeView = require('../views/home/index');

var HomeController = function(options) {
  options = options || {};

  if (!options.app) {
    throw new Error('app is required');
  }

  var app = options.app;

  return {
    index: function() {
      var deferredView = app.collections.questions.fetch().then(function() {
        return new HomeView({ app: app });
      });
      app.renderDeferredView(deferredView);
    }
  };
};

module.exports = HomeController;

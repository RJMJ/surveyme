'use strict';

var SurveyIndexView = require('../views/survey/index');
var Question = require('../models/question');

var SurveyController = function(options) {
  options = options || {};

  if (!options.app) {
    throw new Error('app is required');
  }

  var app = options.app;

  return {
    index: function() {
      var question = new Question({ id: 'random' });
      var deferredView = question.fetch().then(function() {
        return new SurveyIndexView({ app: app, question: question });
      });
      app.renderDeferredView(deferredView);
    }
  };
};

module.exports = SurveyController;

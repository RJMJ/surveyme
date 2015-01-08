'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var indexTemplate = require('../../templates/survey/index.ejs');
var QuestionView = require('./question');

var SurveyIndexView = Backbone.View.extend({
  id: 'survey',

  tagName: 'section',

  template: indexTemplate,

  initialize: function(options) {
    options = options || {};

    if (!options.app) {
      throw new Error('app is required');
    }

    this.app = options.app;
    this.question = options.question;
  },

  render: function() {
    var markup = this.template();
    this.$el.html(markup);

    if (this.question) {
      var questionView = new QuestionView({
        app: this.app,
        question: this.question,
        el: this.$('#question')
      });
      questionView.render();
    }

    return this;
  }
});

module.exports = SurveyIndexView;

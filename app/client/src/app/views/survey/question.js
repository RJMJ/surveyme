
'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var questionTemplate = require('../../templates/survey/question.ejs');
var answerTemplate = require('../../templates/survey/answer.ejs');

var QuestionView = Backbone.View.extend({
  template: questionTemplate,

  initialize: function(options) {
    options = options || {};

    if (!options.app) {
      throw new Error('app is required');
    }

    if (!options.question) {
      throw new Error('question is required');
    }

    if (!options.el) {
      throw new Error('el is required');
    }

    this.app = options.app;
    this.question = options.question;
  },

  render: function() {
    var markup = this.template({ question: this.question });
    this.$el.html(markup);

    this.renderAnswers();

    return this;
  },

  renderAnswers: function() {
    var answers = this.question.get('answers');
    var answersMarkup = '';
    answers.forEach(function(answer) {
      answersMarkup += answerTemplate({ answer: answer });
    });
    this.$('#answers').html(answersMarkup);
  }
});

module.exports = QuestionView;

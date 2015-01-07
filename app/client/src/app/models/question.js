'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Questions = require('../collections/questions');

var Question = Backbone.Model.extend({
  collection: Questions,
  defaults: {
    text: null
  }
});

module.exports = Question;

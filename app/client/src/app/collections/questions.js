'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Question = require('../models/question');

var Questions = Backbone.Collection.extend({
  model: Question,
  url: '/api/questions'
});

module.exports = Questions;

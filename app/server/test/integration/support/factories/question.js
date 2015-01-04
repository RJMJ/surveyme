'use strict';

var Chance = require('chance');
var chance = new Chance(Math.random);

module.exports = function(factory, database) {
  var Question = database.Question;

  factory.define('question', Question, {
    text: function() {
      return chance.sentence();
    }
  });
};

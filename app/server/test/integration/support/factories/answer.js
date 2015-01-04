'use strict';

var Chance = require('chance');
var chance = new Chance(Math.random);

module.exports = function(factory, database) {
  var Answer = database.Answer;

  factory.define('answer', Answer, {
    text: function() {
      return chance.sentence();
    }
  });
};

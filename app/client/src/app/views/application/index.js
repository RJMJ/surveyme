'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var ApplicationIndexView = Backbone.View.extend({
  el: '#app',

  initialize: function(options) {
    this.render();
  },

  render: function() {
    this.$el.html('surveyme');

    return this;
  }
});

module.exports = ApplicationIndexView;

'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var indexTemplate = require('../../templates/home/index.ejs');

var HomeIndexView = Backbone.View.extend({
  id: 'home',

  tagName: 'section',

  template: indexTemplate,

  initialize: function(options) {
    options = options || {};

    if (!options.app) {
      throw new Error('app is required');
    }

    this.app = options.app;
  },

  render: function() {
    var markup = this.template();
    this.$el.html(markup);

    return this;
  }
});

module.exports = HomeIndexView;

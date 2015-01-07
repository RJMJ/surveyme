'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var mainTemplate = require('../../templates/application/main.ejs');

var ApplicationMainView = Backbone.View.extend({
  tagName: 'main',

  template: mainTemplate,

  render: function() {
    var markup = this.template();
    this.$el.html(markup);

    return this;
  }
});

module.exports = ApplicationMainView;

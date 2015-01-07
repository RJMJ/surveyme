'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var headerTemplate = require('../../templates/application/header.ejs');

var ApplicationHeaderView = Backbone.View.extend({
  tagName: 'header',

  template: headerTemplate,

  render: function() {
    var markup = this.template();
    this.$el.html(markup);

    return this;
  }
});

module.exports = ApplicationHeaderView;

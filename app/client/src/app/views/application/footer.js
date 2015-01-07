'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var footerTemplate = require('../../templates/application/footer.ejs');

var ApplicationFooterView = Backbone.View.extend({
  tagName: 'footer',

  template: footerTemplate,

  render: function() {
    var markup = this.template();
    this.$el.html(markup);

    return this;
  }
});

module.exports = ApplicationFooterView;

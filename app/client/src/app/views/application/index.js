'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var collections = require('../../collections');
var controllers = require('../../controllers');
var Router = require('../../routers/router');

var ApplicationHeaderView = require('./header');
var ApplicationMainView = require('./main');
var ApplicationFooterView = require('./footer');

var ApplicationIndexView = Backbone.View.extend({
  el: '#app',

  events: {
    'click a[href]:not([data-bypass])': 'navigate'
  },

  initialize: function(options) {
    this.initializeCollections();
    this.initializeViews();
    this.initializeRouter();

    this.render();

    Backbone.history.start({ pushState: true });
  },

  initializeCollections: function() {
    this.collections = collections;
  },

  initializeViews: function() {
    this.views = {
      header: new ApplicationHeaderView(),
      main: new ApplicationMainView(),
      footer: new ApplicationFooterView()
    };
  },

  initializeRouter: function() {
    this.router = new Router({
      controllers: controllers({ app: this })
    });
  },

  render: function() {
    var markup = [
      this.views.header.render().el,
      this.views.main.render().el,
      this.views.footer.render().el
    ];

    this.$el.html(markup);

    return this;
  },

  renderView: function(view) {
    this.currentView = view;
    var markup = view.render().el;
    this.$('main').html(markup);
  },

  renderDeferredView: function(deferredView) {
    deferredView.then(function(view) {
      this.removeCurrentView();
      this.renderView(view);
    }.bind(this));
  },

  removeCurrentView: function() {
    if (this.currentView) {
      this.currentView.remove();
    }
  },

  navigate: function(e) {
    e.preventDefault();
    var path = $(e.currentTarget).attr('href');
    this.router.navigate(path, { trigger: true });
  }
});

module.exports = ApplicationIndexView;

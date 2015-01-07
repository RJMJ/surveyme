'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var BackboneRouteControl = require('backbone-route-control');

var Router = BackboneRouteControl.extend({
  routes: {
    '': 'home#index'
  }
});

module.exports = Router;

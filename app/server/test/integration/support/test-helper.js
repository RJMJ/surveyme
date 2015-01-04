'use strict';

var app = require('../../../../server/src/lib/app');
var port = app.get('port');
var env = app.get('env');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var supertest = require('supertest');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.use(sinonChai);

var factory = require('factory-girl');
var SequelizeAdapter = require('factory-girl-sequelize')();
factory.setAdapter(SequelizeAdapter);
require('./factories')(factory, app.services.database);

var cleanDatabase = function(db, callback) {
  db.sequelize.sync({ force: true }).then(function() {
    setTimeout(callback, 0);
  });
};

before(function(callback) {
  var ctx = this;
  app.services.database.sequelize.sync({ force: true }).then(function() {
    ctx.server = app.listen(function(err) {
      if (!err) {
        console.log('Server listening in %s mode on port %d', env, port);
      }
      callback(err);
    });
  });
});

after(function(callback) {
  this.server.close();
  callback();
});

beforeEach(function() {
  this.stubs = {};
  this.sinon = sinon.sandbox.create();
});

afterEach(function(callback) {
  this.sinon.restore();
  cleanDatabase(app.services.database, callback);
});

module.exports = {
  expect: chai.expect,
  request: supertest,
  sinon: sinon,
  factory: factory
};

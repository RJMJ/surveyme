'use strict';

var helpers = require('../support/test-helper');
var expect = helpers.expect;
var request = helpers.request;
var factory = helpers.factory;
var async = require('async');

describe('api/users', function() {
  var ctx = this.ctx;

  describe('index', function() {
    before(function(callback) {
      ctx.users = [];

      async.series([
        function(callback) {
          factory.createMany('user', 3, function(err, users) {
            if (err) {
              console.error('User creation failed');
              return callback(err);
            }
            ctx.users = users;
            callback(null);
          });
        },
        function(callback) {
          request(ctx.server)
            .get('/api/users')
            .end(function(err, res) {
              ctx.res = res;
              callback(err);
            });
        }
      ], callback);
    });

    after(function(callback) {
      delete ctx.res;
      delete ctx.users;
      callback(null);
    });

    it('returns json', function() {
      expect(ctx.res.type).to.equal('application/json');
    });

    it('returns a 200 HTTP status code', function() {
      expect(ctx.res.status).to.equal(200);
    });

    it('returns an array of users', function() {
      expect(ctx.users).to.have.length(3);
    });
  });

  describe('create', function() {
    before(function(callback) {
      request(ctx.server)
        .post('/api/users')
        .send({
          email: 'brent.ertz@gmail.com'
        })
        .end(function(err, res) {
          ctx.res = res;
          callback(err);
        });
    });

    after(function(callback) {
      delete ctx.res;
      callback(null);
    });

    it('returns json', function() {
      expect(ctx.res.type).to.equal('application/json');
    });

    it('returns a 201 HTTP status code', function() {
      expect(ctx.res.status).to.equal(201);
    });

    it('returns the newly created user', function() {
      expect(ctx.res.body).to.have.deep.property('email', 'brent.ertz@gmail.com');
    });
  });
});

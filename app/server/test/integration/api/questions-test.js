'use strict';

var helpers = require('../support/test-helper');
var expect = helpers.expect;
var request = helpers.request;
var factory = helpers.factory;
var async = require('async');

describe('api/questions', function() {
  var ctx = this.ctx;

  describe('index', function() {
    before(function(callback) {
      ctx.questions = [];

      async.series([
        function(callback) {
          factory.createMany('question', 3, function(err, questions) {
            if (err) {
              console.error('Question creation failed', err);
              return callback(err);
            }
            ctx.questions = questions;
            callback(null);
          });
        },
        function(callback) {
          request(ctx.server)
            .get('/api/questions')
            .end(function(err, res) {
              ctx.res = res;
              callback(err);
            });
        }
      ], callback);
    });

    after(function(callback) {
      delete ctx.res;
      delete ctx.questions;
      callback(null);
    });

    it('returns json', function() {
      expect(ctx.res.type).to.equal('application/json');
    });

    it('returns a 200 HTTP status code', function() {
      expect(ctx.res.status).to.equal(200);
    });

    it('returns an array of questions', function() {
      expect(ctx.questions).to.have.length(3);
    });
  });

  describe('show', function() {
    describe('using numeric id', function() {
      before(function(callback) {
        ctx.questions = [];

        async.series([
          function(callback) {
            factory.createMany('question', 3, function(err, questions) {
              if (err) {
                console.error('Question creation failed', err);
                return callback(err);
              }
              ctx.questions = questions;
              callback(null);
            });
          },
          function(callback) {
            request(ctx.server)
            .get('/api/questions/' + ctx.questions[0].id)
              .end(function(err, res) {
                ctx.res = res;
                callback(err);
              });
          }
        ], callback);
      });

      after(function(callback) {
        delete ctx.res;
        delete ctx.questions;
        callback(null);
      });

      it('returns json', function() {
        expect(ctx.res.type).to.equal('application/json');
      });

      it('returns a 200 HTTP status code', function() {
        expect(ctx.res.status).to.equal(200);
      });

      it('returns a question', function() {
        expect(ctx.res.body).to.have.deep.property('text');
      });
    });

    describe('using keyword "random" id', function() {
      before(function(callback) {
        ctx.questions = [];

        async.series([
          function(callback) {
            factory.createMany('question', 3, function(err, questions) {
              if (err) {
                console.error('Question creation failed', err);
                return callback(err);
              }
              ctx.questions = questions;
              callback(null);
            });
          },
          function(callback) {
            request(ctx.server)
            .get('/api/questions/random')
              .end(function(err, res) {
                ctx.res = res;
                callback(err);
              });
          }
        ], callback);
      });

      after(function(callback) {
        delete ctx.res;
        delete ctx.questions;
        callback(null);
      });

      it('returns json', function() {
        expect(ctx.res.type).to.equal('application/json');
      });

      it('returns a 200 HTTP status code', function() {
        expect(ctx.res.status).to.equal(200);
      });

      it('returns a question', function() {
        expect(ctx.res.body).to.have.deep.property('text');
      });
    });
  });

  describe('create', function() {
    before(function(callback) {
      request(ctx.server)
        .post('/api/questions')
        .send({
          text: 'WAT?',
          answers: [
            { text: 'foo' },
            { text: 'bar' }
          ]
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

    it('returns the newly created question', function() {
      expect(ctx.res.body).to.have.deep.property('text', 'WAT?');
    });
  });
});

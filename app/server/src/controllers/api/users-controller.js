'use strict';

var _ = require('lodash');
var Boom = require('boom');

module.exports = function(app) {
  var User = app.services.database.User;

  var UsersController = {
    index: function(req, res, next) {
      User.findAll()
        .then(function(users) {
          res.status(200).json(users);
        }).catch(function(err) {
          return next(err);
        });
    },

    show: function(req, res, next) {
      User.find(req.params.id)
        .then(function(user) {
          if (!user) {
            return next(Boom.notFound('User not found'));
          }

          res.status(200).json(user);
        })
        .catch(function(err) {
          return next(err);
        });
    },

    create: function(req, res, next) {
      User.create(req.body)
        .then(function(user) {
          res.status(201).json(user);
        })
        .catch(function(err) {
          return next(err);
        });
    },

    update: function(req, res, next) {
      User.find(req.params.id)
        .then(function(user) {
          if (!user) {
            return next(Boom.notFound('User not found'));
          }

          user.updateAttributes(req.body)
            .then(function(user) {
              res.status(200).json(user);
            })
            .catch(function(err) {
              return next(err);
            });
        })
        .catch(function(err) {
          return next(err);
        });
    },

    destroy: function(req, res, next) {
      User.find(req.params.id)
        .then(function(user) {
          if (!user) {
            return next(Boom.notFound('User not found'));
          }

          user.destroy()
            .then(function(user) {
              res.sendStatus(204);
            })
            .catch(function(err) {
              return next(err);
            });
        })
        .catch(function(err) {
          return next(err);
        });
    }
  };

  return UsersController;
};

'use strict';

var Boom = require('boom');
var _ = require('lodash');

module.exports = function() {
  return function(err, req, res, next) {
    if (!(err instanceof Error)) {
      if (_.isArray(err)) {
        err = err[0];
        if (!(err instanceof Error)) {
          if (err.errors && err.errors instanceof Error) {
            err = err.errors;
          }
        }
      } else {
        return next(err);
      }
    }

    switch (err.name) {
      case 'SequelizeValidationError':
        err = Boom.wrap(err, 422, err.message || 'Validation failed');
        if (err.errors) {
          err.output.payload.errors = err.errors;
        }
        break;
      case 'SequelizeUniqueConstraintError':
        err = Boom.wrap(err, 422, err.message);
        break;
    }

    if (!err.isBoom) {
      err = Boom.wrap(err);
    }

    if (err.output.statusCode >= 500) {
      console.error(err.stack);
    }

    res.status(err.output.statusCode).json(err.output.payload);
  };
};

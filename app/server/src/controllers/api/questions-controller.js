'use strict';

var _ = require('lodash');
var Boom = require('boom');

module.exports = function(app) {
  var db = app.services.database;
  var Promise = db.sequelize.Promise;
  var Question = db.Question;
  var Answer = db.Answer;

  var QuestionsController = {
    index: function(req, res, next) {
      Question.findAll({
        include: [
          { model: Answer, as: 'answers' }
        ]
      }).then(function(questions) {
          res.status(200).json(questions);
        }).catch(function(err) {
          return next(err);
        });
      // TODO: paginate
    },

    show: function(req, res, next) {
      var query;

      if (req.params.id === 'random') {
        query = Question.find({
          where: 'id >= RAND() * (SELECT MAX(id) from Questions)',
          include: [
            { model: Answer, as: 'answers' }
          ]
        });
      } else {
        query = Question.find({
          where: { id: req.params.id },
          include: [
            { model: Answer, as: 'answers' }
          ]
        });
      }

      query.then(function(question) {
        if (!question) {
          return next(Boom.notFound('Question not found'));
        }

        res.status(200).json(question);
      })
      .catch(function(err) {
        return next(err);
      });
      // TODO: disallow repeats
    },

    create: function(req, res, next) {
      db.sequelize.transaction(function(transaction) {
        var dfd = Promise.defer();

        Question.create(req.body, {
          include: [
            { model: Answer, as: 'answers' }
          ],
          transaction: transaction
        }).then(function(question) {
          if (req.body.answers) {
            var answers = req.body.answers.map(function(answer) {
              return _.extend(answer, { question_id: question.id });
            });

            Answer.bulkCreate(answers, { validate: true, transaction: transaction })
              .then(function(answers) {
                question.reload({
                  include: [
                    { model: Answer, as: 'answers' }
                  ],
                  transaction: transaction
                }).then(function(question) {
                  dfd.resolve(question);
                });
              }).catch(function(err) {
                dfd.reject(err);
              });
          } else {
            dfd.resolve(question);
          }
        }).catch(function(err) {
          dfd.reject(err);
        });

        return dfd.promise;
      }).then(function(question) {
        res.status(201).json(question);
      }).catch(function(err) {
        return next(err);
      });
    },

    update: function(req, res, next) {
      Question.find(req.params.id)
        .then(function(question) {
          if (!question) {
            return next(Boom.notFound('Question not found'));
          }

          question.updateAttributes(req.body)
            .then(function(question) {
              res.status(200).json(question);
            })
            .catch(function(err) {
              return next(err);
            });
        })
        .catch(function(err) {
          return next(err);
        });
      // TODO: accept and handle answers too
    },

    destroy: function(req, res, next) {
      Question.find(req.params.id)
        .then(function(question) {
          if (!question) {
            return next(Boom.notFound('Question not found'));
          }

          question.destroy()
            .then(function(question) {
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

  return QuestionsController;
};

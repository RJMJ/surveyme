'use strict';

module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Question.hasMany(models.Answer, { as: 'answers' });
        Question.hasMany(models.Response, { as: 'responses', onDelete: 'cascade' });
      }
    },
    underscored: true
  });

  return Question;
};

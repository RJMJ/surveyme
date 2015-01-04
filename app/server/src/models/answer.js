'use strict';

module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
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
        Answer.belongsTo(models.Question, { onDelete: 'cascade' });
        Answer.hasMany(models.Response, { as: 'responses', onDelete: 'cascade' });
      }
    },
    underscored: true
  });

  return Answer;
};

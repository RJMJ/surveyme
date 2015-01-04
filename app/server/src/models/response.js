'use strict';

module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define('Response', {}, {
    classMethods: {
      associate: function(models) {
        Response.belongsTo(models.Question);
        Response.belongsTo(models.Answer);
      }
    },
    underscored: true
  });

  return Response;
};

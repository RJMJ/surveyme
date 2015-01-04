'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

module.exports = function(config) {
  var db = {};
  var modelsPath = path.resolve(__dirname, '../models');
  var sequelize = new Sequelize(
    config.get('database.database'),
    config.get('database.username'),
    config.get('database.password'),
    config.get('database.options')
  );

  fs.readdirSync(modelsPath)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
      var model = sequelize['import'](path.join(modelsPath, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

'use strict';

var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(__dirname);
var current = path.basename(module.filename);

module.exports = function(factory, database) {
  files.forEach(function(file) {
    if (file !== current) {
      require('./' + file)(factory, database);
    }
  });
};

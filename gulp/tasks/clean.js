'use strict';

var gulp = require('gulp');
var rimraf = require('rimraf');

module.exports = function(config) {
  return gulp.task('clean', function(callback) {
    rimraf(config.get('paths.client.build.root'), callback);
  });
};

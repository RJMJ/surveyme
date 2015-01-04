'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = function(config) {
  return gulp.task('build', function(callback) {
    runSequence(
      ['clean', 'lint'],
      ['scripts', 'styles', 'assets', 'images', 'index'],
      callback
    );
  });
};

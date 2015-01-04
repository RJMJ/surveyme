'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

module.exports = function(config) {
  return gulp.task('lint', function() {
    return gulp.src([
      '**/*.js', '!' + config.get('paths.client.build.scripts') + '/**', '!node_modules/**/*', '!bower_components/**/*'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  });
};

'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

module.exports = function(config) {
  return gulp.task('images', function() {
    return gulp.src(config.get('paths.client.src.images'))
      .pipe(imagemin({ progressive: true, interlaced: true }))
      .pipe(gulp.dest(config.get('paths.client.build.images')));
  });
};

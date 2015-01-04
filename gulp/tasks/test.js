'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

module.exports = function(config) {
  return gulp.task('test', function() {
    return gulp.src(config.get('paths.server.test'), { read: false })
      .pipe(mocha({ reporter: 'spec' }));
  });
};

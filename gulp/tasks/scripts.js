'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var handleError = require('../util/handle-error');

module.exports = function(config) {
  var production = config.get('env') === 'production';
  var useSourceMaps = !production;
  var minify = production;
  var watch = !production;

  var bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: true,
    entries: [config.get('paths.client.src.scripts.main')],
    debug: useSourceMaps
  });

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', handleError)
      .pipe(gulpif(minify, source('index.min.js'), source('index.js')))
      .pipe(buffer())
      .pipe(gulpif(useSourceMaps, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(minify, uglify()))
      .pipe(gulpif(useSourceMaps, sourcemaps.write('./')))
      .pipe(gulp.dest(config.get('paths.client.build.scripts')));
  };

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return gulp.task('scripts', bundle);
};

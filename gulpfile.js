var source = require("vinyl-source-stream");
var gulp = require('gulp');
var gulputil = require('gulp-util');
var zip = require('gulp-zip');
var size = require('gulp-size');
var buffer = require('gulp-buffer');
var merge = require('merge-stream');
var webserver = require('gulp-webserver');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var del = require('del');


// Base tasks
gulp.task('default', ['build']);
gulp.task('package', ['clean'], buildPackage);
gulp.task('watch', ['build'], buildWatcher);
gulp.task('build', ['clean'], buildAll);
gulp.task('serve', ['watch'], serve);
gulp.task('clean', clean);

// Subtasks
gulp.task('build-js', buildJS);
gulp.task('build-style', buildStyle);
gulp.task('build-package-json', buildPackageJSON);


function clean(cb) {
  del(['dist'], cb);
}


function buildAll() {
  return getAllBuildStreams()
    .pipe(buffer())
    .pipe(size({title: 'build all', gzip: true}))
    .pipe(gulp.dest('dist'));
}


function buildPackage() {
  return getAllBuildStreams()
    .pipe(buffer())
    .pipe(zip('release.zip'))
    .pipe(size({title: 'package all'}))
    .pipe(gulp.dest('dist'));
}


function buildJS() {
  var runner = runnerJSBundler(createJSBundler());
  return runner();
}


function buildStyle() {
  return gulp.src('src/**/*.css')
    .pipe(size({title: 'style', gzip: true}))
    .pipe(gulp.dest('dist'));
}


function buildPackageJSON() {
  return gulp.src('package.json')
    .pipe(size({title: 'package.json', gzip: true}))
    .pipe(gulp.dest('dist'));
}


function buildWatcher() {
  // Watch JS
  var bundler = watchify(createJSBundler());
  var runner = runnerJSBundler(bundler);
  runner();

  bundler
    .on('update', runner)
    .on('log', gulputil.log);

  gulp.watch('src/**/*.css', ['build-style']);
  gulp.watch('package.json', ['build-package-json']);
}


function runnerJSBundler(bundler) {
  return function runBundler() {
    return bundler
      .bundle()
      .pipe(source('./main.js'))
      .pipe(gulp.dest('dist'));
  };
}


function createJSBundler() {
  return browserify({
      debug: true,
      basedir: 'src',
      extensions: ['jsx']
    })
    .transform(babelify.configure({
      optional: ["reactCompat"]
    }))
    .require('./main', {
      entry: true
    });
}


function getAllBuildStreams() {
  return merge(buildPackageJSON(), buildJS(), buildStyle());
}


function serve() {
  buildWatcher();
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
}

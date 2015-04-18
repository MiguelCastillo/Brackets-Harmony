var source     = require("vinyl-source-stream");
var gulp       = require('gulp');
var gulputil   = require('gulp-util');
var zip        = require('gulp-zip');
var size       = require('gulp-size');
var buffer     = require('gulp-buffer');
var merge      = require('merge-stream');
var webserver  = require('gulp-webserver');
var watchify   = require('watchify');
var browserify = require('browserify');
var babelify   = require('babelify');
var del        = require('del');


// Base tasks
gulp.task('default', ['build']);
gulp.task('package', ['clean'], buildPackage);
gulp.task('watch',   ['build'], buildWatcher);
gulp.task('build',   ['clean'], buildAll);
gulp.task('serve',   ['watch'], serve);
gulp.task('clean',   clean);


function clean(cb) {
  del(['dist'], cb);
}


function buildAll() {
  return getAllBuildStreams()
    .pipe(buffer())
    .pipe(size({gzip: true}))
    .pipe(gulp.dest('dist'));
}


function buildPackage() {
  return getAllBuildStreams()
    .pipe(buffer())
    .pipe(zip('release.zip'))
    .pipe(size())
    .pipe(gulp.dest('dist'));
}


function buildWatcher() {
  // Watch JS
  var bundler = watchify(createJSBundler());
  var runner  = bundlerRunner(bundler);
  runner();

  bundler
    .on('update', runner)
    .on('log', gulputil.log);

  // Watch CSS
  gulp.watch('src/**/*.css', buildStyle);
}


function bundlerRunner(bundler) {
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
  .transform(babelify)
  .require('./main', {entry: true});
}


function getAllBuildStreams() {
  return merge([buildPackageJSON(), buildJS(), buildStyle()]);
}


function buildJS() {
  var runner = bundlerRunner(createJSBundler());
  return runner();
}


function buildStyle() {
  return gulp.src('src/**/*.css');
}


function buildPackageJSON() {
  return gulp.src('package.json');
}


function serve() {
  buildWatcher();
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: 'index.html'
    }));
}

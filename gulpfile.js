'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('src/stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/stylesheets'));
});


gulp.task('hello', function() {
  console.log('Hello Ben');
});

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

/*
exports.default = defaultTask
*/

gulp.task('default', ['sass']);

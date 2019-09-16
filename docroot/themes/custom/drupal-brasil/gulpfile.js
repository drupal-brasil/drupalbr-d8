const { src, dest, series } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');


function css() {
  return src('assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    // .pipe(autoprefixer())
    .pipe(dest('dist/css'));
}

function js() {
  return src('assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('global.js'))
    .pipe(dest('dist/js'));
}

exports.build = series(css, js);
exports.default = series(css, js);
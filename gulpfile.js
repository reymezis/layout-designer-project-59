const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browsersync = () => {
  browserSync.init({
    server: { baseDir: 'build/' },
    notify: false,
    online: true
  });

  watch('./app/**/*.js', scripts);
	watch('./app/**/*.scss', buildSass);
	watch('./app/**/*.pug', buildPug);
};

const scripts = () => {
  return src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js.map',
  ])
  .pipe(dest('./build/js/'))
  .pipe(browserSync.stream())
};

const buildSass = () => {
  console.log('Компиляция SASS');

  return src('app/scss/*.scss')
    .pipe(sass())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

const buildPug = () => {
  console.log('Компиляция Pug');

  return src('app/pug/*.pug')
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

exports.build = parallel(scripts, buildSass, buildPug);
exports.default = browsersync;

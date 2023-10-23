const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssbeautify = require('gulp-cssbeautify');

const browsersync = () => {
  browserSync.init({
    server: { baseDir: './build/' },
    notify: false,
    online: true
  });

  watch('app/**/*.js', scripts);
  watch('images/**/*', copyImage);
	watch('app/**/*.scss', buildSass);
	watch('app/**/*.pug', buildPug);
};

const scripts = () => {
  return src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js.map',
    './app/pageSwitcher.js',
  ])
  .pipe(dest('build/js/'))
  .pipe(browserSync.stream())
};

const buildSass = () => {
  console.log('Компиляция SASS');

  return src('app/scss/*.scss')
    .pipe(sass({ sourceMap: false }))
    .pipe(cleanCSS())
    .pipe(concat('app.css'))
    .pipe(cssbeautify())
    .pipe(dest('build/style/'))
    .pipe(browserSync.stream());
}

const buildPug = () => {
  console.log('Компиляция Pug');

  return src([
    'app/pug/index.pug',
    'app/pug/chat.pug',
  ])
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

const copyImage = () => {
  console.log('Копирование изображений');

  return src('images/**/*')
    .pipe(dest(['build/images']));
}

exports.build = parallel(scripts, copyImage, buildSass, buildPug);
exports.default = browsersync;

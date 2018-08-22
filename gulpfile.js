const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const browserify   = require('browserify');
const source       = require('vinyl-source-stream');
const streamify    = require('gulp-streamify');
const babel        = require('gulp-babel');
const tap          = require('gulp-tap');
const buffer       = require('gulp-buffer');
const sourcemaps   = require('gulp-sourcemaps');

const del          = require('del');
const gutil        = require('gulp-util');
const uglify       = require('gulp-uglify');

var imagemin     = require('gulp-imagemin');

gulp.task('js', function () {
  return gulp.src('src/**/*.js', {read: false})
    .pipe(tap(function (file) {
      gutil.log('bundling ' + file.path);
      file.contents = browserify(file.path, { debug: true }).bundle();
    }))
    .pipe(streamify(babel({ presets: ['es2015'] })))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src("src/scss/main.scss")
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
    .pipe(gulp.dest("dist/css"))
.pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

gulp.task('cleanUp', function() {
  return del('dist/*');
});

gulp.task('serve', gulp.parallel('sass', 'imagemin', 'js', function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("src/scss/*.scss", gulp.series('sass'));
  gulp.watch("src/js/*.js", gulp.series('js'));
  gulp.watch("src/img/**/*", gulp.series('imagemin'));
  gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('cleanUp', 'serve'));

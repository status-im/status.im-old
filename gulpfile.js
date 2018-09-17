var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var streamify    = require('gulp-streamify');
var babel        = require('gulp-babel');
var tap          = require('gulp-tap');
var buffer       = require('gulp-buffer');
var sourcemaps   = require('gulp-sourcemaps');

var del          = require('del');
var gutil        = require('gulp-util');
var uglify       = require('gulp-uglify');

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

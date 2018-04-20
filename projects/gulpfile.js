var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    include = require('gulp-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


var path = {
    build: {
        css: 'css/',
        html: './*.html',
        js: './build'
    },
    src: {
        style: 'sass/*.scss',
        html: './**/*.html',
        js: [
            "./js/TweenMax.js",
            "./js/main.js"
        ]
    },
    watch: {
        style: 'sass/**/*.scss',
        html: './*.html'
    }
};


gulp.task('sass', function () {
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    gulp.src(path.src.html) //for localhost workflow

});

gulp.task('js', function () {
    gulp.src(path.src.js) //for localhost workflow
});

gulp.task('scripts', function () {
    return gulp.src(path.src.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js));
});


gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch("./js/**/*.js", ['js']).on('change', browserSync.reload);
    gulp.watch("./*.html", ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
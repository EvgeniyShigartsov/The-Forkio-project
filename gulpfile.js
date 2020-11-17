const gulp = require('gulp')
const clean = require('gulp-clean')
const cleanCss = require('gulp-clean-css')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const minifyjs = require('gulp-js-minify')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()

const cleanDist = () => {
    return gulp.src('dist', {
        read: false,
        allowEmpty: true
    })
    .pipe(clean())
}

const scssBuild = () => {
    return gulp
        .src('src/scss/main.scss')
        .pipe(sass())
        .pipe(rename('styles.min.css'))
        .pipe(
            autoprefixer({cascade: false})
        )
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'))
}
    
const jsBuild = () => {
    return gulp
        .src('src/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(minifyjs())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
}

const imagesBuild = () => {
    return gulp
        .src('src/img/*')
        .pipe(
            imagemin(
                ({
                    interlaced: true,
                    progressive: true,
                    optimizationLevel: 5,
                })
            )
        )
        .pipe(gulp.dest('dist/img/'))
}

const watch = () => {
    gulp.watch('src/scss/*.scss', scssBuild).on('change',browserSync.reload)
    gulp.watch('src/js/*.js', jsBuild).on('change', browserSync.reload)
    gulp.watch('src/img/*', imagesBuild).on('change', browserSync.reload)
    gulp.watch('index.html').on('change', browserSync.reload)
    browserSync.init({
        server: {
            baseDir: './',
        },
    })
}

gulp.task('dev', watch)
gulp.task('build', gulp.series(cleanDist, scssBuild, jsBuild, imagesBuild))
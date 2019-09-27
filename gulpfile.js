const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: "./dist"
        }
    });
});

// Transfer html files
gulp.task('html', function() {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
})

// Optimize images
gulp.task('img', function() {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
})

// minify js
gulp.task('minifyjs', function() {
    return gulp.src('js/*js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', gulp.series('minifyjs'));
    gulp.watch('*.html').on('change', gulp.series('html'));
    gulp.watch('images/*', gulp.series('img'));
});

gulp.task('run', gulp.series('img', 'html', 'minifyjs', 'browser-sync', 'watch'));

gulp.task('default', gulp.series('run'));
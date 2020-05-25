const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync')
const del = require('del');

function styleMain() {
    return gulp.src('assets/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('/'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        startPath: 'pages/filter.html',
        ghostMode: false,
        notify: false
    });
    gulp.watch('./assets/scss/components/*.scss', styleMain);
    gulp.watch('./pages/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);

}

function cleanVendors(){
    return del('assets/vendors/**/*');
}

function buildVendors() {
    var addon1 = gulp.src('./node_modules/bootstrap/**/*')
                     .pipe(gulp.dest('assets/vendors/bootstrap'));
    var addon2 = gulp.src('./node_modules/@mdi/**/*')
                     .pipe(gulp.dest('assets/vendors/@mdi'));
    var addon3 = gulp.src(['./node_modules/ion-rangeslider/js/ion.rangeSlider.min.js'])
                     .pipe(gulp.dest('assets/vendors/ion-rangeslider/js'));
    var addon4 = gulp.src(['./node_modules/ion-rangeslider/css/ion.rangeSlider.css'])
                     .pipe(gulp.dest('assets/vendors/ion-rangeslider/css'));
    var addon5 = gulp.src(['./node_modules/ion-rangeslider/img/*'])
                     .pipe(gulp.dest('assets/vendors/ion-rangeslider/img'));
    var addon6 = gulp.src(['./node_modules/jquery/dist/jquery.min.js'])
                     .pipe(gulp.dest('assets/vendors/jquery'));
    var addon7 = gulp.src(['./node_modules/font-awesome/fonts/*'])
                     .pipe(gulp.dest('./assets/vendors/font-awesome/fonts'));
    var addon8 = gulp.src(['./node_modules/jquery-bar-rating/dist/jquery.barrating.min.js'])
                    .pipe(gulp.dest('./assets/vendors/jquery-bar-rating'));
    var addon9 = gulp.src(['./node_modules/jquery-bar-rating/dist/themes/css-stars.css'])
                    .pipe(gulp.dest('./assets/vendors/jquery-bar-rating'));

    return (addon1, addon2, addon3, addon4, addon5, addon6, addon7, addon8, addon9);
}

// gulp.task('default', gulp.series(['clean', 'styles']));
exports.style = styleMain;
exports.watch = watch;
exports.buildVendors = gulp.series(cleanVendors, buildVendors);
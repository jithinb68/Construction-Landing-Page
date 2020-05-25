const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('styles', () => {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

function cleanVendors(){
    return del('assets/vendors/**/*');
}

function buildVendors() {
    var addon1 = gulp.src('./node_modules/bootstrap/**/*')
                     .pipe(gulp.dest('assets/vendors/bootstrap'));
    var addon2 = gulp.src('./node_modules/@mdi/**/*')
                     .pipe(gulp.dest('assets/vendors/@mdi'));

    return (addon1, addon2);
}

gulp.task('default', gulp.series(['clean', 'styles']));

exports.buildVendors = gulp.series(cleanVendors, buildVendors);
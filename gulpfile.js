const gulp = require('gulp');
const del = require('del');

function cleanLib() {
  return del(['.tmp', 'dist-lib']);
}

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

function stylesLib() {
  return gulp.src([
    'package.json',
    'app/src/**/*',
  ]).on('error', handleError)
    .pipe(gulp.dest('dist-lib'));
}


exports.default = gulp.series(cleanLib, stylesLib);



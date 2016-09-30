const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const tslint = require('gulp-tslint');

gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', ['tslint', 'typescript']);
});

gulp.task('typescript', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('tslint', () => {
  gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report({
      emitError: false
    }));
});
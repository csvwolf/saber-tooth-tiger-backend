const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('watch', () => {
  gulp.watch(['**/*.js', '!node_modules/**'], ['lint']);
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
            .pipe(eslint())
            .pipe(eslint.format());
});
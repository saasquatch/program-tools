const gulp = require('gulp');
const merge = require('merge-stream');
const del = require('del');
const serve = require('gulp-serve');
const rename = require('gulp-rename');
const inlinesource = require('gulp-inline-source');
const stylus = require('gulp-stylus');

const src = 'src/**/';
const dependencies = [
  'node_modules/contentful-ui-extensions-sdk/dist/cf-extension.css',
  'node_modules/contentful-ui-extensions-sdk/dist/cf-extension-api.js',
  'node_modules/json-editor/dist/jsoneditor.js'
];

gulp.task('stylus', function () {
  return gulp.src(src + '*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist'));
});

// Copy required dependencies into dist folder.
gulp.task('build', gulp.series('stylus', function () {

  const filesStream = gulp.src(src + '!(*.styl)')
    .pipe(gulp.dest('./dist'));

  const depsStream = gulp.src(dependencies)
    .pipe(gulp.dest('./dist/lib'));

  return merge(filesStream, depsStream);
}));


gulp.task('default', gulp.series('build', function () {
  gulp.start('serve');
}));

// Serve and watch for changes so we don't have to run `gulp` after each change.
gulp.task('watch', gulp.series('build', function () {
  gulp.start('serve');
  gulp.watch([src + '*', dependencies], function () {
    gulp.start(['build']);
  });
}));

// Serve dist folder on port 3000 for local development.
gulp.task('serve', serve({
  root: 'dist'
}));

// Bundles the whole widget into one file which can be uploaded to Contentful.
gulp.task('bundle', gulp.series('build', function () {
  return gulp.src('./dist/index.html')
    .pipe(rename('index.min.html'))
    .pipe(inlinesource())
    .pipe(gulp.dest('./dist'));
}));

gulp.task('clean', function () {
  return del([
    './dist'
  ]);
});

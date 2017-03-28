var gulp = require('gulp'),
  connect = require('gulp-connect');

var config = {
    filename: 'home',
    src: ['./src/app/*.js', './src/app/**/*.js'],
    html: ['./src/app/views/*.html', './src/app/views/**/*.html'],
    index: ['src/index.html',],
    css: ['./src/content/*.css', './src/content/**/*.css'],
    images: './src/media/**/*',
    dest: './src/dist',
    umd: {

    },
    banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @author <%= pkg.author %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''
    ].join('\n')
};

gulp.task('connect', function () {
  connect.server({
    root: './src',
    livereload: true,
    port: 9003
  });
});

gulp.task('html', function () {
  gulp.src('./src/**/*.*')
    .pipe(connect.reload());
});



var concat = require('gulp-concat');
gulp.task('styles', function () {
  console.log("styles");
  return gulp.src(config.css)
    .pipe(concat(config.filename + '.css'))
    .pipe(gulp.dest(config.dest));
});

gulp.task('watch', function () {
  gulp.watch(['./src/app/*.*'], ['html']);
  gulp.watch(['./src/content/*.*'], ['styles','html']);

});

gulp.task('default', ['styles', 'connect', 'watch']);
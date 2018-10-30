const gulp = require('gulp');
const minify = require('gulp-babel-minify');
const imagemin = require('gulp-imagemin');
//const uglify = require('gulp-uglify');
const sass = require('gulp-sass');


/*
- - top level functions - -

    gulp.task - define tasks

    gulp.src = point to files to use

    gulp.dest - points to folder to output

    gulp.watch - watch files and folders for changes
*/

// logs message
gulp.task('message', () => {
    return console.log('Gulp is running ...');
});

//copy all HTML files
gulp.task('copyHtml', () =>{
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// optimize images
gulp.task('imageMin', () =>
	gulp.src('src/assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

// minify js
gulp.task('minify', () => {
    gulp.src('src/javascript/*.js')
    .pipe(minify({
        mangle: {
          keepClassName: true
        }
      }))
        .pipe(gulp.dest('dist/javascript/'))
});

// compile sass
gulp.task('sass', () => {
    gulp.src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'minify', 'sass'])


//before any of the other tasks run for gulp watch, the default runs 
//tasks that need to run before gulp watch takes place
gulp.task('watch', ['default'],() => {
    gulp.watch('javascript/*.js', ['minify']);
    gulp.watch('assets/images/*', ['imageMin']);
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch('*.html', ['copyHtml']);
})
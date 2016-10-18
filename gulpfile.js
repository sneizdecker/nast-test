var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var prettify = require('gulp-jsbeautifier');
var spritesmith = require('gulp.spritesmith');
var bufferr = require('vinyl-buffer');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');

// Compile Pug to HTML
gulp.task('jade', function() {
	gulp.src('app/*.jade')
		.pipe(jade())
		.pipe(prettify({
			brace_style: 'expand',
			indent_with_tabs: true,
			indent_inner_html: true,
			preserve_newlines: true,
			end_with_newline: true,
			wrap_line_length: 120,
			max_preserve_newlines: 50,
			wrap_attributes_indent_size: 1,
			unformatted: ['use']
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Compile Stylus to CSS
gulp.task('stylus', function() {
	gulp.src('app/assets/styles/app.styl')
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(prettify({
			indent_with_tabs: true
		}))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/assets/styles'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Watching changes in JS
gulp.task('javascript', function() {
	gulp.src('app/assets/scripts/app.js')
		.pipe(gulp.dest('dist/assets/scripts'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Copying image files from app/assets/images to dist/assets/images
gulp.task('images', function() {
	gulp.src('app/assets/images/*.*')
		.pipe(gulp.dest('dist/assets/images'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Starting Gulp
gulp.task('start', ['browserSync', 'jade', 'stylus', 'javascript', 'images'], function() {
	gulp.watch('app/**/**.jade', ['jade']);
	gulp.watch('app/assets/styles/**/**.styl', ['stylus']);
	gulp.watch('app/assets/scripts/**/**.js', ['javascript']);
});

// BrowserSync server
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
});

// Making sprites
gulp.task('make-sprite', function() {

	var spriteData = gulp.src('app/assets/images/sprites/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		imgPath: '../images/sprites/sprite.png',
		cssName: 'sprite.styl'
	}));

	var imgStream = spriteData.img
		.pipe(bufferr())
		.pipe(imagemin())
		.pipe(gulp.dest('dist/assets/images/sprites'));

	var cssStream = spriteData.css
		.pipe(gulp.dest('app/assets/styles/sprites'));

	return merge(imgStream, cssStream);
});
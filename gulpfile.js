var gulp          = require('gulp'),
	babel 		  = require('gulp-babel'),
	minify 		  = require("gulp-babel-minify"),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require('gulp-notify'),
	rsync         = require('gulp-rsync'),
	del           = require('del');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		ghostMode: false
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// Sass|Scss Styles
gulp.task('styles', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix : '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/swiper/swiper-bundle.min.js',
		'app/js/common.js', // Always at the end
	],{'allowEmpty': true})
		.pipe(concat('scripts.min.js'))
		.pipe(minify({
			mangle: {
				keepClassName: true
			}
		}))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({ stream: true, ghostMode: false }))
});

// gulp.task('scripts-babel', function() {
// 	return gulp.src([
// 		'app/js/common.js', // Always at the end
// 	],{'allowEmpty': true})
// 		.pipe(concat('common.babel.js'))
// 		.pipe(gulp.dest('app/js'))
// });

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});
gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
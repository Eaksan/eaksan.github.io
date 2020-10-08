var gulp          = require('gulp'),
	babel 		  = require('gulp-babel'),
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
		'node_modules/swiper/swiper-bundle.esm.browser.min.js',
		'app/js/common.babel.js', // Always at the end
	],{'allowEmpty': true})
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({ stream: true, ghostMode: false }))
});

gulp.task('scripts-babel', function() {
	return gulp.src([
		'app/js/common.js', // Always at the end
	])
		.pipe(concat('common.babel.js'))
		.pipe(babel())
		.pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('app/js'))
});

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts-babel', 'scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});
gulp.task('default', gulp.parallel('styles', 'scripts-babel', 'scripts', 'browser-sync', 'watch'));
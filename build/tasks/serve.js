var gulp = require('gulp');
var browserSync = require('browser-sync');
var path = require('path');
var paths = require('../paths');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
	var bs = browserSync.create('Example server');

	bs.init({
		online: false,
		open: false,
		port: 9000,
		server: {
			baseDir: paths.example,
			routes: {
				'/aurelia-snackbar': path.join(paths.output, 'amd'),
			},
			middleware: function (req, res, next) {
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			}
		},
	}, done);
});
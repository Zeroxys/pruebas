const gulp = require('gulp');
const inject = require('gulp-inject');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');

gulp.task('server', () => {

	livereload.listen()
	nodemon({
		script: 'server.js',
		ext: 'js',
		env:{'NODE_ENV' : 'development'}
	}).on('restart', () => {
		gulp.src('server.js')
			.pipe(livereload())
		console.log('reiniciando....')
	})
})

gulp.task('default', ['server']);


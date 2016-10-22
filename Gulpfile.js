const gulp = require('gulp');
const inject = require('gulp-inject');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const wiredep = require('gulp-wiredep')

//Inicia el servidor en desarrollo con livereload y nodemon
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

//Inyecta dependencias de bower
gulp.task('wiredep', () => {

	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory:'./app/lib'
		}))
		.pipe(gulp.dest('./app'))

})

gulp.task('watch', () => {
	gulp.watch(['./bower.json'], ['wiredep']);
})


gulp.task('default', ['server', 'wiredep','watch']);


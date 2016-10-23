const gulp = require('gulp');
const inject = require('gulp-inject');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const wiredep = require('gulp-wiredep');
const debug = require('gulp-debug');

//Inicia el servidor en desarrollo con livereload y nodemon
gulp.task('server', () => {

	livereload.listen({start:true})
	nodemon({
		script: 'server.js',
		ext: 'js',
		env:{'NODE_ENV' : 'development'}
	}).on('restart', () => {
		gulp.src('server.js')
			.pipe(livereload())
		console.log('reiniciando....')
	})

});

//Inyecta dependencias de bower
gulp.task('wiredep', () => {

	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory:'./app/lib'
		}))
		.pipe(gulp.dest('./app'))

});

//injecta scripts y css locales
gulp.task('inject', () => {
	var target = gulp.src(['app/index.html']);
    var sources = gulp.src(['./app/styles/**/*.css', './app/scripts/**/*.js']);

    return target.pipe(inject(sources, {
            ignorePath : '/app'
        }))
    	.pipe(debug())
        .pipe(gulp.dest('./app'))
        .pipe(debug())
})

//livereload html
gulp.task('html', () => {
	gulp.src('app/index.html')
		.pipe(livereload());
	console.log('Recargando html');	
});

//livereload css
gulp.task('css', () => {
	gulp.src('app/styles/**/*.css')
		.pipe(livereload());
})

gulp.task('watch', () => {
	gulp.watch(['./app/views/**/*.html'], ['html'])
	gulp.watch(['./app/index.html'], ['html']);
	gulp.watch(['./app/styles/**/*.css'], ['css','inject']);
	gulp.watch(['./app/scripts/**/*.js'], ['inject']);
	gulp.watch(['./bower.json'], ['wiredep']);
})

gulp.task('default', ['server','inject','wiredep','watch']);


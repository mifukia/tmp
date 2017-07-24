//use
var gulp = require('gulp');
var connect = require('gulp-connect-php');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');//scss
var autoprefixer = require("gulp-autoprefixer");//SCSSのautoprefix
var browser = require("browser-sync");//ライブリロード
var notify = require('gulp-notify'); //(*1)


//パスの定義
var paths = {
    'all'  :'./*',
    'sass' : 'assets/scss/',
    'css'  : 'assets/css/',
    'js'   : 'assets/js/'
}
gulp.task('connect-sync', function() {
    connect.server({
        port:3000,
        base:'.',
        bin: 'C:/xampp/php/php.exe',
        ini: 'C:/xampp/php/php.ini'
    }, function (){
        browser({
            proxy: 'localhost:3000'
        });
    });
});
gulp.task("sass", function() {
    gulp.src(paths.sass + '*.scss')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.css))
        .pipe(browser.reload({stream:true}))
        .pipe(notify('Sassをコンパイルしました！')); //(*2)

});
gulp.task("js", function() {
    gulp.src(paths.js + '*.js')
        .pipe(browser.reload({stream:true}))
});
gulp.task('bs-reload', function () {
    browser.reload();
});

gulp.task("default",['connect-sync'], function() {
    gulp.watch(paths.sass + '**/*.scss',["sass"]);
    gulp.watch(paths.all ,['bs-reload']);
    gulp.watch(paths.js + '*.js',["js"]);

});

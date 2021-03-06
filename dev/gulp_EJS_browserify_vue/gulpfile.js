var gulp = require('gulp');
var connect = require('gulp-connect-php');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');//scss
var autoprefixer = require("gulp-autoprefixer");//SCSSのautoprefix
var browser = require("browser-sync");//ライブリロード
var notify = require('gulp-notify'); //(*1)
var watch = require('gulp-watch');
var ejs = require('gulp-ejs');
var rename = require('gulp-rename');
var fs = require('fs');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var glob = require('glob');
var envify = require('gulp-envify');
var babelify = require('babelify');
var vueify = require('vueify');

var environment = {
    NODE_ENV: 'production'
};
//パスの定義
var paths = {
    'html' : './**/*.html',
    'php'  : './**/*.php',
    'sass' : 'assets/scss/**/*.scss',
    'css'  : 'assets/css/',
    'js'   : 'assets/js/src/**/*.js',
};

///phpを読まない
gulp.task('connect-sync', function () {
    browser({
        server: {
            proxy: "localhost:3000",
            baseDir: "."
        }
    });
});

//phpを読む
// gulp.task('connect-sync', function() {
//     connect.server({
//         port:3000,
//         base:'.',
//         bin: 'C:/xampp/php/php.exe',
//         ini: 'C:/xampp/php/php.ini'
//     }, function (){
//         browser({
//             proxy: 'localhost:3000'
//         });
//     });
// });

//オートリロード
gulp.task('bs-reload', function () {
    browser.reload();
});

//sassのコンパイル
gulp.task("sass", function() {
    gulp.src(paths.sass)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))//コンパイルエラーを表示
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 6 versions']}))//オートプレフィクス
        .pipe(gulp.dest(paths.css))//ｃｓｓに書き出す
        .pipe(browser.reload({stream:true}));//リロードを実行
});

//ejsのコンパイル
gulp.task("ejs", function() {
    // JSONファイル読み込み
    var json = JSON.parse(fs.readFileSync('ejs/config.json'));
    gulp.src(
        ["ejs/**/*.ejs",'!' + "ejs/**/_*.ejs"] //_を頭に付けたejsファイルはコンパイルから除外
    )
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))//コンパイルエラーを表示
        .pipe(ejs(json))
        .pipe(rename({extname: '.html'}))//.ejsをリネーム（phpにしたいときはここを変える）
        .pipe(gulp.dest("./"));
});

//jsをバンドルする
gulp.task('build', function() {
    var srcFiles = glob.sync('./assets/js/src/**/*.js');
    browserify({
        'entries': srcFiles
    })
        .transform(babelify, {presets: ["es2015"]})
        .transform(vueify)
        .bundle() // 一つのファイルにまとめたものを
        .pipe(source('bundle.js')) // bundle.js という名前のファイルに記録
        .pipe(buffer())
        .pipe(envify(environment))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/')) // "./" に書き出す
        .pipe(browser.reload({stream:true}));//リロードを実行
});


//コマンドで'gulp'を実行時に起動する基本タスク
gulp.task("default",['connect-sync'], function() {
    watch([paths.sass],function(){
        gulp.start(['sass']);
    });//sassフォルダの監視
    watch([paths.js],function(){
        gulp.start(['build']);
    });//src/jsフォルダの監視
    watch(["./assets/component/**/*.vue"],function(){
        gulp.start(['build']);
    });//src/jsフォルダの監視
    watch(["ejs/**/*.ejs"],function(){
        gulp.start(['ejs']);
    });//ejsフォルダの監視
    watch([paths.html,paths.php],function(){
        gulp.start(['bs-reload']);
    });//sass以外のフォルダの監視
});

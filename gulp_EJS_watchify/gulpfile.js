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
var watchify   = require('watchify');


//パスの定義
var paths = {
    'html' : './**/*.html',
    'php'  : './**/*.php',
    'sass' : 'assets/scss/**/*.scss',
    'css'  : 'assets/css/',
    'js'   : 'assets/js/src/**/*.js',
};

//ローカルホストの起動
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


//ここからwatchify(差分だけ監視してコンパイル)のtask
gulp.task( 'watchify', function() {
    return jscompile( true );
} );
//ここまでwatchify(差分だけ監視してコンパイル)のtask

//ここからjsをバンドルしてwatchifyする関数
function jscompile( is_watch ) {
    var bundler;
    if ( is_watch ) {
        bundler = watchify( browserify( paths.js ) );
    } else {
        bundler = browserify( paths.js );
    }

    function rebundle() {
        return bundler
            .bundle()
            .pipe( source( paths.js ) )
            .pipe( uglify() )
            .pipe( gulp.dest('./assets/js/') );
    }
    bundler.on( 'update', function() {
        rebundle();
    } );
    bundler.on( 'log', function( message ) {
        console.log( message );
    } );
    return rebundle();
}
//ここまでjsをバンドルしてwatchifyする関数

//コマンドで'gulp'を実行時に起動する基本タスク
gulp.task("default",['connect-sync'], function() {
    watch([paths.sass],function(){
        gulp.start(['sass','watchify']);
    });//sassフォルダの監視
    watch([paths.js],function(){
        gulp.start(['build']);
    });//src/jsフォルダの監視
    watch(["ejs/**/*.ejs"],function(){
        gulp.start(['ejs']);
    });//ejsフォルダの監視
    watch([paths.html,paths.php],function(){
        gulp.start(['bs-reload']);
    });//sass以外のフォルダの監視
});

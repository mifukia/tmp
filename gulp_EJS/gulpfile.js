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


//パスの定義
var paths = {
    'html' : './**/*.html',
    'php'  : './**/*.php',
    'sass' : 'assets/scss/**/*.scss',
    'css'  : 'assets/css/',
    'js'   : 'assets/js/**/*.js',
    'ejs'   : 'ejs/**/*.ejs'
};

// コマンドで'gulp'を実行時に起動する基本タスク
gulp.task('default', ['sass', 'connect-sync', 'ejs', 'watch']);


//ローカルホストの起動

//phpを読まない
gulp.task('connect-sync', function () {
    browser({
        server: {
            proxy: "localhost:3000",
            aseDir: "."
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
        .pipe(autoprefixer())//オートプレフィクス
        .pipe(gulp.dest(paths.css))//ｃｓｓに書き出す
        .pipe(browser.reload({stream:true}));//リロードを実行
});

//ejsのコンパイル
gulp.task("ejs", function() {
    // JSONファイル読み込み
    var json = JSON.parse(fs.readFileSync('ejs/config.json'));
    gulp.src(
        [paths.ejs,'!' + "ejs/**/_*.ejs"] //_を頭に付けたejsファイルはコンパイルから除外
    )
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))//コンパイルエラーを表示
        .pipe(ejs(json))
        .pipe(rename({extname: '.html'}))//.ejsをリネーム（phpにしたいときはここを変える）
        .pipe(gulp.dest("./"));
});


//sassとpugの監視をして変換処理させる
gulp.task('watch',function(){
    gulp.watch([paths.sass],function(){
        gulp.start(['sass']);
    });
    gulp.watch([paths.ejs],function(){
        gulp.start(['ejs']);
    });
    gulp.watch([paths.html,paths.php,paths.js],function(){
        gulp.start(['bs-reload']);
  });
});

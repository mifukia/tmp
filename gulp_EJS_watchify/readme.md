# gulp 使い方

### 機能一覧

- SASSコンパイル
- SASSオートプレフィックス
- SASS通知
- PHP対応
- オートリロード
- EJSコンパイル
- browserifyでjsファイルをバンドル（jquery本体やプラグインはnpm経由でインストール）

### Gulp入ってない人はインストールする
````
npm install -g gulp
````

### 使い方
1. package.jsonとgulpfile.jsをドキュメントルートに置く。
2. コマンドプロンプトで対象ディレクトリに移動したら、下記を実行。
```
npm install
```
3. インストールが完了したら、下記コマンドで起動
```
gulp
```

##### ※うまく起動しない場合。
gulpfile.jsのphp.iniとphp.exeのパスが
自分のローカル環境とあっているかを確認

### 想定しているディレクトリ構造

```
DocRoot/
　├ package.json
　├ gulpfile.js
　├ index.html
　└ assets
　　├ css
　　├ img
　　├ scss
```


##### ※ディレクトリ構造が違う場合。
gulpfile.jsのpathの記述を修正する。

※メタ情報はejs/のconfig.jsonにまとめてかく
※バンドルしたいjsは必ずassets/js/src/に置くこと（bundle.jsとしてバンドルされますので、それを読み込んでください。flexibility.js　html5shiv.min.js　respond.min.jsｍについてはバンドルしないほうがいいかなと思ったので除外してます。

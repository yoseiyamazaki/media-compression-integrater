# Media compression integrater (メディア圧縮統合ツール)

`Media compression integrater`は、`ffmpeg`を使用して画像や動画を圧縮するための、柔軟で強力なコマンドラインツールです。ffmpegのコマンドを直接記述した独自の圧縮プロファイルを定義でき、出力を完全にコントロールすることが可能です。

## 主な機能

-   **プロファイルベースの圧縮**: 動画用のHEVC、画像用のWebP/AVIFなど、用途に応じた複数の圧縮プロファイルを定義できます。
-   **対象拡張子の指定**: プロファイルごとに変換対象とするファイルの拡張子を指定でき、無関係なファイルは自動でスキップされます。
-   **柔軟な実行**: 圧縮プロファイルを指定すればその一つだけを、指定しなければ**定義された全プロファイル**を実行します。
-   **ffmpegコマンドを直接利用**: ffmpegのコマンドラインオプションを直接記述できるため、最大限の柔軟性を持ちます。
-   **スマートなファイル命名**: 変換元と変換先の拡張子が同じ場合、ファイルの上書きを防ぐためにファイル名が自動的に変更されます (例: `video.mp4` -> `video.hevc.mp4`)。
-   **同一階層への出力**: デフォルトでは、圧縮されたファイルは元ファイルと同じディレクトリに保存されます。

## インストールとローカルでの実行

まず、お使いのシステムに [Node.js](https://nodejs.org/ja/) と [ffmpeg](https://ffmpeg.org/download.html) がインストールされていることを確認してください。

次に、このリポジトリをクローンし、依存関係をインストールします。

```bash
# git clone https://github.com/yoseiyamazaki/media-compression-integrater.git
cd media-compression-integrater
npm install
```

### 実行方法

#### 方法1: ローカルから直接実行する
プロジェクトのルートディレクトリから、`node`コマンドで直接スクリプトを実行できます。

```bash
node bin/cli.js init
node bin/cli.js my_video.mp4 -p hevc
```

#### 方法2: npm link を使用する (任意)
`mci`コマンドをシステム全体で利用できるようにしたい場合は、`npm link`を実行します。これは開発時や頻繁に利用する場合に便利な**任意**のステップです。

```bash
npm link
```
`npm link` を実行すると、`mci`というグローバルコマンドが登録されます。

## パッケージの公開と利用

このパッケージはnpm public registryに公開されるように設定されています。

### 公開方法
`main`ブランチにプッシュすると、GitHub Actionsによって自動的にパッケージが公開されます。

### パッケージの利用方法 (インストール)
以下のコマンドを実行するだけで、どのプロジェクトからでもこのパッケージをインストールできます。

```bash
npm install @yoseiyamazaki/media-compression-integrater
```

## アンインストール
`npm link` を使用した場合、以下のコマンドでグローバルコマンドを削除できます。
```bash
npm unlink @yoseiyamazaki/media-compression-integrater

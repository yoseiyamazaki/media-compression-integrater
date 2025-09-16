# Media compression integrater (メディア圧縮統合ツール)

`Media compression integrater`は、`ffmpeg`を使用して画像や動画を圧縮するコマンドラインツールです。
ffmpegのコマンドを直接記述した独自の圧縮プロファイルを定義でき、出力をコントロール、共有することが可能です。

## 主な機能

-   **プロファイルベースの圧縮**: 動画用のHEVC、画像用のWebP/AVIFなど、用途に応じた複数の圧縮プロファイルを定義できます。
-   **対象拡張子の指定**: プロファイルごとに変換対象とするファイルの拡張子を指定でき、無関係なファイルは自動でスキップされます。
-   **柔軟な実行**: 圧縮プロファイルを指定すればその一つだけを、指定しなければ**定義された全プロファイル**を実行します。
-   **ffmpegコマンドを直接利用**: ffmpegのコマンドラインオプションを直接記述できるため、最大限の柔軟性を持ちます。
-   **スマートなファイル命名**: 変換元と変換先の拡張子が同じ場合、ファイルの上書きを防ぐためにファイル名が自動的に変更されます (例: `video.mp4` -> `video.hevc.mp4`)。
-   **同一階層への出力**: デフォルトでは、圧縮されたファイルは元ファイルと同じディレクトリに保存されます。

## インストール

### 必要条件

お使いのシステムに [Node.js](https://nodejs.org/ja/) と [ffmpeg](https://ffmpeg.org/download.html) がインストールされている必要があります。

### npm (GitHub Packages) からインストール

このツールはnpmパッケージとして公開されています。以下のコマンドでグローバルにインストールすることで、システムのどこからでも `mci` コマンドが利用可能になります。

```bash
npm install -g @yoseiyamazaki/media-compression-integrater
```

`npm link` を使う必要はありません。インストールが完了すれば、すぐに `mci` コマンドを使用できます。

### 開発者向け: ソースからインストール

開発やカスタマイズを目的とする場合は、リポジトリをクローンしてローカルでセットアップすることも可能です。

```bash
git clone https://github.com/yoseiyamazaki/media-compression-integrater.git
cd media-compression-integrater
npm install
npm link
```
この場合、`npm link` を実行することで、ローカルのソースコードに基づいた `mci` コマンドがシステム全体で利用可能になります。

## 使い方

### 1. 設定ファイルの初期化

使い始める前に、まずデフォルトの設定ファイルを生成します。

```bash
mci init
```

これを実行すると、`compress.config.json`ファイルが作成されます。各プロファイルには`sourceExtensions`が追加され、どの拡張子のファイルを変換対象とするかを定義できます。

```json
{
  "profiles": {
    "hevc": {
      "options": "-c:v libx265 -crf 28 -preset medium -tag:v hvc1",
      "extension": ".mp4",
      "sourceExtensions": [".mp4", ".mov"]
    },
    "webp": {
      "options": "-quality 80",
      "extension": ".webp",
      "sourceExtensions": [".png", ".jpg", ".jpeg"]
    }
  }
}
```

### 2. ファイルの圧縮

コマンドの引数はすべて任意です。柔軟な実行が可能です。

#### 特定のファイルを特定のプロファイルで圧縮:
```bash
mci /path/to/my/image.png -p webp
```

#### 特定のディレクトリ内の全ファイルを、特定のプロファイルで圧縮:
```bash
mci /path/to/my/media_folder -p hevc
```

#### カレントディレクトリの全ファイルを、**すべてのプロファイル**で圧縮:
`-p`オプションを指定しない場合、`sourceExtensions`に一致するすべてのファイルに対して、設定されているすべてのプロファイルが実行されます。
```bash
mci
```

### オプション

-   `[input]`: (任意) 圧縮したいソースファイルまたはディレクトリのパス。省略した場合はカレントディレクトリが対象になります。
-   `-p`, `--profile`: (任意) 圧縮に使用するプロファイル名。省略した場合は定義されているすべてのプロファイルが実行されます。
-   `-o`, `--output`: (任意) 出力先のディレクトリを指定します。省略した場合、ソースファイルと同じディレクトリに保存されます。
-   `-c`, `--config`: (任意) カスタム設定ファイルのパスを指定します。

## アンインストール

グローバルインストールした `mci` コマンドをシステムから削除するには、以下のコマンドを実行します。

```bash
npm uninstall -g @yoseiyamazaki/media-compression-integrater
```

ソースから `npm link` を使用してインストールした場合は、プロジェクトディレクトリで `npm unlink` を実行してください。

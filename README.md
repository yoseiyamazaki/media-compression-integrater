# Media Compression Integrater

[![npm version](https://img.shields.io/npm/v/@yoseiyamazaki/media-compression-integrater.svg)](https://www.npmjs.com/package/@yoseiyamazaki/media-compression-integrater)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`Media Compression Integrater`は、`ffmpeg`を使用して画像や動画を圧縮するためのコマンドラインツールです。ffmpegのコマンドを直接記述した独自の圧縮プロファイルを定義でき、出力を完全にコントロールし、設定を共有することが可能です。

## 主な機能

-   **プロファイルベースの圧縮**: 動画用のHEVC、画像用のWebP/AVIFなど、用途に応じた複数の圧縮プロファイルを定義できます。
-   **対象拡張子の指定**: プロファイルごとに変換対象とするファイルの拡張子を指定でき、無関係なファイルは自動でスキップされます。
-   **柔軟な実行**: 圧縮プロファイルを指定すればその一つだけを、指定しなければ**定義された全プロファイル**を実行します。
-   **ffmpegコマンドを直接利用**: ffmpegのコマンドラインオプションを直接記述できるため、最大限の柔軟性を持ちます。
-   **スマートなファイル命名**: 変換元と変換先の拡張子が同じ場合、ファイルの上書きを防ぐためにファイル名が自動的に変更されます (例: `video.mp4` -> `video.hevc.mp4`)。
-   **同一階層への出力**: デフォルトでは、圧縮されたファイルは元ファイルと同じディレクトリに保存されます。

## 必須要件

-   [Node.js](https://nodejs.org/ja/)
-   [ffmpeg](https://ffmpeg.org/download.html)

本ツールを使用する前に、お使いのシステムに上記がインストールされていることを確認してください。

## インストール

### グローバルインストール (推奨)

コマンドラインツールとしてどこからでも利用したい場合は、グローバルにインストールします。

```bash
npm install -g @yoseiyamazaki/media-compression-integrater
```

### ローカルインストール

特定のプロジェクトでのみ利用する場合は、開発依存関係としてインストールします。

```bash
npm install -D @yoseiyamazaki/media-compression-integrater
```
この場合、コマンドの実行は `npx mci` のように `npx` を接頭辞として使用します。

## 使い方

### 1. 設定ファイルの初期化

まず、プロジェクトディレクトリで以下のコマンドを実行し、設定ファイル `compress.config.json` を生成します。

```bash
# グローバルインストールの場合
mci init

# ローカルインストールの場合
npx mci init
```

### 2. 設定ファイルの編集

生成された `compress.config.json` を開き、圧縮プロファイルを定義します。各プロファイルでは、対象の拡張子 (`targetExtensions`) と `ffmpeg` のコマンド (`command`) を指定します。

**設定例 (`compress.config.json`):**
```json
{
  "profiles": {
    "hevc": {
      "targetExtensions": [".mov", ".mp4"],
      "command": "-c:v libx265 -crf 28 -c:a aac -b:a 128k"
    },
    "webp": {
      "targetExtensions": [".png", ".jpg", ".jpeg"],
      "command": "-c:v libwebp -lossless 0 -q:v 80"
    }
  }
}
```

### 3. 圧縮の実行

ファイルを指定して圧縮を実行します。

```bash
# hevcプロファイルを使って動画を圧縮
mci my_video.mp4 -p hevc

# webpプロファイルを使って画像を圧縮
mci my_image.png -p webp
```

プロファイルを指定しない場合、対象の拡張子に一致する**すべてのプロファイル**が実行されます。

```bash
mci my_video.mp4
```

### オプション

-   `-p, --profile <name>`: 使用する圧縮プロファイルを指定します。
-   `-o, --output <path>`: 圧縮ファイルの出力先ディレクトリを指定します。デフォルトは入力元と同じディレクトリです。
-   `-c, --config <path>`: 使用する設定ファイルのパスを指定します。デフォルトは `./compress.config.json` です。

<!-- ## 開発者向け情報

### ローカル環境での実行

リポジトリをクローンして、ローカルで実行することも可能です。

```bash
git clone https://github.com/yoseiyamazaki/media-compression-integrater.git
cd media-compression-integrater
npm install
```

`node`コマンドで直接スクリプトを実行します。

```bash
node bin/cli.js init
node bin/cli.js my_video.mp4 -p hevc
```

## アンインストール

### グローバルインストールの場合

```bash
npm uninstall -g @yoseiyamazaki/media-compression-integrater
```

### ローカルインストールの場合

```bash
npm uninstall @yoseiyamazaki/media-compression-integrater
``` -->

## ライセンス

このプロジェクトは [MIT License](https://opensource.org/licenses/MIT) の下で公開されています。

# OpenMotion

<p align="center">
  <img src="assets/open-motion.jpg" width="120" height="120" alt="OpenMotion Logo" />
</p>

<p align="center">
  <strong>React開発者のためのオープンソース・プログラマティック・ビデオエンジン。</strong>
</p>

<p align="center">
  <a href="#-features">機能</a> •
  <a href="#-installation">インストール</a> •
  <a href="#-quick-start">クイックスタート</a> •
  <a href="#-packages">パッケージ</a>
</p>

---

OpenMotionは、Remotionに代わる高性能なオープンソースの選択肢です。使い慣れたReactコンポーネント、フック、お気に入りのCSSライブラリを使用して、フレーム単位で正確なビデオを作成できます。

### 🎬 ショーケース

| 機能ショーケース | メディアショーケース |
| :---: | :---: |
| ![Feature Showcase](assets/feature-showcase.gif) | ![Media Showcase](assets/media-showcase.gif) |
| ブランド、ダッシュボード、イージング | ビデオ、オーディオ |

## ✨ 機能

- ⚛️ **Reactファースト**: Reactエコシステムのパワーを最大限に活用。
- ⏱️ **フレーム精度の決定論**: 高度なタイムジャック技術により、すべてのフレームが同一であることを保証。
- 🚀 **並列レンダリング**: すべてのCPUコアを利用してレンダリング速度をスケール。
- 🎵 **マルチトラック・オーディオミキシング**: 独立した音量制御を持つ複数の `<Audio />` をサポート。
- 📈 **アニメーションコンポーネント**: ループ、トランジション、イージングなどの組み込みライブラリ。
- 📦 **外部連携**: **Three.js** や **Lottie** アニメーションをネイティブサポート。
- 💬 **キャプションシステム**: SRTサポートとTikTokスタイルのアニメーションによる自動字幕レンダリング。
- 📊 **メディア分析**: ビデオ/オーディオの動的なメタデータ抽出（長さ、解像度）。
- 📹 **オフスレッドビデオ**: 高性能なビデオデコードをバックグラウンドプロセスに移行。
- 📊 **動的メタデータ**: 入力プロップに基づいて、ビデオの解像度や長さなどのプロパティを動的に計算。
- 🎬 **GIF & ビデオ出力**: 自動フォーマット検出により、MP4ビデオとGIFの両方の形式でレンダリング可能。

### 4. ビデオのレンダリング (本番出力)

レンダリングには、プロジェクトに組み込まれた `render` スクリプトの使用を推奨します。これは、**ビルド -> 静的サーバーの起動 -> レンダリング -> 自動クリーンアップ** という一連のプロセスを自動的に処理し、開発サーバーのバッファ問題によるフリーズを防ぎ、極めて堅牢なレンダリングを保証します。

```bash
# ワンクリックレンダリング (デフォルト出力: ./out.mp4、4スレッド並列)
npm run render

# 出力ファイル名の変更やコンポジションIDの指定 (引数を -- 経由で渡す)
npm run render -- -o my-video.mp4 -c main
```

## 💡 ベストプラクティス

### 堅牢なレンダリング
本番環境では、常に `npm run render` を優先してください。このコマンドは内部で静的サーバーモードを使用しており、レンダリングのハングアップを完全に排除します。

### 追加引数の受け渡し
`npm run render -- [追加引数]` を使用してスクリプトのデフォルト値を上書きできます。
- **並列数の変更**: `npm run render -- -j 8`
- **Chromiumのパス指定**: `npm run render -- --chromium-path "/path/to/chrome"`

### アセットの配置
ローカルの画像やビデオアセットはすべて `public/` ディレクトリに配置し、コード内からは `/filename` パスで参照してください。

## 🎬 出力形式のサポート
- **.mp4**: 標準的なビデオ（オーディオ込み）。
- **.webm**: 透過背景をサポートする高品質ビデオ。
- **.gif**: アニメーション画像（オーディオなし）。
- **.webp**: モダンなアニメーション形式。GIFより軽量で高品質。

## 🛡️ 特徴的な機能
- 🛡️ **実行前チェック**: ブラウザのインストール確認と環境検証機能を内蔵。
- 🌍 **カスタムChromiumパス**: `--chromium-path` 引数によるブラウザパスのカスタマイズ。
- 🚀 **Turbo Render**: ワンクリックの自動ビルドと自動レンダリングチェーン。

## 📚 APIリファレンス

ビデオプロパティを動的に計算する：

```tsx
<Composition
  id="dynamic-video"
  component={VideoComponent}
  width={1280}
  height={720}
  fps={30}
  durationInFrames={300}
  calculateMetadata={async (props) => {
    const meta = await getVideoMetadata(props.src);
    return {
      width: meta.width,
      height: meta.height,
      durationInFrames: Math.ceil(meta.durationInSeconds * 30)
    };
  }}
/>
```

## 📦 パッケージ

| パッケージ | 説明 |
| :--- | :--- |
| [`@open-motion/core`](./packages/core) | Reactプリミティブ (`Composition`, `Sequence`, `Loop`), フック, メディアユーティリティ (`getVideoMetadata`, `parseSrt`)。 |
| [`@open-motion/components`](./packages/components) | 高度なコンポーネント (`Transition`, `ThreeCanvas`, `Lottie`, `Captions`, `TikTokCaption`)。 |
| [`@open-motion/renderer`](./packages/renderer) | Playwrightベースのキャプチャエンジン。 |
| [`@open-motion/cli`](./packages/cli) | コマンドラインインターフェース。 |

## 🛠 インストール

```bash
npm install @open-motion/core @open-motion/components
```

## 🚀 クイックスタート

### セットアップ

```bash
# CLIツールをグローバルにインストール
pnpm install -g @open-motion/cli @open-motion/renderer

# Playwrightブラウザをインストール (レンダリングに必要)
npx playwright install chromium
```

### プロジェクトの作成と実行

```bash
# 新規プロジェクトの作成
open-motion init fun-video
cd fun-video && pnpm install

# 開発サーバーの起動
# ターミナルで実行 - ポート番号が表示されます (例: 5173)
pnpm run dev
```

**注意**: このターミナルは開いたままにしてください。ポート5173が使用中の場合、Viteは自動的に5174, 5175などを試行します。実際のポート番号は出力を確認してください。

### ビデオのレンダリング

別のターミナルで、上記のポートを使用してプロジェクトをレンダリングします：

```bash
# MP4へのレンダリング (30fpsで14秒間)
open-motion render -u http://localhost:5173 -o out.mp4 --duration 420

# GIFへのレンダリング (30fpsで14秒間)
open-motion render -u http://localhost:5173 -o out.gif --duration 420

# WebPへのレンダリング (GIFより高品質)
open-motion render -u http://localhost:5173 -o out.webp --duration 420

# WebMへのレンダリング (透過ビデオをサポート)
open-motion render -u http://localhost:5173 -o out.webm --duration 420
```

**長さの解説**: `--duration 420` は420フレームを意味します。30fpsの場合、420 ÷ 30 = **14秒** のビデオになります。

### コンポジションの作成

```tsx
import { Composition, useCurrentFrame, interpolate } from "@open-motion/core";
import { Transition, TikTokCaption } from "@open-motion/components";

const MyScene = () => {
  const frame = useCurrentFrame();
  return (
    <Transition type="fade">
      <div style={{ flex: 1, backgroundColor: 'black', color: 'white' }}>
        <TikTokCaption text="Hello OpenMotion" active={true} />
      </div>
    </Transition>
  );
};
```

**ポートに関する注意**: ポート5173が既に使用されている場合、Viteは自動的に5174, 5175などを試行します。実際のポート番号は開発サーバーの出力（例: "Local: http://localhost:5177/"）を確認してください。

## 📚 APIリファレンス

すべてのOpenMotion機能とコンポーネントの完全なリファレンス。

### コアフック

**`useCurrentFrame()`**
アニメーションの現在のフレーム番号を取得します。

```tsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1]);
```

**`useVideoConfig()`**
ビデオ設定（width, height, fps, durationInFrames）にアクセスします。

```tsx
const { width, height, fps } = useVideoConfig();
```

### アニメーション & トランジション

**`<Loop durationInFrames={30}>`**
サブアニメーションのためのループする時間コンテキストを作成します。

```tsx
<Loop durationInFrames={60}>
  <SpinningLogo />
</Loop>
```

**`<Transition type="wipe" direction="right">`**
スムーズな開始/終了トランジション。タイプ: `fade`, `wipe`, `slide`, `zoom`。

```tsx
<Transition type="wipe" direction="right">
  <Title text="Hello World" />
</Transition>
```

**`Easing.inOutExpo`**
イージング機能の完全なライブラリ：
- `Easing.linear`, `Easing.easeIn`, `Easing.easeOut`, `Easing.easeInOut`
- `Easing.inOutCubic`, `Easing.outBack`, `Easing.inExpo` など

```tsx
const value = interpolate(frame, [0, 30], [0, 100], {
  easing: Easing.outCubic,
});
```

### 3D & Lottie 連携

**`<ThreeCanvas />`**
ビデオフレームと同期したThree.jsシーンをレンダリングします。詳細は `packages/components` を参照してください。

**`<Lottie url="..." />`**
フレーム精度の制御が可能な宣言的Lottieアニメーション。

```tsx
<Lottie url="/animations/logo.json" />
```

### メディア & キャプション

**`<Audio src="..." volume={0.8} />`**
独立した音量とタイミングを持つマルチトラック・オーディオサポート。

```tsx
<Audio src="/music.mp3" volume={0.5} startFrom={30} startFrame={60} />
```

**`parseSrt(srtContent)`**
SRT字幕ファイルを配列に変換します。

```tsx
const subtitles = parseSrt(await fetch('/subtitles.srt').then(r => r.text()));
```

**`<Captions subtitles={subtitles} />`**
スタイリングオプションを備えた柔軟な字幕レンダラー。

```tsx
<Captions subtitles={subtitles} color="white" fontSize={24} />
```

**`<TikTokCaption />`**
TikTok風のアニメーション字幕のためのプリセット済みコンポーネント。

**`getVideoMetadata(url)`**
ビデオの解像度と長さを取得します。

```tsx
const { width, height, durationInSeconds } = await getVideoMetadata('/video.mp4');
```

**`<OffthreadVideo src="..." />`**
バックグラウンドプロセスでの高性能ビデオデコード。

### 出力 & エクスポートオプション

**CLIコマンド**

```bash
# 基本的なレンダリング
open-motion render -u http://localhost:5173 -o video.mp4

# カスタム設定を使用
open-motion render -u http://localhost:5173 -o video.mp4 \
  --duration 420 \
  --width 1920 \
  --height 1080 \
  --fps 30

# GIFへのレンダリング
open-motion render -u http://localhost:5173 -o animation.gif \
  --duration 420 \
  --public-dir ./public
```

**ファイル形式**
- **MP4**: オーディオをサポートするフルビデオ (H.264)
- **WebM**: 透過をサポートするWeb最適化ビデオ (VP9)
- **GIF**: 軽量なアニメーション (オーディオなし)
- **WebP**: 高品質なアニメーション画像 (GIFより優れ、オーディオなし)

**品質パラメータ**
- `--width`: 出力幅（ピクセル）
- `--height`: 出力高さ（ピクセル）
- `--fps`: フレーム数/秒 (デフォルト: 30)
- `--duration`: 総フレーム数 (例: 420 = 30fpsで14秒)
- `--format`: 明示的なフォーマット (mp4, webm, gif, webp, auto)

## 📜 ライセンス

MIT © [jsongo](https://github.com/jsongo)

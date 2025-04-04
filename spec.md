# ビリヤード風福笑い

福笑いは日本の遊びで、目、鼻、口などの顔のパーツをランダムに配置し、できあがった顔を楽しむもの。このゲームは、顔のパーツをビリヤードのボールのように動かして、できあがった顔を楽しむ。

## シーン

ゲームには以下の 3 つのシーンがある。

1. ステージ選択
2. ゲームプレイ
3. 結果表示

### ステージ選択

各ステージのカバー画像とタイトルが並び、プレイするステージを選択する。ステージによってできあがる顔が異なる。

ステージのデータは後に JSON で用意するが、顔はたとえば以下のようなものを想定している。

- おかめ
- 般若
- 桃太郎

### ゲームプレイ

以下の行程を繰り返す。

1. 発射準備
2. パーツの発射
3. パーツの固定

#### 共通の要素

- 画面左に大きく矩形を配置し、これをフィールドとする。
- フィールドは 640x640 (px) とし、画面サイズに合わせて拡大縮小する。
- フィールドの中央に輪郭 (`outline`) を配置する。
- フィールドの下に操作パネルを配置する。
- 画面右に残りのパーツを縦に配置する。
- ステージ選択へ戻るリンクを配置する。

#### 発射準備

- フィールド下端に現在のパーツを表示。パーツの下端とフィールドの下端が揃うように配置する。パーツの中央とフィールドの中央が揃うように配置する。
- 初速と角度を `<input type=range>` で指定する。
  - 初速の範囲は 10-120 (px/s)
  - 角度の範囲は 0-180 (deg)
- 発射ボタンを押すと、パーツの発射へ遷移する。

#### パーツの発射

- 発射したパーツは、フィールドの側面で反射し、徐々に減速する。パーツがフィールド内で止まると、その位置に固定され、次のパーツが準備される。
  - 減速度は 0.5 (px/s^2)
  - 停止判定は速度が 0.5 以下
- 射出中のパーツと固定されたパーツは衝突しない。

#### パーツの固定

- 全てのパーツをフィールド内に配置すると、結果表示に遷移する。

### 結果表示

「できあがり！」と表示し、フィールドを画面中央に移動する。プレイヤーはできあがった顔を見て楽しむ。

シェア、リトライ、ステージ選択のボタンを配置する。シェア方法は追って考える。

## 各ステージのデータ形式

`path`は`src/assets/stages/`以下のディレクトリ名と一致する。cover, image のファイル名は`src/assets/stages/{path}`以下に配置される。

```json
{
  "title": "ステージ1",
  "path": "stage1",
  "cover": "cover.jpg",
  "outline": {
    "name": "輪郭",
    "image": "face.png",
    "width": 200,
    "height": 200
  },
  "parts": [
    { "name": "目1", "image": "eye1.png", "width": 50, "height": 50 },
    { "name": "目2", "image": "eye2.png", "width": 50, "height": 50 },
    { "name": "鼻", "image": "nose.png", "width": 50, "height": 50 },
    { "name": "口", "image": "mouth.png", "width": 50, "height": 50 }
  ]
}
```

## 実装方法

ゲームのファイルは `src/game/` 内に配置する。tailwindcss でスタイリングする。

# タロット占いサンプル（大アルカナ1枚引き）

## 構成

これは完全に静的なサイトです。サーバーにファイルを置くだけで動きます。

### ファイル

- `index.html` … メインページ
- `style.css` … スタイル
- `script.js` … 抽選ロジック
- `cards.json` … カードデータと解釈（ここを編集すれば解釈を変えられます）
- `images/` … カード画像を入れてください

## 使い方

1. **画像の準備**
   - Rider-Waite の大アルカナ画像（パブリックドメイン）をダウンロードして `images/` フォルダに入れてください。
   - ファイル名は以下のようにしてください：
     - 00_fool.jpg
     - 01_magician.jpg
     - 02_high_priestess.jpg
     - 03_empress.jpg
     - 04_emperor.jpg
     - 05_hierophant.jpg
     - 06_lovers.jpg
     - 07_chariot.jpg
     - 08_strength.jpg
     - 09_hermit.jpg
     - 10_wheel.jpg
     - 11_justice.jpg
     - 12_hanged_man.jpg
     - 13_death.jpg
     - 14_temperance.jpg
     - 15_devil.jpg
     - 16_tower.jpg
     - 17_star.jpg
     - 18_moon.jpg
     - 19_sun.jpg
     - 20_judgement.jpg
     - 21_world.jpg

   Wikimedia Commons から無料で入手可能です（例：`RWS_Tarot_00_Fool.jpg` など）。

2. **サーバーにアップロード**
   - すべてのファイルを同じフォルダに置いてください。
   - レンタルサーバーの場合はFTPでアップロード。
   - 無料で試すなら Netlify、GitHub Pages、Cloudflare Pages など。

3. **ブラウザで開く**
   - `index.html` を開けば動作します。

## カスタマイズ

- **お題を増やす**: `cards.json` の `themes` と各カードの `interpretations` に追加。
- **解釈を変える**: `cards.json` のテキストを自由に編集。
- **デザインを変える**: `style.css` を編集。

## 注意

- 解釈文はサンプルです。実際の占いに合わせて自由に書き換えてください。
- 画像はパブリックドメインの Rider-Waite を使用することをおすすめします。

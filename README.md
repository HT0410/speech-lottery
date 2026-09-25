# speech-lottery

3分間スピーチのお題を抽選するシングルページアプリです。

GitHub Pages で公開するため、HTML本体は `index.html` として配置しています。

## 席替え抽選（seats.html）

教室の座席表（出入口・講師席・サブ講師席のレイアウト）に沿って席替えを行うアプリです。

- 生徒の名前・希望（スクリーン希望／サブ講師希望）は自由に編集でき、ブラウザに保存されます。
- 「スクリーン希望」の生徒は前2列（スクリーンが見やすい列）に、「サブ講師希望」の生徒は後2列（サブ講師に質問しやすい列）に優先的に配置されます。
- 希望に沿えなかった場合は画面下に注意書きが表示されます。

`index.html` 左上のリンク、または `seats.html` に直接アクセスして利用できます。

## GitHub Pages

公開設定は GitHub のリポジトリ画面で行います。

1. `Settings` を開く
2. `Pages` を開く
3. `Build and deployment` の `Source` を `Deploy from a branch` にする
4. `Branch` を `main` / `/ (root)` にして保存

公開URLは通常、次の形式になります。

```text
https://<GitHubユーザー名>.github.io/speech-lottery/
```

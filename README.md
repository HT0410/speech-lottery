# speech-lottery

3分間スピーチのお題を抽選するシングルページアプリです。

お題本文は `server/draw.php`（サーバー側）だけが保持しており、フロントエンド（`index.html`）には含まれません。ブラウザの検証ツールでソースを見ても、抽選前に全お題を閲覧することはできません。

- `index.html` … フロントエンド。GitHub Pages で公開する
- `server/draw.php` … お題データを保持するAPI。PHPが動くサーバー（ロリポップ等）にアップロードする

## 1. バックエンド（server/draw.php）をアップロードする

1. ロリポップのFTP／ファイルマネージャーで `server/draw.php` を任意のディレクトリにアップロードする（例: `/speech-lottery/draw.php`）
2. アップロード後のURLを確認する（例: `https://your-account.lolipop.jp/speech-lottery/draw.php`）
3. `draw.php` 内の `$allowedOrigins` に、フロントエンドを公開するGitHub PagesのURL（後述）を追加する

```php
$allowedOrigins = [
    'https://<GitHubユーザー名>.github.io',
];
```

## 2. フロントエンド（index.html）の設定

`index.html` 内の `API_BASE` を、1.で確認した実際のURLに書き換える。

```js
const API_BASE = 'https://your-account.lolipop.jp/speech-lottery/draw.php';
```

## 3. GitHub Pages で公開

公開設定は GitHub のリポジトリ画面で行います。

1. `Settings` を開く
2. `Pages` を開く
3. `Build and deployment` の `Source` を `Deploy from a branch` にする
4. `Branch` を `main` / `/ (root)` にして保存

公開URLは通常、次の形式になります。

```text
https://<GitHubユーザー名>.github.io/speech-lottery/
```

このURLを、1.の `$allowedOrigins` と一致させること（末尾のスラッシュなし）。

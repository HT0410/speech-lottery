# speech-lottery

3分間スピーチのお題を抽選するシングルページアプリです。

お題本文は `server/draw.php`（サーバー側）だけが保持しており、フロントエンド（`index.html`）には含まれません。ブラウザの検証ツールでソースを見ても、抽選前に全お題を閲覧することはできません。

スピーチ終了ごとに、氏名・カテゴリ・お題をGoogleスプレッドシートに記録できます。記録済みのお題は当日中は自動的に抽選対象から除外されます（重複防止）。

- `index.html` … フロントエンド。GitHub Pages で公開する
- `server/draw.php` … お題データを保持するAPI。PHPが動くサーバー（ロリポップ等）にアップロードする
- `sheets/Code.gs` … 記録先スプレッドシートに貼り付けるGoogle Apps Script

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

## 3. 記録先スプレッドシート（sheets/Code.gs）を設定する

記録用シートは作成済みです: https://docs.google.com/spreadsheets/d/1OY7qA66eb4Bwe8o1Np15EDDLWnsLie-vl3idA8tTFtM/edit
（別のシートを使う場合は、見出し行「日付,氏名,カテゴリ,お題,記録日時」の新規シートを用意してください）

1. 上記シートを開き、「拡張機能」→「Apps Script」を開く
2. デフォルトのコードを全て削除し、`sheets/Code.gs` の内容を貼り付ける（トークンは`index.html`と同じ値が既に入っています）
3. 「デプロイ」→「新しいデプロイ」→種類を「ウェブアプリ」に設定
   - 実行するユーザー: 自分
   - アクセスできるユーザー: 全員
4. 「デプロイ」を押し、初回は権限の承認画面が出るので許可する
5. 発行された「ウェブアプリ」のURLを確認する

## 4. フロントエンド（index.html）にスプレッドシートのURLを設定する

`index.html` 内の `SHEETS_API` を、3.で確認した実際のURLに書き換える（`SHEETS_TOKEN` は設定済みなので変更不要）。

```js
const SHEETS_API = 'https://script.google.com/macros/s/xxxxxxxx/exec';
```

## 5. GitHub Pages で公開

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

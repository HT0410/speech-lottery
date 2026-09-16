// スピーチ抽選 記録シート用 Apps Script
//
// 使い方:
// 1. 記録先のGoogleスプレッドシートを開く
// 2. 「拡張機能」→「Apps Script」を開く
// 3. デフォルトのコードを全て削除し、このファイルの内容を貼り付ける
// 4. 「デプロイ」→「新しいデプロイ」→種類の選択で「ウェブアプリ」を選ぶ
//    - 実行するユーザー: 自分
//    - アクセスできるユーザー: 全員
// 5. 「デプロイ」を押し、権限を承認する（初回のみ確認画面が出る）
// 6. 発行された「ウェブアプリ」のURLを index.html の SHEETS_API に設定する
//
// SECRET_TOKEN は index.html の SHEETS_TOKEN と同じ値にしておくこと。
// （既にこの値で index.html 側も設定済み）
const SECRET_TOKEN = '5mzRo4ydgjMjpLLKx8GjI0Ki_QdiEiVb';

function getSheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function todayStr_() {
  return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// GET ?action=used&token=... → 本日すでに記録済みのお題本文一覧を返す
function doGet(e) {
  const action = e.parameter.action;
  if (e.parameter.token !== SECRET_TOKEN) {
    return jsonResponse_({ error: 'invalid token' });
  }
  if (action !== 'used') {
    return jsonResponse_({ error: 'unknown action' });
  }

  const sheet = getSheet_();
  const rows = sheet.getDataRange().getValues();
  const today = todayStr_();
  const usedTexts = [];
  for (let i = 1; i < rows.length; i++) { // 1行目は見出し
    const date = rows[i][0];
    const text = rows[i][3];
    if (String(date) === today && text) usedTexts.push(text);
  }
  return jsonResponse_({ usedTexts });
}

// POST { token, name, cat, text } → 1行追記する
function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse_({ ok: false, error: 'invalid body' });
  }
  if (body.token !== SECRET_TOKEN) {
    return jsonResponse_({ ok: false, error: 'invalid token' });
  }
  if (!body.name || !body.cat || !body.text) {
    return jsonResponse_({ ok: false, error: 'missing fields' });
  }

  const sheet = getSheet_();
  sheet.appendRow([
    todayStr_(),
    body.name,
    body.cat,
    body.text,
    Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss'),
  ]);
  return jsonResponse_({ ok: true });
}

# Vercelへのデプロイ手順

## 1. GitHubにアップロード
1. https://github.com を開く
2. 「New repository」→ 名前: `lifememonavi-liff` → Create
3. このフォルダ（lifememonavi）をアップロード

## 2. Vercelにデプロイ
1. https://vercel.com にアクセス → GitHubでサインイン
2. 「Add New Project」→ lifememonavi-liff を選択
3. 「Environment Variables」に以下を設定:
   - NEXT_PUBLIC_LIFF_ID = 2009895882-ztNAGvt3
   - NEXT_PUBLIC_API_URL = （Phase 3でFastAPIデプロイ後に追加）
4. 「Deploy」ボタンを押す
5. デプロイ完了後、URLをコピー（例: https://lifememonavi-liff.vercel.app）

## 3. LIFFのエンドポイントURLを更新
1. https://developers.line.biz/console にアクセス
2. RoboStudy → ライフメモナビ → LIFF
3. 「ライフメモナビ チャット」をクリック
4. エンドポイントURLを変更:
   https://lifememonavi-liff.vercel.app/chat
5. 「更新」ボタンを押す

## 重要な情報
- LIFF ID: 2009895882-ztNAGvt3
- LIFF URL: https://liff.line.me/2009895882-ztNAGvt3
- チャネルID: 2009895882

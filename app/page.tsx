import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-6">
      {/* ヘッダー */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">🌿</div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">ライフ・メモナビ</h1>
        <p className="text-gray-500 text-sm">AIみまくんと話して、毎日を豊かに</p>
      </div>

      {/* メインボタン3つ */}
      <div className="w-full max-w-sm flex flex-col gap-4">
        <Link
          href="/chat"
          className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl px-6 py-5 shadow-md transition-all active:scale-95"
        >
          <span className="text-3xl">💬</span>
          <div>
            <div className="font-bold text-lg">会話する</div>
            <div className="text-green-100 text-sm">みまくんと話す</div>
          </div>
        </Link>

        <Link
          href="/howto"
          className="flex items-center gap-4 bg-white hover:bg-gray-50 text-green-700 border-2 border-green-300 rounded-2xl px-6 py-5 shadow-sm transition-all active:scale-95"
        >
          <span className="text-3xl">📖</span>
          <div>
            <div className="font-bold text-lg">使い方</div>
            <div className="text-gray-400 text-sm">無料・有料の違いを確認</div>
          </div>
        </Link>

        <Link
          href="/plan"
          className="flex items-center gap-4 bg-amber-400 hover:bg-amber-500 text-white rounded-2xl px-6 py-5 shadow-md transition-all active:scale-95"
        >
          <span className="text-3xl">⭐</span>
          <div>
            <div className="font-bold text-lg">有料プラン</div>
            <div className="text-amber-100 text-sm">無制限で使えるようになる</div>
          </div>
        </Link>
      </div>

      <p className="mt-8 text-xs text-gray-400">無料：1日3回まで無料でお試し</p>
    </div>
  );
}

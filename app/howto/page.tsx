import Link from "next/link";

export default function HowtoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-green-500 text-white px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-white text-xl">←</Link>
        <div className="font-bold text-lg">使い方</div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-6">
        {/* アプリ説明 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-green-600 font-bold text-lg mb-3">🌿 ライフ・メモナビとは？</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            AIキャラクター「みまくん」があなたの話し相手になります。
            日々の出来事や思い出を話しかけるだけで、自分史・終活メモの作成をお手伝いします。
            アプリのインストール不要で、LINEからすぐに使えます。
          </p>
        </div>

        {/* 無料・有料比較 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-700 font-bold text-lg mb-4">📋 無料・有料プランの違い</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="font-bold text-green-600 text-sm mb-2">無料プラン</div>
              <ul className="text-gray-600 text-sm space-y-1.5">
                <li>✅ 1日3回まで会話</li>
                <li>✅ みまくんと話せる</li>
                <li>✅ LINEから即起動</li>
              </ul>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="font-bold text-amber-600 text-sm mb-2">⭐ 有料プラン</div>
              <ul className="text-gray-600 text-sm space-y-1.5">
                <li>✅ 無制限で会話</li>
                <li>✅ 自分史レポート</li>
                <li>✅ 優先サポート</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 使い方ステップ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-700 font-bold text-lg mb-4">🚀 かんたん3ステップ</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "「会話する」をタップ", desc: "トップ画面の緑のボタンを押してください" },
              { step: "2", title: "みまくんに話しかける", desc: "今日の出来事や思い出を自由に話してください" },
              { step: "3", title: "記録が蓄積される", desc: "会話の内容が自動的に整理・保存されます" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-bold text-gray-700 text-sm">{item.title}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAボタン */}
        <Link
          href="/chat"
          className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-4 rounded-2xl shadow-md transition-all active:scale-95"
        >
          💬 みまくんと話す
        </Link>
      </div>
    </div>
  );
}

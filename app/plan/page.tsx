"use client";

import { useEffect, useState } from "react";
import { initLiff, LiffProfile } from "@/lib/liff";
import { getCheckoutUrl } from "@/lib/api";
import Link from "next/link";

export default function PlanPage() {
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initLiff().then(setProfile).catch(() => {});
  }, []);

  const handleUpgrade = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const url = await getCheckoutUrl(profile.lineUserId);
      window.location.href = url;
    } catch {
      alert("決済ページの取得に失敗しました。しばらくしてからお試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* ヘッダー */}
      <div className="bg-amber-400 text-white px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-white text-xl">←</Link>
        <div className="font-bold text-lg">有料プラン</div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-8 space-y-6">
        {/* プランカード */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-amber-300">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">⭐</div>
            <h2 className="text-2xl font-bold text-gray-800">プレミアムプラン</h2>
            <div className="mt-4">
              <span className="text-4xl font-bold text-amber-500">¥980</span>
              <span className="text-gray-400 text-sm"> / 月</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">いつでもキャンセル可能</p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              "みまくんと無制限で会話",
              "自分史・終活メモを自動作成",
              "会話履歴の無制限保存",
              "月次会話レポートPDF",
              "優先カスタマーサポート",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading || !profile}
            className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-md"
          >
            {loading ? "処理中..." : "⭐ 今すぐ始める（月額¥980）"}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            クレジットカードで安全に決済（Stripe）
          </p>
        </div>

        {/* 無料プランとの比較 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-4">無料プランとの比較</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 border-b">
                <th className="pb-2 text-left font-normal">機能</th>
                <th className="pb-2 font-normal">無料</th>
                <th className="pb-2 font-normal text-amber-500">⭐ 有料</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1日の会話回数", "3回", "無制限"],
                ["会話履歴", "7日間", "無制限"],
                ["自分史レポート", "—", "✅"],
                ["PDFエクスポート", "—", "✅"],
              ].map(([feat, free, paid]) => (
                <tr key={feat}>
                  <td className="py-2.5 text-gray-600">{feat}</td>
                  <td className="py-2.5 text-center text-gray-400">{free}</td>
                  <td className="py-2.5 text-center text-amber-500 font-medium">{paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-gray-400 pb-4">
          決済はStripeで安全に処理されます。<br/>
          月額サブスクリプションはいつでもキャンセルできます。
        </p>
      </div>
    </div>
  );
}

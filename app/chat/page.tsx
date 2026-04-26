"use client";

import { useEffect, useRef, useState } from "react";
import { initLiff, LiffProfile } from "@/lib/liff";
import { sendChat } from "@/lib/api";
import Link from "next/link";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ChatPage() {
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initError, setInitError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // LIFF初期化
  useEffect(() => {
    initLiff()
      .then((p) => {
        setProfile(p);
        // 最初の挨拶メッセージ
        setMessages([
          {
            role: "ai",
            text: `こんにちは、${p.displayName}さん！みまくんです。今日もお話しましょう😊`,
          },
        ]);
      })
      .catch((e) => {
        if (!String(e).includes("リダイレクト")) {
          setInitError("LINEログインに失敗しました。再度お試しください。");
        }
      });
  }, []);

  // 新しいメッセージが来たら一番下にスクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || !profile || loading) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await sendChat(profile.lineUserId, userText);
      setMessages((prev) => [...prev, { role: "ai", text: res.response }]);
    } catch (e: unknown) {
      const err = e as { is_limit?: boolean; detail?: string };
      if (err.is_limit) {
        setLimitReached(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "今日の無料会話（3回）を使い切りました。有料プランなら無制限で話せます✨",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: "エラーが発生しました。もう一度お試しください。" },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center text-red-500">{initError}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-3 animate-pulse">🌿</div>
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-green-500 text-white px-4 py-3 flex items-center gap-3 shadow">
        <Link href="/" className="text-white text-xl">←</Link>
        <div className="text-2xl">🌿</div>
        <div>
          <div className="font-bold text-base">みまくん</div>
          <div className="text-green-100 text-xs">AIライフサポーター</div>
        </div>
      </div>

      {/* 有料プラン誘導バナー */}
      {limitReached && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-amber-700">無料制限に達しました</span>
          <Link
            href="/plan"
            className="bg-amber-400 text-white text-sm px-4 py-1.5 rounded-full font-bold"
          >
            有料プランへ ⭐
          </Link>
        </div>
      )}

      {/* メッセージ一覧 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white text-sm mr-2 flex-shrink-0 self-end">
                🌿
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-700 shadow-sm rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* ローディング表示 */}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white text-sm mr-2 flex-shrink-0 self-end">
              🌿
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 入力エリア */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex gap-3 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={limitReached ? "有料プランで続きを話せます" : "メッセージを入力..."}
          disabled={limitReached || loading}
          rows={1}
          className="flex-1 resize-none border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 disabled:bg-gray-100 disabled:text-gray-400"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading || limitReached}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

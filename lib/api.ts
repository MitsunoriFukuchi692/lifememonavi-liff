// lib/api.ts
// FastAPIバックエンド呼び出しユーティリティ

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export type ChatResponse = {
  response: string;
};

export type ChatError = {
  error: string;
  is_limit?: boolean; // 1日3回制限に達した場合 true
};

// チャットメッセージ送信
export async function sendChat(
  lineUserId: string,
  message: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ line_user_id: lineUserId, message }),
  });

  if (res.status === 429) {
    const err: ChatError = await res.json();
    throw { ...err, is_limit: true };
  }
  if (!res.ok) {
    throw new Error("サーバーエラーが発生しました");
  }
  return res.json();
}

// Stripe Checkout URLを取得
export async function getCheckoutUrl(lineUserId: string): Promise<string> {
  const res = await fetch(`${API_URL}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ line_user_id: lineUserId }),
  });
  if (!res.ok) throw new Error("決済URLの取得に失敗しました");
  const data = await res.json();
  return data.checkout_url;
}

// ユーザーのプラン確認
export async function getUserPlan(
  lineUserId: string
): Promise<{ plan: string; count_today: number }> {
  const res = await fetch(
    `${API_URL}/user/plan?line_user_id=${encodeURIComponent(lineUserId)}`
  );
  if (!res.ok) throw new Error("プラン情報の取得に失敗しました");
  return res.json();
}

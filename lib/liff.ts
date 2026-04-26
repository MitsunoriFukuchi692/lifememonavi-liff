// lib/liff.ts
// LIFF初期化・LINEログインユーティリティ

let liffInitialized = false;

export type LiffProfile = {
  lineUserId: string;
  displayName: string;
  pictureUrl?: string;
};

export async function initLiff(): Promise<LiffProfile> {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
  if (!liffId) throw new Error("NEXT_PUBLIC_LIFF_ID が設定されていません");

  // ブラウザでのみ実行
  if (typeof window === "undefined") {
    throw new Error("LIFF はブラウザ環境でのみ動作します");
  }

  const liff = (await import("@line/liff")).default;

  if (!liffInitialized) {
    await liff.init({ liffId });
    liffInitialized = true;
  }

  // 未ログインの場合はLINEログインへリダイレクト
  if (!liff.isLoggedIn()) {
    liff.login();
    // login()はリダイレクトするので以降は実行されない
    throw new Error("ログインへリダイレクト中...");
  }

  const profile = await liff.getProfile();
  return {
    lineUserId: profile.userId,
    displayName: profile.displayName,
    pictureUrl: profile.pictureUrl,
  };
}

export async function closeLiff() {
  const liff = (await import("@line/liff")).default;
  liff.closeWindow();
}

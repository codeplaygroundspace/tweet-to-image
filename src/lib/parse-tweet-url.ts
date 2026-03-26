export function parseTweetUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "").replace("mobile.", "");

    if (hostname !== "x.com" && hostname !== "twitter.com") {
      return null;
    }

    const match = parsed.pathname.match(/\/\w+\/status\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

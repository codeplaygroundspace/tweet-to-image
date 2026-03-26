import { toPng } from "html-to-image";

export async function exportToPng(element: HTMLElement, scale: number, filename: string): Promise<void> {
  const dataUrl = await toPng(element, { pixelRatio: scale, cacheBust: true });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function copyToClipboard(element: HTMLElement, scale: number): Promise<void> {
  const dataUrl = await toPng(element, { pixelRatio: scale, cacheBust: true });
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}

export function shareToLinkedIn(text: string, url?: string): void {
  const params = new URLSearchParams();
  if (url) params.set("url", url);
  if (text) params.set("text", text);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`, "_blank");
}

export function copyLink(tweetUrl: string): void {
  navigator.clipboard.writeText(tweetUrl);
}

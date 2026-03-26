import { toPng, toSvg } from "html-to-image";

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportToPng(element: HTMLElement, scale: number, filename: string): Promise<void> {
  const dataUrl = await toPng(element, { pixelRatio: scale, cacheBust: true });
  downloadDataUrl(dataUrl, filename);
}

export async function copyToClipboard(element: HTMLElement, scale: number): Promise<void> {
  const dataUrl = await toPng(element, { pixelRatio: scale, cacheBust: true });
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}

export async function exportToSvg(element: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toSvg(element, { cacheBust: true });
  downloadDataUrl(dataUrl, filename);
}

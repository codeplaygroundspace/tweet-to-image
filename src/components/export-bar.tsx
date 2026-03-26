"use client";

import { useState, type RefObject } from "react";
import { exportToPng, copyToClipboard, shareToLinkedIn, copyLink } from "@/lib/export";

interface ExportBarProps {
  frameRef: RefObject<HTMLDivElement | null>;
  scale: number;
  tweetId: string;
  tweetUrl: string;
}

export function ExportBar({ frameRef, scale, tweetId, tweetUrl }: ExportBarProps) {
  const [copied, setCopied] = useState(false);

  async function handleDownload() {
    if (!frameRef.current) return;
    await exportToPng(frameRef.current, scale, `tweet-${tweetId}.png`);
  }

  async function handleCopy() {
    if (!frameRef.current) return;
    await copyToClipboard(frameRef.current, scale);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleShare() {
    shareToLinkedIn("Check out this tweet!", tweetUrl);
  }

  function handleCopyLink() {
    copyLink(tweetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const buttonBase: React.CSSProperties = {
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <button
        onClick={handleDownload}
        style={{ ...buttonBase, background: "#0f1419", color: "#fff" }}
      >
        Download PNG
      </button>

      <button
        onClick={handleCopy}
        style={{
          ...buttonBase,
          background: "#f7f9f9",
          color: "#0f1419",
          border: "1px solid #e5e5e5",
        }}
      >
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>

      <button
        onClick={handleShare}
        style={{ ...buttonBase, background: "#0a66c2", color: "#fff" }}
      >
        Share on LinkedIn
      </button>

      <button
        onClick={handleCopyLink}
        style={{
          ...buttonBase,
          background: "transparent",
          color: "#0f1419",
          border: "1px solid #cfd9de",
        }}
      >
        Copy Link
      </button>
    </div>
  );
}

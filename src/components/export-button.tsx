"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { exportToPng, exportToSvg, copyToClipboard } from "@/lib/export";

interface ExportButtonProps {
  frameRef: RefObject<HTMLDivElement | null>;
  scale: 1 | 2 | 4;
  onScaleChange: (scale: 1 | 2 | 4) => void;
  tweetId: string;
}

export function ExportButton({ frameRef, scale, onScaleChange, tweetId }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function showFeedback(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2000);
  }

  async function handleDownloadPng() {
    if (!frameRef.current) return;
    await exportToPng(frameRef.current, scale, `tweet-${tweetId}.png`);
    setOpen(false);
  }

  async function handleDownloadSvg() {
    if (!frameRef.current) return;
    await exportToSvg(frameRef.current, `tweet-${tweetId}.svg`);
    setOpen(false);
  }

  async function handleCopy() {
    if (!frameRef.current) return;
    await copyToClipboard(frameRef.current, scale);
    showFeedback("Copied!");
    setOpen(false);
  }

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    padding: "12px 20px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    color: "#0f1419",
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Split button */}
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <button
          onClick={handleDownloadPng}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#1d9bf0",
            color: "#fff",
            border: "none",
            borderRadius: "8px 0 0 8px",
            padding: "8px 14px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {feedback ?? "Export Image"}
        </button>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#1a8cd8",
            color: "#fff",
            border: "none",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "0 8px 8px 0",
            padding: "8px 10px",
            cursor: "pointer",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
          >
            <path d="M3 4.5L6 7.5L9 4.5" />
          </svg>
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 8,
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 14,
            padding: "6px 0",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            zIndex: 100,
            minWidth: 200,
          }}
        >
          <button onClick={handleDownloadPng} style={itemStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 12l4 4 4-4" />
              <line x1="12" y1="8" x2="12" y2="16" />
            </svg>
            Save PNG
          </button>
          <button onClick={handleDownloadSvg} style={itemStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 12l4 4 4-4" />
              <line x1="12" y1="8" x2="12" y2="16" />
            </svg>
            Save SVG
          </button>
          <button onClick={handleCopy} style={itemStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copy Image
          </button>

          {/* Divider */}
          <div style={{ height: 1, background: "#e5e5e5", margin: "6px 0" }} />

          {/* Size */}
          <div style={{ padding: "8px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                <span style={{ fontSize: 15, color: "#0f1419" }}>Size</span>
              </div>
              <div style={{ display: "flex", gap: 0 }}>
                {([1, 2, 4] as const).map((s, i) => (
                  <button
                    key={s}
                    onClick={() => onScaleChange(s)}
                    style={{
                      padding: "4px 10px",
                      fontSize: 13,
                      fontWeight: scale === s ? 600 : 400,
                      background: scale === s ? "#1d9bf0" : "transparent",
                      color: scale === s ? "#fff" : "#536471",
                      border: "1px solid #e5e5e5",
                      borderLeft: i === 0 ? "1px solid #e5e5e5" : "none",
                      borderRadius:
                        i === 0
                          ? "6px 0 0 6px"
                          : i === 2
                            ? "0 6px 6px 0"
                            : "0",
                      cursor: "pointer",
                    }}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

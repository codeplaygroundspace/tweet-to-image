"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { exportToPng, exportToSvg, copyToClipboard } from "@/lib/export";
import { UI_COLORS } from "@/lib/themes";

interface ExportButtonProps {
  frameRef: RefObject<HTMLDivElement | null>;
  scale: 1 | 2 | 4;
  onScaleChange: (scale: 1 | 2 | 4) => void;
  tweetId: string;
}

export function ExportButton({ frameRef, scale, onScaleChange, tweetId }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [chevronHovered, setChevronHovered] = useState(false);
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
    color: UI_COLORS.text,
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Split button */}
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <button
          onClick={handleDownloadPng}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: hovered ? "#f0f0f0" : UI_COLORS.white,
            color: UI_COLORS.text,
            border: `1px solid ${UI_COLORS.secondaryBorder}`,
            borderRight: "none",
            borderRadius: "9999px 0 0 9999px",
            padding: "8px 14px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s",
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
          onMouseEnter={() => setChevronHovered(true)}
          onMouseLeave={() => setChevronHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: UI_COLORS.white,
            color: UI_COLORS.textMuted,
            border: `1px solid ${UI_COLORS.secondaryBorder}`,
            borderLeft: "none",
            borderRadius: "0 9999px 9999px 0",
            padding: "4px 10px",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: chevronHovered ? UI_COLORS.secondaryBg : "transparent",
              transition: "background 0.15s",
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
          </span>
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 8,
            background: UI_COLORS.white,
            border: `1px solid ${UI_COLORS.secondaryBorder}`,
            borderRadius: 14,
            padding: "6px 0",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            zIndex: 100,
            minWidth: 200,
          }}
        >
          <button onClick={handleDownloadPng} style={itemStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={UI_COLORS.textLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 12l4 4 4-4" />
              <line x1="12" y1="8" x2="12" y2="16" />
            </svg>
            Save PNG
          </button>
          <button onClick={handleDownloadSvg} style={itemStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={UI_COLORS.textLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 12l4 4 4-4" />
              <line x1="12" y1="8" x2="12" y2="16" />
            </svg>
            Save SVG
          </button>
          <button onClick={handleCopy} style={itemStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={UI_COLORS.textLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copy Image
          </button>

          {/* Divider */}
          <div style={{ height: 1, background: UI_COLORS.secondaryBorder, margin: "6px 0" }} />

          {/* Size */}
          <div style={{ padding: "8px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={UI_COLORS.textLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                <span style={{ fontSize: 15, color: UI_COLORS.text }}>Size</span>
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
                      background: scale === s ? UI_COLORS.primary : "transparent",
                      color: scale === s ? UI_COLORS.white : UI_COLORS.textLight,
                      border: `1px solid ${UI_COLORS.secondaryBorder}`,
                      borderLeft: i === 0 ? `1px solid ${UI_COLORS.secondaryBorder}` : "none",
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

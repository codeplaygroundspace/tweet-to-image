"use client";

import { useEffect, useRef } from "react";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          maxWidth: 520,
          width: "100%",
          padding: "40px 40px 32px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 16,
            border: "1px solid #e5e5e5",
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#536471" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f1419", marginBottom: 20 }}>
          About
        </h2>

        <div style={{ fontSize: 15, lineHeight: 1.7, color: "#536471" }}>
          <p style={{ marginBottom: 16 }}>
            Tweet to Image is a tool to create beautiful screenshots of tweets.
          </p>
          <p style={{ marginBottom: 16 }}>
            Paste a tweet URL, pick a theme from a range of gradient backgrounds, and choose between light or dark mode.
          </p>
          <p style={{ marginBottom: 16 }}>
            Customize the padding and when you&apos;re ready, click Export Image in the top-right corner to save the image as a PNG, SVG, or copy it to your clipboard.
          </p>
          <p style={{ marginBottom: 16 }}>
            You can also change the image resolution in the export menu.
          </p>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f1419", marginTop: 28, marginBottom: 12 }}>
          Contribute
        </h3>

        <div style={{ fontSize: 15, lineHeight: 1.7, color: "#536471" }}>
          <p style={{ marginBottom: 16 }}>
            The project is Open Source and{" "}
            <a
              href="https://github.com/codeplaygroundspace/tweet-to-image"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0f1419", textDecoration: "underline" }}
            >
              available on GitHub
            </a>
            .
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="https://www.rosinapissaco.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              color: "#536471",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Created by <span style={{ color: "#0f1419", fontWeight: 600 }}>Rosina Pissaco</span>
          </a>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* GitHub */}
            <a
              href="https://github.com/codeplaygroundspace/tweet-to-image"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#536471", display: "flex" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* X */}
            <a
              href="https://x.com/rosinapissaco"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#536471", display: "flex" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

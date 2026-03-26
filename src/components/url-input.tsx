"use client";

import { useEffect, useState, type FormEvent } from "react";
import { UI_COLORS } from "@/lib/themes";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
  error: string | null;
  defaultValue?: string;
}

export function UrlInput({ onSubmit, loading, error, defaultValue = "" }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (defaultValue && !mounted) {
      setUrl(defaultValue);
      setMounted(true);
    }
  }, [defaultValue, mounted]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (url.trim() && !loading) {
      onSubmit(url.trim());
    }
  }

  const disabled = loading || !url.trim();

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 600, width: "100%", margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: UI_COLORS.white,
          border: `1px solid ${UI_COLORS.secondaryBorder}`,
          borderRadius: 12,
          padding: "8px 12px",
        }}
      >
        {/* Link icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={UI_COLORS.textLight}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a tweet URL (e.g. https://x.com/user/status/...)"
          disabled={loading}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 14,
            color: UI_COLORS.text,
          }}
        />

        <button
          type="submit"
          disabled={disabled}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: disabled ? UI_COLORS.secondaryBg : "#f2f2f2",
            color: disabled ? UI_COLORS.textLight : hovered ? UI_COLORS.primary : UI_COLORS.secondary,
            border: `1px solid ${disabled ? UI_COLORS.secondaryBorder : UI_COLORS.secondaryBorder}`,
            borderRadius: 9999,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 600,
            cursor: disabled ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            opacity: disabled ? 0.6 : 1,
            transition: "color 0.15s, border-color 0.15s",
          }}
        >
          {loading ? "Loading..." : "Generate"}
        </button>
      </div>

      {error && (
        <p style={{ color: UI_COLORS.error, fontSize: 13, marginTop: 8, paddingLeft: 4 }}>
          {error}
        </p>
      )}
    </form>
  );
}

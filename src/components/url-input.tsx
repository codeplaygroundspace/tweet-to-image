"use client";

import { useEffect, useState, type FormEvent } from "react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
  error: string | null;
  defaultValue?: string;
}

export function UrlInput({ onSubmit, loading, error, defaultValue = "" }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [mounted, setMounted] = useState(false);

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
          background: "#f7f9f9",
          border: "1px solid #e5e5e5",
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
          stroke="#536471"
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
            color: "#0f1419",
          }}
        />

        <button
          type="submit"
          disabled={loading || !url.trim()}
          style={{
            background: loading || !url.trim() ? "#536471" : "#0f1419",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 20px",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading || !url.trim() ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            opacity: loading || !url.trim() ? 0.6 : 1,
          }}
        >
          {loading ? "Loading..." : "Generate"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#e0245e", fontSize: 13, marginTop: 8, paddingLeft: 4 }}>
          {error}
        </p>
      )}
    </form>
  );
}

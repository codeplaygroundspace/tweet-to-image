"use client";

import { useEffect, useRef, useState } from "react";
import { UrlInput } from "@/components/url-input";
import TweetCard from "@/components/tweet-card";
import { PreviewFrame } from "@/components/preview-frame";
import { ControlsToolbar } from "@/components/controls-toolbar";
import { ExportButton } from "@/components/export-button";
import { AboutModal } from "@/components/about-modal";
import { useTweet } from "@/hooks/use-tweet";
import { DEFAULT_SETTINGS, UI_COLORS, type CustomSettings } from "@/lib/themes";

const DEFAULT_TWEET_URL = "https://x.com/naval/status/2036166794189349187";

export default function Home() {
  const { tweet, loading, error, fetchTweet } = useTweet();
  const [settings, setSettings] = useState<CustomSettings>(DEFAULT_SETTINGS);
  const [tweetUrl, setTweetUrl] = useState(DEFAULT_TWEET_URL);
  const frameRef = useRef<HTMLDivElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    fetchTweet(DEFAULT_TWEET_URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(url: string) {
    setTweetUrl(url);
    fetchTweet(url);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header
        style={{
          padding: "12px 24px",
          borderBottom: `1px solid ${UI_COLORS.secondaryBorder}`,
          background: UI_COLORS.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>
          <img src="/logo.svg" alt="Plume" height={18} />
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            onClick={() => setAboutOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: UI_COLORS.textMuted,
              padding: "8px 0",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            About
          </button>
          {tweet && (
          <ExportButton
            frameRef={frameRef}
            scale={settings.scale}
            onScaleChange={(scale) => setSettings((s) => ({ ...s, scale }))}
            tweetId={tweet.id}
          />
        )}
        </div>
      </header>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      {/* Main content — centered */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 16px",
          gap: 24,
        }}
      >
        {/* URL input */}
        <UrlInput onSubmit={handleSubmit} loading={loading} error={error} defaultValue={DEFAULT_TWEET_URL} />

        {/* Preview — centered */}
        {tweet ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              maxWidth: 600,
              width: "100%",
            }}
          >
            <PreviewFrame ref={frameRef} settings={settings}>
              <TweetCard tweet={tweet} mode={settings.theme.tweetMode} />
            </PreviewFrame>
          </div>
        ) : loading ? (
          <div
            style={{
              maxWidth: 600,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: "32px 0",
            }}
          >
            <div style={{ width: 500, margin: "0 auto", background: UI_COLORS.white, borderRadius: 16, padding: 16, border: `1px solid ${UI_COLORS.secondaryBorder}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: UI_COLORS.secondaryBg, animation: "pulse 1.5s ease-in-out infinite" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ width: 120, height: 14, borderRadius: 4, background: UI_COLORS.secondaryBg, animation: "pulse 1.5s ease-in-out infinite" }} />
                  <div style={{ width: 80, height: 12, borderRadius: 4, background: UI_COLORS.secondaryBg, animation: "pulse 1.5s ease-in-out infinite" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ width: "100%", height: 14, borderRadius: 4, background: UI_COLORS.secondaryBg, animation: "pulse 1.5s ease-in-out infinite" }} />
                <div style={{ width: "80%", height: 14, borderRadius: 4, background: UI_COLORS.secondaryBg, animation: "pulse 1.5s ease-in-out infinite" }} />
                <div style={{ width: "60%", height: 14, borderRadius: 4, background: UI_COLORS.secondaryBg, animation: "pulse 1.5s ease-in-out infinite" }} />
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              marginTop: 48,
              color: UI_COLORS.textMuted,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={UI_COLORS.secondaryBorder} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p style={{ fontSize: 15 }}>Paste a post URL above to create an image</p>
            <p style={{ fontSize: 13, color: UI_COLORS.secondaryBorder }}>
              Works with x.com and twitter.com links
            </p>
          </div>
        )}
      </main>

      {/* Bottom toolbar */}
      {tweet && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: UI_COLORS.white,
              border: `1px solid ${UI_COLORS.secondaryBorder}`,
              borderBottom: "none",
              borderRadius: "16px 16px 0 0",
              padding: "20px 32px",
              boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <ControlsToolbar settings={settings} onChange={setSettings} />
          </div>
        </div>
      )}
    </div>
  );
}

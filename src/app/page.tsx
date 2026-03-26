"use client";

import { useEffect, useRef, useState } from "react";
import { UrlInput } from "@/components/url-input";
import TweetCard from "@/components/tweet-card";
import { PreviewFrame } from "@/components/preview-frame";
import { ControlsToolbar } from "@/components/controls-toolbar";
import { ExportButton } from "@/components/export-button";
import { AboutModal } from "@/components/about-modal";
import { useTweet } from "@/hooks/use-tweet";
import { DEFAULT_SETTINGS, type CustomSettings } from "@/lib/themes";

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
          borderBottom: "1px solid #e5e5e5",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0f1419" }}>
          Tweet to Image
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
              color: "#536471",
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
        ) : (
          !loading && (
            <p
              style={{
                color: "#536471",
                fontSize: 15,
                marginTop: 64,
              }}
            >
              Paste a tweet URL above to get started
            </p>
          )
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
              background: "#fff",
              border: "1px solid #e5e5e5",
              borderBottom: "none",
              borderRadius: "16px 16px 0 0",
              padding: "20px 32px",
            }}
          >
            <ControlsToolbar settings={settings} onChange={setSettings} />
          </div>
        </div>
      )}
    </div>
  );
}

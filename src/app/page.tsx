"use client";

import { useRef, useState } from "react";
import { UrlInput } from "@/components/url-input";
import TweetCard from "@/components/tweet-card";
import { PreviewFrame } from "@/components/preview-frame";
import { ControlsSidebar } from "@/components/controls-sidebar";
import { ExportBar } from "@/components/export-bar";
import { useTweet } from "@/hooks/use-tweet";
import { DEFAULT_SETTINGS, type CustomSettings } from "@/lib/themes";

export default function Home() {
  const { tweet, loading, error, fetchTweet } = useTweet();
  const [settings, setSettings] = useState<CustomSettings>(DEFAULT_SETTINGS);
  const [tweetUrl, setTweetUrl] = useState("");
  const frameRef = useRef<HTMLDivElement>(null);

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
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0f1419" }}>
          Tweet to Image
        </h1>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 16px",
          gap: 32,
        }}
      >
        {/* URL input */}
        <UrlInput onSubmit={handleSubmit} loading={loading} error={error} />

        {/* Preview + Controls */}
        {tweet ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              maxWidth: 900,
              width: "100%",
            }}
          >
            {/* Left: Preview + Export */}
            <div
              style={{
                flex: 1,
                minWidth: 300,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <PreviewFrame ref={frameRef} settings={settings}>
                <TweetCard tweet={tweet} mode={settings.theme.tweetMode} />
              </PreviewFrame>

              <ExportBar
                frameRef={frameRef}
                scale={settings.scale}
                tweetId={tweet.id}
                tweetUrl={tweetUrl}
              />
            </div>

            {/* Right: Controls */}
            <div
              style={{
                width: 260,
                background: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                padding: 20,
                alignSelf: "flex-start",
              }}
            >
              <ControlsSidebar settings={settings} onChange={setSettings} />
            </div>
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
    </div>
  );
}

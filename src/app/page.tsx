"use client";

import { useEffect, useRef, useState } from "react";
import { UrlInput } from "@/components/url-input";
import TweetCard from "@/components/tweet-card";
import { PreviewFrame } from "@/components/preview-frame";
import { ControlsToolbar } from "@/components/controls-toolbar";
import { ExportBar } from "@/components/export-bar";
import { useTweet } from "@/hooks/use-tweet";
import { DEFAULT_SETTINGS, type CustomSettings } from "@/lib/themes";

const DEFAULT_TWEET_URL = "https://x.com/naval/status/2036166794189349187";

export default function Home() {
  const { tweet, loading, error, fetchTweet } = useTweet();
  const [settings, setSettings] = useState<CustomSettings>(DEFAULT_SETTINGS);
  const [tweetUrl, setTweetUrl] = useState(DEFAULT_TWEET_URL);
  const frameRef = useRef<HTMLDivElement>(null);

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
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0f1419" }}>
          Tweet to Image
        </h1>
      </header>

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

            <ExportBar
              frameRef={frameRef}
              scale={settings.scale}
              tweetId={tweet.id}
              tweetUrl={tweetUrl}
            />
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

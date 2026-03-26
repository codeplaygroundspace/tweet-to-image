import React from "react";
import type { QuotedTweet as QuotedTweetType } from "@/lib/tweet-types";
import TweetMedia from "@/components/tweet-media";

function proxyUrl(url: string): string {
  return `/api/proxy?url=${encodeURIComponent(url)}`;
}

const COLORS = {
  light: {
    bg: "#f7f9f9",
    text: "#0f1419",
    secondary: "#536471",
    border: "#eff3f4",
  },
  dark: {
    bg: "#1e2025",
    text: "#e7e9ea",
    secondary: "#71767b",
    border: "#2f3336",
  },
};

interface QuotedTweetProps {
  tweet: QuotedTweetType;
  mode: "light" | "dark";
}

export default function QuotedTweet({ tweet, mode }: QuotedTweetProps) {
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: 12,
        backgroundColor: colors.bg,
        cursor: "pointer",
      }}
    >
      {/* Header: small avatar + name + handle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          marginBottom: 4,
        }}
      >
        <img
          src={proxyUrl(tweet.user.profile_image_url_https)}
          alt={tweet.user.name}
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
          }}
        />
        <span
          style={{
            fontWeight: 700,
            fontSize: 13,
            color: colors.text,
          }}
        >
          {tweet.user.name}
        </span>
        {tweet.user.is_blue_verified && (
          <svg
            viewBox="0 0 22 22"
            width={14}
            height={14}
            style={{ fill: "#1d9bf0" }}
          >
            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.276 1.897.143.634-.131 1.217-.437 1.687-.883.445-.47.751-1.054.882-1.69.132-.633.083-1.29-.14-1.896.587-.274 1.084-.705 1.438-1.245.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
          </svg>
        )}
        <span style={{ fontSize: 13, color: colors.secondary }}>
          @{tweet.user.screen_name}
        </span>
      </div>

      {/* Quoted tweet text */}
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.4,
          color: colors.text,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {tweet.text}
      </div>

      {/* Media */}
      {tweet.media && tweet.media.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <TweetMedia media={tweet.media} borderColor={colors.border} />
        </div>
      )}
    </div>
  );
}

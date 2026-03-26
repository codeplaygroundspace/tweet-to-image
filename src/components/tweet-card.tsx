import React from "react";
import type { TweetData } from "@/lib/tweet-types";
import TweetMedia from "@/components/tweet-media";

function formatCount(n: number): string {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1).replace(/\.0$/, "") + "M";
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1).replace(/\.0$/, "") + "K";
  }
  return n.toString();
}

function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${displayHours}:${displayMinutes} ${ampm} · ${month} ${day}, ${year}`;
}

const COLORS = {
  light: {
    bg: "#ffffff",
    text: "#0f1419",
    secondary: "#536471",
    border: "#eff3f4",
  },
  dark: {
    bg: "#16181c",
    text: "#e7e9ea",
    secondary: "#71767b",
    border: "#2f3336",
  },
};

interface TweetCardProps {
  tweet: TweetData;
  mode: "light" | "dark";
}

export default function TweetCard({ tweet, mode }: TweetCardProps) {
  const isDark = mode === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <div
      style={{
        width: 500,
        backgroundColor: colors.bg,
        borderRadius: 16,
        padding: 16,
        border: `1px solid ${colors.border}`,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        position: "relative",
      }}
    >
      {/* X logo top-right */}
      <div style={{ position: "absolute", top: 16, right: 16 }}>
        <svg
          viewBox="0 0 24 24"
          width={24}
          height={24}
          style={{ fill: colors.secondary }}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Header: avatar + name + handle */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <img
          src={tweet.user.profile_image_url_https}
          alt={tweet.user.name}
          crossOrigin="anonymous"
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            marginRight: 12,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: colors.text,
              }}
            >
              {tweet.user.name}
            </span>
            {tweet.user.is_blue_verified && (
              <svg
                viewBox="0 0 22 22"
                width={18}
                height={18}
                style={{ fill: "#1d9bf0" }}
              >
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.276 1.897.143.634-.131 1.217-.437 1.687-.883.445-.47.751-1.054.882-1.69.132-.633.083-1.29-.14-1.896.587-.274 1.084-.705 1.438-1.245.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: 14, color: colors.secondary }}>
            @{tweet.user.screen_name}
          </span>
        </div>
      </div>

      {/* Tweet text */}
      <div
        style={{
          fontSize: 15,
          lineHeight: 1.5,
          color: colors.text,
          whiteSpace: "pre-wrap",
          marginBottom: 12,
          wordBreak: "break-word",
        }}
      >
        {tweet.text}
      </div>

      {/* Media */}
      {tweet.media && tweet.media.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <TweetMedia media={tweet.media} borderColor={colors.border} />
        </div>
      )}

      {/* Timestamp */}
      <div
        style={{
          fontSize: 14,
          color: colors.secondary,
          marginBottom: 12,
          paddingBottom: 12,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        {formatTimestamp(tweet.created_at)}
      </div>

      {/* Metrics bar */}
      {(tweet.reply_count > 0 ||
        tweet.retweet_count > 0 ||
        tweet.favorite_count > 0) && (
        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 14,
            color: colors.secondary,
          }}
        >
          {tweet.reply_count > 0 && (
            <span>
              <span
                style={{ fontWeight: 700, color: colors.text, marginRight: 4 }}
              >
                {formatCount(tweet.reply_count)}
              </span>
              {tweet.reply_count === 1 ? "Reply" : "Replies"}
            </span>
          )}
          {tweet.retweet_count > 0 && (
            <span>
              <span
                style={{ fontWeight: 700, color: colors.text, marginRight: 4 }}
              >
                {formatCount(tweet.retweet_count)}
              </span>
              Reposts
            </span>
          )}
          {tweet.favorite_count > 0 && (
            <span>
              <span
                style={{ fontWeight: 700, color: colors.text, marginRight: 4 }}
              >
                {formatCount(tweet.favorite_count)}
              </span>
              Likes
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { formatCount, formatTimestamp };

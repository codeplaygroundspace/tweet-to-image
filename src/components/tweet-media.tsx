import React from "react";
import type { TweetMediaItem } from "@/lib/tweet-types";

interface TweetMediaProps {
  media: TweetMediaItem[];
  borderColor: string;
}

function PlayButton() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: "rgba(29, 155, 240, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 24 24" width={24} height={24} style={{ fill: "#ffffff" }}>
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

function MediaCell({
  item,
  borderColor,
  style,
}: {
  item: TweetMediaItem;
  borderColor: string;
  style?: React.CSSProperties;
}) {
  const isVideo = item.type === "video" || item.type === "animated_gif";
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        src={item.url}
        crossOrigin="anonymous"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          border: `1px solid ${borderColor}`,
          borderRadius: 12,
        }}
      />
      {isVideo && <PlayButton />}
    </div>
  );
}

export default function TweetMedia({ media, borderColor }: TweetMediaProps) {
  if (!media || media.length === 0) return null;

  const gap = 2;

  if (media.length === 1) {
    return (
      <MediaCell
        item={media[0]}
        borderColor={borderColor}
        style={{ width: "100%", maxHeight: 300, borderRadius: 12 }}
      />
    );
  }

  if (media.length === 2) {
    return (
      <div style={{ display: "flex", gap, height: 280 }}>
        <MediaCell
          item={media[0]}
          borderColor={borderColor}
          style={{ flex: 1, borderRadius: 12 }}
        />
        <MediaCell
          item={media[1]}
          borderColor={borderColor}
          style={{ flex: 1, borderRadius: 12 }}
        />
      </div>
    );
  }

  if (media.length === 3) {
    return (
      <div style={{ display: "flex", gap, height: 280 }}>
        <MediaCell
          item={media[0]}
          borderColor={borderColor}
          style={{ flex: 1, borderRadius: 12 }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap,
          }}
        >
          <MediaCell
            item={media[1]}
            borderColor={borderColor}
            style={{ flex: 1, borderRadius: 12 }}
          />
          <MediaCell
            item={media[2]}
            borderColor={borderColor}
            style={{ flex: 1, borderRadius: 12 }}
          />
        </div>
      </div>
    );
  }

  // 4+ images: 2x2 grid
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap,
        height: 280,
      }}
    >
      {media.slice(0, 4).map((item, i) => (
        <MediaCell
          key={i}
          item={item}
          borderColor={borderColor}
          style={{ borderRadius: 12 }}
        />
      ))}
    </div>
  );
}

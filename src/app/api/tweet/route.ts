import { NextRequest, NextResponse } from "next/server";
import { parseTweetUrl } from "@/lib/parse-tweet-url";
import type { TweetData, TweetUser, TweetMediaItem, QuotedTweet, TweetPoll } from "@/lib/tweet-types";

function mapUser(raw: any): TweetUser {
  return {
    name: raw.name ?? "",
    screen_name: raw.screen_name ?? "",
    profile_image_url_https: raw.profile_image_url_https ?? "",
    is_blue_verified: raw.is_blue_verified ?? false,
  };
}

function mapMedia(raw: any[]): TweetMediaItem[] | undefined {
  if (!raw || raw.length === 0) return undefined;
  return raw.map((m) => ({
    type: m.type === "photo" ? "photo" : m.type === "animated_gif" ? "animated_gif" : "video",
    url: m.media_url_https ?? m.url ?? "",
    width: m.original_info?.width ?? 0,
    height: m.original_info?.height ?? 0,
    video_url: m.video_info?.variants
      ?.filter((v: any) => v.content_type === "video/mp4")
      ?.sort((a: any, b: any) => (b.bitrate ?? 0) - (a.bitrate ?? 0))?.[0]?.url,
  }));
}

function mapQuotedTweet(raw: any): QuotedTweet | undefined {
  if (!raw) return undefined;
  return {
    id: raw.id_str ?? "",
    text: raw.text ?? "",
    user: mapUser(raw.user ?? {}),
    created_at: raw.created_at ?? "",
    media: mapMedia(raw.mediaDetails),
  };
}

function mapPoll(raw: any): TweetPoll | undefined {
  if (!raw?.binding_values) return undefined;
  const values = raw.binding_values;

  const options: TweetPoll["options"] = [];
  for (let i = 1; i <= 4; i++) {
    const label = values[`choice${i}_label`]?.string_value;
    const count = parseInt(values[`choice${i}_count`]?.string_value ?? "0", 10);
    if (label) options.push({ label, votes: count, percentage: 0 });
  }

  if (options.length === 0) return undefined;

  const total = options.reduce((sum, o) => sum + o.votes, 0);
  for (const o of options) {
    o.percentage = total > 0 ? Math.round((o.votes / total) * 100) : 0;
  }

  return {
    options,
    total_votes: total,
    end_datetime: values.end_datetime_utc?.string_value ?? "",
  };
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  const tweetId = parseTweetUrl(url);
  if (!tweetId) {
    return NextResponse.json(
      { error: "Invalid tweet URL. Paste a link like https://x.com/user/status/123" },
      { status: 400 }
    );
  }

  try {
    const syndicationUrl = `https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=x`;
    const response = await fetch(syndicationUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Couldn't fetch tweet. It may be deleted or private." },
        { status: 404 }
      );
    }

    const raw = await response.json();

    const tweet: TweetData = {
      id: raw.id_str ?? tweetId,
      text: raw.text ?? "",
      user: mapUser(raw.user ?? {}),
      created_at: raw.created_at ?? "",
      favorite_count: raw.favorite_count ?? 0,
      retweet_count: raw.retweet_count ?? 0,
      reply_count: raw.reply_count ?? 0,
      media: mapMedia(raw.mediaDetails),
      quoted_tweet: mapQuotedTweet(raw.quoted_tweet),
      poll: mapPoll(raw.card),
    };

    return NextResponse.json(tweet);
  } catch {
    return NextResponse.json(
      { error: "Couldn't fetch tweet. Try again." },
      { status: 500 }
    );
  }
}

"use client";

import { useState } from "react";
import type { TweetData } from "@/lib/tweet-types";

interface UseTweetReturn {
  tweet: TweetData | null;
  loading: boolean;
  error: string | null;
  fetchTweet: (url: string) => Promise<void>;
}

export function useTweet(): UseTweetReturn {
  const [tweet, setTweet] = useState<TweetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTweet(url: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tweet?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Couldn't fetch tweet");
        setTweet(null);
      } else {
        setTweet(data);
        setError(null);
      }
    } catch {
      setError("Couldn't fetch tweet. Try again.");
      setTweet(null);
    } finally {
      setLoading(false);
    }
  }

  return { tweet, loading, error, fetchTweet };
}

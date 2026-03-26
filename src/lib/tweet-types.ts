export interface TweetUser {
  name: string;
  screen_name: string;
  profile_image_url_https: string;
  is_blue_verified: boolean;
}

export interface TweetMediaItem {
  type: "photo" | "video" | "animated_gif";
  url: string;
  width: number;
  height: number;
  video_url?: string;
}

export interface TweetPoll {
  options: Array<{
    label: string;
    votes: number;
    percentage: number;
  }>;
  total_votes: number;
  end_datetime: string;
}

export interface QuotedTweet {
  id: string;
  text: string;
  user: TweetUser;
  created_at: string;
  media?: TweetMediaItem[];
}

export interface TweetData {
  id: string;
  text: string;
  user: TweetUser;
  created_at: string;
  favorite_count: number;
  retweet_count: number;
  reply_count: number;
  media?: TweetMediaItem[];
  quoted_tweet?: QuotedTweet;
  poll?: TweetPoll;
}

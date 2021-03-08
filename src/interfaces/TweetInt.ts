import { UserInt } from "./UserInt";

export interface TweetInt {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  in_reply_to_status_id: unknown;
  in_reply_to_status_id_str: unknown;
  in_reply_to_user_id: unknown;
  in_reply_to_user_id_str: unknown;
  in_reply_to_screen_name: string | null;
  user: UserInt;
  geo: unknown;
  coordinates: unknown;
  place: unknown;
  contributors: unknown;
  is_quote_status: boolean;
  quoted_status?: TweetInt;
  quoted_status_permalink?: {
    url: string;
    expanded: string;
    display: string;
  };
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  entites: { [key: string]: unknown[] };
  favorited: boolean;
  retweeted: boolean;
  filter_level: string;
  lang: string;
  timestamp_ms: string;
}

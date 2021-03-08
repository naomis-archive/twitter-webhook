export interface WebhookEmbedInt {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: string;
  footer?: unknown;
  image?: unknown;
  thumbnail?: unknown;
  video?: unknown;
  provider?: unknown;
  author?: WebhookEmbedAuthorInt;
  fields?: unknown;
}

export interface WebhookEmbedAuthorInt {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

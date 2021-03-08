import { WebhookEmbedInt } from "./WebhookEmbedInt";

export interface WebhookBodyInt {
  content: string;
  username: string;
  avatar_url: string;
  tts?: boolean;
  file?: unknown;
  embeds?: WebhookEmbedInt[];
  payload_json?: string;
  allowed_mentions?: unknown;
}

import { TweetInt } from "../interfaces/TweetInt";
import { WebhookBodyInt } from "../interfaces/WebhookBodyInt";
import { WebhookEmbedInt } from "../interfaces/WebhookEmbedInt";
import { login } from "../modules/login";
import { getWebhook } from "../modules/webhook";
import fetch from "node-fetch";

export const onData = async (tweet: TweetInt): Promise<void> => {
  const Client = login();
  const WebhookUrl = await getWebhook();

  const {
    in_reply_to_status_id_str: replyId,
    text,
    user,
    created_at,
    quoted_status: quote,
  } = tweet;
  const { profile_image_url: avatar } = user;

  const originalEmbed: WebhookEmbedInt = {
    title: "nhcarrigan tweeted!",
    description: text,
    url: `https://twitter.com/i/web/status/${tweet.id_str}`,
    author: {
      name: user.screen_name,
      url: user.url,
      icon_url: user.profile_image_url_https,
    },
    timestamp: new Date(created_at).toISOString(),
  };

  const webhookBody: WebhookBodyInt = {
    content: "A wild tweet appeared!",
    username: "Twitter Bot",
    avatar_url: avatar,
    allowed_mentions: {
      parse: [],
    },
    embeds: [originalEmbed],
  };

  if (replyId) {
    const replyData = await Client.get("statuses/show", {
      id: replyId,
    });
    const typedData = replyData as TweetInt;

    const replyEmbed: WebhookEmbedInt = {
      title: "In reply to this tweet:",
      description: typedData.text,
      url: `https://twitter.com/i/web/status/${replyId}`,
      author: {
        name: typedData.user.screen_name,
        url: typedData.user.url,
        icon_url: typedData.user.profile_image_url_https,
      },
      timestamp: new Date(typedData.created_at).toISOString(),
    };

    webhookBody.embeds?.push(replyEmbed);
  }

  if (quote) {
    const quoteEmbed: WebhookEmbedInt = {
      title: "And quoted this tweet:",
      description: quote.text,
      url: `https://twitter.com/i/web/status/${quote.id_str}`,
      author: {
        name: quote.user.screen_name,
        url: quote.user.url,
        icon_url: quote.user.profile_image_url_https,
      },
      timestamp: new Date(quote.created_at).toISOString(),
    };

    webhookBody.embeds?.push(quoteEmbed);
  }

  const sentData = await fetch(WebhookUrl, {
    method: "post",
    body: JSON.stringify(webhookBody),
    headers: { "Content-Type": "application/json" },
  });

  if (!sentData || sentData.status !== 204) {
    console.error("Failed to send tweet:");
    console.info(text);
  }
};

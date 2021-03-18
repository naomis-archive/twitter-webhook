import { WebhookBodyInt } from "../interfaces/WebhookBodyInt";
import { WebhookEmbedInt } from "../interfaces/WebhookEmbedInt";
import fetch from "node-fetch";

export const onEnd = async (webhook: string): Promise<void> => {
  const originalEmbed: WebhookEmbedInt = {
    title: "Twitter Monitor is shutting down!",
    description: "Something is broken! <@!465650873650118659>, check the logs!",
  };

  const webhookBody: WebhookBodyInt = {
    content: "A wild system message appeared!",
    username: "Twitter Bot",
    avatar_url: "https://cdn.nhcarrigan.com/content/profile.jpg",
    allowed_mentions: {
      parse: [],
    },
    embeds: [originalEmbed],
  };

  const sentData = await fetch(webhook, {
    method: "post",
    body: JSON.stringify(webhookBody),
    headers: { "Content-Type": "application/json" },
  });

  if (!sentData || sentData.status !== 204) {
    console.error("Failed to send tweet:");
    console.info("Twitter Monitor is online!");
  }
};

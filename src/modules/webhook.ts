import fetch from "node-fetch";

export const getWebhook = async (): Promise<string> => {
  const webhookURL = process.env.DISCORD_WH;

  if (!webhookURL) {
    console.error("Missing webhook URL!");
    process.exit(1);
  }

  const body = {
    content: "Successfully validated webhook URL!",
    username: "Twitter Webhook Validation",
  };

  const data = await fetch(webhookURL, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  if (!data || data.status !== 204) {
    console.error("Webhook URL incorrect!");
    process.exit(1);
  }

  return webhookURL;
};

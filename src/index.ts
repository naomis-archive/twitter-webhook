import { onData } from "./handlers/onData";
import { onEnd } from "./handlers/onEnd";
import { onStart } from "./handlers/onStart";
import { login } from "./modules/login";

(async () => {
  const Client = login();

  try {
    const data = await Client.get("account/verify_credentials");
    console.log(
      `Client has logged in! User: ${data.screen_name} - ID: ${data.id_str}`
    );
  } catch (err) {
    console.error(err);
    console.warn("Could not validate login. Exiting process.");
    process.exit(1);
  }

  const stream = Client.stream("statuses/filter", {
    follow: "1261759785344499712",
  });

  stream.on("start", onStart);
  stream.on("data", onData);
  stream.on("ping", () => console.log("ping"));
  stream.on("error", (error) => console.error(error));
  stream.on("end", onEnd);
})();

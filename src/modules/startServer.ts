import express from "express";
import { readFile } from "fs/promises";
import http from "http";
import https from "https";

export const startServer = async (): Promise<void> => {
  const app = express();

  // mount your middleware and routes here

  app.use((req, res) => {
    res.status(200).send("hi");
  });

  const privateKey = await readFile(
    "/etc/letsencrypt/live/demo.nhcarrigan.com/privkey.pem",
    "utf8"
  );
  const certificate = await readFile(
    "/etc/letsencrypt/live/demo.nhcarrigan.com/cert.pem",
    "utf8"
  );
  const ca = await readFile(
    "/etc/letsencrypt/live/demo.nhcarrigan.com/chain.pem",
    "utf8"
  );

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(3080, () => {
    console.log("http server listening on port 3080");
  });

  httpsServer.listen(3443, () => {
    console.log("https server listening on port 3443");
  });
};

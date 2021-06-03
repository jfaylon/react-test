const express = require("express");
const next = require("next");
const { parse } = require("url");

const app = next(require("../../config/next"));
const db = require("./utils/db");
const config = require("./config");
const router = require("./routes");

const routesClient = require("../client/routes");
const handle = routesClient.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  // Init DB
  db(server);
  server.use(express.json());
  server.use("/api/", router);

  // Asset serving static content
  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    // The routing is working but for static asset we might still need to parse. (checking from one of the other axa project as well for this)
    const { pathname } = parsedUrl;
    handle(req, res, parsedUrl);
  });
  server.listen(config.serverPort, err => {
    if (err) throw err;
    console.info(`Running on environment ${config.environment}`);
    console.info(`> Ready on http://localhost:${config.serverPort}`);
  });
});

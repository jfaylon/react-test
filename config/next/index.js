const path = require("path");
const env = require("../../src/server/config/env");
const dev = env.NODE_ENV !== "production";

module.exports = {
  dev,
  dir: path.resolve(__dirname, "../../src/client")
};

module.exports = {
  collectCoverageFrom: [
    "src/client/**/*.{js,jsx,mjs}",
    "src/server/**/*.{js,jsx,mjs}"
  ],
  setupFilesAfterEnv: ["<rootDir>/config/jest/polyfills.js"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    ".next",
    "<rootDir>/src/client/styles",
    "<rootDir>/src/server/routes.js",
    "<rootDir>/src/server/server.js",
    "<rootDir>/src/server/utils/db.js"
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}",
    "<rootDir>/src/**/?(*.)(spec).{js,jsx,mjs}"
  ],
  testEnvironment: "node",
  testURL: "http://localhost",
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
  moduleFileExtensions: [
    "web.js",
    "js",
    "json",
    "web.jsx",
    "jsx",
    "node",
    "mjs"
  ],
  globals: {
    google: {},
    window: {}
  },
  testTimeout: 30000
};

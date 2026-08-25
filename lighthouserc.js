module.exports = {
  ci: {
    collect: {
      staticDistDir: "./frontend/dist",
      url: ["http://localhost/"],
      numberOfRuns: 1,
      settings: {
        chromeFlags:
          "--no-sandbox --disable-dev-shm-usage --user-data-dir=/tmp/lighthouse-chrome-profile",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

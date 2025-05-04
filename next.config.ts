const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "node_modules/@mapbox/node-pre-gyp/**/*.html": false,
      },
    },
  },
};

module.exports = nextConfig;

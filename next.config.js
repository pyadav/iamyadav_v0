// next.config.js
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
  async redirects() {
    return [
      {
        source: "/post/:path*",
        destination: "/blogs/:path*",
        permanent: true,
      },
    ];
  },
});

const removeImports = require("next-remove-imports");

module.exports = removeImports()({
  // ✅  options...
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  }
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

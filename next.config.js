/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

const nextConfig = removeImports({
  experimental: { esmExternals: true },
  reactStrictMode: true,
  images: {
    domains: ["secure.gravatar.com"],
  },
});

module.exports = nextConfig;

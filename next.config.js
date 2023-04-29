/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];
let complierOption = {};

if (process.env.NODE_ENV === "production") {
  complierOption = {
    removeConsole: true,
  };
}

const domains = [
  "image.tmdb.org",
  "lh3.googleusercontent.com",
  "firebasestorage.googleapis.com",
];

if (process.env.NODE_ENV === "development") {
  domains.push("localhost");
}

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: domains,
    unoptimized: true,
  },
  compiler: complierOption,
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
});

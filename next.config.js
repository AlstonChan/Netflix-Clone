const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const ContentSecurityPolicy = `
  default-src 'self' google.com firebasestorage.googleapis.com identitytoolkit.googleapis.com firestore.googleapis.com localhost;
  img-src 'self' image.tmdb.org lh3.googleusercontent.com firebasestorage.googleapis.com;
  font-src 'self' fonts.googleapis.com fonts.gstatic.com;
  style-src 'self' fonts.googleapis.com fonts.gstatic.com;
  connect-src 'self' wss: ws: ;
`;

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
  // {
  //   key: "Cross-Origin-Embedder-Policy",
  //   value: "require-corp",
  // },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

// if (process.env.NODE_ENV === "production")
//   securityHeaders.push({
//     key: "Content-Security-Policy",
//     value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
//   });

const domains = [
  "image.tmdb.org",
  "lh3.googleusercontent.com",
  "firebasestorage.googleapis.com",
];

if (process.env.NODE_ENV === "development") domains.push("localhost");

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: domains,
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
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

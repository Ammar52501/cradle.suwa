const {
  PUBLIC_URL,
  PUBLIC_API_URL,
  PUBLIC_ASSETS_URL,
} = require("./constants");
const assetsUrl = () => {
  if (!PUBLIC_ASSETS_URL || PUBLIC_API_URL === PUBLIC_ASSETS_URL)
    return PUBLIC_API_URL;
  return `${PUBLIC_API_URL} ${PUBLIC_ASSETS_URL}`;
};
const isDev = process.env.NODE_ENV !== "production";
const CSP = `
  base-uri 'self';
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};  
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  connect-src 'self' ${assetsUrl()};
  frame-src 'self';
  img-src 'self' ${assetsUrl()} data:;
  object-src 'none';
  form-action 'none';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;
const headers = isDev
  ? []
  : [
      {
        // source: "/((?!_next/|api/|.*.(?:css|js|mjs|map|json|txt|xml|ico|png|jpg|jpeg|webp|gif|svg|mp4|webm|woff2?|ttf|otf|woff|eot|pdf)$).*)",
        source: "/(.*?)",
        // has: [{ type: "header", key: "accept", value: ".*text/html.*" }],
        locale: false,
        headers: [
          {
            key: "Content-Security-Policy",
            value: CSP.replaceAll(/\s{2,}/g, " ").trim(),
          },
          {
            key: "X-Frame-Options",
            value: `DENY`,
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy", // dont use it with PDF files
            value: `same-origin`,
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless", // try to convert it to require-corp, and force the resource owner to set the CORP as cross-origin, or CORS to the the domin of the front-end
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: `max-age=63072000; includeSubDomains; preload`,
          },
          {
            key: "Access-Control-Allow-Origin",
            value: PUBLIC_URL,
          },
        ],
      },
      {
        source: "/(pwa|js|images|styles|fonts|assets)/(.*?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable", // 1 week, change it depend on how often you update the files
          },
        ],
      },
      {
        source:
          "/(manifest.json|og.png|favicon.ico|robots.txt|sitemap.xml|.well-known(?:/.*)?)", // the (?:/.*)? should use for folders
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable", // 1 week, change it depend on how often you update the files
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: `cross-origin`,
          },
        ],
      },
      {
        source: "/_next/static/(.*?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async headers() {
    return headers;
  },
  i18n: {
    defaultLocale: "ar",
    locales: ["ar", "en"],
    localeDetection: false,
  },
  devIndicators: false,
};

module.exports = nextConfig;

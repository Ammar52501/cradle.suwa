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
        source: "/(.*?)",
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
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: `same-origin`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
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
            value: "public, max-age=604800, immutable",
          },
        ],
      },
      {
        source:
          "/(manifest.json|og.png|favicon.ico|robots.txt|sitemap.xml|.well-known(?:/.*)?)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable",
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
const PREFIX = "/cradle";

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
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: `/assets/:path*`,
          destination: `${process.env.NEXT_PUBLIC_APP_DOMAIN}${PREFIX}/assets/:path*`,
          basePath: false,
          locale: false,
        },
      ],
    };
  },
  i18n: {
    defaultLocale: "ar",
    locales: ["ar", "en"],
    // localeDetection: false,
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: PREFIX,
};

module.exports = nextConfig;

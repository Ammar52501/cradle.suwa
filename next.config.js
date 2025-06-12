const isDev = process.env.NODE_ENV !== "production";
const CSP = `
  base-uri 'self';
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};  
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  connect-src 'self' https://api4z.suwa.io https://cradle.suwa.com.sa;
  frame-src 'self';
  img-src 'self' https://cradle.suwa.com.sa https://zamakan.suwa.io https://zamakanweb1.suwa.io https://dl.dropboxusercontent.com https://www.dropbox.com http://www.w3.org/2000/svg data:;
  object-src 'none';
  form-action 'none';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;
const headers = isDev
  ? []
  : [
      {
        source: "/((?!robots|sitemap|og|manifest|favicon).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: CSP.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "X-Frame-Options",
            value: `DENY`,
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: `same-origin`,
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: `max-age=63072000; includeSubDomains; preload`,
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "cradle.suwa.com.sa",
          },
          {
            key: "Cache-Control",
            value: "private, max-age=0, must-revalidate",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/(pwa|js|images|styles|fonts|assets)/(.*?)",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: `same-site`,
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: `credentialless`,
          },
          {
            key: "Cache-Control",
            value: "private, max-age=604800, immutable",
          },
        ],
      },
      {
        source: "/(manifest.json|og.png|favicon.ico|logo.*\\.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "private, max-age=604800, immutable", // 1 week
          },
        ],
      },
      {
        source: "/_next/static/(.*?)",
        headers: [
          {
            key: "Cache-Control",
            value: "private, max-age=21536000, immutable", // 249 days
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
      { protocol: "https", hostname: "www.dropbox.com" },
      { protocol: "https", hostname: "dl.dropboxusercontent.com" },
      { protocol: "https", hostname: "zamakan.suwa.io" },
      { protocol: "https", hostname: "zamakanweb1.suwa.io" },
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
};

module.exports = nextConfig;

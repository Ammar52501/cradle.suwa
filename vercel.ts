import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  buildCommand: "bun run --bun next build",
  framework: "nextjs",
  installCommand: "bun install",
  rewrites: [
    routes.rewrite(
      "/assets/:path*",
      "https://cradle7.suwa.com.sa/cradle/assets/:path*",
    ),
  ],
};

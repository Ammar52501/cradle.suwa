function getPublicUrl() {
  if (process.env.NODE_ENV !== "production")
    return process.env.NEXT_DEVELOPMENT_URL;
  if (
    typeof process.env.NEXT_PUBLIC_APP_DOMAIN !== "string" ||
    process.env.NEXT_PUBLIC_APP_DOMAIN.length < 5
  )
    throw new Error(
      "⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️    The environment variable NEXT_PUBLIC_APP_DOMAIN is not set   ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️"
    );
  return process.env.NEXT_PUBLIC_APP_DOMAIN.endsWith("/")
    ? process.env.NEXT_PUBLIC_APP_DOMAIN.slice(0, -1)
    : process.env.NEXT_PUBLIC_APP_DOMAIN;
}

const PUBLIC_URL = getPublicUrl();

export { PUBLIC_URL };

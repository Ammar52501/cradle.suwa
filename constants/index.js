/**
 * @param {string} urlInput - The input URL from env variable.
 * @param {string} variableName - Variable name for clearer error messages.
 * @param {boolean} [throwError=true] - Whether to throw an error if the URL is invalid.
 * @param {boolean} [secure=true] - Whether to use secure protocol (https).
 * @returns {string} - Cleaned URL like "https://example.com"
 */
function cleanEnvUrlToDomain(
  urlInput,
  variableName,
  throwError = true,
  secure = true
) {
  if (!urlInput || typeof urlInput !== "string") {
    if (throwError)
      throw new Error(
        `⚠️ Environment variable '${variableName}' is empty or not a string.`
      );
    return "";
  }

  let inputWithProtocol = urlInput.trim();
  if (!/^https?:\/\//i.test(inputWithProtocol))
    inputWithProtocol = `https://${inputWithProtocol}`;
  try {
    const url = new URL(inputWithProtocol);
    return `${secure ? "https" : "http"}://${url.hostname}`;
  } catch {
    if (throwError)
      throw new Error(
        `⚠️ Invalid URL in environment variable '${variableName}'. Received value: "${urlInput}"`
      );
    return "";
  }
}

const PUBLIC_URL = cleanEnvUrlToDomain(
  process.env.NEXT_PUBLIC_APP_DOMAIN,
  "NEXT_PUBLIC_APP_DOMAIN",
  true,
  process.env.NODE_ENV === "production" &&
    !process.env.NEXT_PUBLIC_APP_DOMAIN?.startsWith("http://localhost:")
);

const PUBLIC_API_URL = cleanEnvUrlToDomain(
  process.env.NEXT_PUBLIC_API_DOMAIN,
  "NEXT_PUBLIC_API_DOMAIN",
  true,
  true
);

const PUBLIC_ASSETS_URL = cleanEnvUrlToDomain(
  process.env.NEXT_PUBLIC_ASSETS_DOMAIN,
  "NEXT_PUBLIC_ASSETS_DOMAIN",
  false,
  true
);

export { PUBLIC_URL, PUBLIC_API_URL, PUBLIC_ASSETS_URL };

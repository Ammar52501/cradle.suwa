import { NextRequest, NextResponse, userAgent } from "next/server";
import { LOCALE_COOKIE, LANGUAGES } from "./lib/constant";

const setLanguageCookie = (response: NextResponse, lang: string) => {
  response.cookies.set({
    name: LOCALE_COOKIE,
    value: lang,
    path: "/",
    expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
};

function returnValidLocale(value: string | undefined) {
  if (!value) return null;
  let result = "";
  for (let i = 0; i < Math.min(value.length, 3); i++) {
    const char = value[i];
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90)
      result += String.fromCharCode(charCode + 32);
    else if (charCode >= 97 && charCode <= 122) result += char;
  }
  if (LANGUAGES.includes(result)) return result;
  return null;
}

export async function middleware(req: NextRequest) {
  if (
    /bot|googlebot|crawler|spider|robot|crawling/i.test(
      req.headers.get("user-agent") || ""
    ) ||
    userAgent(req).isBot
  )
    return NextResponse.next();

  const pathLocale = req.nextUrl.locale;
  const localeCookie = req.cookies.get(LOCALE_COOKIE)?.value;

  let userLang = returnValidLocale(localeCookie);

  if (!userLang) {
    const acceptLanguages =
      req.headers.get("accept-language")?.split(",") || [];

    for (const lang of acceptLanguages) {
      const cleanLang = lang.split(";")[0].split("-")[0].toLowerCase();
      userLang = returnValidLocale(cleanLang);
      if (userLang) break;
    }
  }

  userLang = userLang || (req.nextUrl.defaultLocale as string);

  if (pathLocale === userLang)
    return setLanguageCookie(NextResponse.next(), userLang);

  return setLanguageCookie(
    NextResponse.redirect(
      new URL(
        `${req.nextUrl.defaultLocale === userLang ? "" : `/${userLang}`}${
          req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname
        }${req.nextUrl.search}`,
        req.url
      )
    ),
    userLang
  );
}

/* 
  these three header indecate that this is a full page request
  sec-fetch-dest: document
  sec-fetch-site: none
  sec-fetch-mode: navigate
  and the accept should include text/html
  and these indecate that this in client side navigation request
  sec-fetch-dest: empty
  sec-fetch-mode: cors
  sec-fetch-site: same-origin
*/

export const config = {
  matcher: [
    {
      source: "/",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
        { type: "header", key: "x-middleware-prefetch" },
        { type: "header", key: "x-nextjs-data" },
        { type: "query", key: "_rsc" },
      ],
    },
    {
      source: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
        { type: "header", key: "x-middleware-prefetch" },
        { type: "header", key: "x-nextjs-data" },
        { type: "query", key: "_rsc" },
      ],
    },

    // {
    //   source: "/",
    //   missing: [
    //     { type: "header", key: "next-router-prefetch" },
    //     { type: "header", key: "purpose", value: "prefetch" },
    //     { type: "header", key: "x-middleware-prefetch" },
    //     { type: "query", key: "_rsc" },
    //     { type: "header", key: "x-nextjs-data" },
    //   ],
    //   has: [{ type: "header", key: "sec-fetch-dest", value: "document" }], to know that this is a full page request
    // },
    // {
    //   source: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    //   missing: [
    //     { type: "header", key: "next-router-prefetch" },
    //     { type: "header", key: "purpose", value: "prefetch" },
    //     { type: "header", key: "x-middleware-prefetch" },
    //     { type: "query", key: "_rsc" },
    //     { type: "header", key: "x-nextjs-data" },
    //   ],
    //   has: [{ type: "header", key: "sec-fetch-dest", value: "document" }],
    // },

    // {
    //   source: "/",
    //   missing: [
    //     { type: "header", key: "next-router-prefetch" },
    //     { type: "header", key: "purpose", value: "prefetch" },
    //     { type: "header", key: "x-middleware-prefetch" },
    //     { type: "query", key: "_rsc" },
    //     { type: "header", key: "x-nextjs-data" },
    //   ],
    //   has: [{ type: "header", key: "sec-fetch-site", value: "none" }], to know that this is a full page request
    // },
    // {
    //   source: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    //   missing: [
    //     { type: "header", key: "next-router-prefetch" },
    //     { type: "header", key: "purpose", value: "prefetch" },
    //     { type: "header", key: "x-middleware-prefetch" },
    //     { type: "query", key: "_rsc" },
    //     { type: "header", key: "x-nextjs-data" },
    //   ],
    //   has: [{ type: "header", key: "sec-fetch-site", value: "none" }],
    // },

    // {
    //   source: "/",
    //   missing: [
    //     { type: "header", key: "next-router-prefetch" },
    //     { type: "header", key: "purpose", value: "prefetch" },
    //     { type: "header", key: "x-middleware-prefetch" },
    //     { type: "query", key: "_rsc" },
    //     { type: "header", key: "x-nextjs-data" },
    //   ],
    //   has: [{ type: "header", key: "sec-fetch-mode", value: "navigate" }], to know that this is a full page request
    // },
    // {
    //   source: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    //   missing: [
    //     { type: "header", key: "next-router-prefetch" },
    //     { type: "header", key: "purpose", value: "prefetch" },
    //     { type: "header", key: "x-middleware-prefetch" },
    //     { type: "query", key: "_rsc" },
    //     { type: "header", key: "x-nextjs-data" },
    //   ],
    //   has: [{ type: "header", key: "sec-fetch-mode", value: "navigate" }],
    // },
  ],
};

// import { NextRequest, NextResponse, userAgent } from "next/server";
// import { LOCALE_COOKIE, LANGUAGES, MAX_LOCALE_LENGTH } from "./lib/constant";
// const setLanguageCookie = (response: NextResponse, lang: string) => {
//   response.cookies.set({
//     name: LOCALE_COOKIE,
//     value: lang,
//     path: "/",
//     expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
//     sameSite: "strict",
//     secure: process.env.NODE_ENV === "production",
//   });
//   return response;
// };

// function returnValidLocale(value: string | undefined) {
//   if (
//     typeof value !== "string" ||
//     value.length === 0 ||
//     value.length > MAX_LOCALE_LENGTH
//   )
//     return null;
//   if (!/^[a-zA-Z_-]+$/.test(value)) return null;
//   value = value.toLowerCase();
//   return LANGUAGES.includes(value) ? value : null;
// }

// export async function middleware(req: NextRequest) {
//   if (
//     /bot|googlebot|crawler|spider|robot|crawling/i.test(
//       req.headers.get("user-agent") || ""
//     ) ||
//     userAgent(req).isBot
//   )
//     return NextResponse.next();

//   const pathLocale = req.nextUrl.locale;
//   let userLang = returnValidLocale(req.cookies.get(LOCALE_COOKIE)?.value);
//   const defaultLocale = req.nextUrl.defaultLocale as string;

//   if (!userLang) {
//     const acceptLanguageHeader = req.headers.get("accept-language");
//     const MAX_HEADER_LENGTH = 100;
//     const MAX_LANGUAGES = 5;
//     const MAX_LANGUAGE_LENGTH = 15;
//     if (
//       acceptLanguageHeader &&
//       acceptLanguageHeader.length <= MAX_HEADER_LENGTH
//     ) {
//       const acceptLanguages = acceptLanguageHeader
//         .split(",")
//         .slice(0, MAX_LANGUAGES);

//       for (const lang of acceptLanguages) {
//         if (lang.length > MAX_LANGUAGE_LENGTH) continue;

//         const cleanLang = lang.split(";")[0].split("-")[0].toLowerCase();
//         userLang = returnValidLocale(cleanLang);
//         if (userLang) break;
//       }
//     }
//   }

//   userLang = userLang || defaultLocale;

//   if (pathLocale === userLang)
//     return setLanguageCookie(NextResponse.next(), userLang);

//   const pathname = req.nextUrl.pathname;

//   return setLanguageCookie(
//     NextResponse.redirect(
//       new URL(
//         `${defaultLocale === userLang ? "" : `/${userLang}`}${
//           pathname === "/" ? "" : pathname
//         }${req.nextUrl.search}`,
//         req.nextUrl.origin
//       )
//     ),
//     userLang
//   );
// }

import { NextResponse } from "next/server";
export function middleware() {
  const res = NextResponse.next();
  res.headers.delete("server");
  res.headers.delete("x-powered-by");
  return res;
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

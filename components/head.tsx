import { FALLBACK_LANG, LANGUAGES, primaryColor } from "@/lib/constant";
import Head from "next/head";
import { Fragment, memo, useMemo } from "react";
const metadata = {
  appCapable: "no",
  themeColor: primaryColor,
  colorScheme: "light",
  appleTouchIcon: "/assets/imgs/logo180.png",
  mobileWebAppCapable: "no",
  og: {
    height: "630",
    width: "1200",
    imageType: "image/png",
    url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/og.png`,
    type: "website",
  },
  twitter: {
    type: "summary_large_image",
    site: null, // TODO: add twitter account
  },
  manifest: false,
};
const HeadComponent = memo(
  ({
    title,
    description,
    pathname,
    currentLocale,
    defaultLocale = FALLBACK_LANG,
  }: {
    title: {
      default: string;
      template?: string;
    };
    description: string;
    pathname: string;
    currentLocale: string;
    defaultLocale: string | undefined;
  }) => {
    const fullTitle =
      title && title.default
        ? title.default + (title?.template ? ` - ${title.template}` : "")
        : "";
    pathname = pathname === "/" ? "" : pathname;
    const fullUrl = `${process.env.NEXT_PUBLIC_APP_DOMAIN}${
      currentLocale === defaultLocale ? "" : "/" + currentLocale
    }${pathname}`;
    const DLJson = useMemo(
      () => ({
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: title.default,
          url: process.env.NEXT_PUBLIC_APP_DOMAIN + "/",
        }),
      }),
      [title.default]
    );
    return (
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <script type="application/ld+json" dangerouslySetInnerHTML={DLJson} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:site_name" content={title.default} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={fullUrl} />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${process.env.NEXT_PUBLIC_APP_DOMAIN}${pathname}`}
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:locale" content={currentLocale} />
        {LANGUAGES.map((locale) => (
          <Fragment key={locale}>
            {locale !== currentLocale && (
              <meta property="og:locale:alternate" content={locale} />
            )}
            <link
              rel="alternate"
              hrefLang={locale}
              href={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/${locale}${pathname}`}
            />
          </Fragment>
        ))}
      </Head>
    );
  }
);

HeadComponent.displayName = "HeadComponent";

export default HeadComponent;

const StaticHead = memo(() => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, user-scalable=yes"
      />
      <link rel="icon" href="/favicon.ico" sizes="256x256" />
      {!!metadata.appleTouchIcon && (
        <link rel="apple-touch-icon" href={metadata.appleTouchIcon} />
      )}

      <meta
        name="mobile-web-app-capable"
        content={metadata.mobileWebAppCapable}
      />
      <meta
        name="apple-mobile-web-app-capable"
        content={metadata.mobileWebAppCapable}
      />
      <meta name="color-scheme" content={metadata.colorScheme} />

      <meta name="msapplication-TileColor" content={metadata.themeColor} />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="format-detection" content="telephone=no" />

      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content={metadata.themeColor} />

      <meta property="og:type" content={metadata.og.type} />
      <meta property="og:image:width" content={metadata.og.width} />
      <meta property="og:image:height" content={metadata.og.height} />
      <meta property="og:image:type" content={metadata.og.imageType} />
      <meta property="og:image" content={metadata.og.url} />

      <meta name="twitter:image:width" content={metadata.og.width} />
      <meta name="twitter:image:height" content={metadata.og.height} />
      <meta name="twitter:image:type" content={metadata.og.imageType} />
      <meta name="twitter:image" content={metadata.og.url} />
      <meta name="twitter:card" content={metadata.twitter.type} />
      {!!metadata.twitter.site && (
        <>
          <meta name="twitter:site" content={metadata.twitter.site} />
          <meta name="twitter:creator" content={metadata.twitter.site} />
        </>
      )}
    </Head>
  );
});

StaticHead.displayName = "StaticHead";

export { StaticHead };

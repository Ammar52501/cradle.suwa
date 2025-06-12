import Layout from "@/components/Layout";
import "lenis/dist/lenis.css";

import "@/styles/globals.scss";
import "./globals.css";
import Head from "next/head";
import DataContext from "@/context/DataContext";
import DataScrollLocked from "@/components/data-scroll-locked";

function MyApp({ Component, pageProps }) {
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  const description = "استكشف الشعراء عبر العصور التاريخية الأدبية";
  const imagePath = "logo_mobile_footer.png";
  const translations = pageProps.translations || {};
  return (
    <DataContext.Provider value={translations}>
      <Layout>
        <Head>
          <title>{translations.yearOfArabicPoetry}</title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="csrf-token"
            content="JdDvDc4LUJomFM4T7QE0hFlH9CeKOHDXMoxV3wer"
          />
          <meta name="title" content="" />
          <link rel="icon" type="image/ico" href={`/logo_mobile_footer.ico`} />
          <meta name="theme-color" content="#062a30" />
          <meta name="mobile-web-app-capable" content="no" />
          <meta
            name="application-name"
            content={translations.yearOfArabicPoetry}
          />
          <meta name="apple-mobile-web-app-capable" content="no" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta
            name="apple-mobile-web-app-title"
            content={translations.yearOfArabicPoetry}
          />
          <link rel="apple-touch-icon" href={`${appDomain}/${imagePath}`} />
          <link
            rel="apple-touch-startup-image"
            href={`${appDomain}/${imagePath}`}
          />
          <meta name="author" content={translations.yearOfArabicPoetry} />
          <meta name="description" content={description} />
          <link rel="canonical" href={`${appDomain}/`} />
          <meta name="msapplication-TileColor" content="#062a30" />
          <meta
            name="msapplication-TileImage"
            content={`${appDomain}/${imagePath}`}
          />
          <meta
            name="msapplication-square70x70logo"
            content={`/${imagePath}`}
          />
          <meta
            name="msapplication-square150x150logo"
            content={`/${imagePath}`}
          />
          <meta
            name="msapplication-wide310x150logo"
            content={`/${imagePath}`}
          />
          <meta
            name="msapplication-square310x310logo"
            content={`/${imagePath}`}
          />
          <link rel="apple-touch-icon-precomposed" href={`/${imagePath}`} />
          <meta property="og:type" content="website" />

          <meta
            property="og:site_name"
            content={translations.yearOfArabicPoetry}
          />
          <meta property="og:locale" content="ar" />
          <meta property="og:locale:alternate" content="ar" />
          <meta property="og:url" content={`${appDomain}/`} />
          <meta property="og:title" content={translations.yearOfArabicPoetry} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={`${appDomain}/${imagePath}`} />
          <meta itemProp="name" content={translations.yearOfArabicPoetry} />
          <meta itemProp="author" content={translations.yearOfArabicPoetry} />
          <meta itemProp="image" content={`${appDomain}/${imagePath}`} />
          <meta itemProp="description" content={description} />
          <meta name="twitter:image" content={`${appDomain}/${imagePath}`} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@" />
          <meta name="twitter:creator" content="@" />
          <meta
            name="twitter:title"
            content={translations.yearOfArabicPoetry}
          />
          <meta
            name="twitter:image:src"
            content={`${appDomain}/${imagePath}`}
          />
          <meta name="twitter:description" content={description} />
        </Head>
        <DataScrollLocked />
        <Component {...pageProps} />
      </Layout>
    </DataContext.Provider>
  );
}

export default MyApp;

import Layout from "@/components/Layout";
import "lenis/dist/lenis.css";
import DirectionHandler from "@/components/diraction-cookie-locale-handler";

import "@/styles/globals.scss";
import "./globals.css";
import Head from "next/head";
import DataContext from "@/context/DataContext";
import DataScrollLocked from "@/components/data-scroll-locked";
import HeadComponent, { StaticHead } from "@/components/head";
import Loading from "@/components/loading";
import { memo } from "react";

const PREFIX = process.env.NEXT_PUBLIC_APP_DOMAIN_PREFIX || "";

const FontsHead = memo(() => {
  return (
    <Head>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: "Effra";
              src: url("${PREFIX}/fonts/Effra_Rg.ttf") format("truetype");
              font-weight: 400;
              font-style: normal;
            }
            @font-face {
              font-family: "Effra";
              src: url("${PREFIX}/fonts/Effra_Md.ttf") format("truetype");
              font-weight: 500;
              font-style: normal;
            }
            @font-face {
              font-family: "Effra";
              src: url("${PREFIX}/fonts/Effra-Bold.ttf") format("truetype");
              font-weight: 700;
              font-style: normal;
            }
            @font-face {
              font-family: "Effra";
              src: url("${PREFIX}/fonts/Effra_Heavy.ttf") format("truetype");
              font-weight: 800;
              font-style: normal;
            }
            @font-face {
              font-family: "Custom";
              src: url("${PREFIX}/fonts/custom.otf") format("opentype");
              font-weight: 400;
              font-style: normal;
            }
          `,
        }}
      />
    </Head>
  );
});

FontsHead.displayName = "FontsHead";
const description = "استكشف الشعراء عبر العصور التاريخية الأدبية";
function MyApp({ Component, pageProps, router }) {
  const translations = pageProps.translations || {};
  return (
    <>
      <FontsHead />
      <StaticHead />
      <HeadComponent
        currentLocale={router.locale}
        pathname={router.pathname}
        title={{
          default: translations.yearOfArabicPoetry,
          template: pageProps.title,
        }}
        description={pageProps.description || description}
        defaultLocale={router.defaultLocale}
      />
      <Head>
        <meta
          name="application-name"
          content={translations.yearOfArabicPoetry}
        />
        <meta
          name="apple-mobile-web-app-title"
          content={translations.yearOfArabicPoetry}
        />
      </Head>
      <DataScrollLocked />
      <DirectionHandler dir={router.locale === "ar" ? "rtl" : "ltr"} />

      <DataContext.Provider value={translations}>
        <Layout key={router.locale}>
          <Loading dir={router.locale === "ar" ? "rtl" : "ltr"}>
            <Component {...pageProps} />
          </Loading>
        </Layout>
      </DataContext.Provider>
    </>
  );
}

export default MyApp;

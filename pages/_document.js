import { Html, Head, Main, NextScript } from "next/document";
const MyDocument = (props) => {
  const currentLocale = props.__NEXT_DATA__.locale;
  return (
    <Html lang={currentLocale} dir={currentLocale === "ar" ? "rtl" : "ltr"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;

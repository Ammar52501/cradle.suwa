import Head from 'next/head';
import PoetDetails from '@/components/PoetDetails';

export default function Poet({ dataPoet, dataPoetry, translations }) {
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  const description = dataPoet?.description;
  const imagePath = dataPoet?.icon;


  return (
    <>
      <Head>
        <title>{dataPoet?.name}</title>
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
        <meta name="application-name" content={translations.yearOfArabicPoetry} />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="apple-mobile-web-app-title"
          content={translations.yearOfArabicPoetry}
        />
        <link rel="apple-touch-icon" href={`${imagePath}`} />
        <link
          rel="apple-touch-startup-image"
          href={`${imagePath}`}
        />
        <meta name="author" content={translations.yearOfArabicPoetry} />
        <meta name="description" content={description} />
        <link rel="canonical" href={`${appDomain}/`} />
        <meta name="msapplication-TileColor" content="#062a30" />
        <meta
          name="msapplication-TileImage"
          content={`${imagePath}`}
        />
        <meta name="msapplication-square70x70logo" content={imagePath} />
        <meta name="msapplication-square150x150logo" content={imagePath} />
        <meta name="msapplication-wide310x150logo" content={imagePath} />
        <meta name="msapplication-square310x310logo" content={imagePath} />
        <link rel="apple-touch-icon-precomposed" href={imagePath} />
        <meta property="og:type" content="website" />

        <meta property="og:site_name" content={translations.yearOfArabicPoetry} />
        <meta property="og:locale" content="ar" />
        <meta property="og:locale:alternate" content="ar" />
        <meta property="og:url" content={`${appDomain}/`} />
        <meta property="og:title" content={translations.yearOfArabicPoetry} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${imagePath}`} />
        <meta itemProp="name" content={translations.yearOfArabicPoetry} />
        <meta itemProp="author" content={translations.yearOfArabicPoetry} />
        <meta itemProp="image" content={`${imagePath}`} />
        <meta itemProp="description" content={description} />
        <meta name="twitter:image" content={`${imagePath}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={translations.yearOfArabicPoetry} />
        <meta name="twitter:image:src" content={`${imagePath}`} />
        <meta name="twitter:description" content={description} />
      </Head>
      <PoetDetails dataPoet={dataPoet} dataPoetry={dataPoetry} />

    </>
  );
}

export async function getStaticProps({ params, locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];
  const { id } = params;

  const resPoet = await fetch(`${apiDomain}/api/Poets/GetPoetFullData?id=${id}&lang=${langId}`);
  const dataPoet = await resPoet.json();

  const resPoetry = await fetch(`${apiDomain}/api/Poetries/GetAllPoetries?poet=${id}&lang=${langId}&pagenum=1&pagesize=50`);
  const dataPoetry = await resPoetry.json();





  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();
  return {
    props: {
      dataPoet,
      dataPoetry,
      translations,
      seco: 1
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(`${apiDomain}/api/Poets/GetAllPoetsIds`);
  const placeIds = await response.json();

  const paths = placeIds.map((id) => ({
    params: { id: id.toString() },
  }));
  return {
    paths,
    fallback: 'blocking'
  };
}




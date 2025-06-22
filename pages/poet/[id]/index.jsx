import PoetDetails from "@/components/PoetDetails";
import { REVALIDATE } from "@/lib/constant";

export default function Poet({ dataPoet, dataPoetry }) {
  return <PoetDetails dataPoet={dataPoet} dataPoetry={dataPoetry} />;
}

export async function getStaticProps({ params, locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];
  const { id } = params;

  const resPoet = await fetch(
    `${apiDomain}/api/Poets/GetPoetFullData?id=${id}&lang=${langId}`
  );
  const dataPoet = await resPoet.json();

  const resPoetry = await fetch(
    `${apiDomain}/api/Poetries/GetAllPoetries?poet=${id}&lang=${langId}&pagenum=1&pagesize=50`
  );
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
      title: dataPoet?.name || "",
      description: dataPoet?.description || "",
    },
    revalidate: +process.env.REVALIDATE || REVALIDATE,
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
    fallback: "blocking",
  };
}

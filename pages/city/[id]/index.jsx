import PageHeader from "@/components/Cities/PageHeader";
import Verses from "@/components/Cities/Verses";
import { REVALIDATE } from "@/lib/constant";

const Cities = ({ dataCityData, dataCityPoetry, translations }) => {
  // TODO: add it to the head
  const description =
    "شُعراء العصور الأَدبيّة في مَناطِق المملكة العربيّة السُّعوديّة";
  return (
    <>
      <PageHeader
        dataCityPoetry={dataCityPoetry}
        dataCityData={dataCityData}
        translations={translations}
      />
      <Verses
        dataCityPoetry={dataCityPoetry}
        dataCityData={dataCityData}
        translations={translations}
      />
    </>
  );
};

export default Cities;

export async function getStaticPaths() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(`${apiDomain}/api/Makan/GetAllPlacesIds`);

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }

  const ids = await response.json();

  // Generate the paths
  const paths = ids.map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];
  const { id } = params;

  const resCityData = await fetch(
    `${apiDomain}/api/Makan/GetMakanFullData?makan=${id}&lang=${langId}`
  );
  const dataCityData = await resCityData.json();

  const resCityPoetry = await fetch(
    `${apiDomain}/api/Poetries/GetAllPoetries?place=${id}&lang=${langId}&pagenum=1&pagesize=50`
  );
  const dataCityPoetry = await resCityPoetry.json();
  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();
  return {
    props: {
      dataCityData,
      dataCityPoetry,
      translations,
      title: dataCityData?.name || "",
    },

    revalidate: REVALIDATE,
  };
}

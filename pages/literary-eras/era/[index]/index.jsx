import React, { useState } from "react";
import LiteraryBanner from "@/components/LiteraryBanner";
import Poets from "@/components/Poets";
import Head from "next/head";
import { motion } from "framer-motion";
import styles from "../../index.module.scss";

const Era = ({
  dataAllEras,
  eraDetails,
  poetsData,
  dataPoetsByEra,
  dataAllCitiesMap,
  dataAllPlaces,
  dataAllPoetries,
  allStaticWords,
  translations,
}) => {
  const [isLayerActive, setIsLayerActive] = useState(false);


  return (
    <>
      <Head>
        <title>{eraDetails?.name}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="استكشف الشعراء
عبر العصور"
        />
        <meta
          name="description"
          content="شُعراء العصور الأَدبيّة في مَناطِق المملكة العربيّة السُّعوديّة"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={styles.layer_wrap}
      >
        {isLayerActive && <div className={styles.layer} />}

        <LiteraryBanner eraDetails={eraDetails} dataAllEras={dataAllEras} />
        <Poets
          isLayerActive={isLayerActive}
          allStaticWords={allStaticWords}
          dataAllPlaces={dataAllPlaces}
          dataAllPoetries={dataAllPoetries}
          setIsLayerActive={setIsLayerActive}
          dataPoetsByEra={dataPoetsByEra}
          dataAllCitiesMap={dataAllCitiesMap}
          poetsData={poetsData}
        />
      </motion.div>
    </>
  );
};

export default Era;

export async function getStaticProps({ params, locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const { index } = params;
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];

  let eraDetails = null;

  try {
    const res = await fetch(
      `${apiDomain}/api/Zaman/GetEra?id=${index}&lang=${langId}`
    );
    if (res.ok) {
      eraDetails = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch era details:", error);
  }

  const resAllEras = await fetch(
    `${apiDomain}/api/Zaman/GetAllEras?lang=${langId}&pagenum=1&pagesize=50`
  );
  const dataAllEras = await resAllEras.json();

  const resPoetsByEra = await fetch(
    `${apiDomain}/api/Poets/GetAllPoets?era=${index}&lang=${langId}&pagenum=1&pagesize=50`
  );
  const dataPoetsByEra = await resPoetsByEra.json();

  const resAllCitiesMap = await fetch(
    `${apiDomain}/api/Makan/GetAllCities?type=6&lang=${langId}&withPlaces=true&pagenum=1&pagesize=50`
  );
  const dataAllCitiesMap = await resAllCitiesMap.json();

  const resAllPlaces = await fetch(
    `${apiDomain}/api/Makan/GetMakanFullData?lang=${langId}`
  );
  const dataAllPlaces = await resAllPlaces.json();

  const resAllPoetries = await fetch(
    `${apiDomain}/api/Poetries/GetAllPoetries?lang=${langId}&pagenum=1&pagesize=900` /* TODO */
  );
  const dataAllPoetries = await resAllPoetries.json();

  const resStaticWords = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const allStaticWords = await resStaticWords.json();

  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();
  let poetsData = {};

  try {
    if (Array.isArray(dataPoetsByEra)) {
      for (const poet of dataPoetsByEra) {
        const resPoetPlaces = await fetch(
          `${apiDomain}/api/Makan/GetAllPlaces?poet=${poet.id}&lang=${langId}&pagenum=1&pagesize=50`
        );
        if (resPoetPlaces.ok) {
          poetsData[poet.id] = await resPoetPlaces.json();
        }
      }
    } else {
      console.error("dataPoetsByEra is not an array:", dataPoetsByEra);
    }
  } catch (error) {
    console.error("Error fetching poets data:", error);
  }

  return {
    props: {
      dataAllEras,
      eraDetails,
      dataPoetsByEra,
      dataAllCitiesMap,
      dataAllPlaces,
      dataAllPoetries,
      poetsData,
      translations,
      allStaticWords,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const resAllErasIds = await fetch(`${apiDomain}/api/Zaman/GetAllErasIds`);
  const allErasIds = await resAllErasIds.json();

  const paths = allErasIds.map((id) => ({
    params: { index: id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

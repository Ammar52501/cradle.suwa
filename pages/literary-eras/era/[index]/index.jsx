import React, { useState } from "react";
import LiteraryBanner from "@/components/LiteraryBanner";
import Poets from "@/components/Poets";
import { motion } from "framer-motion";
import styles from "../../index.module.scss";
import { REVALIDATE } from "@/lib/constant";

function sanitizeForLog(input) {
  if (typeof input !== "string") input = String(input);
  return input.replace(/[\r\n\u2028\u2029]+/g, " ");
}

const Era = ({
  dataAllEras,
  eraDetails,
  poetsData,
  dataPoetsByEra,
  dataAllCitiesMap,
  dataAllPlaces,
  dataAllPoetries,
  allStaticWords,
  index,
}) => {
  const [isLayerActive, setIsLayerActive] = useState(false);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className={styles.layer_wrap}
    >
      {isLayerActive && <div className={styles.layer} />}

      <LiteraryBanner eraDetails={eraDetails} dataAllEras={dataAllEras} />
      <Poets
        key={index}
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
  );
};

export default Era;

export async function getStaticProps({ params, locale }) {
  const { index } = params;

  if (
    !index ||
    !/^[0-9]+$/.test(index) ||
    !Number.isInteger(Number(index)) ||
    Number(index) <= 0
  ) {
    return {
      notFound: true,
    };
  }

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  if (!apiDomain || !/^https?:\/\//.test(apiDomain)) {
    throw new Error("Invalid or missing API domain");
  }

  const safeLocale =
    typeof locale === "string" && /^[a-zA-Z-]+$/.test(locale) ? locale : "en";
  const langIdEnvKey = `LANG_ID_${safeLocale.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];
  if (!langId) {
    throw new Error("Missing language ID for locale: " + safeLocale);
  }

  let eraDetails = null;

  try {
    const res = await fetch(
      `${apiDomain}/api/Zaman/GetEra?id=${encodeURIComponent(
        index
      )}&lang=${encodeURIComponent(langId)}`
    );
    if (res.ok) {
      eraDetails = await res.json();
    }
  } catch (error) {
    console.error(
      "Failed to fetch era details:",
      sanitizeForLog(error?.message || String(error))
    );
  }

  const resAllEras = await fetch(
    `${apiDomain}/api/Zaman/GetAllEras?lang=${encodeURIComponent(
      langId
    )}&pagenum=1&pagesize=50`
  );
  const dataAllEras = await resAllEras.json();

  const resPoetsByEra = await fetch(
    `${apiDomain}/api/Poets/GetAllPoets?era=${encodeURIComponent(
      index
    )}&lang=${encodeURIComponent(langId)}&pagenum=1&pagesize=50`
  );
  const dataPoetsByEra = await resPoetsByEra.json();

  const resAllCitiesMap = await fetch(
    `${apiDomain}/api/Makan/GetAllCities?type=6&lang=${encodeURIComponent(
      langId
    )}&withPlaces=true&pagenum=1&pagesize=50`
  );
  const dataAllCitiesMap = await resAllCitiesMap.json();

  const resAllPlaces = await fetch(
    `${apiDomain}/api/Makan/GetMakanFullData?lang=${encodeURIComponent(langId)}`
  );
  const dataAllPlaces = await resAllPlaces.json();

  const resAllPoetries = await fetch(
    `${apiDomain}/api/Poetries/GetAllPoetries?lang=${encodeURIComponent(
      langId
    )}&pagenum=1&pagesize=200`
  );
  const dataAllPoetries = await resAllPoetries.json();

  const resStaticWords = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${encodeURIComponent(
      langId
    )}`
  );
  const allStaticWords = await resStaticWords.json();

  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${encodeURIComponent(
      langId
    )}`
  );
  const translations = await resTranslations.json();
  let poetsData = {};

  try {
    if (Array.isArray(dataPoetsByEra)) {
      for (const poet of dataPoetsByEra) {
        const poetId = poet?.id;
        if (
          !poetId ||
          !/^[0-9]+$/.test(String(poetId)) ||
          !Number.isInteger(Number(poetId)) ||
          Number(poetId) <= 0
        ) {
          console.warn(
            `Invalid poet ID: ${sanitizeForLog(poetId)}, skipping...`
          );
          continue;
        }

        const resPoetPlaces = await fetch(
          `${apiDomain}/api/Makan/GetAllPlaces?poet=${encodeURIComponent(
            poetId
          )}&lang=${encodeURIComponent(langId)}&pagenum=1&pagesize=50`
        );
        if (resPoetPlaces.ok) {
          poetsData[poetId] = await resPoetPlaces.json();
        }
      }
    } else {
      console.error("dataPoetsByEra is not an array");
    }
  } catch (error) {
    console.error(
      "Error fetching poets data:",
      sanitizeForLog(error?.message || String(error))
    );
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
      index,
      title: eraDetails?.name || "",
      description: eraDetails?.desc || "",
    },
    revalidate: +process.env.REVALIDATE || REVALIDATE,
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

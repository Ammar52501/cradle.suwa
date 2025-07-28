import React from "react";
import { Container } from "@mui/material";
import Image from "next/image";
import styles from "./index.module.scss";
import { motion } from "framer-motion";
import AboutSection from "@/components/YearOfArabicPoetry/AboutSection/index.jsx";
import MinisterSpeech from "@/components/YearOfArabicPoetry/MinisterSpeech";
import Navbar from "@/components/YearOfArabicPoetry/Navbar";
import { REVALIDATE_TIME } from "@/constants";

const YearOfArabicPoetry = () => {
  return (
    <>
      <Navbar />
      <header
        id="year-of-arabic-poetry"
        className={styles.year_of_arabic_poetry}
      >
        <Container maxWidth={false}>
          <div className={styles.sec_container}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, type: "tween" }}
              className={styles.logo}
            >
              <Image
                loading="lazy"
                aria-hidden="true"
                width={500}
                height={200}
                src="/assets/imgs/dark_logo.webp"
                alt="Year of Arabic poetry"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, type: "tween" }}
              className={styles.docs}
            >
              <Image
                loading="lazy"
                aria-hidden="true"
                width={500}
                height={200}
                src="/assets/imgs/docs_2.webp"
                alt="Year of Arabic poetry"
              />
            </motion.div>
          </div>
        </Container>
      </header>

      <AboutSection />
      <MinisterSpeech />
    </>
  );
};

export default YearOfArabicPoetry;

export async function getStaticProps({ locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];

  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();

  return {
    props: {
      translations,
    },
    revalidate: REVALIDATE_TIME,
  };
}

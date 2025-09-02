import { Container, Typography } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Mountains } from "@/assets/svgsComponents";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { REVALIDATE_TIME } from "@/constants";

const LiteraryEras = ({ erasAllEras, translations }) => {
  const router = useRouter();
  const fullText = translations.explorepoetsthroughtheages;
  const words = fullText.split(" ");
  const firstPart = words.slice(0, 2).join(" ");
  const secondPart = words.slice(2).join(" ");
  return (
    <>
      <section
        id="LiteraryEras"
        className={styles.LiteraryEras}
        dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
      >
        <Container maxWidth={false}>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.sec_container}
          >
            <div className={styles.sec_title}>
              <Typography variant="h1">
                {firstPart}
                <br />
                <span>{secondPart}</span>
              </Typography>
            </div>

            <div className={styles.imags_container}>
              <div className={styles.right_branch}>
                <img
                  src={"/assets/imgs/right_branch.webp"}
                  objectFit="contain"
                  alt=""
                />
              </div>
              <div className={styles.left_branch}>
                <img
                  src={"/assets/imgs/left_branch.webp"}
                  objectFit="contain"
                  alt=""
                />
              </div>
              <div className={styles.horse}>
                <img
                  src={"/assets/imgs/horse.webp"}
                  objectFit="contain"
                  alt=""
                />
              </div>
              <div className={styles.mountains}>
                <Mountains />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <motion.div
        dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={styles.swiper_container}
      >
        <Container maxWidth={false} className={styles.leftSide}>
          <Swiper
            dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
            breakpoints={{
              300: {
                slidesPerView: 1.2,
                spaceBetween: 24,
              },
              400: {
                slidesPerView: 1.2,
                spaceBetween: 24,
              },
              607: {
                slidesPerView: 1.8,
                spaceBetween: 24,
              },
              700: {
                slidesPerView: 2.2,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3.5,
                spaceBetween: 24,
              },
              1300: {
                slidesPerView: 4.5,
                spaceBetween: 24,
              },
            }}
            pagination={true}
            className={"swiper"}
          >
            {erasAllEras?.map((era) => (
              <SwiperSlide key={era.id} className={styles.swiper_slide_box}>
                <Link
                  href={`/literary-eras/era/${era.id}`}
                  className={styles.box}
                >
                  <div className={styles.img_container}>
                    <Image
                      width={277}
                      height={326}
                      src={era.icon}
                      alt={era.name}
                    />
                  </div>

                  <div className={styles.title}>
                    <Typography variant="h4">{era.name}</Typography>
                  </div>

                  <div className={styles.desc}>
                    <Typography>{era.desc}</Typography>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </motion.div>
    </>
  );
};

export default LiteraryEras;

export async function getStaticProps({ locale }) {
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();

  try {
    const resAllEras = await fetch(
      `${apiDomain}/api/Zaman/GetAllEras?lang=${langId}&pagenum=1&pagesize=50`
    );

    if (!resAllEras.ok) {
      throw new Error(`HTTP error! Status: ${resAllEras.status}`);
    }

    const erasAllEras = await resAllEras.json();

    return {
      props: {
        erasAllEras,
        translations,
        title: translations.historicalLiteraryEras,
      },
      revalidate: REVALIDATE_TIME,
    };
  } catch (error) {
    console.error("Failed to fetch API:", error);

    return {
      props: {
        erasAllEras: [],
        translations: [],
        error: "API fetch failed",
      },
      revalidate: 1,
    };
  }
}

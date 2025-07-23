import { PageSection } from "@/components/PublicTreasuryComponents";
import { Container, Typography } from "@mui/material";
import styles from "./index.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { REVALIDATE } from "@/lib/constant";

const PublicTreasury = ({ AllMainTopics, translations }) => {
  return (
    <>
      <Container maxWidth={false}>
        <header id={styles.header}>
          <div className={styles.sec_title}>
            <div className={styles.img_container}>
              <Image
                width={100}
                height={100}
                src="/assets/imgs/star.webp"
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            </div>

            <h1 className="rtl:font-req3a">{translations?.poetryarchive}</h1>

            <div className={styles.img_container}>
              <Image
                width={100}
                height={100}
                src="/assets/imgs/star.webp"
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            </div>
          </div>
        </header>

        <div id="PublicTreasury">
          <PageSection AllMainTopics={AllMainTopics} />
        </div>
      </Container>

      <section id="footer" className={styles.footer}>
        <div className={styles.imgs_container}>
          <div className={styles.leftPlants_container}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, type: "tween" }}
              className={styles.leftPlants}
            >
              <Image
                width={592}
                height={408}
                src="/assets/imgs/redPlants.webp"
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, type: "tween" }}
            className={styles.deer}
          >
            <Image
              width={592}
              height={408}
              src="/assets/imgs/BrownDeer.webp"
              alt=""
              loading="lazy"
              aria-hidden="true"
            />
          </motion.div>

          <div className={styles.rightPlants_container}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, type: "tween" }}
              className={styles.rightPlants}
            >
              <Image
                width={592}
                height={408}
                src="/assets/imgs/redPlants.webp"
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicTreasury;

export async function getStaticProps({ locale }) {
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const resAllMainTopics = await fetch(
    `${apiDomain}/api/Media/GetAllMainTopics?lang=${langId}&withPlaces=true&pagenum=1&pagesize=50`
  );
  const AllMainTopics = await resAllMainTopics.json();

  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();

  return {
    props: {
      AllMainTopics,
      translations,
      title: translations?.poetryarchive,
    },
    revalidate: +process.env.REVALIDATE || REVALIDATE,
  };
}

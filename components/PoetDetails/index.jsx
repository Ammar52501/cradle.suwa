import React, { useContext } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Feather from "@/assets/svgsComponents/Feather";
import { motion } from "framer-motion";
import SliderVerses from "@/components/PoetsDetailsComponents/SliderVerses";
import { useRouter } from "next/router";
import { FaUserLarge } from "react-icons/fa6";
import DataContext from "@/context/DataContext";

const PoetDetails = ({ dataPoet, dataPoetry }) => {
  const translations = useContext(DataContext);
  const [activeIndex, setActiveIndex] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const list = document.querySelectorAll("#list");

    async function activelink() {
      list.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }

    list.forEach((item) => item.addEventListener("click", activelink));
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Container
          dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
          maxWidth={false}
          className={styles.poetDetails}
        >
          <Box className={styles.headerImage}></Box>
          <Grid container className={styles.profileSection}>
            <Grid item>
              <div className={styles.img_container}>
                <img src={dataPoet.icon} alt="" />
              </div>
            </Grid>
            <Grid spacing={0} item>
              <Typography variant="h5" className={styles.profileName}>
                {dataPoet.name}
              </Typography>

              <div className={styles.tags_container}>
                <div className={styles.tag}>
                  <Typography>{dataPoet.nickname}</Typography>
                </div>
              </div>
              <div className={styles.desc}>
                <Typography className="whitespace-pre-line">
                  {dataPoet?.description}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <div className={styles.navigation}>
            <ul>
              <li
                className={`${styles.list} ${
                  1 === activeIndex ? styles.active : ""
                }`}
                onClick={() => setActiveIndex(1)}
              >
                <button>
                  <span className={styles.iconWrapper}>
                    <FaUserLarge />
                  </span>
                  <p>{translations.aboutPoet}</p>
                </button>
              </li>

              <li
                className={`${styles.list} ${
                  0 === activeIndex ? styles.active : ""
                }`}
                onClick={() => setActiveIndex(0)}
              >
                <button>
                  <span className={styles.iconWrapper}>
                    <Feather />
                  </span>
                  <p>{translations.versesInKSA}</p>
                </button>
              </li>
              <div
                className={`${styles.indicator} ${
                  styles[`indicator-${activeIndex}`]
                }`}
              >
                <span></span>
              </div>
            </ul>
          </div>
          <div className={styles.tabsSection}>
            {activeIndex === 1 && (
              <div className={styles.tabContent_container}>
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <section className={styles.timelineSection}>
                    <div className={styles.sec_title}>
                      <Typography variant="h3">
                        {translations.personalInformation}
                      </Typography>
                    </div>

                    <div className={styles.info_sec}>
                      <div className={styles.boxes_container}>
                        <div className={styles.box}>
                          <div className={styles.title}>
                            <Typography>{translations.name}</Typography>
                          </div>
                          <div className={styles.name}>
                            <Typography>
                              {dataPoet.fullName || "----------"}
                            </Typography>
                          </div>
                        </div>
                        <div className={styles.box}>
                          <div className={styles.title}>
                            <Typography>{translations.title}</Typography>
                          </div>
                          <div className={styles.name}>
                            <Typography>
                              {dataPoet.nickname || "----------"}
                            </Typography>
                          </div>
                        </div>
                        <div className={styles.box}>
                          <div className={styles.title}>
                            <Typography>
                              {translations[" reasonForTheTitle"]}
                            </Typography>
                          </div>
                          <div className={styles.name}>
                            <Typography>
                              {dataPoet.nicknameReason || "----------"}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className={styles.timelineSection}>
                    <div className={styles.sec_title}>
                      <Typography variant="h3">
                        {translations.reasonForTheTitle}:
                      </Typography>
                    </div>

                    <div className={styles.sec_container}>
                      <div className={styles.desc}>
                        <Typography>{dataPoet.specialist}</Typography>
                      </div>
                    </div>
                  </section>

                  <section className={styles.timelineSection}>
                    <div className={styles.sec_title}>
                      <Typography variant="h3">
                        {translations.thePoetIsFamousFor}:
                      </Typography>
                    </div>

                    <div className={styles.sec_container}>
                      <div className={styles.desc}>
                        <Typography>{dataPoet.storySayEvent}</Typography>
                      </div>
                    </div>
                  </section>
                </motion.div>
              </div>
            )}
            {activeIndex === 0 && (
              <div className={styles.tabContent_container}>
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <section className={styles.timelineSection}>
                    <div className={styles.slider_container}>
                      <div className="slider">
                        <SliderVerses
                          dataPoetry={dataPoetry}
                          isAR={router.locale === "ar"}
                        />
                      </div>
                    </div>
                  </section>
                </motion.div>
              </div>
            )}
          </div>
        </Container>
      </motion.div>
    </>
  );
};

export default PoetDetails;

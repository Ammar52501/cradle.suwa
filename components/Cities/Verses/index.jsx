import { Container, Typography } from "@mui/material";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import SwiperComponent from "./Swiper";

const Verses = ({ dataCityPoetry, dataCityData, translations }) => {
  const router = useRouter();

  return (
    <>
      <section
        id="Verses"
        className={styles.Verses}
        dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
      >
        <div className={styles.sec_container}>
          <Container maxWidth={false}>
            <div className={styles.info_sec}>
              <div className={styles.sec_title}>
                <Typography variant="h3">
                  {translations?.about} {dataCityData?.name}
                </Typography>
              </div>
              <div className={styles.boxes_container}>
                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography>{translations?.currentName}</Typography>
                  </div>
                  <div className={styles.name}>
                    <Typography>
                      {dataCityData.name === null
                        ? "------"
                        : dataCityData.name}
                    </Typography>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography>{translations.othersNames}</Typography>
                  </div>
                  <div className={styles.name}>
                    <Typography>
                      {dataCityData.otherNames === null ||
                      dataCityData.otherNames === ""
                        ? "------"
                        : dataCityData.otherNames}
                    </Typography>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography>{translations.administrativeRegion}</Typography>
                  </div>
                  <div className={styles.name}>
                    <Typography>
                      {dataCityData.parentName6 === null ||
                      dataCityData.parentName6 === ""
                        ? "------"
                        : dataCityData.parentName6}
                    </Typography>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography>{translations.placeValue}</Typography>
                  </div>
                  <div className={styles.name}>
                    <Typography>
                      {dataCityData.qema === null
                        ? "------"
                        : dataCityData.qema}
                    </Typography>
                  </div>
                </div>

                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography>
                      {translations.descriptionPlaceInPast}
                    </Typography>
                  </div>
                  <div className={styles.name}>
                    <Typography>
                      {dataCityData.wasfOld === null
                        ? "------"
                        : dataCityData.wasfOld}
                    </Typography>
                  </div>
                </div>

                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography>
                      {translations.recentDescriptionOfPlace}
                    </Typography>
                  </div>
                  <div className={styles.name}>
                    <Typography>
                      {dataCityData.wasfNew === null
                        ? "------"
                        : dataCityData.wasfNew}
                    </Typography>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.title}>
                    <Typography>{translations.location}</Typography>
                  </div>
                  <div className={styles.name}>
                    <Typography>
                      {dataCityData.site === null
                        ? "------"
                        : dataCityData.site}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container maxWidth={false} className="disable_container_mobile">
            <Container maxWidth={false}>
              <div className={styles.sec_title}>
                <Typography variant="h3">
                  {translations.versesSaidIn} {dataCityData.name}
                </Typography>
              </div>
            </Container>
            <Container maxWidth={false} className={styles.slider_container}>
              <div className={styles.slider_sec}>
                <SwiperComponent
                  dataCityPoetry={dataCityPoetry}
                  translations={translations}
                />
              </div>
            </Container>
          </Container>
        </div>
      </section>
    </>
  );
};

export default Verses;

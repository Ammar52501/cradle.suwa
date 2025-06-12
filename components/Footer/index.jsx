import React, { useContext } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import DataContext from "@/context/DataContext";

const Footer = () => {
  const translations = useContext(DataContext);
  const router = useRouter();
  const currentLocale = router.locale || "ar";

  const year = new Date().getFullYear();

  const formatYear = (year, locale) => {
    if (locale === "ar") {
      return year.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
    }
    return year;
  };

  return (
    <footer
      className={
        router.pathname === "/" ||
        router.pathname.includes("/treasury") ||
        router.pathname.includes("/year-of-arabic-poetry")
          ? styles.Landingfooter
          : styles.footer
      }
      dir="ltr"
    >
      <Container maxWidth={false}>
        <Grid container justifyContent="center" alignItems="center"></Grid>
        <Box paddingBottom={"25px"} className={styles.footerBottom}>
          <Box className={styles.box_container}>
            <div className={styles.images_box}>
              <div className={styles.image_container}>
                <Image
                  priority
                  width={220}
                  height={70}
                  src={"/assets/imgs/Literature.webp"}
                  alt=""
                />
              </div>
              <div className={styles.image_container}>
                <Image
                  priority
                  width={220}
                  height={70}
                  src={"/assets/imgs/Ministry_of_Culture.webp"}
                  alt=""
                />
              </div>
            </div>
          </Box>
          {/* <Box className={styles.logo_mobile_footer_container}>
            <div className={styles.logo_mobile_footer}>
              <Image
                priority
                width={263}
                height={245}
                src={"/logo_footer.png"}
                alt=""
              />
            </div>
          </Box> */}
        </Box>

        <Typography>
          {translations.allrightsreserved} © {formatYear(year, currentLocale)}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import styles from "./index.module.scss";
import { Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const PageHeader = ({ dataAllCitiesMap, translations }) => {
  const fullText = translations?.exploreplacesbyregion;
  const router = useRouter();
  // Split the text into words
  const words = fullText.split(" ");

  // Group the words into two parts
  const firstPart = words.slice(0, 2).join(" ");
  const secondPart = words.slice(1).join(" ");

  return (
    <div
      id="page-header"
      className={styles.page_header}
      dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
    >
      <div className={styles.img_container}>
        {dataAllCitiesMap && (
          <Image
            quality={100}
            width={900}
            height={200}
            src={dataAllCitiesMap.images}
            alt=" مناطق المملة العربية السعودية"
          />
        )}

        {dataAllCitiesMap === undefined && (
          <Image
            quality={100}
            priority
            width={500}
            height={500}
            src={"/assets/imgs/KSA.webp"}
            alt=" مناطق المملة العربية السعودية"
          />
        )}
      </div>
      <Container maxWidth={false}>
        <div className={styles.sec_title}>
          <Typography variant="h3">
            {firstPart}
            <br />
            {secondPart}
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;

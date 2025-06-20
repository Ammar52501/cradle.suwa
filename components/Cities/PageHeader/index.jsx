import { Container, Typography } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

const PageHeader = ({ dataCityData }) => {
  const router = useRouter();

  return (
    <header
      id={styles.cities}
      dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
    >
      <Container maxWidth={false}>
        <div className={styles.sec_container}>
          <div className={styles.img_container}>
            <Image
              priority
              className={styles.img_box}
              src={dataCityData.icon}
              alt={dataCityData.name}
              width={599}
              height={421}
            />
          </div>

          <div className={styles.text_container}>
            <div className={styles.title}>
              <Typography variant="h3">{dataCityData.name}</Typography>

              <Typography>{dataCityData.placeType}</Typography>
            </div>

            <div className={styles.desc}>
              <Typography className="whitespace-pre-line">
                {dataCityData.description}
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default PageHeader;

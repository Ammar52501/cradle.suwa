import { Container, Typography } from "@mui/material";
import React, { memo } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

const PageHeader = ({ dataCityData, activePoet }) => {
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
            <div>
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

            {activePoet && <PoetInfo activePoet={activePoet} />}
          </div>
        </div>
      </Container>
    </header>
  );
};

const PoetInfo = memo(({ activePoet }) => {
  const [beforeDots, afterDots] = activePoet?.poetryParts?.split("...");

  return (
    <div className={styles.poet_info}>
      <div className={styles.head}>
        <img src={activePoet.poetIcon} alt={activePoet.poetName} />
        <p>{activePoet.poetName}</p>
      </div>
      <div className={styles.desc}>
        <p className="whitespace-pre-line">{activePoet.entrance}</p>
      </div>
      <div className={styles.poetry_parts}>
        <p>{beforeDots + beforeDots}</p>
        <p>{afterDots + afterDots}</p>
      </div>
    </div>
  );
});

export default PageHeader;

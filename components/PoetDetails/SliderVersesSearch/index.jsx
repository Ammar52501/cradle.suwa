import React, { useEffect, useRef } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import styles from "./index.module.scss";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

const ITEMS_PER_PAGE = 10;
const SliderVersesSearch = ({
  filtredPoets,
  onPoetsDataChange,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(filtredPoets?.length / ITEMS_PER_PAGE);
  const router = useRouter();

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(newPage);
  };

  const poetsToShow = filtredPoets?.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const previousPoetsToShow = useRef();

  useEffect(() => {
    if (
      JSON.stringify(poetsToShow) !==
      JSON.stringify(previousPoetsToShow.current)
    ) {
      onPoetsDataChange(poetsToShow);
      previousPoetsToShow.current = poetsToShow;
    }
  }, [poetsToShow]);

  return (
    <>
      <div
        className={styles.sliderContainer}
        dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
      >
        {poetsToShow?.map((poet) => (
          <motion.div
            key={poet.id}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.box}
          >
            <Link href={`/poet/${poet.id}`}>
              <div className={styles.poet_info}>
                <div className={styles.img_container}>
                  <img src={poet.icon} alt={poet.name} />
                </div>

                <div className={styles.text_container}>
                  <div className={styles.name}>
                    <Typography>{poet.name}</Typography>
                  </div>
                  <div className={styles.tag}>
                    <Typography>{poet.zamanName}</Typography>
                  </div>
                </div>
              </div>
              <hr />

              <div className={styles.desc}>
                <Typography>{poet.descShort}</Typography>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtredPoets?.length > 1 && (
        <div className={styles.paginationBox}>
          <div className={styles.paginationContainer}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={styles.arrow_btn}
            >
              <HiArrowRight />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={index === currentPage ? styles.active : ""}
                onClick={() => handlePageChange(index)}
              >
                <span className="h-fit w-fit pt-[4px]">{index + 1}</span>
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={styles.arrow_btn}
            >
              <HiArrowLeft />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderVersesSearch;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import styles from "./index.module.scss";
import Poetry from "./Poetry";
import { useLayoutEffect, useState } from "react";

const breakpoints = {
  sm: {
    screenWidth: 300,
    slides: 1,
    rows: 5,
  },
  md: {
    screenWidth: 700,
    slides: 2,
    rows: 4,
  },
  lg: {
    screenWidth: 1200,
    slides: 3,
    rows: 4,
  },
};

const swiperBreakpoints = {
  300: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    grid: {
      rows: 5,
      fill: "row",
    },
  },
  700: {
    slidesPerView: breakpoints.md.slides,
    slidesPerGroup: breakpoints.md.slides,
    grid: {
      rows: breakpoints.md.rows,
      fill: "row",
    },
  },
  1200: {
    slidesPerView: breakpoints.lg.slides,
    slidesPerGroup: breakpoints.lg.slides,
    grid: {
      rows: breakpoints.lg.rows,
      fill: "row",
    },
  },
};

const pagination = {
  clickable: true,
  renderBullet: (index, className) =>
    `<span class="${className}">${index + 1}</span>`,
};

const grid = {
  rows: 5,
  fill: "row",
};

const modules = [Navigation, Pagination, Grid];

export default function SliderVerses({ dataPoetry, isAR }) {
  const [postPerPage, setPostPerPage] = useState(
    breakpoints.lg.slides * breakpoints.lg.rows
  );
  const [filledData, setFilledData] = useState(dataPoetry);

  const handleSlideChange = () => {
    const tabContentContainer = document.querySelector('[class*="tabContent_container"]');
    if (tabContentContainer) {
      tabContentContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < breakpoints.md.screenWidth) {
        setPostPerPage(breakpoints.sm.slides * breakpoints.sm.rows);
      } else if (window.innerWidth < breakpoints.lg.screenWidth) {
        setPostPerPage(breakpoints.md.slides * breakpoints.md.rows);
      } else {
        setPostPerPage(breakpoints.lg.slides * breakpoints.lg.rows);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useLayoutEffect(() => {
    if (
      dataPoetry.length < postPerPage ||
      window.innerWidth < breakpoints.md.screenWidth
    ) {
      setFilledData(dataPoetry);

      return;
    }
    const remainder = dataPoetry.length % postPerPage;
    const fillers = remainder === 0 ? 0 : postPerPage - remainder;
    const filledData = [...dataPoetry, ...Array(fillers).fill(null)];
    setFilledData(filledData);
  }, [dataPoetry, postPerPage]);
  return (
    <>
      <Swiper
        modules={modules}
        spaceBetween={20}
        grid={grid}
        pagination={pagination}
        breakpoints={swiperBreakpoints}
        className={styles.swiper_container}
        id="swiperContainer"
        dir={`${isAR ? "rtl" : "ltr"}`}
        onSlideChange={handleSlideChange}
      >
        {filledData.map((poetry, index) => (
          <SwiperSlide key={index}>
            {poetry ? (
              <Poetry poetry={poetry} isAR={isAR} />
            ) : (
              <div style={{ visibility: "hidden" }}></div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

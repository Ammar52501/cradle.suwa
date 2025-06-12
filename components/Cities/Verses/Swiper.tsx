import CityPoetry from "./CityPoetry";
import { Swiper } from "swiper/react";
import styles from "./index.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import { memo } from "react";
import { SwiperSlide } from "swiper/react";

const SwiperComponent = memo(({ dataCityPoetry }: { dataCityPoetry: any }) => {
  const router = useRouter();
  const isAR = router.locale === "ar";
  return (
    <Swiper
      breakpoints={{
        300: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        400: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      }}
      spaceBetween={24}
      slidesPerView={3}
      pagination={{ clickable: true }}
      className={styles.swiper}
      dir={`${isAR ? "rtl" : "ltr"}`}
    >
      {Array.isArray(dataCityPoetry) &&
        dataCityPoetry?.map((poet) => (
          <SwiperSlide key={poet.id}>
            <CityPoetry poet={poet} isAR={isAR} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
});

export default SwiperComponent;

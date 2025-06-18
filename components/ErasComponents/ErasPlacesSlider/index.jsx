import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import styles from "./index.module.scss";
import { Typography } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import { Mousewheel } from "swiper/modules";

import { Pagination } from "swiper/modules";
import { useRouter } from "next/router";

const ErasPlacesSlider = ({
  places,
  activeCity,
  onPlaceClick,
  setActiveCity,
  activePoet,
}) => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const swiperVerticalRef = useRef(null);
  const filteredPlaces = places
    ?.filter((place) => place.svgX !== null && place.svgY !== null)
    ?.sort((a, b) => a.name.localeCompare(b.name, router.locale)) || [];

  const [imageLoadingStates, setImageLoadingStates] = useState(
    filteredPlaces?.reduce((acc, city) => {
      acc[city.id] = city.icon ? true : false;
      return acc;
    }, {})
  );

  useEffect(() => {
    // Reset the slide index to 0 when the places data changes
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(0);
    }
    if (activeCity != null && swiperRef.current) {
      const index = filteredPlaces?.findIndex((city) => city.id === activeCity);

      if (index !== -1) {
        swiperRef.current.swiper.slideTo(index);
      }
    }

    if (activeCity != null && swiperVerticalRef.current) {
      const index = filteredPlaces?.findIndex((city) => city.id === activeCity);
      if (index !== -1) {
        swiperVerticalRef.current.swiper.slideTo(index);
      }
    }
  }, [activeCity, places]);

  const handleSlideChange = () => {
    if (activeCity === null) return;
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      const newIndex = swiper.realIndex;

      const newActiveCity = filteredPlaces[newIndex]?.id;
      setActiveCity(newActiveCity);
    }
  };

  const adjustImageUrl = (imageUrl) => {
    if (imageUrl?.startsWith("https")) {
      return imageUrl;
    } else {
      return `https://zamakan.suwa.io${imageUrl}`;
    }
  };

  const handleImageLoad = (cityId) => {
    setImageLoadingStates((prev) => ({ ...prev, [cityId]: false }));
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  };

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (activeCity === null) {
      setActiveCity(filteredPlaces[0]?.id);
    }
  }, [activeCity, activePoet]);
  return (
    <>
      {isMobileView === true && (
        <div className={styles.swiper_container}>
          <Swiper
            ref={swiperRef}
            centeredSlides={true}
            onSlideChange={handleSlideChange}
            direction="horizontal"
            slidesPerView={2.5}
            spaceBetween={16}
            className="places-swiper"
          >
            {filteredPlaces?.map((city) => (
              <SwiperSlide className={styles.places_container} key={city.id}>
                <div
                  className={`${styles.places} ${
                    city.id === activeCity ? styles.active : ""
                  }`}
                >
                  <div
                    className={styles.img_container}
                    onClick={() => onPlaceClick(city.id)}
                  >
                    {imageLoadingStates[city?.id] && (
                      <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                      />
                    )}

                    <img
                      style={{
                        display: imageLoadingStates[city.id] ? "none" : "block",
                      }}
                      src={adjustImageUrl(city?.icon)}
                      alt={city?.name}
                      onLoad={() => handleImageLoad(city.id)}
                    />
                  </div>
                  <div className={styles.name}>
                    <Typography>{city.name}</Typography>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {isMobileView === false && (
        <div className={styles.swiper_container}>
          <Swiper
            mousewheel={true}
            ref={swiperRef}
            data-lenis-prevent
            initialSlide={0}
            onSlideChange={handleSlideChange}
            direction={"vertical"}
            breakpoints={{
              300: {
                slidesPerView: 1.8,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 2.1,
                spaceBetween: 10,
              },
              414: {
                slidesPerView: 2.5,
                spaceBetween: 11,
              },
              450: {
                slidesPerView: 2.5,
                spaceBetween: 11,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              1204: {
                slidesPerView: 2.5,
                spaceBetween: 16,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Mousewheel]}
            centeredSlides={true}
            className={styles.vertical_swiper}
          >
            {filteredPlaces?.map((city) => (
              <SwiperSlide
                data-lenis-prevent
                className={styles.places_container}
                key={city.id}
              >
                <div
                  className={`${styles.places} ${
                    city.id === activeCity ? styles.active : ""
                  }`}
                >
                  <div
                    className={styles.img_container}
                    onClick={() => onPlaceClick(city.id)}
                  >
                    {imageLoadingStates[city.id] && (
                      <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                      />
                    )}

                    <img
                      style={{
                        display: imageLoadingStates[city.id] ? "none" : "block",
                      }}
                      src={adjustImageUrl(city?.icon)}
                      alt={city?.name}
                      onLoad={() => handleImageLoad(city.id)}
                    />
                  </div>
                  <div className={styles.name}>
                    <Typography>{city.name}</Typography>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ErasPlacesSlider;

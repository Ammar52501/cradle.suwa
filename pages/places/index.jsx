import { Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Link from "next/link";
import { PageHeader } from "@/components/PlacesComponents";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, LeftArrow } from "@/assets/svgsComponents";
import PoetsSlider from "@/components/PoetsSlider";
import { ErasPlacesSlider } from "@/components/ErasComponents";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";
import { useRouter } from "next/router";
import DrawerPoets from "@/components/Poets/drawer";
import LocationPin from "@/components/LocationPin";
import { REVALIDATE_TIME } from "@/constants";

const Places = ({
  dataAllCitiesMap,
  dataAllPlaces,
  translations,
  dataAllPoetries,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeLand, setActiveLand] = useState(null);
  const [places, setPlaces] = useState(null);
  const [isPointsActive, seIsPointsActive] = useState(false);
  const [cityData, setCityData] = useState(null);
  const [poetriesData, setPoetriesData] = useState(null);
  const [isSafari, setIsSafari] = useState(false);
  const [activeCity, setActiveCity] = useState(null);
  const [isDesckTop, setIsDesckTop] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const elements = document.querySelectorAll(".land");
    elements.forEach((element, index) => {
      element.setAttribute("id", `land-${index}`);
    });
  }, []);

  const transformComponentRef = useRef(null);

  const resetTransformRef = useRef(null);

  const handleZoomToLand = useCallback(
    (landIndex) => {
      const elementId = `land-${landIndex}`;
      if (transformComponentRef.current) {
        const { zoomToElement } = transformComponentRef.current;
        zoomToElement(elementId);
      }
      setActiveIndex(landIndex);
      if (landIndex !== null) {
        const placesData =
          dataAllCitiesMap[landIndex]?.places
            ?.filter((place) => place.svgX !== null && place.svgY !== null)
            ?.sort((a, b) => a.name.localeCompare(b.name, router.locale)) || [];
        setPlaces(dataAllCitiesMap[landIndex]?.places);
        setActiveCity(placesData[0].id);
        seIsPointsActive(true);
      } else {
        seIsPointsActive(false);
        setActiveCity(null);
        setPlaces(null);
      }

      const dataIndex = document.querySelectorAll(`#land-${landIndex}`)[0];
      // const elementsWithLandClassOnly = document.querySelectorAll(
      //   ".land:not(.activeLand)"
      // );

      if (activeLand) {
        activeLand.classList.remove("activeLand");
        seIsPointsActive(false);
      }

      if (dataIndex) {
        setActiveLand(dataIndex);
        dataIndex.classList.add("activeLand");
        seIsPointsActive(true);
      }

      // if (isPointsActive) {
      //   elementsWithLandClassOnly.forEach((element) => {
      //     element.classList.add("hiddenPoints");
      //   });
      // } else {
      //   elementsWithLandClassOnly.forEach((element) => {
      //     element.classList.remove("hiddenPoints");
      //   });
      // }
    },
    [router.locale, dataAllCitiesMap, activeLand]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesckTop(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // Detect Safari browser
    setIsSafari(navigator.vendor.includes("Apple"));
  }, []);

  const convertSVGPathsToJSX = (svgString) => {
    const paths = svgString.split("</path>");
    return paths.map((path, index) => (
      <g key={index} dangerouslySetInnerHTML={{ __html: path + "</path>" }} />
    ));
  };

  const handlePlaceWindow = async (placeId) => {
    setActiveCity(placeId);

    // Check if dataAllPlaces is an array before using the find method
    const filtredPlaces = Array.isArray(dataAllPlaces)
      ? dataAllPlaces.find((place) => place.id === placeId)
      : null;

    // Proceed only if filtredPlaces is not null
    if (filtredPlaces) {
      const filteredPoetries = dataAllPoetries.filter(
        (poetry) => poetry.placeId === placeId
      );

      setCityData(filtredPlaces);
      setPoetriesData(filteredPoetries);
    } else {
      // Handle the case where filtredPlaces is null
      // e.g., set some default data, show a message, etc.
    }
  };
  const onClose = useCallback(
    (isOpen = false) => {
      if (isOpen) return;
      setCityData(null);
    },
    [setCityData]
  );
  const popUpRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setCityData(null);
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popUpRef]);

  const handlePlaceActive = async (placeId) => {
    setActiveCity(placeId);
  };

  const svgRef = useRef(null);
  const [landCenters, setLandCenters] = useState([]);

  useEffect(() => {
    if (svgRef.current) {
      const lands = svgRef.current.querySelectorAll(".land");
      const centers = Array.from(lands).map((land) => {
        const bbox = land.getBBox();
        return {
          x: bbox.x + bbox.width / 2,
          y: bbox.y + bbox.height / 2,
          name: land.getAttribute("data-name"),
        };
      });
      setLandCenters(centers);
    }
  }, []);
  return (
    <>
      <PageHeader
        dataAllCitiesMap={dataAllCitiesMap[activeIndex]}
        translations={translations}
      />
      <section
        id="Places"
        className={styles.Places}
        dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
      >
        {cityData && <div className={styles.layer} />}
        <Container maxWidth={false}>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.sec_container}
            dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
          >
            <div className={styles.slider_container}>
              <Swiper
                breakpoints={{
                  300: {
                    slidesPerView: 3.4,
                    spaceBetween: 10,
                  },
                  400: {
                    slidesPerView: 3.4,
                    spaceBetween: 10,
                  },
                  414: {
                    slidesPerView: 3.4,
                    spaceBetween: 11,
                  },
                  450: {
                    slidesPerView: 3.4,
                    spaceBetween: 11,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 8.5,
                    spaceBetween: 24,
                  },
                }}
                dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
                pagination={true}
                className="mySwiper lg:[&>div]:justify-center"
              >
                {dataAllCitiesMap?.map((city, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`${styles.slider} ${
                        index === activeIndex ? styles.active : ""
                      }`}
                      key={index}
                      onClick={() => handleZoomToLand(index)}
                    >
                      <div className={styles.img_container}>
                        <Image
                          width={200}
                          height={200}
                          src={city.icon}
                          alt={city.name}
                          onLoad={() => setIsImageLoading(false)}
                        />
                        {isImageLoading === true ? (
                          <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="96"
                            visible={true}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={styles.name}>
                        <Typography>{city.name}</Typography>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className={styles.map_container}>
              <div className={styles.map} dir="ltr">
                <TransformWrapper
                  ref={transformComponentRef}
                  wheel={{ wheelDisabled: true }}
                  zoomIn={{ step: 100 }}
                  zoomOut={{ step: 100 }}
                  minScale={0.5}
                  maxScale={1.5}
                  initialScale={1}
                  doubleClick={{ disabled: false, mode: "reset" }}
                  wrapperStyle={{ width: "100%" }}
                  panning={{ disabled: true }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => {
                    resetTransformRef.current = resetTransform;
                    return (
                      <>
                        <TransformComponent>
                          <xml version="1.0" encoding="UTF-8" standalone="no" />
                          <svg
                            // id="svg1"
                            width="858"
                            height="724"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${
                              isSafari ? "saudi-map safari" : "saudi-map"
                            }`}
                            viewBox="90 90 758 624"
                            ref={svgRef}
                          >
                            {dataAllCitiesMap?.map((land, index) => (
                              <g
                                className="land"
                                data-name={land.name}
                                key={index}
                                id={land.svgPathId}
                                onClick={() => handleZoomToLand(index)}
                              >
                                {convertSVGPathsToJSX(land.svgPath)}
                              </g>
                            ))}

                            {activeIndex === null ||
                              (typeof activeIndex === "number" &&
                                landCenters.map((land, index) => (
                                  <foreignObject
                                    key={index}
                                    x={land.x}
                                    y={land.y}
                                  >
                                    {activeIndex !== index && (
                                      <div
                                        className="city-container"
                                        xmlns="http://www.w3.org/1999/xhtml"
                                        onClick={() => handleZoomToLand(index)}
                                      >
                                        <div className={`city-name`} id="p1">
                                          <div id="name">
                                            <p>{land.name}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </foreignObject>
                                )))}

                            {activeIndex === null &&
                              landCenters.map((land, index) => (
                                <foreignObject
                                  key={index}
                                  x={land.x}
                                  y={land.y}
                                >
                                  {activeIndex !== index && (
                                    <div
                                      className="city-container"
                                      xmlns="http://www.w3.org/1999/xhtml"
                                      onClick={() => handleZoomToLand(index)}
                                    >
                                      <div
                                        className={`city-name place-name`}
                                        id="p1"
                                      >
                                        <div id="name">
                                          <p>{land.name}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </foreignObject>
                              ))}

                            {activeIndex !== null &&
                              places
                                ?.sort((a, b) => {
                                  // Move active place to the end of the array
                                  if (a.id === activeCity) return 1;
                                  if (b.id === activeCity) return -1;
                                  return 0;
                                })
                                .map((place, index) => (
                                  <foreignObject
                                    x={place.svgX}
                                    y={place.svgY}
                                    key={place.id}
                                    className={`${
                                      activeCity === place.id
                                        ? "pointer-events-none"
                                        : ""
                                    }`}
                                  >
                                    <div className="city-container">
                                      <div className={`city-name`}>
                                        {activeCity === place.id && (
                                          <div
                                            className={`${styles.icon_container} pin`}
                                          >
                                            <LocationPin />
                                          </div>
                                        )}

                                        <div
                                          onClick={() =>
                                            handlePlaceActive(place.id)
                                          }
                                          className={`${styles.city_point} ${
                                            activeCity === place.id
                                              ? `${styles.active} `
                                              : ""
                                          } point`}
                                        ></div>
                                      </div>
                                    </div>
                                  </foreignObject>
                                ))}
                          </svg>
                        </TransformComponent>
                      </>
                    );
                  }}
                </TransformWrapper>
                <AnimatePresence>
                  {cityData && isDesckTop && (
                    <motion.div
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                      className={styles.custom_box}
                      dir={router.locale === "ar" ? "rtl" : "ltr"}
                      ref={popUpRef}
                    >
                      <div className={styles.box_container}>
                        <Link
                          href={`/city/${cityData?.id}`}
                          aria-label={`${translations?.moreAbout} ${cityData?.name}`}
                          className={styles.box_header}
                        >
                          <div className={styles.img_container}>
                            <img src={cityData.icon} alt={cityData.name} />
                          </div>
                          <div className={styles.title}>
                            <h3>{cityData?.name}</h3>

                            <div className={styles.desc}>
                              <p>
                                {cityData?.descriptionShort}
                                <div className={styles.more}>
                                  <span>
                                    {translations?.moreAbout} {cityData?.name}
                                  </span>
                                  <LeftArrow />
                                </div>
                              </p>
                            </div>
                          </div>
                        </Link>

                        {router.locale === "ar" && (
                          <PoetsSlider
                            cityId={cityData?.id}
                            poetriesData={poetriesData}
                            key={activeCity}
                          />
                        )}

                        <div
                          className={styles.close_btn}
                          onClick={() => setCityData(null)}
                        >
                          <CloseIcon />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {places !== null && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className={styles.slider_wrap}
                  >
                    <ErasPlacesSlider
                      places={places}
                      setActiveCity={setActiveCity}
                      activeCity={activeCity}
                      onPlaceClick={handlePlaceWindow}
                      activePoet={activeIndex}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </Container>
        <DrawerPoets
          isOpen={cityData && !isDesckTop}
          onOpenChange={onClose}
          cityData={cityData}
          moreAbout={translations?.moreAbout}
          isAR={router.locale === "ar"}
          poetriesData={poetriesData}
        />
      </section>
    </>
  );
};

export default Places;

export async function getStaticProps({ locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  let dataAllPlaces = [];
  let dataAllPoetries = [];
  let dataAllCitiesMap = [];

  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];

  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();

  try {
    const resAllPlaces = await fetch(
      `${apiDomain}/api/Makan/GetMakanFullData?lang=${langId}`
    );
    if (!resAllPlaces.ok) {
      throw new Error(`Failed to fetch places: ${resAllPlaces.status}`);
    }
    dataAllPlaces = await resAllPlaces.json();

    // Fetch all poetries
    const resAllPoetries = await fetch(
      `${apiDomain}/api/Poetries/GetAllPoetries?lang=${langId}&pagenum=1&pagesize=900`
    );
    if (!resAllPoetries.ok) {
      throw new Error(`Failed to fetch poetries: ${resAllPoetries.status}`);
    }
    dataAllPoetries = await resAllPoetries.json();

    // Fetch all cities map
    const resAllCitiesMap = await fetch(
      `${apiDomain}/api/Makan/GetAllCities?type=6&lang=${langId}&withPlaces=true&pagenum=1&pagesize=50`
    );

    if (!resAllCitiesMap.ok) {
      throw new Error(`Failed to fetch cities map: ${resAllCitiesMap.status}`);
    }
    dataAllCitiesMap = await resAllCitiesMap.json();
  } catch (error) {
    return {
      props: {
        dataAllPlaces: [],
        dataAllPoetries: [],
        dataAllCitiesMap: [],
        translations: [],
        error: error.message,
      },
      revalidate: 10,
    };
  }

  // Return the fetched data as props
  return {
    props: {
      dataAllPlaces,
      dataAllPoetries,
      dataAllCitiesMap,
      translations,
      title: "مناطق المملكة العربية السعودية",
    },
    revalidate: REVALIDATE_TIME,
  };
}

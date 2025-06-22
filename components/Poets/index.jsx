import { Container, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PoetsSlider from "../PoetsSlider";
import { ErasPlacesSlider } from "../ErasComponents";
import { CloseIcon, LeftArrow } from "@/assets/svgsComponents";
import { RotatingLines } from "react-loader-spinner";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/router";
import DataContext from "@/context/DataContext";
import More from "../icons/more";
import DrawerPoets from "./drawer";
import LocationPin from "../LocationPin";

const lineHeight = 24,
  clamp = 3,
  unit = "px";
const Poets = ({
  dataPoetsByEra,
  dataAllCitiesMap,
  dataAllPlaces,
  dataAllPoetries,
  setIsLayerActive,
  poetsData,
  allStaticWords,
}) => {
  const translationsFromContext = useContext(DataContext);

  const [activePoet, setActivePoet] = useState(null);
  const [activeCity, setActiveCity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [cityNames, setCityNames] = useState([]);
  const [places, setPlaces] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [filteredPoets, setFilteredPoets] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const router = useRouter();
  const { locale } = useRouter();
  const [isDesckTop, setIsDesckTop] = useState(true);

  const [expanded, setExpanded] = useState(true);
  const textRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [maxHeight, setMaxHeight] = useState(lineHeight * clamp + unit);
  const [contentHeight, setContentHeight] = useState(0);

  const calculateHeight = useCallback(() => {
    const windowWidth = window.innerWidth;
    if (textRef.current && windowWidth < 450) {
      setContentHeight(textRef.current.scrollHeight);
      const height = lineHeight * clamp;
      setMaxHeight(height + unit);
      const isShowButton = textRef.current.scrollHeight > height;
      setShowButton((pre) => {
        if (isShowButton && !pre) {
          setTimeout(() => {
            calculateHeight();
          }, 50);
        }
        return isShowButton;
      });
    } else if (windowWidth > 450 && textRef.current) {
      setContentHeight("max-content");
      setMaxHeight("max-content");
      setShowButton(false);
      setExpanded(false);
    }
  }, [activePoet, lineHeight, clamp, unit]);

  useLayoutEffect(() => {
    setExpanded(false);
    setShowButton(false);
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [calculateHeight]);
  // useEffect(() => {
  //   setExpanded(false);
  //   setShowButton(false);
  //   calculateHeight();
  //   window.addEventListener("resize", calculateHeight);
  //   return () => window.removeEventListener("resize", calculateHeight);
  // }, [calculateHeight]);

  const toggleExpanded = () => {
    if (!showButton) return;
    setExpanded((prev) => !prev);
  };

  useLayoutEffect(() => {
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
    if (dataPoetsByEra && dataPoetsByEra?.length > 0) {
      if (isFilterActive) {
        setFilteredPoets(dataPoetsByEra?.filter((poet) => poet.bornInSaudi));
      } else {
        setFilteredPoets(dataPoetsByEra);
      }
    }
  }, [isFilterActive, dataPoetsByEra]);

  const toggleFilter = () => {
    setIsFilterActive((prev) => !prev);
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".land");
    const city = document.querySelectorAll(".city-name");
    setCityNames(city);
    elements.forEach((element, index) => {
      element.setAttribute("id", `land-${index}`);
    });
  }, []);

  useEffect(() => {
    if (activePoet === null) {
      cityNames.forEach((cityName) => {
        cityName.style.display = "none";
      });
    } else {
      cityNames.forEach((cityName) => {
        cityName.style.display = "";
      });
    }
  }, [activePoet, cityNames]);

  const handleBoxClick = (poetID) => {
    setActiveCity(null);
    setCityData(null);
    setIsLayerActive(false);
    setActivePoet(poetID);
    setActiveIndex(poetID); // Set the active index
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(navigator.vendor.includes("Apple"));
  }, []);

  const convertSVGPathsToJSX = (svgString) => {
    const paths = svgString.split("</path>");
    return paths.map((path, index) => (
      <g key={index} dangerouslySetInnerHTML={{ __html: path + "</path>" }} />
    ));
  };
  const [cityData, setCityData] = useState(null);
  const [poetriesData, setPoetriesData] = useState(null);
  const handlePlaceWindow = (placeId) => {
    setActiveCity(placeId);
    const filtredPlaces = dataAllPlaces.find((place) => place.id === placeId);

    const filteredPoetries = dataAllPoetries?.filter(
      (poetry) =>
        poetry.placeId === placeId &&
        poetry.poetId === dataPoetsByEra[activePoet]?.id
    );
    setCityData(filtredPlaces);
    setIsLayerActive(true);
    setPoetriesData(filteredPoetries);
  };

  const handlePlaceActive = async (placeId) => {
    setActiveCity(placeId);
  };

  const handlePoetData = (poetID) => {
    const poetPlaces = poetsData[poetID];
    setPlaces(poetPlaces);
    setIsMapLoading(false);
  };
  const popUpRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setCityData(null);
        setIsLayerActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popUpRef]);
  const onCloseDrawer = useCallback(
    (isOpen = false) => {
      if (isOpen) return;
      setCityData(null);
      setIsLayerActive(false);
    },
    [setCityData, setIsLayerActive]
  );
  const onClose = useCallback(() => {
    setCityData(null);
    setIsLayerActive(false);
  }, [setCityData, setIsLayerActive]);
  return (
    <>
      <section
        id="Poets"
        className={styles.Poets}
        dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
      >
        <Container maxWidth={false}>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.sec_container}
          >
            <div className={styles.filter_btn} onClick={toggleFilter}>
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={styles.icon_container}
              >
                {isFilterActive && <FaCheck />}
              </motion.div>
              <p className={isFilterActive && styles.active}>
                {translationsFromContext.poetswholivedintheKingdomofSaudiArabia}
              </p>
            </div>
            <div className={styles.tags_slider} id="carosuel">
              <Swiper
                breakpoints={{
                  100: {
                    slidesPerView: 1.8,
                    spaceBetween: 10,
                  },
                  300: {
                    slidesPerView: 2.8,
                    spaceBetween: 10,
                  },
                  400: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                  },
                  500: {
                    slidesPerView: 4.5,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 5.5,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 6.5,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 8.5,
                    spaceBetween: 10,
                  },
                }}
                dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
                className={styles.swiper_container}
              >
                {Array.isArray(filteredPoets) &&
                  filteredPoets.map((poet, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => handlePoetData(poet.id)}
                      className={styles.swiper_slide_box}
                    >
                      <div
                        onClick={() => handleBoxClick(index)}
                        className={`${styles.box_container} `}
                      >
                        <div
                          className={`${styles.box} ${
                            activePoet === index ? styles.active : ""
                          }`}
                        >
                          <div className={styles.img_container}>
                            <img src={poet.icon} alt={poet.name} />
                          </div>
                          <div className={styles.name}>
                            <Typography>{poet.name}</Typography>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            {activePoet !== null && (
              <>
                <div className={styles.poetInfo}>
                  <div
                    onClick={toggleExpanded}
                    ref={textRef}
                    className={`${
                      styles.desc
                    } relative tracking-[0] text-[#11292fcc] font-main font-medium transition-all duration-300 ease-in-out overflow-hidden ${
                      !expanded && showButton ? "cursor-pointer" : "cursor-text"
                    }`}
                    style={{
                      maxHeight: expanded ? contentHeight : maxHeight,
                      lineHeight: lineHeight + unit,
                    }}
                  >
                    <p
                      aria-hidden={true}
                      className={`absolute top-0 left-0 w-full h-full ${
                        expanded
                          ? "opacity-0 -z-10 pointer-events-none"
                          : showButton
                          ? `line-clamp-${clamp}`
                          : ""
                      }`}
                    >
                      {dataPoetsByEra[activePoet]?.descShort}
                    </p>
                    <p
                      className={`${
                        expanded ? "" : "opacity-0 -z-10 pointer-events-none"
                      }`}
                    >
                      {dataPoetsByEra[activePoet]?.descShort}
                    </p>
                  </div>
                  {showButton && (
                    <button
                      aria-hidden={true}
                      onClick={toggleExpanded}
                      className={styles.show_more}
                    >
                      <More open={!expanded} />
                      <More open={expanded} />
                    </button>
                  )}
                </div>
                <Link
                  href={`/poet/${dataPoetsByEra[activePoet]?.id}`}
                  className={`${styles.more} ps-4 phone:ps-12`}
                >
                  <Typography>
                    {translationsFromContext.poetProfile}
                    <div className={styles.icon_container}>
                      <LeftArrow />
                    </div>
                  </Typography>
                </Link>
              </>
            )}
            <div
              className={styles.svg_wrap}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
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
                      <div className={styles.box_header}>
                        <div className={styles.img_container}>
                          <img src={cityData.icon} alt={cityData?.name} />
                        </div>
                        <div className={styles.title}>
                          <h3>{cityData?.name}</h3>

                          <div className={styles.desc}>
                            <p>{cityData?.descriptionShort}</p>
                            <Link
                              href={`/city/${cityData?.id}`}
                              className={styles.more}
                            >
                              <span>
                                {allStaticWords?.moreAbout} {cityData?.name}
                              </span>
                              <LeftArrow className="mt-0.5" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {router.locale === "ar" && (
                        <PoetsSlider poetriesData={poetriesData} />
                      )}
                      <div className={styles.close_btn} onClick={onClose}>
                        <CloseIcon />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div id="map-boxes" dir="ltr" className={styles.map_box}>
                {isMapLoading && (
                  <div className={styles.svg_layer}>
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="96"
                      visible={true}
                      className={styles.loader}
                    />
                  </div>
                )}
                <xml version="1.0" encoding="UTF-8" standalone="no" />
                <svg
                  id="svg1"
                  width="858"
                  height="724"
                  fill="none"
                  dir="ltr"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.zaman_map} ${
                    isSafari ? "saudi-map safari" : "saudi-map"
                  }`}
                  style={{
                    "--point-size": "20px",
                  }}
                  viewBox="90 90 758 624"
                >
                  {dataAllCitiesMap?.map((land, index) => (
                    <g key={index} id={land.svgPathId}>
                      {convertSVGPathsToJSX(land.svgPath)}
                    </g>
                  ))}
                  {activeIndex !== null &&
                    places
                      ?.sort((a, b) => {
                        if (a.id === activeCity) return 1;
                        if (b.id === activeCity) return -1;
                        return 0;
                      })
                      .map((place) => (
                        <foreignObject
                          x={place.svgX}
                          y={place.svgY}
                          key={place.id}
                          className={`${
                            activeCity === place.id ? "pointer-events-none" : ""
                          }`}
                        >
                          <div className="city-container">
                            <div className={`city-name`}>
                              {activeCity === place.id && (
                                <div className={`${styles.icon_container} pin`}>
                                  <LocationPin />
                                </div>
                              )}
                              <div
                                onClick={() => handlePlaceActive(place.id)}
                                className={`${styles.city_point} ${
                                  activeCity === place.id ? styles.active : ""
                                } point`}
                              />
                            </div>
                          </div>
                        </foreignObject>
                      ))}
                </svg>
              </div>

              {places !== null && (
                <ErasPlacesSlider
                  places={places}
                  setActiveCity={setActiveCity}
                  activeCity={activeCity}
                  onPlaceClick={handlePlaceWindow}
                  activePoet={activePoet}
                />
              )}
            </div>
          </motion.div>
        </Container>
        <DrawerPoets
          isOpen={cityData && !isDesckTop}
          onOpenChange={onCloseDrawer}
          cityData={cityData}
          moreAbout={allStaticWords?.moreAbout}
          isAR={router.locale === "ar"}
          poetriesData={poetriesData}
        />
      </section>
    </>
  );
};

export default Poets;

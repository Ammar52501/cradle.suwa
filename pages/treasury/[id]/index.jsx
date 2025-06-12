import { Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import stylesMain from "../index.module.scss";
// import styles from '../../../components/PublicTreasuryComponents/PageSection/index.module.scss';
import stylesPage from "./index.module.scss";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";

const Treasury = ({ sectionData, translations }) => {
  const router = useRouter();
  const sectionPageData = sectionData[0];
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [ImagesGallery, setImagesGallery] = useState("");
  const [backgroundFullScreen, setBackgroundFullScreen] = useState("");

  const openGallery = (index) => {
    setGalleryOpen(true);

    setBackgroundFullScreen(
      sectionPageData?.sliders[index]?.imagesVideos?.split(",")[0]
    );
    setImagesGallery(sectionPageData?.sliders[index]?.imagesVideos?.split(","));
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const parseMedia = (mediaString) => {
    return mediaString?.split(",")?.map((mediaUrl) => {
      const isVideo = mediaUrl.endsWith(".mp4");

      return { url: mediaUrl, isVideo };
    });
  };

  const imgRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        setGalleryOpen(false);
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imgRef]);

  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  const description = "استكشف الشعراء عبر العصور التاريخية الأدبية";
  const imagePath = "logo_mobile_footer.png";

  return (
    <>
      <Head>
        <title>{sectionPageData.name}</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="csrf-token"
          content="JdDvDc4LUJomFM4T7QE0hFlH9CeKOHDXMoxV3wer"
        />
        <meta name="title" content="" />
        <link rel="icon" type="image/ico" href={`/logo_mobile_footer.ico`} />
        <meta name="theme-color" content="#062a30" />
        <meta name="mobile-web-app-capable" content="no" />
        <meta
          name="application-name"
          content={translations.yearOfArabicPoetry}
        />
        <meta name="apple-mobile-web-app-capable" content="no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          name="apple-mobile-web-app-title"
          content={translations.yearOfArabicPoetry}
        />
        <link rel="apple-touch-icon" href={`${appDomain}/${imagePath}`} />
        <link
          rel="apple-touch-startup-image"
          href={`${appDomain}/${imagePath}`}
        />
        <meta name="author" content={translations.yearOfArabicPoetry} />
        <meta name="description" content={description} />
        <link rel="canonical" href={`${appDomain}/`} />
        <meta name="msapplication-TileColor" content="#062a30" />
        <meta
          name="msapplication-TileImage"
          content={`${appDomain}/${imagePath}`}
        />
        <meta name="msapplication-square70x70logo" content={imagePath} />
        <meta name="msapplication-square150x150logo" content={imagePath} />
        <meta name="msapplication-wide310x150logo" content={imagePath} />
        <meta name="msapplication-square310x310logo" content={imagePath} />
        <link rel="apple-touch-icon-precomposed" href={imagePath} />
        <meta property="og:type" content="website" />

        <meta
          property="og:site_name"
          content={translations.yearOfArabicPoetry}
        />
        <meta property="og:locale" content="ar" />
        <meta property="og:locale:alternate" content="ar" />
        <meta property="og:url" content={`${appDomain}/`} />
        <meta property="og:title" content={translations.yearOfArabicPoetry} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${appDomain}/${imagePath}`} />
        <meta itemProp="name" content={translations.yearOfArabicPoetry} />
        <meta itemProp="author" content={translations.yearOfArabicPoetry} />
        <meta itemProp="image" content={`${appDomain}/${imagePath}`} />
        <meta itemProp="description" content={description} />
        <meta name="twitter:image" content={`${appDomain}/${imagePath}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@" />
        <meta name="twitter:creator" content="@" />
        <meta name="twitter:title" content={translations.yearOfArabicPoetry} />
        <meta name="twitter:image:src" content={`${appDomain}/${imagePath}`} />
        <meta name="twitter:description" content={description} />
      </Head>

      <header id={stylesMain.header}>
        <div className={stylesMain.sec_title}>
          <div className={stylesMain.img_container}>
            <img src={"/assets/imgs/star.webp"} alt="star" />
          </div>

          <Typography variant="h1">{sectionPageData.name}</Typography>

          <div className={stylesMain.img_container}>
            <img src={"/assets/imgs/star.webp"} alt="star" />
          </div>
        </div>
      </header>

      <Container maxWidth={false}>
        <section id={sectionPageData.name} className={stylesMain.section}>
          <motion.div
            id="PublicTreasury"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={stylesMain.boxes_container}
          >
            {sectionPageData.sliders.map((item, index) => (
              <div className={stylesMain.box}>
                <div className={stylesMain.rotated_img}>
                  <Image
                    width={413}
                    height={100}
                    src={(item?.imagesVideos).split(",")[0]}
                    alt={item?.name}
                  />
                </div>

                <div
                  className={stylesMain.img_container}
                  onClick={() => openGallery(index)}
                >
                  {parseMedia(item?.imagesVideos)?.map((media, mediaIndex) => (
                    <div
                      key={mediaIndex}
                      className={`${stylesMain.img_container} `}
                      onClick={() => openGallery(index)}
                    >
                      <Image
                        width={416}
                        height={233}
                        src={media.url}
                        alt={item.name}
                      />
                    </div>
                  ))}
                </div>

                <div className={stylesMain.title}>
                  <Typography variant="h4">{item.name}</Typography>
                </div>
              </div>
            ))}

            {galleryOpen && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={stylesMain.fullscreengallery}
              >
                <div className={stylesMain.gallery_wrap}>
                  <Image
                    width={1000}
                    height={800}
                    src={backgroundFullScreen}
                    alt=""
                  />
                </div>

                <Container
                  ref={imgRef}
                  className={stylesMain.gallery_container}
                  sx={{ maxWidth: "1400px" }}
                  maxWidth={false}
                >
                  <Button
                    onClick={closeGallery}
                    className={stylesMain.close_btn}
                  >
                    <IoClose />
                  </Button>

                  <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    navigation={true}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    className="gallery-swiper"
                    pagination={{ clickable: true }}
                    dir="rtl"
                    centeredSlides={true}
                  >
                    {ImagesGallery?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className={stylesMain.box}>
                          <div className={stylesMain.img_container}>
                            {item.endsWith(".mp4") ? (
                              <video controls loading="lazy">
                                <source src={item} type="video/mp4" />
                              </video>
                            ) : (
                              <Image
                                width={100}
                                height={100}
                                src={item}
                                alt={`Gallery Image ${index + 1}`}
                                loading="lazy"
                              />
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Container>
              </motion.div>
            )}
          </motion.div>
        </section>

        <section id="footer" className={stylesPage.footer}>
          <div className={stylesPage.imgs_container}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, type: "tween" }}
              className={stylesPage.middle}
            >
              {router.query.id === "1" && (
                <img src={"/assets/imgs/docs_1.webp"} alt="" />
              )}
              {router.query.id === "2" && (
                <img src={"/assets/imgs/docs_2.webp"} alt="" />
              )}
              {router.query.id === "3" && (
                <img src={"/assets/imgs/docs_3.webp"} alt="" />
              )}
            </motion.div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Treasury;

export async function getStaticPaths() {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(
    `${apiDomain}/api/Media/GetAllMainTopics?lang=2&withPlaces=true&pagenum=1&pagesize=50`
  );

  const data = await response.json();
  const ids = data.map((topic) => topic.id);
  // Generate the paths
  const paths = ids.map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const { id } = params;
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const resPageData = await fetch(
    `${apiDomain}/api/Media/GetAllMainTopics?lang=${langId}&withPlaces=true&pagenum=1&pagesize=50`
  );
  const dataPageData = await resPageData.json();

  const numericId = parseInt(id, 10);
  const sectionData = dataPageData.filter((topic) => topic.id === numericId);
  
  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();

  return {
    props: {
      sectionData,
      translations,
    },
    revalidate: 10,
  };
}

// import { Button, Container, Typography } from '@mui/material';
// import React, { useRef, useEffect, useState, useContext } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode, Pagination } from 'swiper/modules';
// import styles from './index.module.scss';
// import Link from 'next/link';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/pagination';
// import { motion } from 'framer-motion';
// import { IoClose } from "react-icons/io5";
// import { useTranslation } from 'next-i18next';
// import Image from 'next/image';
// import DataContext from '@/context/DataContext';

// const PageSection = ({ title, AllMainTopics }) => {
//   const translations = useContext(DataContext);

//   const [galleryOpen, setGalleryOpen] = useState(false);
//   const swiperRef = useRef(null);
//   const [backgroundFullScreen, setBackgroundFullScreen] = useState("");
//   const [ImagesGallery, setImagesGallery] = useState("");
//   const imgRef = useRef(null);

//   const closeGallery = () => {
//     setGalleryOpen(false);
//   };

//   const openGallery = (topicIndex, sliderIndex) => {
//     setGalleryOpen(true);

//     const selectedTopic = AllMainTopics[topicIndex];
//     const selectedSlider = selectedTopic.sliders[sliderIndex];

//     setBackgroundFullScreen(selectedSlider.imagesVideos.split(',')[0]);
//     setImagesGallery(selectedSlider.imagesVideos.split(','));
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (imgRef.current && !imgRef.current.contains(event.target)) {
//         setGalleryOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const parseMedia = (mediaString) => {
//     return mediaString?.split(',')?.map((mediaUrl) => {
//       const isVideo = mediaUrl.endsWith('.mp4');
//       return { url: mediaUrl, isVideo };
//     });
//   };

//   const getFirstMediaUrl = (mediaString) => {
//     return mediaString?.split(',')[0];
//   };

//   const breakpoints = {
//     300: { slidesPerView: 1, spaceBetween: 16 },
//     400: { slidesPerView: 1, spaceBetween: 16 },
//     640: { slidesPerView: 1, spaceBetween: 16 },
//     768: { slidesPerView: 1, spaceBetween: 16 },
//     992: { slidesPerView: 2.5, spaceBetween: 16 },
//     1024: { slidesPerView: 3, spaceBetween: 16 },
//     1400: { slidesPerView: 3, spaceBetween: 16 },
//     1800: { slidesPerView: 3, spaceBetween: 16 },
//   };

//   return (
//     <>
//       {AllMainTopics.map((topic, topicIndex) => (
//         <section id={title} className={styles.section} key={topicIndex}>
//           <div className={styles.sec_title}>
//             <Typography variant="h3">{topic.name}</Typography>
//           </div>

//           <motion.div
//             animate={{ opacity: 1 }}
//             initial={{ opacity: 0 }}
//             transition={{ duration: 1 }}
//             className={styles.swiper_container}
//           >
//             <Swiper
//               modules={[Navigation]}
//               spaceBetween={16}
//               slidesPerView={1}
//               navigation
//               pagination={{ clickable: true }}
//               dir="rtl"
//               breakpoints={breakpoints}
//             >
//               {topic?.sliders?.map((item, sliderIndex) => (
//                 <SwiperSlide key={sliderIndex}>
//                   <div className={styles.box_sec}>
//                     <div className={styles.rotated_img}>
//                       <Image
//                         width={100}
//                         height={100}
//                         src={getFirstMediaUrl(item?.imagesVideos)}
//                         alt={item?.name}
//                         loading="lazy"
//                       />
//                     </div>
//                     <div className={styles.img_container} onClick={() => openGallery(topicIndex, sliderIndex)}>
//                       {parseMedia(item?.imagesVideos)?.map((media, mediaIndex) => (
//                         <div
//                           key={mediaIndex}
//                           className={media.isVideo ? styles.video_container : styles.img_container}
//                           onClick={() => openGallery(topicIndex, sliderIndex, mediaIndex)}
//                         >
//                           {media.isVideo ? (
//                             <video src={media.url} controls loading="lazy"></video>
//                           ) : (
//                             <Image width={100} height={100} src={media.url} alt={item.name} loading="lazy" />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     <div className={styles.title}>
//                       <Typography variant="h4">{item.name}</Typography>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {galleryOpen && (
//               <motion.div
//                 animate={{ opacity: 1 }}
//                 initial={{ opacity: 0 }}
//                 transition={{ duration: 1 }}
//                 className={styles.fullscreengallery}
//               >
//                 <div className={styles.gallery_wrap}>
//                   <Image width={100} height={100} src={backgroundFullScreen} alt="" loading="lazy" />
//                 </div>

//                 <Container ref={imgRef} className={styles.gallery_container} sx={{ maxWidth: "1400px" }} maxWidth={false}>
//                   <Button onClick={closeGallery} className={styles.close_btn}>
//                     <IoClose />
//                   </Button>
//                   <Swiper
//                     slidesPerView={1}
//                     spaceBetween={16}
//                     navigation={true}
//                     modules={[FreeMode, Navigation, Thumbs, Pagination]}
//                     className="gallery-swiper"
//                     pagination={{ clickable: true }}
//                     dir="rtl"
//                     centeredSlides={true}
//                     ref={swiperRef}
//                   >
//                     {ImagesGallery?.map((item, index) => (
//                       <SwiperSlide key={index}>
//                         <div className={styles.box}>
//                           <div className={styles.img_container}>
//                             {item.endsWith('.mp4') ? (
//                               <video controls loading="lazy">
//                                 <source src={item} type="video/mp4" />
//                               </video>
//                             ) : (
//                               <Image
//                                 width={100}
//                                 height={100}
//                                 src={item}
//                                 alt={`Gallery Image ${index + 1}`}
//                                 loading="lazy"
//                               />
//                             )}
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                     ))}
//                   </Swiper>
//                 </Container>
//               </motion.div>
//             )}

//             <div className={styles.more_btn}>
//               <Link href={`/treasury/${topic.id}`}>{translations.readMore}</Link>
//             </div>
//           </motion.div>
//         </section>
//       ))}
//     </>
//   );
// };

// export default PageSection;




// import { Button, Container, Typography } from '@mui/material';
// import React, { useRef, useEffect, useState, useContext } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode, Pagination, Virtual } from 'swiper/modules';
// import styles from './index.module.scss';
// import Link from 'next/link';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/pagination';
// import 'swiper/css/virtual';

// import { motion } from 'framer-motion';
// import { IoClose } from "react-icons/io5";
// import Image from 'next/image';
// import DataContext from '@/context/DataContext';

// const PageSection = ({ title, AllMainTopics }) => {
//   const translations = useContext(DataContext);

//   const [galleryOpen, setGalleryOpen] = useState(false);
//   const swiperRef = useRef(null);
//   const [backgroundFullScreen, setBackgroundFullScreen] = useState("");
//   const [ImagesGallery, setImagesGallery] = useState("");
//   const imgRef = useRef(null);

//   const closeGallery = () => {
//     setGalleryOpen(false);
//   };

//   const openGallery = (topicIndex, sliderIndex) => {
//     setGalleryOpen(true);

//     const selectedTopic = AllMainTopics[topicIndex];
//     const selectedSlider = selectedTopic.sliders[sliderIndex];

//     setBackgroundFullScreen(selectedSlider.imagesVideos.split(',')[0]);
//     setImagesGallery(selectedSlider.imagesVideos.split(','));
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (imgRef.current && !imgRef.current.contains(event.target)) {
//         setGalleryOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const parseMedia = (mediaString) => {
//     return mediaString?.split(',')?.map((mediaUrl) => {
//       const isVideo = mediaUrl.endsWith('.mp4');
//       return { url: mediaUrl, isVideo };
//     });
//   };

//   const getFirstMediaUrl = (mediaString) => {
//     return mediaString?.split(',')[0];
//   };

//   const breakpoints = {
//     300: { slidesPerView: 1, spaceBetween: 16 },
//     400: { slidesPerView: 1, spaceBetween: 16 },
//     640: { slidesPerView: 1, spaceBetween: 16 },
//     768: { slidesPerView: 1, spaceBetween: 16 },
//     992: { slidesPerView: 2.5, spaceBetween: 16 },
//     1024: { slidesPerView: 3, spaceBetween: 16 },
//     1400: { slidesPerView: 3, spaceBetween: 16 },
//     1800: { slidesPerView: 3, spaceBetween: 16 },
//   };

//   return (
//     <>
//       {AllMainTopics.map((topic, topicIndex) => (
//         <section id={title} className={styles.section} key={topicIndex}>
//           <div className={styles.sec_title}>
//             <Typography variant="h3">{topic.name}</Typography>
//           </div>

//           <motion.div
//             animate={{ opacity: 1 }}
//             initial={{ opacity: 0 }}
//             transition={{ duration: 1 }}
//             className={styles.swiper_container}
//           >
//             <Swiper
//               modules={[Navigation, Pagination, Virtual]}
//               spaceBetween={16}
//               slidesPerView={1}
//               navigation
//               pagination={{ clickable: true }}
//               dir="rtl"
//               breakpoints={breakpoints}
//               virtual={{
//                 slides: topic?.sliders?.map((item) => ({
//                   ...item,
//                   id: item?.id,
//                 })),
//               }}
//             >
//               {topic?.sliders?.map((item, sliderIndex) => (
//                 <SwiperSlide key={sliderIndex}>
//                   <div className={styles.box_sec}>
//                     <div className={styles.rotated_img}>
//                       <Image
//                         width={100}
//                         height={100}
//                         src={getFirstMediaUrl(item?.imagesVideos)}
//                         alt={item?.name}
//                         loading="lazy"
//                       />
//                     </div>
//                     <div className={styles.img_container} onClick={() => openGallery(topicIndex, sliderIndex)}>
//                       {parseMedia(item?.imagesVideos)?.map((media, mediaIndex) => (
//                         <div
//                           key={mediaIndex}
//                           className={media.isVideo ? styles.video_container : styles.img_container}
//                           onClick={() => openGallery(topicIndex, sliderIndex, mediaIndex)}
//                         >
//                           {media.isVideo ? (
//                             <video src={media.url} controls loading="lazy"></video>
//                           ) : (
//                             <Image width={100} height={100} src={media.url} alt={item.name} loading="lazy" />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     <div className={styles.title}>
//                       <Typography variant="h4">{item.name}</Typography>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {galleryOpen && (
//               <motion.div
//                 animate={{ opacity: 1 }}
//                 initial={{ opacity: 0 }}
//                 transition={{ duration: 1 }}
//                 className={styles.fullscreengallery}
//               >
//                 <div className={styles.gallery_wrap}>
//                   <Image width={100} height={100} src={backgroundFullScreen} alt="" loading="lazy" />
//                 </div>

//                 <Container ref={imgRef} className={styles.gallery_container} sx={{ maxWidth: "1400px" }} maxWidth={false}>
//                   <Button onClick={closeGallery} className={styles.close_btn}>
//                     <IoClose />
//                   </Button>
//                   <Swiper
//                     slidesPerView={1}
//                     spaceBetween={16}
//                     navigation={true}
//                     modules={[FreeMode, Navigation, Thumbs, Pagination]}
//                     className="gallery-swiper"
//                     pagination={{ clickable: true }}
//                     dir="rtl"
//                     centeredSlides={true}
//                     ref={swiperRef}
//                   >
//                     {ImagesGallery?.map((item, index) => (
//                       <SwiperSlide key={index}>
//                         <div className={styles.box}>
//                           <div className={styles.img_container}>
//                             {item.endsWith('.mp4') ? (
//                               <video controls loading="lazy">
//                                 <source src={item} type="video/mp4" />
//                               </video>
//                             ) : (
//                               <Image
//                                 width={100}
//                                 height={100}
//                                 src={item}
//                                 alt={`Gallery Image ${index + 1}`}
//                                 loading="lazy"
//                               />
//                             )}
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                     ))}
//                   </Swiper>
//                 </Container>
//               </motion.div>
//             )}

//             <div className={styles.more_btn}>
//               <Link href={`/treasury/${topic.id}`}>{translations.readMore}</Link>
//             </div>
//           </motion.div>
//         </section>
//       ))}
//     </>
//   );
// };

// export default PageSection;



import { Button, Container, Typography } from '@mui/material';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Pagination, Virtual } from 'swiper/modules';
import styles from './index.module.scss';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/virtual';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
import DataContext from '@/context/DataContext';

const PageSection = ({ title, AllMainTopics }) => {
  const translations = useContext(DataContext);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const swiperRef = useRef(null);
  const [backgroundFullScreen, setBackgroundFullScreen] = useState("");
  const [ImagesGallery, setImagesGallery] = useState("");
  const imgRef = useRef(null);

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const openGallery = (topicIndex, sliderIndex) => {
    setGalleryOpen(true);

    const selectedTopic = AllMainTopics[topicIndex];
    const selectedSlider = selectedTopic.sliders[sliderIndex];

    setBackgroundFullScreen(selectedSlider.imagesVideos.split(',')[0]);
    setImagesGallery(selectedSlider.imagesVideos.split(','));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imgRef.current && !imgRef.current.contains(event.target)) {
        setGalleryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const parseMedia = (mediaString) => {
    return mediaString?.split(',')?.map((mediaUrl) => {
      const isVideo = mediaUrl.endsWith('.mp4');
      return { url: mediaUrl, isVideo };
    });
  };

  const getFirstMediaUrl = (mediaString) => {
    return mediaString?.split(',')[0];
  };

  const breakpoints = {
    300: { slidesPerView: 1, spaceBetween: 16 },
    400: { slidesPerView: 1, spaceBetween: 16 },
    640: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView: 1, spaceBetween: 16 },
    992: { slidesPerView: 2.5, spaceBetween: 16 },
    1024: { slidesPerView: 3, spaceBetween: 16 },
    1400: { slidesPerView: 3, spaceBetween: 16 },
    1800: { slidesPerView: 3, spaceBetween: 16 },
  };

  return (
    <>
      {AllMainTopics.map((topic, topicIndex) => (
        <section id={title} className={styles.section} key={topicIndex}>
          <div className={styles.sec_title}>
            <Typography variant="h3">{topic.name}</Typography>
          </div>

          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={styles.swiper_container}
          >
            <Swiper
              modules={[Navigation, Pagination, Virtual]}
              spaceBetween={16}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              dir="rtl"
              breakpoints={breakpoints}
              virtual={{
                slides: topic?.sliders?.map((item) => ({
                  ...item,
                  id: item?.id,
                })),
              }}
            >
              {topic?.sliders?.map((item, sliderIndex) => (
                <SwiperSlide key={sliderIndex}>
                  <div className={styles.box_sec}>
                    <div className={styles.rotated_img}>
                      <Image
                        width={100}
                        height={100}
                        src={getFirstMediaUrl(item?.imagesVideos)}
                        alt={item?.name}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.img_container} onClick={() => openGallery(topicIndex, sliderIndex)}>
                      {parseMedia(item?.imagesVideos)?.map((media, mediaIndex) => (
                        <div
                          key={mediaIndex}
                          className={media.isVideo ? styles.video_container : styles.img_container}
                          onClick={() => openGallery(topicIndex, sliderIndex, mediaIndex)}
                        >
                          {media.isVideo ? (
                            <video src={media.url} controls loading="lazy"></video>
                          ) : (
                            <Image width={100} height={100} src={media.url} alt={item.name} loading="lazy" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className={styles.title}>
                      <Typography variant="h4">{item.name}</Typography>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {galleryOpen && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={styles.fullscreengallery}
              >
                <div className={styles.gallery_wrap}>
                  <Image width={100} height={100} src={backgroundFullScreen} alt="" loading="lazy" />
                </div>

                <Container ref={imgRef} className={styles.gallery_container} sx={{ maxWidth: "1400px" }} maxWidth={false}>
                  <Button onClick={closeGallery} className={styles.close_btn}>
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
                    ref={swiperRef}
                  >
                    {ImagesGallery?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className={styles.box}>
                          <div className={styles.img_container}>
                            {item.endsWith('.mp4') ? (
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

            <div className={styles.more_btn}>
              <Link href={`/treasury/${topic.id}`}>{translations.readMore}</Link>
            </div>
          </motion.div>
        </section>
      ))}
    </>
  );
};

export default PageSection;

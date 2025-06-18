import React, { useContext } from 'react'
import styles from './index.module.scss'
import { Container, Typography } from '@mui/material'
import { Mountains } from '@/assets/svgsComponents'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link'
import Image from 'next/image'
import DataContext from '@/context/DataContext'



const LiteraryBanner = (props) => {
  const translationsFromContext = useContext(DataContext);
  const { query } = useRouter();
  const eraIndex = query.index ? Number(query.index) : 0;
  const router = useRouter();
  return (

    <>
      <section id='LiteraryBanner' className={styles.LiteraryBanner} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className={styles.sec_container}>

          <Container maxWidth={false} className={styles.leftSide}>
            <div className={styles.sec_title}>
              <Typography variant='h1'>
                {translationsFromContext.poetsOfTheEra}
              </Typography>
            </div>
          </Container>
          <div className={styles.imags_container}>
            <div className={styles.right_branch}>
              <img src={"/assets/imgs/right_branch.webp"} alt="" />
            </div>
            <div className={styles.left_branch}>
              <img src={"/assets/imgs/left_branch.webp"} alt="" />

            </div>
            <div className={styles.horse}>
              <img src={"/assets/imgs/horse.webp"} alt="" />

            </div>
            <div className={styles.mountains}>
              <Mountains />
            </div>
          </div>
        </div>

      </section >
      <Container maxWidth={false} className={styles.leftSide}>
        <div className={styles.swiper_container} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
          <Swiper
            dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}
            breakpoints={{
              1: {
                slidesPerView: 1.5,
                spaceBetween: 15,
              },
              400: {
                slidesPerView: 1.8,
                spaceBetween: 24,
              },
              430: {
                slidesPerView: 2.3,
                spaceBetween: 24,
              },

              640: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
              700: {
                slidesPerView: 2.8,
                spaceBetween: 24,
              },
              992: {
                slidesPerView: 3.5,
                spaceBetween: 24,
              },
              1200: {
                slidesPerView: 3.5,
                spaceBetween: 24,

              },
              1300: {
                slidesPerView: 4.5,
                spaceBetween: 24,

              },
            }}
            slidesPerView={4.5}
            spaceBetween={24}
            pagination={true} className={"swiper"}>
            {props?.dataAllEras?.map((era) => (
              <SwiperSlide key={era.id} className={styles.swiper_slide_box}>
                <Link
                  scroll={false}
                  href={`/literary-eras/era/${era.id}`} className={`${styles.box} ${eraIndex === era.id ? styles.active : ''}`}>
                  <div className={styles.img_container}>
                    <Image width={277} height={115} quality={100} src={era.icon} alt={era.name} />
                  </div>



                  <div className={styles.title}>
                    <Typography variant='h4'>
                      {era.name}
                    </Typography>
                  </div>

                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

    </>

  )
}

export default LiteraryBanner
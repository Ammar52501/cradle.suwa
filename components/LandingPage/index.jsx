import { Container, Typography, } from '@mui/material'
import React from 'react'
import styles from './index.module.scss'
import { LeftArrow, PalmSvg, } from '@/assets/svgsComponents';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Image from 'next/image';


const LandingPage = ({ translations }) => {
  const router = useRouter();

  return (
    <>
      <section id='landingPage' className={styles.landingPage} dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className={styles.sec_wrap}>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, }}
            className={styles.sec_container}>
            <Container sx={{ maxWidth: "1400" }} maxWidth={false}>
              <div className={styles.sec_title}>
                <h1>
                  {
                    translations.poeticsettings
                  }
                  <span>
                    {translations.arabicpoetrysettingsinSaudiArabia}
                  </span>
                </h1>
              </div>
            </Container>



            <div className={styles.palm}>
              <PalmSvg />
            </div>

            <div className={styles.palm_left}>
              <Image width={119} height={331} src={"/assets/imgs/Palm.webp"} alt="" />




            </div>

            <div className={styles.docs}>
              <Image width={800} height={620} priority src={"/assets/imgs/docs_3.webp"} alt="" />
            </div>

          </motion.div>

          <Container maxWidth={false}>
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1, }}
              className={styles.boxes_container}>

              <Link href='/literary-eras' className={styles.box}>

                <div className={styles.icon_container}>
                  <FaCalendarAlt />
                </div>

                <div className={styles.title}>
                  <Typography variant='h4'>
                    {translations.age}
                  </Typography>
                </div>

                <div className={styles.arrow}>
                  <LeftArrow />
                </div>

              </Link>

              <Link href='/places' className={styles.box}>
                <div className={styles.icon_container}>
                  <MdLocationPin />
                </div>

                <div className={styles.title}>
                  <Typography variant='h4'>
                    {translations.place}
                  </Typography>
                </div>

                <div className={styles.arrow}>
                  <LeftArrow />
                </div>
              </Link>

            </motion.div>


          </Container >
        </div>
      </section >
    </>

  )
}

export default LandingPage
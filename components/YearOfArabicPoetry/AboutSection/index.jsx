import React from 'react'
import styles from './index.module.scss'
import { Container, } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutSection = () => {

  return (
    <section id='about' className={styles.about}>
      <Container maxWidth={false}>

        <div className={styles.stars_container}>
          <motion.div initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            <Image width={80} height={80} src="/assets/imgs/star.webp" alt="Star 1" priority />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "tween" }}
          >
            <Image width={80} height={80} src="/assets/imgs/star.webp" alt="Star 2" priority />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "tween" }}
          >
            <Image width={80} height={80} src="/assets/imgs/star.webp" alt="Star 3" priority />
          </motion.div>


        </div>

        <div className={styles.content_container}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, type: "tween" }}
            className={styles.title}>
            <h1> عن عام الشعر العربي</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: "tween" }}
            className={styles.desc}>

            <p>
              على مدى عقود مضت احتلّ الشعر العربي مكانة ثقافية باعتباره من أهم المكونات الحضارية للثقافة العربية، وحتى وقتنا المعاصر يتصدر الشعر العربي المحافل الأدبية، ومن أجل ترسيخ هذا المكون الحضاري تسعى المملكة العربية السعودية إلى جعله حاضراً في الحياة اليومية للثقافة السعودية والعربية؛ وعليه تقررت تسمية عام 2023 ليكون "عام الشعر العربي".
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, type: "tween" }}
            className={styles.title}>
            <h1>الرؤية</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: "tween" }}
            className={styles.desc}>
            <p>
              شعرٌ عربيٌ أصيل، ذو ماضٍ عريق، وحاضر حي، ومستقبل مزدهر.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, type: "tween" }}
            className={styles.title}>
            <h1>الرسالة</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: "tween" }}
            className={styles.desc}>
            <p>
              إحياء تاريخ الشعر العربي العريق، وتعزيز حضوره في الحضارة الإنسانية، وإرساء قواعد ثرائه المستقبلي، وإحلاله مكانته المستحقة بين آداب العالم وفنونه.
            </p>
          </motion.div>



        </div>


      </Container>
    </section>)
}

export default AboutSection
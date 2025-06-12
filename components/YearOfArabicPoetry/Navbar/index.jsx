import React from 'react'
import { useScrollTrigger, Slide, AppBar, Toolbar, Container, Typography, } from '@mui/material';
import styles from './index.module.scss'
import { useRouter } from 'next/router';
import Link from 'next/link';


const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <AppBar className={styles.navbarHeader} style={{
        background: `#062a30`,
      }} elevation={0} >
        <Container maxWidth={false} className={styles.navbar}>
          <div className={styles.sec_container}
            dir={`${router.locale === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className={styles.links_container}>
              <Link href='#'>الرئيسية</Link>
              <Link href='#about'>عن عام الشعر</Link>
              <Link href='#ministerSpeech'>كلمة الوزير</Link>
              <Link href='#guidance_guides'>الأدلة التوجيهية</Link>
              <Link href='#title'>الشركاء</Link>
            </div>



            <div className={styles.link}>
              <Link href='https://engage.moc.gov.sa/poetry_grants' target='_blank'>منحة الأبحاث</Link>
            </div>

          </div >
        </Container>
      </AppBar>

      <Toolbar />
    </>
  )
}

export default Navbar
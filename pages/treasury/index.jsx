// import { PageSection } from '@/components/PublicTreasuryComponents';
// import { Container, Typography } from '@mui/material';
// import styles from './index.module.scss'
// import Image from 'next/image';
// import { motion, } from 'framer-motion';


// const PublicTreasury = ({ AllMainTopics, translations }) => {


//   return (
//     <>

//       <Container maxWidth={false} >

//         <header id={styles.header}>
//           <div className={styles.sec_title}>
//             <div className={styles.img_container}>
//               <Image width={100} height={100} src={"/assets/imgs/star.webp"} alt="star" />
//             </div>

//             <Typography variant='h1'>
//               {translations?.poetryarchive}
//             </Typography>

//             <div className={styles.img_container}>
//               <Image width={100} height={100} src={"/assets/imgs/star.webp"} alt="star" />
//             </div>
//           </div>

//         </header>

//         <div id='PublicTreasury'>
//           <PageSection AllMainTopics={AllMainTopics} />
//         </div >

//       </Container>

//       <section id='footer' className={styles.footer} >
//         <div className={styles.imgs_container}>

//           <div className={styles.leftPlants_container}>

//             <motion.div initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1.4, type: "tween" }}
//               className={styles.leftPlants}
//             >
//               <Image width={592} height={408} src={"/assets/imgs/redPlants.webp"} alt="" />
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.4, type: "tween" }}

//             className={styles.deer} >
//             <Image width={592} height={408} src={"/assets/imgs/BrownDeer.webp"} alt="" />
//           </motion.div>


//           <div className={styles.rightPlants_container}>


//             <motion.div initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1.4, type: "tween" }}
//               className={styles.rightPlants}>
//               <Image width={592} height={408} src={"/assets/imgs/redPlants.webp"} alt="" />
//             </motion.div>
//           </div>


//         </div>

//       </section>
//     </>

//   )
// }

// export default PublicTreasury





// import { PageSection } from '@/components/PublicTreasuryComponents';
// import { Container, Typography } from '@mui/material';
// import styles from './index.module.scss'
// import Image from 'next/image';
// import { motion, } from 'framer-motion';

// const PublicTreasury = ({ AllMainTopics, translations }) => {
//   return (
//     <>
//       <Container maxWidth={false}>
//         <header id={styles.header}>
//           <div className={styles.sec_title}>
//             <div className={styles.img_container}>
//               <Image
//                 width={100}
//                 height={100}
//                 src="/assets/imgs/star.webp"
//                 alt="star"
//                 priority // Preload important images
//               />
//             </div>

//             <Typography variant='h1'>
//               {translations?.poetryarchive}
//             </Typography>

//             <div className={styles.img_container}>
//               <Image
//                 width={100}
//                 height={100}
//                 src="/assets/imgs/star.webp"
//                 alt="star"
//                 priority
//               />
//             </div>
//           </div>
//         </header>

//         <div id="PublicTreasury">
//           <PageSection AllMainTopics={AllMainTopics} />
//         </div>
//       </Container>

//       <section id="footer" className={styles.footer}>
//         <div className={styles.imgs_container}>
//           <div className={styles.leftPlants_container}>
//             <motion.div initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1.4, type: "tween" }}
//               className={styles.leftPlants}>
//               <Image
//                 width={592}
//                 height={408}
//                 src="/assets/imgs/redPlants.webp"
//                 alt="Plants"
//                 loading="lazy" // Lazy load images
//               />
//             </motion.div>
//           </div>

//           <motion.div initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.4, type: "tween" }}
//             className={styles.deer}>
//             <Image
//               width={592}
//               height={408}
//               src="/assets/imgs/BrownDeer.webp"
//               alt="Deer"
//               loading="lazy"
//             />
//           </motion.div>

//           <div className={styles.rightPlants_container}>
//             <motion.div initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1.4, type: "tween" }}
//               className={styles.rightPlants}>
//               <Image
//                 width={592}
//                 height={408}
//                 src="/assets/imgs/redPlants.webp"
//                 alt="Plants"
//                 loading="lazy"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default PublicTreasury;
// export async function getStaticProps({ locale }) {
//   const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
//   const langId = process.env[langIdEnvKey];

//   const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

//   const resAllMainTopics = await fetch(`${apiDomain}/api/Media/GetAllMainTopics?lang=${langId}&withPlaces=true&pagenum=1&pagesize=50`);
//   const AllMainTopics = await resAllMainTopics.json();


//   const resTranslations = await fetch(
//     `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
//   );
//   const translations = await resTranslations.json();




//   return {
//     props: {
//       AllMainTopics,
//       translations,
//     },
//     revalidate: 10,
//   };
// }






import { PageSection } from '@/components/PublicTreasuryComponents';
import { Container, Typography } from '@mui/material';
import styles from './index.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PublicTreasury = ({ AllMainTopics, translations }) => {
  return (
    <>
      <Container maxWidth={false}>
        <header id={styles.header}>
          <div className={styles.sec_title}>
            <div className={styles.img_container}>
              <Image
                width={100}
                height={100}
                src="/assets/imgs/star.webp"
                alt="star"
                priority // Preload important images
                loading="eager" // Eager loading for critical images
              />
            </div>

            <Typography variant='h1'>
              {translations?.poetryarchive}
            </Typography>

            <div className={styles.img_container}>
              <Image
                width={100}
                height={100}
                src="/assets/imgs/star.webp"
                alt="star"
                priority
                loading="eager" // Eager loading for critical images
              />
            </div>
          </div>
        </header>

        <div id="PublicTreasury">
          <PageSection AllMainTopics={AllMainTopics} />
        </div>
      </Container>

      <section id="footer" className={styles.footer}>
        <div className={styles.imgs_container}>
          <div className={styles.leftPlants_container}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, type: "tween" }}
              className={styles.leftPlants}
            >
              <Image
                width={592}
                height={408}
                src="/assets/imgs/redPlants.webp"
                alt="Plants"
                loading="lazy" // Lazy load images
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, type: "tween" }}
            className={styles.deer}
          >
            <Image
              width={592}
              height={408}
              src="/assets/imgs/BrownDeer.webp"
              alt="Deer"
              loading="lazy"
            />
          </motion.div>

          <div className={styles.rightPlants_container}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, type: "tween" }}
              className={styles.rightPlants}
            >
              <Image
                width={592}
                height={408}
                src="/assets/imgs/redPlants.webp"
                alt="Plants"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicTreasury;

export async function getStaticProps({ locale }) {
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const resAllMainTopics = await fetch(`${apiDomain}/api/Media/GetAllMainTopics?lang=${langId}&withPlaces=true&pagenum=1&pagesize=50`);
  const AllMainTopics = await resAllMainTopics.json();

  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();

  return {
    props: {
      AllMainTopics,
      translations,
    },
    revalidate: 10,
  };
}

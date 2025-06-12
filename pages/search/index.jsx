import { Search } from '@/assets/svgsComponents'
import { Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RotatingLines } from 'react-loader-spinner';
import Image from 'next/image'

const SearchPage = ({ initialPlacesData, initialPoetsData, translations }) => {
  const [query, setQuery] = useState('');
  const [poetsData, setPoetsData] = useState([]);
  const [placesData, setPlacesData] = useState([]);
  const [isDataLoading, setIsdataLoading] = useState(false)


  const removeDiacritics = (text) => {
    const diacritics = "ًٌٍَُِّْ";``
    for (let i = 0; i < diacritics.length; i++) {
      text = text.replace(new RegExp(diacritics[i], 'g'), "");
    }
    return text;
  };


  const handleSearch = (e) => {
    setIsdataLoading(true);

    const searchText = e.target.value;
    setQuery(searchText);

    if (searchText.length > 0) {
      const normalizedSearchText = removeDiacritics(searchText.toLowerCase());

      const filteredPlaces = initialPlacesData?.filter(place =>
        removeDiacritics(place?.name?.toLowerCase()).includes(normalizedSearchText)
      );
      setPlacesData(filteredPlaces);

      const filteredPoets = initialPoetsData?.filter(poet =>
        removeDiacritics(poet?.name?.toLowerCase()).includes(normalizedSearchText)
      );
      setPoetsData(filteredPoets);
      setIsdataLoading(false);

    } else {
      setPlacesData([]);
      setPoetsData([]);
      setIsdataLoading(false);

    }

  };


  return (
    <>
      <nav id='search' className={styles.search} dir='rtl'>
        <header>
          <Container maxWidth={false}>
            <div className={styles.nav_container}>
              <Link className={styles.logo} href={'/'}>
                <Image width={185} priority height={85} src={"/assets/imgs/logo.webp"} alt="" />
              </Link>

              <div className={styles.input_container}>
                <div className={styles.icon_container}>
                  <Search />
                </div>
                <input type="text" placeholder={translations.searchforPoetsPlaces} value={query}
                  onChange={handleSearch}
                />

              </div>


            </div>


          </Container>
        </header>
      </nav>

      {isDataLoading === true ?
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1, }}
          className={styles.loader_container}>
          < RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </motion.div>
        :
        <section id='results' className={styles.results} dir='rtl'>
          <Container maxWidth={false}>
            {placesData?.length !== 0 &&
              <>
                <div className={styles.sec_title}>
                  <Typography variant='h3'>{translations.places}</Typography>
                </div>

                <div className={styles.places_container}>
                  {placesData?.map((place) =>
                    <Link href={`/city/${place.id}`} key={place.id} >

                      <motion.div
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 1, }}
                        className={styles.box}
                      >
                        <div className={styles.title}>
                          <Typography variant='h4'>{place.name}</Typography>
                          <div className={styles.img_container}>
                            <img src={place.images} alt="" />
                          </div>
                        </div>
                        <div className={styles.desc}>
                          <Typography>{place.desc}</Typography>
                        </div>
                      </motion.div>

                    </Link>
                  )}
                </div>
              </>
            }
            {poetsData &&
              poetsData?.length !== 0 &&
              <div className={styles.sec_title}>
                <Typography variant='h3'>{translations.poets}</Typography>
              </div>
            }
            <div className={styles.poets_container}>

              {poetsData &&
                poetsData.map((poet) =>
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1, }}
                    className={styles.box} key={poet.id}>
                    <Link href={`/poet/${poet.id}`} >
                      <div className={styles.poet_info}>
                        <div className={styles.img_container}>
                          <img src={poet.icon} alt={poet.name} />
                        </div>

                        <div className={styles.text_container}>
                          <div className={styles.name}>
                            <Typography>{poet.name}</Typography>
                          </div>
                          <div className={styles.tag}>
                            <Typography>
                              {poet.zamanName}
                            </Typography>

                          </div>
                        </div>
                      </div>
                      <hr />

                      <div className={styles.desc}>
                        <Typography>
                          {poet.descShort}
                        </Typography>
                      </div>

                    </Link>

                  </motion.div>
                )
              }
            </div>
            {placesData?.length === 0 &&
              poetsData?.length === 0 &&
              query !== '' &&
              <div className={styles.notfound}>
                <Typography variant='h4'>{translations.thereNoResultFor}:<span>{query}</span></Typography>
              </div>
            }

          </Container>
        </section>
      }
    </>
  )
}

export default SearchPage

export async function getStaticProps({ locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];

  const resPlaces = await fetch(`${apiDomain}/api/Makan/GetAllPlaces?type=6&lang=${langId}&pagenum=1&pagesize=50`);
  const placesData = await resPlaces.json();

  const resPoets = await fetch(`${apiDomain}/api/Poets/GetAllPoets?lang=${langId}&pagenum=1&pagesize=50`);
  const poetsData = await resPoets.json();


  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();


  return {
    props: {
      initialPlacesData: placesData,
      initialPoetsData: poetsData,
      translations,
    },
    revalidate: 10,
  };

}
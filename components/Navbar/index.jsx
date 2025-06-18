// import React, { useContext, useEffect, useRef, useState } from "react";
// import styles from "./index.module.scss";
// import {
//   useScrollTrigger,
//   Slide,
//   AppBar,
//   Toolbar,
//   Container,
//   Typography,
// } from "@mui/material";
// import { Search } from "../../assets/svgsComponents";

// import { motion } from "framer-motion";
// import CssBaseline from "@mui/material/CssBaseline";
// import Link from "next/link";
// import { useRouter } from "next/router";

// import { FaCalendarAlt } from "react-icons/fa";
// import { MdLocationPin } from "react-icons/md";
// import Image from "next/image";

// import languagesData from "../../public/locales/allLanguagesData.json";

// import DataContext from "@/context/DataContext";

// function HideOnScroll(props) {
//   const { children } = props;
//   const trigger = useScrollTrigger();
//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

// const Navbar = (props) => {
//   const translationsFromContext = useContext(DataContext);

//   const router = useRouter();
//   // const [window, setWindow] = useState(undefined);
//   const [navMenu, setNavMenu] = useState(false);
//   const [langMenu, setLangMenu] = useState(false);

//   // useEffect(() => {
//   //   setWindow(window);
//   // }, []);

//   const variants = {
//     open: { opacity: 1, y: 0 },
//     closed: { opacity: 0, y: "-100%" },
//   };

//   const lineVariants = {
//     burger: {
//       rotate: 0,
//       translateY: 0,
//       opacity: 1,
//     },
//     cross: {
//       rotate: 45,
//       translateY: [0, 6, 6],
//       opacity: {
//         0: 1,
//         1: 0,
//         2: 1,
//       },
//     },
//   };

//   const middleLineVariants = {
//     burger: {
//       opacity: 1,
//     },
//     cross: {
//       opacity: 0,
//     },
//   };

//   const bottomLineVariants = {
//     burger: {
//       rotate: 0,
//       translateY: 0,
//     },
//     cross: {
//       rotate: -45,
//       translateY: -6,
//     },
//   };
//   const navMenuRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
//         setNavMenu(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [navMenuRef]);

//   // New Logic For Scoll Up
//   const [showNavbar, setShowNavbar] = useState(true);
//   const lastScrollY = useRef(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY < 100) {
//         setShowNavbar(true);
//       } else if (currentScrollY < lastScrollY.current) {
//         setShowNavbar(true); // scrolling up
//       } else {
//         setShowNavbar(false); // scrolling down
//       }

//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       {/* <HideOnScroll {...props}> */}

//       <motion.div
//         initial={{ y: 0 }}
//         animate={{ y: showNavbar ? 0 : -100 }}
//         transition={{ duration: 0.4, ease: "easeInOut" }}
//       >
//         <AppBar
//           className={styles.navbarHeader}
//           style={{
//             background: `#062a30`,
//           }}
//           elevation={0}
//         >
//           <Container maxWidth={false} className={styles.navbar}>
//             <div
//               className={styles.sec_container}
//               ref={navMenuRef}
//               dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
//             >
//               <>
//                 <motion.div
//                   initial="closed"
//                   animate={navMenu ? "open" : "closed"}
//                   variants={variants}
//                   transition={{ duration: 0.5, type: "tween" }}
//                   className={styles.nav_menu_container}
//                 >
//                   <div
//                     className={styles.links}
//                     onClick={() => setNavMenu(false)}
//                   >
//                     <Link
//                       href="/literary-eras"
//                       className={`${styles.link} ${
//                         router.pathname.includes("/literary-eras") &&
//                         styles.active
//                       }`}
//                     >
//                       <p>{translationsFromContext.age}</p>

//                       <div className={styles.icon_container}>
//                         <FaCalendarAlt />
//                       </div>
//                     </Link>

//                     <Link
//                       href="/places"
//                       className={`${styles.link} ${
//                         router.pathname.includes("/places") && styles.active
//                       }`}
//                     >
//                       <p>{translationsFromContext.place}</p>

//                       <div className={styles.icon_container}>
//                         <MdLocationPin />
//                       </div>
//                     </Link>

//                     <Link
//                       href="/treasury"
//                       className={`${styles.link} ${
//                         router.pathname.includes("/treasury") && styles.active
//                       }`}
//                     >
//                       <p>{translationsFromContext.poetryarchive}</p>

//                       <div className={styles.icon_container}>
//                         <img src={"/assets/imgs/PoetsTreasury.webp"} alt="" />
//                       </div>
//                     </Link>
//                     <Link
//                       href="/search"
//                       className={`${styles.link} ${
//                         router.pathname.includes("/search") && styles.active
//                       }`}
//                     >
//                       <p>{translationsFromContext.search}</p>

//                       <div className={styles.icon_container}>
//                         <Search />
//                       </div>
//                     </Link>

//                     <Link
//                       href="/poets-search"
//                       className={`${styles.link} ${
//                         router.pathname.includes("/poets-search") &&
//                         styles.active
//                       }`}
//                     >
//                       <p>{translationsFromContext.poets}</p>

//                       <div className={styles.icon_container}>
//                         <img src={"/assets/imgs/potriesIcon.webp"} alt="" />
//                       </div>
//                     </Link>
//                   </div>
//                 </motion.div>
//               </>

//               <motion.div
//                 initial="closed"
//                 animate={langMenu ? "open" : "closed"}
//                 variants={variants}
//                 transition={{ duration: 0.5, type: "tween" }}
//                 className={styles.lang_menu_container}
//               >
//                 <div className={styles.links}>
//                   {languagesData.map((language) => {
//                     if (router.locale !== language.shortCut) {
//                       return (
//                         <a
//                           href={`/${language.shortCut}${router.asPath}`}
//                           key={language.id}
//                           className={`${styles.link}`}
//                         >
//                           <p>{language?.shortCut?.toUpperCase()}</p>

//                           {language.image && (
//                             <div className={styles.icon_container}>
//                               <Image
//                                 src={language.image}
//                                 alt={`Flag of ${language.name}`}
//                                 width={20.7}
//                                 height={12.88}
//                               />
//                             </div>
//                           )}
//                         </a>
//                       );
//                     }
//                   })}
//                 </div>
//               </motion.div>

//               <div className={styles.logos_container}>
//                 <Link className={styles.logo} href={"/"}>
//                   <Image
//                     width={250}
//                     priority
//                     height={85}
//                     src={"/assets/imgs/logo.webp"}
//                     alt=""
//                   />
//                 </Link>

//                 <div
//                   className={styles.burger_icon}
//                   onClick={() => setNavMenu(!navMenu)}
//                 >
//                   <svg
//                     width="19"
//                     height="14"
//                     viewBox="0 0 19 14"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     {/* Top line */}
//                     <motion.path
//                       d="M1.39014 1H17.3901"
//                       stroke="#11292F"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       variants={lineVariants}
//                       animate={navMenu ? "cross" : "burger"}
//                     />
//                     {/* Middle line */}
//                     <motion.path
//                       d="M1.39014 7H17.3901"
//                       stroke="#11292F"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       variants={middleLineVariants}
//                       animate={navMenu ? "cross" : "burger"}
//                     />
//                     {/* Bottom line */}
//                     <motion.path
//                       d="M1.39014 13H17.3901"
//                       stroke="#11292F"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       variants={bottomLineVariants}
//                       animate={navMenu ? "cross" : "burger"}
//                     />
//                   </svg>
//                 </div>
//               </div>

//               <div className={styles.logos_container}>
//                 <div
//                   className={`${styles.lang} ${langMenu ? styles.active : ""}`}
//                   onClick={() => setLangMenu(!langMenu)}
//                 >
//                   <Typography>{router?.locale?.toUpperCase()}</Typography>
//                 </div>

//                 <Link className={styles.logo} href={"/"}>
//                   <Image
//                     width={250}
//                     priority
//                     height={85}
//                     src={"/assets/imgs/مهد الشعر العربي.webp"}
//                     alt=""
//                   />
//                 </Link>
//               </div>
//             </div>
//           </Container>
//         </AppBar>
//       </motion.div>

//       {/* </HideOnScroll> */}

//       <Toolbar />
//     </>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import {
  useScrollTrigger,
  Slide,
  AppBar as MuiAppBar,
  Toolbar,
  Container,
  Typography,
} from "@mui/material";
import { Search } from "../../assets/svgsComponents";

import { motion } from "framer-motion";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Image from "next/image";

import DataContext from "@/context/DataContext";

const MotionAppBar = motion.create(MuiAppBar);

const Navbar = () => {
  const translationsFromContext = useContext(DataContext);
  const router = useRouter();
  const [navMenu, setNavMenu] = useState(false);
  const navMenuRef = useRef(null);

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  const lineVariants = {
    burger: {
      rotate: 0,
      translateY: 0,
      opacity: 1,
    },
    cross: {
      rotate: 45,
      translateY: [0, 6, 6],
      opacity: {
        0: 1,
        1: 0,
        2: 1,
      },
    },
  };

  const middleLineVariants = {
    burger: {
      opacity: 1,
    },
    cross: {
      opacity: 0,
    },
  };

  const bottomLineVariants = {
    burger: {
      rotate: 0,
      translateY: 0,
    },
    cross: {
      rotate: -45,
      translateY: -6,
    },
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setNavMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navMenuRef]);

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setShowNavbar(true);
      } else if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MotionAppBar
        className={styles.navbarHeader}
        style={{
          background: `#062a30`,
        }}
        elevation={0}
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Container maxWidth={false} className={styles.navbar}>
          <div
            className={styles.sec_container}
            ref={navMenuRef}
            dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
          >
            <motion.div
              initial="closed"
              animate={navMenu ? "open" : "closed"}
              variants={variants}
              transition={{ duration: 0.5, type: "tween" }}
              className={styles.nav_menu_container}
            >
              <div className={styles.links} onClick={() => setNavMenu(false)}>
                <Link
                  href="/literary-eras"
                  className={`${styles.link} ${
                    router.pathname.includes("/literary-eras") && styles.active
                  }`}
                >
                  <p>{translationsFromContext.age}</p>
                  <div className={styles.icon_container}>
                    <FaCalendarAlt />
                  </div>
                </Link>
                <Link
                  href="/places"
                  className={`${styles.link} ${
                    router.pathname.includes("/places") && styles.active
                  }`}
                >
                  <p>{translationsFromContext.place}</p>
                  <div className={styles.icon_container}>
                    <MdLocationPin />
                  </div>
                </Link>
                <Link
                  href="/treasury"
                  className={`${styles.link} ${
                    router.pathname.includes("/treasury") && styles.active
                  }`}
                >
                  <p>{translationsFromContext.poetryarchive}</p>
                  <div className={styles.icon_container}>
                    <img src={"/assets/imgs/PoetsTreasury.webp"} alt="" />
                  </div>
                </Link>
                <Link
                  href="/search"
                  className={`${styles.link} ${
                    router.pathname.includes("/search") && styles.active
                  }`}
                >
                  <p>{translationsFromContext.search}</p>
                  <div className={styles.icon_container}>
                    <Search />
                  </div>
                </Link>
                <Link
                  href="/poets-search"
                  className={`${styles.link} ${
                    router.pathname.includes("/poets-search") && styles.active
                  }`}
                >
                  <p>{translationsFromContext.poets}</p>
                  <div className={styles.icon_container}>
                    <img src={"/assets/imgs/potriesIcon.webp"} alt="" />
                  </div>
                </Link>
              </div>
            </motion.div>

            <div className={styles.logos_container}>
              <Link className={styles.logo} href={"/"}>
                <Image
                  width={250}
                  priority
                  height={85}
                  src={"/assets/imgs/logo.webp"}
                  alt=""
                />
              </Link>

              <div
                className={styles.burger_icon}
                onClick={() => setNavMenu(!navMenu)}
              >
                <svg
                  width="19"
                  height="14"
                  viewBox="0 0 19 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M1.39014 1H17.3901"
                    stroke="#11292F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={lineVariants}
                    animate={navMenu ? "cross" : "burger"}
                  />
                  <motion.path
                    d="M1.39014 7H17.3901"
                    stroke="#11292F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={middleLineVariants}
                    animate={navMenu ? "cross" : "burger"}
                  />
                  <motion.path
                    d="M1.39014 13H17.3901"
                    stroke="#11292F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={bottomLineVariants}
                    animate={navMenu ? "cross" : "burger"}
                  />
                </svg>
              </div>
            </div>

            <div className={styles.logos_container}>
              {router.locales.map((language) => {
                if (router.locale !== language) {
                  return (
                    <Link
                      href={router.asPath}
                      key={language}
                      locale={language}
                      className={styles.lang}
                    >
                      {language?.toUpperCase()}
                    </Link>
                  );
                }
              })}

              <Link className={styles.logo} href={"/"}>
                <Image
                  width={250}
                  priority
                  height={85}
                  src={"/assets/imgs/مهد الشعر العربي.webp"}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </Container>
      </MotionAppBar>

      <div className="h-12 lg:h-16" />
    </>
  );
};

export default Navbar;

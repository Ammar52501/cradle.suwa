import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { styled } from "@mui/system";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Search } from "@/assets/svgsComponents";
import { MagnifyingGlass } from "react-loader-spinner";
import SliderVersesSearch from "@/components/PoetDetails/SliderVersesSearch";
import { useRouter } from "next/router";
import { REVALIDATE } from "@/lib/constant";

const PoetsSearch = ({ erasAllEras, dataDefault, translations }) => {
  const [age, setAge] = useState(0);
  const [filtredPoets, setFiltredPoets] = useState(dataDefault);
  const [poetsData, setPoetsData] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const handleChange = (event) => {
    const selectedValue = event.target.value; // This is the selected era ID from the dropdown
    setAge(selectedValue); // Update the selected era state

    let filteredData = [];

    if (selectedValue === 0) {
      filteredData = dataDefault;
    } else if (selectedValue === "bornInSaudi") {
      filteredData = dataDefault.filter((poet) => poet.bornInSaudi === true);
    } else if (selectedValue) {
      filteredData = dataDefault.filter(
        (poet) => poet.zamanId === selectedValue
      );
    } else {
      filteredData = dataDefault;
    }

    // Update the filtered poets state
    setFiltredPoets(filteredData);
    setCurrentPage(0);
  };

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      const normalizedSearchString = removeDiacritics(
        searchString.toLowerCase()
      );
      const filteredData = dataDefault.filter((poet) =>
        removeDiacritics(poet.name.toLowerCase()).includes(
          normalizedSearchString
        )
      );

      setFiltredPoets(filteredData);
      setIsLoading(false);
      setCurrentPage(0);
    } catch (error) {
      setError("Error occurred while filtering");
      setIsLoading(false);
    }
  }, [searchString, dataDefault]);

  const removeDiacritics = (text) => {
    const diacritics = "ًٌٍَُِّْ";
    for (let i = 0; i < diacritics.length; i++) {
      text = text.replace(new RegExp(diacritics[i], "g"), "");
    }
    return text;
  };

  const selectBoxStyles = {
    m: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: "10px 16px",
    width: "199px",
    height: "47px",
    borderRadius: "30px",
    marginRight: "0 !important",
    "@media (max-width: 600px)": {
      width: "140px",
      marginTop: "0",
      padding: "10px",
      paddingRight: "26px",
    },
    "@media (max-width: 450px)": {
      width: "100%",
    },

    ".css-b1884d": {
      "@media (max-width: 600px)": {
        width: "140px",
        marginTop: "0",
        padding: "10px",
        paddingRight: "26px",
      },
      "@media (max-width: 450px)": {
        width: "100%",
      },
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E5E6F2",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E5E6F2", // or any other color you want
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E5E6F2", // or any other color you want
    },

    ".MuiSelect-select": {
      display: "flex",
      flexDirection: "row-reverse",
      outline: "none !important",
      justifyContent: "space-between",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0px",
      width: "167px",
      height: "27px",
      paddingRight: "0px !important",
    },
    "#demo-select-small": {
      color: "var(--main-blue-color)",
      fontFamily: "var(--effra-font)",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      textAlign: "right",
      justifyContent: router.locale === "ar" ? "flex-end" : "flex-start",
    },
  };

  const CustomArrowIcon = styled(MdOutlineKeyboardArrowDown)({
    width: "25px",
    height: "25px",
    right: router.locale === "ar" ? "82% !important" : "4px",
    top: "19% !important",
    color: " #11292F",
  });

  const handlePoetsData = (data) => {
    setPoetsData(data);
  };

  const menuItemStyle = {
    fontFamily: "var(--effra-font)",
    direction: router.locale === "ar" ? "rtl" : "ltr",
    textAlign: "right",
    fontSize: "16px",
  };

  // TODO: add it to the head
  const description =
    "شُعراء العصور الأَدبيّة في مَناطِق المملكة العربيّة السُّعوديّة";

  return (
    <section
      id="poets"
      className={styles.poets}
      dir={`${router.locale === "ar" ? "rtl" : "ltr"}`}
    >
      <Container maxWidth={false}>
        <div className={styles.tabContent_container} dir="rtl">
          <section className={styles.timelineSection}>
            <div className={styles.sec_title}>
              <Typography variant="h3">{translations.poets}</Typography>
            </div>
            <div className={styles.slider_container}>
              <div className={styles.filter_sec}>
                <div className={styles.shows}>
                  <Typography>
                    {` `}
                    {translations.show} {` `}
                    <span>{poetsData?.length}</span>
                    {` `}
                    {translations.of}
                    <span>{filtredPoets?.length}</span>
                    {` `}
                  </Typography>
                </div>
                <div className={styles.filter_methods}>
                  <div className={styles.box}>
                    <div className={styles.form_container}>
                      <input
                        type="text"
                        placeholder={translations.searchbypoet}
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      />
                      <div
                        className={styles.icon_container}
                        onClick={handleSearch}
                      >
                        {isLoading ? (
                          <MagnifyingGlass
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="MagnifyingGlass-loading"
                            wrapperStyle={{}}
                            wrapperClass="MagnifyingGlass-wrapper"
                            glassColor="#c0efff"
                            color="rgba(151, 155, 182, 1)"
                          />
                        ) : (
                          <Search />
                        )}
                      </div>

                      {error && <div>Error: {error.message}</div>}
                    </div>
                  </div>
                  <div className={styles.box}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={age}
                        sx={selectBoxStyles}
                        onChange={handleChange}
                        IconComponent={CustomArrowIcon}
                      >
                        <MenuItem value={0} sx={menuItemStyle}>
                          {translations.allages}
                        </MenuItem>
                        <MenuItem value={"bornInSaudi"} sx={menuItemStyle}>
                          {translations.poetswholivedintheKingdomofSaudiArabia}
                        </MenuItem>
                        {erasAllEras?.map((era) => (
                          <MenuItem
                            key={era.id}
                            value={era.id}
                            sx={menuItemStyle}
                          >
                            {era.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="slider">
                <SliderVersesSearch
                  filtredPoets={filtredPoets}
                  onPoetsDataChange={handlePoetsData}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>

              {filtredPoets?.length === 0 && (
                <Box sx={{ textAlign: "center" }}>
                  <h1>
                    {translations.noResults} {searchString}
                  </h1>
                </Box>
              )}
            </div>

            <div className={styles.text_container}>
              <p>{translations.drawDesc}</p>
            </div>
          </section>
        </div>
      </Container>
    </section>
  );
};

export default PoetsSearch;

export async function getStaticProps({ locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];
  try {
    const resAllEras = await fetch(
      `${apiDomain}/api/Zaman/GetAllEras?lang=${langId}&pagenum=1&pagesize=50`
    );
    if (!resAllEras.ok) {
      throw new Error(`Error fetching eras data: ${resAllEras.status}`);
    }
    const erasAllEras = await resAllEras.json();

    const resDefault = await fetch(
      `${apiDomain}/api/Poets/GetAllPoets?lang=${langId}&pagenum=1&pagesize=50`
    );
    if (!resDefault.ok) {
      throw new Error(`Error fetching poets data: ${resDefault.status}`);
    }
    const dataDefault = await resDefault.json();

    const resTranslations = await fetch(
      `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
    );
    const translations = await resTranslations.json();

    return {
      props: {
        erasAllEras,
        dataDefault,
        translations,
        title: translations.explorePoets,
      },
      revalidate: REVALIDATE,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: error.message,
      },
      revalidate: 10,
    };
  }
}

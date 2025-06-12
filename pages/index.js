import styles from "@/styles/Home.module.css";
import LandingPage from "@/components/LandingPage";

export async function getStaticProps({ locale }) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const langIdEnvKey = `LANG_ID_${locale?.toUpperCase()}`;
  const langId = process.env[langIdEnvKey];
  const resTranslations = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await resTranslations.json();

  return {
    props: {
      translations,
    },
  };
}

export default function Home({ translations }) {
  return (
    <>
      <div className={`${styles.main}`} dir="rtl">
        <LandingPage translations={translations} />
      </div>
    </>
  );
}

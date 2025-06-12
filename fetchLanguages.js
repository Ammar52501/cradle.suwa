const fetch = require("node-fetch").default;
const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join("public", "locales");

const apiDomain = "https://api4z.suwa.io";
async function fetchAndCreateTranslations(langId, shortCut) {
  const response = await fetch(
    `${apiDomain}/api/Settings/GetStaticWords?lang=${langId}`
  );
  const translations = await response.json();

  const langDir = path.join(LOCALES_DIR, shortCut);
  if (!fs.existsSync(langDir)) fs.mkdirSync(langDir);

  const translationsFile = path.join(langDir, "common.json");
  fs.writeFileSync(translationsFile, JSON.stringify(translations, null, 2));
}

async function fetchLanguages() {
  const response = await fetch(
    `${apiDomain}/api/Settings/GetAllLanguages`
  );
  const languages = await response.json();
  if (!fs.existsSync(LOCALES_DIR)) fs.mkdirSync(LOCALES_DIR);

  for (const lang of languages) {
    if (lang.publishedForUser)
      await fetchAndCreateTranslations(lang.id, lang.shortCut);
  }
}

fetchLanguages();

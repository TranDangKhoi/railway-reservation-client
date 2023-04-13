import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "src/locales/en/homepage.json";
import NAVBAR_EN from "src/locales/en/navbar.json";
import HOME_VI from "src/locales/vi/homepage.json";
import NAVBAR_VI from "src/locales/vi/navbar.json";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
  en: {
    homepage: HOME_EN,
    navbar: NAVBAR_EN,
  },
  vi: {
    homepage: HOME_VI,
    navbar: NAVBAR_VI,
  },
};

const defaultNS = "homepage";

use(initReactI18next).init({
  resources,
  lng: (localStorage.getItem("lng") as string) || "vi",
  ns: ["navbar", "homepage"],
  defaultNS,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;

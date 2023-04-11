import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";
// import HOME_EN from "src/locales/en/homepage.json";
// import NAVBAR_EN from "src/locales/en/navbar.json";
// import HOME_VI from "src/locales/vi/homepage.json";
// import NAVBAR_VI from "src/locales/vi/navbar.json";
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

// const resources = {
//   en: {
//     home: HOME_EN,
//     navbar: NAVBAR_EN,
//   },
//   vi: {
//     home: HOME_VI,
//     navbar: NAVBAR_VI,
//   },
// } as const;

const resources = {
  en: {
    translation: {
      "ticket book": "Booking",
      "ticket find": "Ticket check",
      "ticket return": "Return tickets",
      "departure station": "Departure Station",
      "departure select": "Select departure station",
      "arrival station": "Arrival Station",
      "arrival select": "Select arrival station",
      "departure time": "Departure time",
      "one-way": "One-way",
      search: "Search",
      "sign up": "Sign up",
      "sign in": "Sign in",
    },
  },
  vi: {
    translation: {
      "ticket book": "Đặt vé",
      "ticket find": "Tra cứu vé",
      "ticket return": "Trả vé",
      "departure station": "Ga đi",
      "departure select": "Chọn ga đi",
      "arrival station": "Ga đến",
      "arrival select": "Chọn ga đến",
      "departure time": "Ngày đi",
      "one-way": "Một chiều",
      search: "Tìm kiếm",
      "sign up": "Đăng ký",
      "sign in": "Đăng nhập",
    },
  },
};

// const defaultNS = "home";

use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lng") as string,
  // ns: ["navbar", "home"],
  // defaultNS,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;

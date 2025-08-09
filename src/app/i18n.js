import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../public/locales/en/translation.json";
import hu from "../../public/locales/hu/translation.json";
import ro from "../../public/locales/ro/translation.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: en },
      hu: { translation: hu },
      ro: { translation: ro },
    },
    react: { useSuspense: false },
  });
}

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    debug: true,
    ns: [
      "common",
      "landing",
      "hero",
      "services",
      "projects",
      "technologies",
      "reviews",
      "tracking",
      "tracking-landing",
      "whatsapp",
    ],
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

i18n.on("initialized", () => {
  console.log("i18next initialized with language:", i18n.language);
});
i18n.on("loaded", (loaded) => {
  console.log("i18next resources loaded:", loaded);
});
i18n.on("failedLoading", (lng, ns, msg) => {
  console.error(`i18next loading failed for ${lng}/${ns}: ${msg}`);
});

export default i18n;

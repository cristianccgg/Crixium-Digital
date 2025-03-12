import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Función para manejar variantes regionales
function handleRegionalVariants(detectedLng, fallbackLng) {
  // Si es una variante regional (como es-419, es-MX, etc.)
  if (detectedLng && detectedLng.indexOf("-") > -1) {
    const mainLang = detectedLng.split("-")[0];
    // Usar el idioma principal como fallback para variantes regionales
    return [detectedLng, mainLang, fallbackLng];
  }
  return [detectedLng, fallbackLng];
}

const initI18n = () => {
  return i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: (lng) => handleRegionalVariants(lng, "es"),
      debug: import.meta.env.DEV, // Solo habilita debug en desarrollo
      ns: [
        "navbar",
        "audio-portfolio",
        "checkout-web",
        "common",
        "contact-form",
        "contact-page",
        "cta",
        "featured-projects",
        "footer",
        "hero",
        "music-production",
        "order-tracking",
        "pricing-section-web",
        "projects",
        "reviews",
        "sampleOrders",
        "schema",
        "seo",
        "services",
        "stats",
        "technologies",
        "tracking-preview",
        "tracking",
        "web-development",
        "whatsapp",
        "whytochoose",
      ],
      defaultNS: "common",
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: true, // Habilitando suspense
      },
      detection: {
        // Cambio en el orden: path primero para que la URL tenga prioridad
        order: ["path", "localStorage", "navigator"],
        caches: ["localStorage"],
        lookupFromPathIndex: 0,
        checkWhitelist: true,
      },
      load: "languageOnly",
      preload: ["es", "en"], // Precarga estos idiomas
    });
};

// Inicializa i18n y devuelve la promesa
const i18nInstance = initI18n();

// Solo registra eventos en modo desarrollo
if (import.meta.env.DEV) {
  i18n.on("initialized", () => {
    console.log("i18next initialized with language:", i18n.language);
  });
  i18n.on("loaded", (loaded) => {
    console.log("i18next resources loaded:", loaded);
  });
}

// Mantén siempre los errores de carga, son importantes incluso en producción
i18n.on("failedLoading", (lng, ns, msg) => {
  console.error(`i18next loading failed for ${lng}/${ns}: ${msg}`);
});

export { i18nInstance }; // Exporta la promesa de inicialización
export default i18n;

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const { t, i18n } = useTranslation("cookies");
  const [isVisible, setIsVisible] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Siempre activo
    preferences: false,
    statistics: false,
    marketing: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [userRegion, setUserRegion] = useState("default");

  // Detectar región del usuario
  useEffect(() => {
    const detectUserRegion = async () => {
      try {
        // Opción simple sin dependencias externas (solo IP)
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        // Detectamos regiones específicas para aplicar diferentes normas
        if (data.country_code) {
          if (
            [
              "AT",
              "BE",
              "BG",
              "HR",
              "CY",
              "CZ",
              "DK",
              "EE",
              "FI",
              "FR",
              "DE",
              "GR",
              "HU",
              "IE",
              "IT",
              "LV",
              "LT",
              "LU",
              "MT",
              "NL",
              "PL",
              "PT",
              "RO",
              "SK",
              "SI",
              "ES",
              "SE",
              "GB",
            ].includes(data.country_code)
          ) {
            setUserRegion("gdpr"); // Región GDPR (Europa)
          } else if (data.country_code === "US" && data.region_code === "CA") {
            setUserRegion("ccpa"); // California (CCPA)
          } else if (data.country_code === "BR") {
            setUserRegion("lgpd"); // Brasil (LGPD)
          } else {
            setUserRegion("default");
          }
        }
      } catch (error) {
        console.error("Error detecting region:", error);
        setUserRegion("default");
      }
    };

    detectUserRegion();
  }, []);

  // Verificar si las cookies ya han sido aceptadas
  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent");

    if (!cookieConsent) {
      setIsVisible(true);
    } else {
      try {
        const savedSettings = JSON.parse(cookieConsent);
        setCookieSettings(savedSettings);

        // Aplicar configuraciones guardadas
        applyGoogleAnalytics(savedSettings.statistics);
      } catch (e) {
        // Si hay un error en el JSON, mostramos el banner de nuevo
        setIsVisible(true);
      }
    }
  }, []);

  // Aplicar Firebase Analytics basado en las preferencias del usuario
  const applyGoogleAnalytics = (enabled) => {
    // Push consent state to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consent_update",
      analytics_consent: enabled ? "granted" : "denied",
    });

    if (enabled) {
      // Habilitar Firebase Analytics
      // Importamos dinámicamente las funciones de Firebase Analytics
      import("firebase/analytics").then(
        ({ isSupported, getAnalytics, logEvent }) => {
          isSupported().then((supported) => {
            if (supported) {
              // Habilitar Firebase Analytics importando de nuestro archivo firebase.js
              import("./firebase").then(({ analytics }) => {
                // Aquí podríamos enviar un evento de que el usuario ha aceptado analytics
                if (analytics) {
                  logEvent(analytics, "cookies_accepted");
                  // Almacenar en sessionStorage que analytics está permitido
                  sessionStorage.setItem("analytics-enabled", "true");
                }
              });
            }
          });
        }
      );
    } else {
      // Desactivar Firebase Analytics
      // En lugar de desactivar completamente, simplemente marcamos que no está permitido
      sessionStorage.setItem("analytics-enabled", "false");

      // Limpiar cookies de Firebase Analytics (principalmente para ser exhaustivos)
      const cookiesToDelete = ["_ga", "_gat", "_gid", "_ga_11J6Q97KD0"];
      cookiesToDelete.forEach((cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    }
  };

  // Guardar preferencias y cerrar el banner
  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(cookieSettings));
    applyGoogleAnalytics(cookieSettings.statistics);
    setIsVisible(false);
  };

  // Aceptar todas las cookies
  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      preferences: true,
      statistics: true,
      marketing: true,
    };
    setCookieSettings(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    applyGoogleAnalytics(true);
    setIsVisible(false);
  };

  // Rechazar todas las cookies excepto las esenciales
  const declineAll = () => {
    const essentialOnly = {
      essential: true,
      preferences: false,
      statistics: false,
      marketing: false,
    };
    setCookieSettings(essentialOnly);
    localStorage.setItem("cookie-consent", JSON.stringify(essentialOnly));
    applyGoogleAnalytics(false);
    setIsVisible(false);
  };

  // Manejar cambios en las configuraciones de cookies
  const handleCookieToggle = (cookieType) => {
    setCookieSettings({
      ...cookieSettings,
      [cookieType]: !cookieSettings[cookieType],
    });
  };

  // Abrir el panel de preferencias de cookies
  const openCookieSettings = () => {
    setIsVisible(true);
    setShowSettings(true);
  };

  // Si no es visible, mostramos solo el botón para abrir la configuración
  if (!isVisible) {
    return (
      <button
        onClick={openCookieSettings}
        className="fixed bottom-4 left-4 z-50 rounded-full bg-purple-600 p-2 text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label={t("openSettings")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    );
  }

  // Adaptar mensaje según la región
  const getRegionSpecificMessage = () => {
    switch (userRegion) {
      case "gdpr":
        return t(
          "gdprSpecific",
          "De acuerdo con la legislación europea (GDPR), necesitamos tu consentimiento explícito para utilizar cookies."
        );
      case "ccpa":
        return t(
          "ccpaSpecific",
          "Según la ley de California (CCPA), tienes derecho a opt-out de la venta de tu información personal."
        );
      case "lgpd":
        return t(
          "lgpdSpecific",
          "De acuerdo con la LGPD brasileña, te informamos sobre la recopilación de tus datos."
        );
      default:
        return "";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 p-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-purple-700">
                {t("title")}
              </h2>
              <p className="text-gray-600 mt-1">
                {t("description")}{" "}
                <Link
                  to={
                    i18n.language === "en"
                      ? "/en/privacy-policy"
                      : "/privacy-policy"
                  }
                  className="text-purple-600 hover:text-purple-800"
                >
                  {t("privacyLink")}
                </Link>
              </p>
              {getRegionSpecificMessage() && (
                <p className="text-gray-600 mt-1 text-sm italic">
                  {getRegionSpecificMessage()}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t("customize", "Personalizar")}
              </button>
              <button
                onClick={declineAll}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t("decline")}
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-purple-600 rounded-md text-white hover:bg-purple-700"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-purple-700">
                {t("customize", "Personalizar cookies")}
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Cookies Esenciales */}
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-purple-700">
                    {t(
                      "section4.cookieTypes.essential.title",
                      "Cookies esenciales"
                    )}
                  </h3>
                  <div className="relative inline-block w-10 mr-2 align-middle">
                    <input
                      type="checkbox"
                      checked={cookieSettings.essential}
                      disabled
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-not-allowed"
                    />
                    <label className="toggle-label block overflow-hidden h-6 rounded-full bg-purple-600 cursor-not-allowed"></label>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {t(
                    "section4.cookieTypes.essential.purpose",
                    "Son imprescindibles para el funcionamiento básico del sitio web."
                  )}
                </p>
              </div>

              {/* Cookies de Preferencias */}
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-purple-700">
                    {t(
                      "section4.cookieTypes.preferences.title",
                      "Cookies de preferencias"
                    )}
                  </h3>
                  <div className="relative inline-block w-10 mr-2 align-middle">
                    <input
                      type="checkbox"
                      id="preferences-toggle"
                      checked={cookieSettings.preferences}
                      onChange={() => handleCookieToggle("preferences")}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="preferences-toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      style={{
                        backgroundColor: cookieSettings.preferences
                          ? "#9333ea"
                          : "#d1d5db",
                      }}
                    ></label>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {t(
                    "section4.cookieTypes.preferences.purpose",
                    "Permiten que nuestro sitio web recuerde información que cambia la forma en que se comporta o se ve."
                  )}
                </p>
              </div>

              {/* Cookies Estadísticas */}
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-purple-700">
                    {t(
                      "section4.cookieTypes.statistics.title",
                      "Cookies estadísticas"
                    )}
                  </h3>
                  <div className="relative inline-block w-10 mr-2 align-middle">
                    <input
                      type="checkbox"
                      id="statistics-toggle"
                      checked={cookieSettings.statistics}
                      onChange={() => handleCookieToggle("statistics")}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="statistics-toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      style={{
                        backgroundColor: cookieSettings.statistics
                          ? "#9333ea"
                          : "#d1d5db",
                      }}
                    ></label>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {t(
                    "section4.cookieTypes.statistics.purpose",
                    "Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web."
                  )}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {t(
                    "section4.cookieTypes.statistics.examples",
                    "Utilizamos Google Analytics para analizar el uso de nuestro sitio."
                  )}
                </p>
              </div>

              {/* Cookies de Marketing */}
              <div className="p-3 border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-purple-700">
                    {t(
                      "section4.cookieTypes.marketing.title",
                      "Cookies de marketing"
                    )}
                  </h3>
                  <div className="relative inline-block w-10 mr-2 align-middle">
                    <input
                      type="checkbox"
                      id="marketing-toggle"
                      checked={cookieSettings.marketing}
                      onChange={() => handleCookieToggle("marketing")}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="marketing-toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                      style={{
                        backgroundColor: cookieSettings.marketing
                          ? "#9333ea"
                          : "#d1d5db",
                      }}
                    ></label>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {t(
                    "section4.cookieTypes.marketing.purpose",
                    "Rastrean tu actividad de navegación en nuestro sitio web y en otros sitios para entregar publicidad más relevante."
                  )}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={declineAll}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t("rejectAll", "Rechazar todo")}
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t("acceptAll", "Aceptar todo")}
              </button>
              <button
                onClick={savePreferences}
                className="px-4 py-2 text-sm bg-purple-600 rounded-md text-white hover:bg-purple-700"
              >
                {t("savePreferences", "Guardar preferencias")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Estilos para los toggles */}
      <style jsx="true">{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #9333ea;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #9333ea;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;

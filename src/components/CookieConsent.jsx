import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation("cookies");

  // Función para generar URLs localizadas
  const getLocalizedPath = (path) => {
    if (i18n.language === "en") {
      return path === "/" ? "/en" : `/en${path}`;
    }
    return path;
  };

  useEffect(() => {
    // Verificar si el usuario ya ha dado su consentimiento
    const consent = localStorage.getItem("cookieConsent");

    // Si no hay consentimiento guardado, mostrar el banner
    if (!consent) {
      // Pequeño retraso para evitar que aparezca inmediatamente al cargar la página
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Guardar el consentimiento en localStorage
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    // Guardar la denegación en localStorage
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);

    // Aquí podrías tener lógica adicional para deshabilitar cookies no esenciales
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto p-4 md:p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label={t("close")}
        >
          <X size={20} />
        </button>

        <div className="md:flex items-center justify-between">
          <div className="md:pr-8 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              {t("title")}
            </h3>
            <p className="text-gray-600">
              {t("description")}{" "}
              <Link
                to={getLocalizedPath("/privacy-policy")}
                className="text-purple-700 underline hover:text-purple-900"
              >
                {t("privacyLink")}
              </Link>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDecline}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t("decline")}
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

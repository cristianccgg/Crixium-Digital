import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Componente para sincronizar el idioma con la ruta actual
 * Este componente garantiza que el idioma se establezca correctamente
 * según la URL, independientemente de la configuración local
 */
const LanguageRouter = ({ children }) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Detectar idioma basado en la ruta
    const path = location.pathname;

    // Si la ruta comienza con /en, establecer idioma a inglés
    if (path.startsWith("/en") && i18n.language !== "en") {
      i18n.changeLanguage("en");
      console.log("Cambiando idioma a inglés basado en la URL");
    }
    // Si la ruta no comienza con /en, establecer idioma a español
    else if (!path.startsWith("/en") && i18n.language !== "es") {
      i18n.changeLanguage("es");
      console.log("Cambiando idioma a español basado en la URL");
    }
  }, [location.pathname, i18n]);

  return <>{children}</>;
};

export default LanguageRouter;

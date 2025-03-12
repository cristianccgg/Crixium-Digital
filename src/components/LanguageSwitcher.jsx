// src/components/LanguageSwitcher.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    // Cambiar el idioma en i18n
    i18n.changeLanguage(lng);

    // Obtener la ruta actual
    const currentPath = location.pathname;

    // Construir la nueva URL basada en el idioma
    let newPath;
    if (lng === "en") {
      // Si cambiamos a inglés, añadir /en/ al inicio (a menos que ya esté)
      newPath = currentPath.startsWith("/en")
        ? currentPath
        : `/en${currentPath}`;
    } else {
      // Si cambiamos a español, quitar /en/ del inicio
      newPath = currentPath.startsWith("/en")
        ? currentPath.substring(3)
        : currentPath;
      if (newPath === "") newPath = "/"; // Si queda vacío, usar la raíz
    }

    // Navegar a la nueva URL
    navigate(newPath);

    // Cerrar el menú desplegable
    setIsOpen(false);
  };

  // Obtener texto del idioma actual para mostrar
  const getCurrentLanguageText = () => {
    return i18n.language === "es" ? "ES" : "EN";
  };

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-coral-400 transition-all duration-300 hover:scale-105"
      >
        <Globe size={16} className="text-white" />
        <span className="font-medium text-sm">{getCurrentLanguageText()}</span>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg z-50 overflow-hidden transition-all duration-300 animate-fade-in">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => changeLanguage("es")}
              className={`flex items-center w-full px-4 py-2 text-sm gap-2 transition-colors duration-200 ${
                i18n.language === "es"
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              role="menuitem"
            >
              <span className="text-lg">🇪🇸</span>
              <span>Español</span>
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`flex items-center w-full px-4 py-2 text-sm gap-2 transition-colors duration-200 ${
                i18n.language === "en"
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              role="menuitem"
            >
              <span className="text-lg">🇺🇸</span>
              <span>English</span>
            </button>
          </div>
        </div>
      )}

      {/* Capa para cerrar el menú al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

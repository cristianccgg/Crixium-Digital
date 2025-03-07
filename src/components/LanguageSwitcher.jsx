// src/components/LanguageSwitcher.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Obtener texto del idioma actual para mostrar
  const getCurrentLanguageText = () => {
    return i18n.language === "es" ? "ES" : "EN";
  };

  // Obtener la bandera del idioma actual
  const getCurrentLanguageFlag = () => {
    return i18n.language === "es" ? "🇪🇸" : "🇺🇸";
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

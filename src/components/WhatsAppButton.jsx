import React, { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhatsAppButton = () => {
  const { t } = useTranslation("whatsapp");
  const [isTooltipVisible, setIsTooltipVisible] = useState(true); // Mostrar tooltip por defecto al inicio
  const [hasClosedTooltip, setHasClosedTooltip] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  // Detectar la página actual para personalizar el mensaje
  React.useEffect(() => {
    const path = window.location.pathname;
    setCurrentPage(path);
  }, []);

  const openWhatsApp = () => {
    // Número con código de país (personalizar según ubicación)
    const phoneNumber = "573219746045";

    // Mensaje predefinido dinámico según la página
    let message = t("message");

    if (currentPage.includes("web-development")) {
      message = t("message-web");
    } else if (currentPage.includes("music-production")) {
      message = t("message-music");
    } else if (currentPage.includes("contact")) {
      message = t("message-contact");
    }

    // URL de WhatsApp
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isTooltipVisible && !hasClosedTooltip && (
        <div className="hidden md:block absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 w-64 text-sm text-gray-700 border border-gray-200 animate-fade-in">
          <button
            className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
            onClick={() => {
              setIsTooltipVisible(false);
              setHasClosedTooltip(true);
            }}
          >
            <X size={14} />
          </button>
          <p className="font-medium text-gray-900 mb-1">{t("title")}</p>
          <p>{t("subtitle")}</p>
        </div>
      )}

      <div className="flex flex-col items-center">
        <button
          onClick={openWhatsApp}
          onMouseEnter={() => setIsTooltipVisible(true)}
          className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-xl transition-all duration-300 animate-pulse"
          aria-label="Contactar por WhatsApp"
        >
          {/* Logo oficial de WhatsApp en SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 175.216 175.552"
            width="32"
            height="32"
          >
            <defs>
              <linearGradient
                id="a"
                x1="85.915"
                x2="86.535"
                y1="32.567"
                y2="137.092"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#57d163" />
                <stop offset="1" stopColor="#23b33a" />
              </linearGradient>
            </defs>
            <path
              fill="#fff"
              d="M87.4 13.764c-40.88 0-74.255 33.433-74.293 74.384-.0138 13.165 3.4564 26.013 10.05 37.356L.1763 175.294l51.018-13.345c10.916 5.953 23.232 9.0886 35.693 9.0991h.03c40.903 0 74.256-33.437 74.296-74.379.0137-19.862-7.7214-38.56-21.757-52.626-14.046-14.051-32.726-21.807-52.588-21.821-.0137-.001-.027-.0017-.0413-.0017Z"
            />
            <path
              fill="url(#a)"
              d="M87.4 25.131c-34.636 0-62.845 28.259-62.878 63.047-.0115 11.165 2.9281 22.044 8.5178 31.648l-9.0043 32.893 33.685-8.8436c9.242 5.0342 19.691 7.6921 30.278 7.7010h.0253c34.675 0 62.87-28.26 62.901-63.039.0122-16.835-6.5412-32.689-18.442-44.609-11.903-11.92-27.745-18.503-44.569-18.516-.0115-.0007-.023-.0015-.035-.0015Z"
            />
            <path
              fill="#fff"
              d="m65.201 51.898c-1.416-.3166-3.336-.7276-5.461.4494s-6.59 6.577-6.59 16.01c0 9.433 6.875 18.521 7.842 19.792 1.011 1.273 13.964 21.848 33.917 30.029 16.76 6.906 20.184 5.539 23.802 5.19 3.619-.3456 11.632-4.723 13.242-9.283 1.615-4.558 1.615-8.455 1.15-9.283-.4644-.8292-1.773-1.3299-3.706-2.3177-1.927-.9971-11.426-5.576-13.152-6.224-1.738-.6375-3-1.011-4.268.9925-1.273 1.997-4.917 6.218-6.031 7.491-1.115 1.273-2.229 1.432-4.156.4256-1.934-.9832-8.161-2.96-15.552-9.498-5.743-5.077-9.614-11.346-10.723-13.276-1.115-1.931-.1135-3.055.8383-3.989.8614-.824 1.927-2.155 2.873-3.236.9547-1.065 1.273-1.847 1.891-3.12.6282-1.273.3097-2.365-.1589-3.325-.4494-.9557-4.0276-10.062-5.698-13.681"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;

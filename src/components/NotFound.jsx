import React from "react";
import { Link } from "react-router-dom";
import { Home, MessageCircle, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import SimpleSEO from "./SEO/SimpleSEO";

const NotFound = () => {
  const { t, i18n } = useTranslation("not-found");
  const isES = i18n.language?.startsWith("es");
  const homeUrl = isES ? "/" : "/en";

  const whatsappUrl = `https://wa.me/573219746045?text=${encodeURIComponent(
    isES
      ? "Hola, estaba navegando en su sitio web y no encontré lo que buscaba. ¿Pueden ayudarme?"
      : "Hi, I was browsing your website and couldn't find what I was looking for. Can you help me?"
  )}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <SimpleSEO
        titleKey="not-found:seo.title"
        descriptionKey="not-found:seo.description"
        noIndex={true}
      />
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-purple-700 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={homeUrl}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors duration-300"
          >
            <Home size={18} />
            <span>{t("backHome")}</span>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            <MessageCircle size={18} />
            <span>{t("contactUs")}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

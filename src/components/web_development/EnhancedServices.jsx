import React, { useState } from "react";
import { Globe, Music2, ChevronRight, Code, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EnhancedServiceCard = ({
  icon: Icon,
  title,
  description,
  link,
  color,
  features,
}) => {
  const { t } = useTranslation("services");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 relative overflow-hidden ${
        isHovered ? "transform scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative background elements */}
      <div
        className={`absolute -right-16 -top-16 w-32 h-32 rounded-full ${color} opacity-10 transition-all duration-700 ${
          isHovered ? "scale-150" : ""
        }`}
      ></div>
      <div
        className={`absolute -left-16 -bottom-16 w-32 h-32 rounded-full ${color} opacity-10 transition-all duration-700 ${
          isHovered ? "scale-150" : ""
        }`}
      ></div>

      {/* Main content */}
      <div className="relative z-10">
        <div
          className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 ${
            isHovered ? "rotate-12" : ""
          }`}
        >
          <Icon className="text-white" size={28} />
        </div>

        <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>

        {/* Feature list */}
        <div className="mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <Star size={14} className="text-yellow-400 mr-2" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <Link
          to={link}
          className={`group text-white px-6 py-3 rounded-lg flex items-center text-sm font-medium transition-all duration-300 ${color} hover:opacity-90`}
        >
          {t("exploreButton")}
          <ChevronRight
            size={18}
            className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

const EnhancedServices = () => {
  const { t } = useTranslation("services");
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <EnhancedServiceCard
        icon={Globe}
        title={t("web.title")}
        description={t("web.description")}
        link="/web-development"
        color="bg-purple-700"
        features={[
          t("web.features.first"),
          t("web.features.second"),
          t("web.features.third"),
          t("web.features.fourth"),
          t("web.features.fifth"),
        ]}
      />

      <EnhancedServiceCard
        icon={Music2}
        title="Producción Musical"
        description="Creamos la identidad sonora de tu marca con jingles, spots publicitarios y música original que conecta emocionalmente con tu audiencia."
        link="/music-production"
        color="bg-purple-800"
        features={[
          t("music.features.first"),
          t("music.features.second"),
          t("music.features.third"),
          t("music.features.fourth"),
          t("music.features.fifth"),
        ]}
      />
    </div>
  );
};

export default EnhancedServices;

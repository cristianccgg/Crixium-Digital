import React, { useState } from "react";
import { Globe, Music2, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EnhancedServiceCard = ({
  icon: Icon,
  title,
  description,
  link,
  color,
  features,
  isPrimary = false,
}) => {
  const { t } = useTranslation("services");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative overflow-hidden ${
        isPrimary
          ? "p-8 md:p-10 border-2 border-purple-200"
          : "p-6 md:p-8 border border-gray-100"
      } ${isHovered ? "transform scale-[1.02]" : ""}`}
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
      <div
        className={`relative z-10 ${isPrimary ? "md:flex md:gap-10 md:items-start" : ""}`}
      >
        <div className={isPrimary ? "md:flex-1" : ""}>
          <div
            className={`${isPrimary ? "w-16 h-16" : "w-12 h-12"} ${color} rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 ${
              isHovered ? "rotate-12" : ""
            }`}
          >
            <Icon className="text-white" size={isPrimary ? 28 : 22} />
          </div>

          <h3
            className={`${isPrimary ? "text-2xl md:text-3xl" : "text-xl"} font-bold mb-3 text-gray-800`}
          >
            {title}
          </h3>
          <p
            className={`text-gray-600 mb-6 ${isPrimary ? "text-base" : "text-sm"}`}
          >
            {description}
          </p>
        </div>

        <div className={isPrimary ? "md:flex-1" : ""}>
          {/* Feature list */}
          <div
            className={`mb-6 ${isPrimary ? "md:grid md:grid-cols-2 md:gap-x-4" : ""}`}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <Star
                  size={14}
                  className="text-yellow-400 mr-2 flex-shrink-0"
                />
                <span
                  className={`${isPrimary ? "text-sm" : "text-xs"} text-gray-700`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <Link
            to={link}
            className={`group text-white px-6 py-3 rounded-lg flex items-center text-sm font-medium transition-all duration-300 ${color} hover:opacity-90 w-fit`}
          >
            {t("exploreButton")}
            <ChevronRight
              size={18}
              className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

const EnhancedServices = () => {
  const { t } = useTranslation("services");
  return (
    <div className="space-y-6">
      {/* Servicio principal - Desarrollo Web */}
      <EnhancedServiceCard
        icon={Globe}
        title={t("web.title")}
        description={t("web.description")}
        link="/web-development"
        color="bg-purple-700"
        isPrimary={true}
        features={[
          t("web.features.first"),
          t("web.features.second"),
          t("web.features.third"),
          t("web.features.fourth"),
          t("web.features.fifth"),
        ]}
      />

      {/* Servicio secundario - Producción Musical */}
      <EnhancedServiceCard
        icon={Music2}
        title={t("music.title")}
        description={t("music.description")}
        link="/music-production"
        color="bg-purple-800"
        isPrimary={false}
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

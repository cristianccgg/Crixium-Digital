import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Importamos useTranslation
import {
  Code,
  Layout,
  Smartphone,
  PenTool,
  ShoppingCart,
  Globe,
  FileCode,
  Zap,
} from "lucide-react";

const TechBadge = ({ name, icon: Icon, delay }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center transition-all duration-500 animate-fade-in-up"
      style={{ animationDelay: `${delay * 100}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`
          w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-3
          transition-all duration-500 relative overflow-hidden
          ${hover ? "bg-purple-700 shadow-lg scale-110" : "bg-purple-100"}
        `}
      >
        <Icon
          size={hover ? 32 : 28}
          className={`transition-all duration-500 ${
            hover ? "text-white" : "text-purple-700"
          }`}
        />

        {/* Animated background elements */}
        <div
          className={`
          absolute -bottom-6 -right-6 w-12 h-12 rounded-full
          transition-opacity duration-500
          ${hover ? "opacity-30" : "opacity-0"}
          bg-white
        `}
        ></div>
      </div>
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
};

const TechnologiesSection = () => {
  const { t } = useTranslation("technologies"); // Especificamos que usamos el namespace 'technologies'
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref]);

  const techCore = [
    { name: "HTML5/CSS3", icon: FileCode },
    { name: "JavaScript", icon: Code },
    { name: "React", icon: Code },
    { name: "Tailwind CSS", icon: Layout },
  ];

  const techCMS = [
    { name: "WordPress", icon: Globe },
    { name: "Shopify", icon: ShoppingCart },
    { name: "WooCommerce", icon: ShoppingCart },
    { name: "Elementor", icon: PenTool },
  ];

  const techOther = [
    { name: "Responsive", icon: Smartphone },
    { name: "SEO", icon: Zap },
    { name: "Optimización", icon: Zap },
    { name: "UI/UX", icon: PenTool },
  ];

  return (
    <section
      ref={setRef}
      className="py-20 px-4 bg-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-1/4 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            {t("techStack")}
          </div>
          <h2 className="text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Core Technologies */}
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">
                {t("frontendTitle")}
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {techCore.map((tech, index) => (
                <TechBadge
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  delay={index}
                />
              ))}
            </div>
          </div>

          {/* CMS Platforms */}
          <div className="mb-16">
            <h3 className="text-xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">
                {t("cmsTitle")}
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {techCMS.map((tech, index) => (
                <TechBadge
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  delay={index + 4}
                />
              ))}
            </div>
          </div>

          {/* Other Specialties */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">
                {t("specialtiesTitle")}
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {techOther.map((tech, index) => (
                <TechBadge
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                  delay={index + 8}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating labels */}
        <div className="absolute -top-4 left-1/4 transform -translate-x-1/2 bg-purple-700 text-white px-4 py-1 rounded-full text-xs font-medium animate-bounce-slow opacity-70">
          React
        </div>
        <div
          className="absolute top-1/4 right-10 bg-purple-700 text-white px-4 py-1 rounded-full text-xs font-medium animate-bounce-slow opacity-70"
          style={{ animationDelay: "1s" }}
        >
          WordPress
        </div>
        <div
          className="absolute bottom-10 left-10 bg-purple-700 text-white px-4 py-1 rounded-full text-xs font-medium animate-bounce-slow opacity-70"
          style={{ animationDelay: "2s" }}
        >
          Shopify
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;

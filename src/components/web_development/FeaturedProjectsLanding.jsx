import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, ArrowRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import harvvestImage from "../../assets/web_projects/harvvest.app.webp";
import tempestImage from "../../assets/web_projects/Tempest Digital - www.tempest-digital.io.webp";
import hanahomesImage from "../../assets/web_projects/www.hanahomes.co.webp";

const FeaturedProject = ({ title, description, image, url, isEven, tags }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);
  const { t } = useTranslation("projects");

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref]);

  return (
    <div
      ref={setRef}
      className={`flex flex-col md:flex-row items-center gap-8 py-16 transition-all duration-1000 ${
        isEven ? "md:flex-row-reverse" : ""
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Project image */}
      <div className="w-full md:w-1/2 relative">
        <div className="relative overflow-hidden rounded-xl shadow-xl group">
          <div className="aspect-video w-full overflow-hidden group-hover:scale-105 transition-all duration-700">
            {image ? (
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-100 w-full h-full">
                <Globe size={64} className="text-purple-500 opacity-40" />
              </div>
            )}

            {/* View project overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <button className="bg-white text-purple-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-coral-400 transition-all duration-300">
                    {t("viewWebsite")}
                    <ExternalLink size={16} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute -top-3 -left-3 px-4 py-2 bg-purple-700 text-white rounded-lg shadow-lg z-20">
          {t("webDevelopment")}
        </div>
      </div>

      {/* Project details */}
      <div className="w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
        </div>

        <Link
          to="web-development"
          className="text-purple-700 flex items-center gap-2 font-medium hover:text-purple-900 transition-colors"
        >
          {t("viewMoreProjects")}
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

const FeaturedProjectsLanding = () => {
  const { t } = useTranslation("projects");

  return (
    <section className="py-20 px-4 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-8 border-purple-200 opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border-8 border-purple-200 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            {t("ourWork")}
          </div>
          <h2 className="text-4xl font-bold mb-4">{t("featuredProjects")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("featuredProjectsDescription")}
          </p>
        </div>

        {/* Projects list */}
        <div className="space-y-24">
          <FeaturedProject
            title={t("harvvestTitle")}
            description={t("harvvestDescription")}
            image={harvvestImage}
            url="https://harvvest.app"
            isEven={false}
            tags={["Landing Page", "Conversion", "UI/UX", "Responsive"]}
          />

          <FeaturedProject
            title={t("tempestTitle")}
            description={t("tempestDescription")}
            image={tempestImage}
            url="https://www.tempest-digital.io"
            isEven={true}
            tags={["Immersive Web", "Animation", "Branding", "Interactive"]}
          />

          <FeaturedProject
            title={t("hanahomesTitle")}
            description={t("hanahomesDescription")}
            image={hanahomesImage}
            url="https://www.hanahomes.co"
            isEven={false}
            tags={["Lead Generation", "Real Estate", "Conversion", "UX"]}
          />
        </div>

        {/* View all projects button */}
        <div className="flex justify-center mt-16">
          <Link
            to="web-development"
            className="group bg-purple-700 text-white px-8 py-4 rounded-lg hover:bg-purple-800 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg"
          >
            {t("viewAllProjects")}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsLanding;

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Music2, Globe, ChevronRight } from "lucide-react";
import LandingReviewsCarousel from "./LandingReviewsCarousel";
import EnhancedHeroSection from "./web_development/EnhancedHeroSection";
import EnhancedServices from "./web_development/EnhancedServices";
import FeaturedProjectsLanding from "./web_development/FeaturedProjectsLanding";
import TechnologiesSection from "./web_development/TechnologiesSection";
import TrackingLanding from "./TrackingLanding.jsx";
import WhyToChoose from "./WhyToChoose.jsx";
import { useTranslation } from "react-i18next";

// Componente para los números/estadísticas
const StatCard = ({ number, label }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
      {number}
    </div>
    <p className="text-white">{label}</p>
  </div>
);

const LandingPage = () => {
  const { t } = useTranslation("stats");
  const heroRef = useRef(null);

  // Efecto para la animación inicial
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
    }
  }, []);

  return (
    <>
      {/* Hero Section con tracking highlight */}
      <EnhancedHeroSection />

      {/* Sección de servicios principales */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("servicios-profesionales")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          <EnhancedServices />
        </div>
      </section>

      <FeaturedProjectsLanding />

      <TechnologiesSection />

      <TrackingLanding />

      {/* Sección Stats/Cifras */}
      <section className="py-16 px-4 bg-purple-700 ">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
            <StatCard number="250+" label={t("label1")} />
            <StatCard number="600+" label={t("label2")} />
            <StatCard number="8+" label={t("label3")} />
            <StatCard number="100%" label={t("label4")} />
          </div>
        </div>
      </section>

      {/* Carrusel de Reseñas */}
      <LandingReviewsCarousel />

      {/* Sección de propuesta única de valor */}
      <WhyToChoose />
    </>
  );
};

export default LandingPage;

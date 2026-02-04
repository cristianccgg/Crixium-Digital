import React, { useEffect, useRef } from "react";
import LandingReviewsCarousel from "./LandingReviewsCarousel";
import EnhancedHeroSection from "./web_development/EnhancedHeroSection";

import FeaturedProjectsLanding from "./web_development/FeaturedProjectsLanding";
import ProblemSolution from "./web_development/ProblemSolution";
import PricingPreview from "./web_development/PricingPreview";
import WhyToChoose from "./WhyToChoose.jsx";
import { useTranslation } from "react-i18next";
import SimpleSEO from "./SEO/SimpleSEO";
import SimpleSchemaData from "./SEO/SimpleSchemaData";

// Componente para los números/estadísticas con atributos mejorados para accesibilidad
const StatCard = ({ number, label }) => (
  <div className="text-center" role="presentation">
    <div
      className="text-4xl md:text-5xl font-bold text-white mb-2"
      aria-label={`${number} ${label}`}
    >
      {number}
    </div>
    <p className="text-white">{label}</p>
  </div>
);

const LandingPage = () => {
  const { t } = useTranslation("stats");
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
    }
  }, []);

  return (
    <>
      {/* SEO Components */}
      <SimpleSEO
        titleKey="seo:home.title"
        descriptionKey="seo:home.description"
        canonicalUrl="/"
        ogType="website"
        ogImage="/logo.png"
      />
      <SimpleSchemaData
        pageType="WebPage"
        data={{
          path: "/",
        }}
      />

      {/* 1. Hero - Propuesta de valor + CTA WhatsApp */}
      <EnhancedHeroSection />

      {/* 2. Problema/Solución - Conectar con el dolor del cliente */}
      <ProblemSolution />

      {/* 3. Proyectos destacados como casos de éxito */}
      <div id="proyectos">
        <FeaturedProjectsLanding />
      </div>

      {/* 5. Stats/Cifras - Prueba social */}
      <section
        className="py-16 px-4 bg-purple-700"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">
          Nuestros logros en números
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="250+" label={t("label1")} />
            <StatCard number="600+" label={t("label2")} />
            <StatCard number="8+" label={t("label3")} />
            <StatCard number="100%" label={t("label4")} />
          </div>
        </div>
      </section>

      {/* 6. Reviews */}
      <LandingReviewsCarousel />

      {/* 7. Precios de referencia */}
      <PricingPreview />

      {/* 8. Por qué elegirnos */}
      <WhyToChoose />
    </>
  );
};

export default LandingPage;

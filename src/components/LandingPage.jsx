import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import LandingReviewsCarousel from "./LandingReviewsCarousel";
import EnhancedHeroSection from "./web_development/EnhancedHeroSection";
import FeaturedProjectsLanding from "./web_development/FeaturedProjectsLanding";
import ProblemSolution from "./web_development/ProblemSolution";
import PricingPreview from "./web_development/PricingPreview";
import WhyToChoose from "./WhyToChoose.jsx";
import FAQ from "./FAQ";
import { useTranslation } from "react-i18next";
import SimpleSEO from "./SEO/SimpleSEO";
import SimpleSchemaData from "./SEO/SimpleSchemaData";

// Animated counter hook
const useCounter = (target, duration = 1800, isActive = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const numeric = parseInt(target.replace(/\D/g, ""), 10);
    if (!numeric) return;

    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isActive, target, duration]);

  return count;
};

const StatCard = ({ number, label, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const suffix = number.replace(/[0-9]/g, "");
  const animated = useCounter(number, 1600, isInView);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      role="presentation"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div
        className="text-4xl md:text-5xl font-bold text-white mb-2"
        aria-label={`${number} ${label}`}
      >
        {isInView ? `${animated}${suffix}` : "0"}
      </div>
      <p className="text-white">{label}</p>
    </motion.div>
  );
};

const LandingPage = () => {
  const { t } = useTranslation("stats");
  const { t: tFaq } = useTranslation("faq");
  const faqItems = tFaq("items", { returnObjects: true });

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
            <StatCard number="250+" label={t("label1")} index={0} />
            <StatCard number="600+" label={t("label2")} index={1} />
            <StatCard number="8+" label={t("label3")} index={2} />
            <StatCard number="100%" label={t("label4")} index={3} />
          </div>
        </div>
      </section>

      {/* 6. Reviews */}
      <LandingReviewsCarousel />

      {/* 7. Precios de referencia */}
      <PricingPreview />

      {/* 8. Por qué elegirnos */}
      <WhyToChoose />

      {/* 9. FAQ */}
      <FAQ />
      <SimpleSchemaData
        pageType="FAQPage"
        data={{
          path: "/",
          faqItems: Array.isArray(faqItems) ? faqItems : [],
        }}
      />
    </>
  );
};

export default LandingPage;

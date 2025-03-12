import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Music,
  Mic,
  Radio,
  Waves,
  ChevronRight,
  Award,
  Headphones,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import PricingSection from "./music_production/PricingSection";
import AudioPorfolio from "./music_production/AudioPorfolio";
import LandingReviewsCarousel from "./LandingReviewsCarousel";
import SimpleSEO from "./SEO/SimpleSEO";
import SimpleSchemaData from "./SEO/SimpleSchemaData";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  onRequestQuote,
  serviceType,
  isCustom = false,
  t,
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`bg-white p-8 rounded-xl border border-gray-100 flex flex-col h-full transition-all duration-300 transform ${
        hovering ? "shadow-xl scale-[1.03] border-blue-100" : "shadow-md"
      }`}
    >
      <div className="flex-1">
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
            hovering ? "bg-coral-400 text-white" : "bg-purple-700 text-white"
          }`}
        >
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {Object.values(features).map((feature, index) => (
            <li key={index} className="flex items-start group">
              <div
                className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center ${
                  hovering
                    ? "bg-coral-300/40 text-purple-700"
                    : "bg-gray-100 text-gray-800"
                } transition-colors duration-300 group-hover:bg-purple-100 group-hover:text-purple-700`}
              >
                <ChevronRight size={12} />
              </div>
              <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => onRequestQuote(serviceType)}
        className={`mt-8 px-5 py-3 rounded-lg w-full transition-all duration-300 flex items-center justify-center gap-2 ${
          isCustom
            ? "bg-purple-700 text-white hover:bg-coral-400"
            : "bg-purple-700 text-white hover:bg-coral-400"
        } group`}
      >
        <span>
          {isCustom
            ? t("musicProduction.services.buttons.requestQuote")
            : t("musicProduction.services.buttons.viewPackages")}
        </span>
        <ArrowRight
          size={16}
          className={`transition-transform duration-300 group-hover:translate-x-1`}
        />
      </button>
    </div>
  );
};

const ProcessStep = ({ icon: Icon, title, description, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={stepRef}
      className={`flex items-start gap-5 transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative">
        <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-purple-700 hover:text-white group">
          <Icon className="text-purple-700 group-hover:text-white" size={28} />
        </div>
        {index < 3 && (
          <div className="absolute left-8 top-16 h-12 border-l-2 border-dashed border-purple-200 hidden lg:block"></div>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  );
};

const HeroButton = ({ children, primary = false, onClick, to }) => {
  const Component = to ? Link : "button";
  const props = to ? { to } : { onClick };

  return (
    <Component
      {...props}
      className={`px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md group ${
        primary
          ? "bg-purple-700 text-white hover:bg-coral-400 hover:shadow-lg"
          : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
      }`}
    >
      {children}
    </Component>
  );
};

const MusicProductionPage = () => {
  const { t } = useTranslation("music-production");
  const navigate = useNavigate();
  const pricingSectionRef = useRef(null);
  const audioPortfolioRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  const seoTitle =
    "Producción Musical Profesional | Jingles y Audio | Crixium Digital";
  const seoDescription =
    "Servicios de producción musical para empresas y artistas. Creamos jingles publicitarios, producción de audio profesional y música para contenido digital que conecta con tu audiencia.";

  // Ahora usamos un objeto en lugar de un array para los servicios
  const services = {
    jingles: {
      icon: Mic,
      title: t("musicProduction.services.items.jingles.title"),
      description: t("musicProduction.services.items.jingles.description"),
      features: {
        feature1: t("musicProduction.services.items.jingles.features.feature1"),
        feature2: t("musicProduction.services.items.jingles.features.feature2"),
        feature3: t("musicProduction.services.items.jingles.features.feature3"),
        feature4: t("musicProduction.services.items.jingles.features.feature4"),
        feature5: t("musicProduction.services.items.jingles.features.feature5"),
      },
      serviceType: "jingles",
    },
    voiceover: {
      icon: Radio,
      title: t("musicProduction.services.items.voiceover.title"),
      description: t("musicProduction.services.items.voiceover.description"),
      features: {
        feature1: t(
          "musicProduction.services.items.voiceover.features.feature1"
        ),
        feature2: t(
          "musicProduction.services.items.voiceover.features.feature2"
        ),
        feature3: t(
          "musicProduction.services.items.voiceover.features.feature3"
        ),
        feature4: t(
          "musicProduction.services.items.voiceover.features.feature4"
        ),
        feature5: t(
          "musicProduction.services.items.voiceover.features.feature5"
        ),
      },
      serviceType: "voiceover",
    },
    custom: {
      icon: Waves,
      title: t("musicProduction.services.items.custom.title"),
      description: t("musicProduction.services.items.custom.description"),
      features: {
        feature1: t("musicProduction.services.items.custom.features.feature1"),
        feature2: t("musicProduction.services.items.custom.features.feature2"),
        feature3: t("musicProduction.services.items.custom.features.feature3"),
        feature4: t("musicProduction.services.items.custom.features.feature4"),
        feature5: t("musicProduction.services.items.custom.features.feature5"),
      },
      serviceType: "custom",
      isCustom: true,
    },
  };

  // Objeto para los pasos del proceso
  const processSteps = {
    step1: {
      icon: Headphones,
      title: t("musicProduction.process.steps.step1.title"),
      description: t("musicProduction.process.steps.step1.description"),
    },
    step2: {
      icon: Music,
      title: t("musicProduction.process.steps.step2.title"),
      description: t("musicProduction.process.steps.step2.description"),
    },
    step3: {
      icon: Waves,
      title: t("musicProduction.process.steps.step3.title"),
      description: t("musicProduction.process.steps.step3.description"),
    },
    step4: {
      icon: Award,
      title: t("musicProduction.process.steps.step4.title"),
      description: t("musicProduction.process.steps.step4.description"),
    },
  };

  const handleRequestQuote = (serviceType) => {
    if (serviceType === "custom") {
      navigate("/contact", {
        state: {
          initialService: "music",
          projectType: "Proyecto Personalizado",
        },
      });
    } else {
      setSelectedService(serviceType);
      pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Components */}
      <SimpleSEO
        titleKey="seo:music.title"
        descriptionKey="seo:music.description"
        canonicalUrl="/music-production"
        ogType="website"
        ogImage="/logo.png"
      />
      <SimpleSchemaData
        pageType="MusicProductionService"
        data={{
          path: "/music-production",
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen sm:min-h-[60vh] flex items-center py-16 px-4 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              <Music size={16} />
              <span>{t("musicProduction.hero.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t("musicProduction.hero.title")}
              <span className="text-coral-400">
                {t("musicProduction.hero.title2")}
              </span>{" "}
              {t("musicProduction.hero.title3")}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
              {t("musicProduction.hero.description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <HeroButton
                primary
                onClick={() =>
                  pricingSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <span>{t("musicProduction.hero.buttons.viewPackages")}</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </HeroButton>
              <HeroButton
                onClick={() =>
                  audioPortfolioRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <Play size={18} />
                <span>{t("musicProduction.hero.buttons.listenSamples")}</span>
              </HeroButton>
            </div>
          </div>
        </div>

        {/* Imagen o gráfico decorativo */}
        <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-full pointer-events-none opacity-30 md:opacity-70">
          <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
            <svg viewBox="0 0 200 200" width="500" height="500">
              <path
                fill="rgba(255, 255, 255, 0.1)"
                d="M45.4,-77.1C58.2,-69.3,67.9,-56.3,74.8,-42.3C81.7,-28.4,85.8,-14.2,85.1,-0.4C84.5,13.4,79.1,26.9,70.8,38.2C62.4,49.6,51.2,59,38.8,62.4C26.3,65.8,13.2,63.3,1.7,60.7C-9.8,58.1,-19.5,55.4,-31.6,51.9C-43.6,48.3,-58,43.8,-65.8,34.4C-73.7,25,-75.1,10.6,-73.3,-3C-71.5,-16.6,-66.5,-29.5,-57.7,-38.2C-49,-46.9,-36.4,-51.3,-24.5,-59.5C-12.5,-67.8,-1.3,-80,11.4,-82.6C24.1,-85.2,32.6,-84.9,45.4,-77.1Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} className="text-purple-700" />
              <span>{t("musicProduction.services.subtitle")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("musicProduction.services.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("musicProduction.services.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(services).map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                onRequestQuote={handleRequestQuote}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      <div ref={audioPortfolioRef}>
        <AudioPorfolio />
      </div>

      {/* Process Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <Headphones size={16} />
              <span>{t("musicProduction.process.subtitle")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("musicProduction.process.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("musicProduction.process.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {Object.values(processSteps).map((step, index) => (
              <ProcessStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* <div ref={pricingSectionRef}>
        <PricingSection initialService={selectedService} />
      </div> */}

      <LandingReviewsCarousel />
    </div>
  );
};

export default MusicProductionPage;

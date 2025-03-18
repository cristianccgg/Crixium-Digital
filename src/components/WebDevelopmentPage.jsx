import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Globe,
  Code,
  Laptop,
  Database,
  Settings,
  Layout,
  Smartphone,
  Gauge,
  CheckCircle,
  ChevronRight,
  Award,
  Sparkles,
  ArrowRight,
  Play,
  ShoppingCart,
} from "lucide-react";
import FeaturedProjects from "./web_development/FeaturedProjects";
import LandingReviewsCarousel from "./LandingReviewsCarousel";
import UnifiedPricingSection from "./web_development/UnifiedPricingSection";
import { useTranslation } from "react-i18next";
// Import SEO components
import SimpleSEO from "./SEO/SimpleSEO";
import SimpleSchemaData from "./SEO/SimpleSchemaData";
import ServicesSection from "./web_development/ServicesSection";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  onRequestQuote,
  serviceType,
  isCustom = false,
}) => {
  const [hovering, setHovering] = useState(false);
  const { t } = useTranslation("web-development");

  // Obtenemos las claves del objeto features para poder iterar sobre ellas
  const featureKeys = Object.keys(features);

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
            hovering
              ? "bg-coral-400 text-white"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {featureKeys.map((key, index) => (
            <li key={index} className="flex items-start group">
              <div
                className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center ${
                  hovering
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-500"
                } transition-colors duration-300 group-hover:bg-purple-100 group-hover:text-purple-700`}
              >
                <ChevronRight size={12} />
              </div>
              <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                {features[key]}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => onRequestQuote(serviceType)}
        className={`mt-8 px-5 py-3 rounded-lg w-full transition-all duration-300 flex items-center justify-center gap-2 ${
          isCustom
            ? "bg-gradient-to-r from-purple-700 to-purple-800 text-white hover:from-purple-800 hover:to-coral-400"
            : "bg-purple-700 text-white hover:bg-coral-400"
        } group`}
      >
        <span>
          {isCustom ? t("buttons.requestQuote") : t("buttons.viewPackages")}
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

const TechnologyCard = ({ icon: Icon, name }) => (
  <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-100 hover:scale-105 border border-gray-50">
    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
      <Icon className="text-purple-700" size={24} />
    </div>
    <span className="font-medium text-xs md:text-base">{name}</span>
  </div>
);

const WebDevelopmentPage = () => {
  const { t } = useTranslation("web-development");
  const navigate = useNavigate();
  const pricingSectionRef = useRef(null);
  const portfolioRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [projectType, setProjectType] = useState("website"); // Nuevo estado para el tipo de proyecto

  // Las claves para los pasos del proceso
  const processStepKeys = ["first", "second", "third", "fourth"];

  const services = [
    {
      icon: Globe,
      title: t("services.corporate.title"),
      description: t("services.corporate.description"),
      features: t("services.corporate.features", { returnObjects: true }),
      serviceType: "web",
    },
    {
      icon: ShoppingCart,
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      features: t("services.ecommerce.features", { returnObjects: true }),
      serviceType: "ecommerce",
    },
    {
      icon: Layout,
      title: t("services.redesign.title"),
      description: t("services.redesign.description"),
      features: t("services.redesign.features", { returnObjects: true }),
      serviceType: "redesign",
    },
  ];

  const technologies = [
    { icon: Layout, name: "WordPress" },
    { icon: Code, name: "React" },
    { icon: Settings, name: "JavaScript" },
    { icon: Smartphone, name: "Responsive Design" },
    { icon: Database, name: "MySQL" },
    { icon: Globe, name: "WooCommerce" },
  ];

  const handleRequestQuote = (serviceType) => {
    if (serviceType === "redesign") {
      navigate("/contact", {
        state: {
          initialService: "web",
          projectType: t("services.redesign.title"),
        },
      });
    } else if (serviceType === "web") {
      setSelectedService("wordpress");
      setProjectType("website");
      pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (serviceType === "ecommerce") {
      setSelectedService("wordpress");
      setProjectType("ecommerce");
      pricingSectionRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // SEO title and description for the web development page
  const seoTitle =
    "Desarrollo Web Profesional | Sitios Web y E-commerce | Crixium Digital";
  const seoDescription =
    "Servicios profesionales de desarrollo web para empresas. Creamos sitios web modernos, tiendas online y rediseños con WordPress, React y WooCommerce. Presencia digital que convierte.";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Components */}
      <SimpleSEO
        titleKey="seo:webdev.title"
        descriptionKey="seo:webdev.description"
        canonicalUrl="/web-development"
        ogType="website"
        ogImage="/logo.png"
      />
      <SimpleSchemaData
        pageType="WebDevelopmentService"
        data={{
          path: "/web-development",
        }}
      />

      {/* Hero Section */}
      <section className="relative sm:min-h-[60vh] min-h-screen flex items-center pt-16 px-4 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              <Globe size={16} />
              <span>{t("badge")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t("title.first")}
              <span className="text-coral-400">{t("title.second")}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-purple-100 max-w-3xl mx-auto">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <HeroButton
                primary
                onClick={() => {
                  setProjectType("website");
                  setSelectedService("wordpress");
                  pricingSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span>{t("button1")}</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </HeroButton>
              <HeroButton
                onClick={() => {
                  setProjectType("ecommerce");
                  setSelectedService("wordpress");
                  pricingSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <ShoppingCart size={18} />
                <span>{t("button2")}</span>
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
              <Sparkles size={16} className="text-yellow-500" />
              <span>{t("customSolutions")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("ourServices")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("servicesDescription")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                onRequestQuote={handleRequestQuote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <Code size={16} />
              <span>{t("technology.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("technology.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("technology.description")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <TechnologyCard key={index} {...tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjects ref={portfolioRef} />

      {/* Process Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <CheckCircle size={16} />
              <span>{t("process.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("process.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("process.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {processStepKeys.map((key, index) => (
              <ProcessStep
                key={key}
                icon={
                  index === 0
                    ? CheckCircle
                    : index === 1
                    ? Layout
                    : index === 2
                    ? Code
                    : Gauge
                }
                title={t(`process.steps.${key}.title`)}
                description={t(`process.steps.${key}.description`)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Unified Pricing Section */}
      {/* <div ref={pricingSectionRef}>
        <UnifiedPricingSection
          initialService={selectedService}
          initialType={projectType}
        />
      </div> */}

      <LandingReviewsCarousel />
    </div>
  );
};

export default WebDevelopmentPage;

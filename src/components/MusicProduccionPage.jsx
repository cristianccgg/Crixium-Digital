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
import ReviewsCarousel from "./ReviewsCarousel";
import PricingSection from "./PricingSection";
import AudioPorfolio from "./AudioPorfolio";

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

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`bg-white p-6 rounded-xl border border-gray-100 flex flex-col h-full transition-all duration-300 transform ${
        hovering ? "shadow-xl scale-105" : "shadow-md"
      }`}
    >
      <div className="flex-1">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
            hovering ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
          }`}
        >
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <div
                className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center ${
                  hovering
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                } transition-colors duration-300 group-hover:bg-blue-100 group-hover:text-blue-600`}
              >
                <ChevronRight size={12} />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => onRequestQuote(serviceType)}
        className={`mt-6 px-4 py-2 rounded-lg w-full transition-all duration-300 flex items-center justify-center gap-2 ${
          isCustom
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <span>{isCustom ? "Solicitar Cotización" : "Ver Paquetes"}</span>
        <ArrowRight
          size={16}
          className={`transition-transform duration-300 ${
            hovering ? "translate-x-1" : ""
          }`}
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
        // Si el elemento está al menos un 30% visible
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
      className={`flex items-start gap-4 transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-blue-600 hover:text-white group">
          <Icon className="text-blue-600 group-hover:text-white" size={24} />
        </div>
        {index < 3 && (
          <div className="absolute left-6 top-12 h-12 border-l-2 border-dashed border-blue-200 hidden lg:block"></div>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
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
      className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
        primary
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
          : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
      }`}
    >
      {children}
    </Component>
  );
};

const MusicProductionPage = () => {
  const navigate = useNavigate();
  const pricingSectionRef = useRef(null);
  const audioPortfolioRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Mic,
      title: "Jingles Publicitarios",
      description: "Música memorable para tu marca",
      features: [
        "Jingles originales",
        "Adaptaciones de canciones",
        "Diferentes duraciones",
        "Incluye derechos comerciales",
      ],
      serviceType: "jingles",
    },
    {
      icon: Radio,
      title: "Spots de Radio",
      description: "Producción completa para radio",
      features: [
        "Guión creativo",
        "Locución profesional",
        "Música original",
        "Efectos sonoros",
      ],
      serviceType: "voiceover",
    },
    {
      icon: Waves,
      title: "Música Personalizada",
      description: "Soluciones musicales a medida",
      features: [
        "Música para cine y TV",
        "Bandas sonoras",
        "Audiolibros",
        "Música infantil",
        "Proyectos especiales",
      ],
      serviceType: "custom",
      isCustom: true,
    },
  ];

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
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 to-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Producción de Audio Profesional
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Producción Musical Profesional
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Creamos la identidad sonora perfecta para tu marca con música
              original y producción de alta calidad
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
                <span>Ver Paquetes</span>
                <ArrowRight size={16} />
              </HeroButton>
              <HeroButton
                onClick={() =>
                  audioPortfolioRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <Play size={16} />
                <span>Escuchar Muestras</span>
              </HeroButton>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-40 left-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Soluciones Personalizadas
            </div>
            <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de servicios de producción musical
              adaptados a tus necesidades
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

      <div ref={audioPortfolioRef}>
        <AudioPorfolio />
      </div>

      {/* Process Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Cómo Trabajamos
            </div>
            <h2 className="text-3xl font-bold mb-4">Nuestro Proceso</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un enfoque estructurado para garantizar resultados excepcionales
              en cada proyecto
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep
              icon={Headphones}
              title="1. Briefing"
              description="Entendemos tu visión y objetivos para crear el concepto perfecto"
              index={0}
            />
            <ProcessStep
              icon={Music}
              title="2. Composición"
              description="Creamos la música original que mejor represente tu marca"
              index={1}
            />
            <ProcessStep
              icon={Waves}
              title="3. Producción"
              description="Producimos y mezclamos hasta lograr un sonido profesional"
              index={2}
            />
            <ProcessStep
              icon={Award}
              title="4. Entrega"
              description="Entregamos los archivos finales en los formatos necesarios"
              index={3}
            />
          </div>
        </div>
      </section>

      <div ref={pricingSectionRef}>
        <PricingSection initialService={selectedService} />
      </div>

      <ReviewsCarousel />

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} className="animate-pulse" />
            <span>Comienza Tu Proyecto</span>
          </div>
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para dar sonido a tu marca?
          </h2>
          <p className="text-gray-600 mb-8">
            Contáctanos para discutir tu proyecto y recibir un presupuesto
            personalizado
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            <span>Contactar Ahora</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </section>
    </div>
  );
};

export default MusicProductionPage;

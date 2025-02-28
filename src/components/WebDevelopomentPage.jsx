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
import WebPricingSection from "./WebPricingSection";
import EcommercePricingSection from "./EcommercePricingSection";
import FeaturedProjects from "./FeaturedProjects";
import LandingReviewsCarousel from "./LandingReviewsCarousel";

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
      className={`bg-white p-8 rounded-xl border border-gray-100 flex flex-col h-full transition-all duration-300 transform ${
        hovering ? "shadow-xl scale-[1.03] border-blue-100" : "shadow-md"
      }`}
    >
      <div className="flex-1">
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
            hovering ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
          }`}
        >
          <Icon size={28} />
        </div>
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
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
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
            : "bg-blue-600 text-white hover:bg-blue-700"
        } group`}
      >
        <span>{isCustom ? "Solicitar Cotización" : "Ver Paquetes"}</span>
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
        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:bg-blue-600 hover:text-white group">
          <Icon className="text-blue-600 group-hover:text-white" size={28} />
        </div>
        {index < 3 && (
          <div className="absolute left-8 top-16 h-12 border-l-2 border-dashed border-blue-200 hidden lg:block"></div>
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
          ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
          : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
      }`}
    >
      {children}
    </Component>
  );
};

const TechnologyCard = ({ icon: Icon, name }) => (
  <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-100 hover:scale-105 border border-gray-50">
    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
      <Icon className="text-blue-600" size={24} />
    </div>
    <span className="font-medium text-lg">{name}</span>
  </div>
);

const WebDevelopmentPage = () => {
  const navigate = useNavigate();
  const webPricingSectionRef = useRef(null);
  const ecommercePricingSectionRef = useRef(null);
  const portfolioRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPricingSection, setSelectedPricingSection] = useState(null);

  const services = [
    {
      icon: Globe,
      title: "Sitios Web Corporativos",
      description:
        "La presencia digital de tu empresa con diseño a medida y optimizado para conversiones",
      features: [
        "Diseño profesional y personalizado",
        "100% responsivo en todos los dispositivos",
        "SEO optimizado para mejor posicionamiento",
        "CMS integrado para fácil gestión",
        "Optimización de velocidad de carga",
      ],
      serviceType: "web",
    },
    {
      icon: ShoppingCart,
      title: "Tiendas Online",
      description:
        "Plataformas e-commerce robustas y personalizadas para vender tus productos en internet",
      features: [
        "Catálogo de productos avanzado",
        "Carrito de compras intuitivo",
        "Múltiples pasarelas de pagos",
        "Gestión de inventario automatizada",
        "Panel de administración completo",
      ],
      serviceType: "ecommerce",
    },
    {
      icon: Layout,
      title: "Rediseño Web",
      description:
        "Actualiza tu sitio existente para mejorar su rendimiento, estética y conversiones",
      features: [
        "Diseño moderno y atractivo",
        "Mejora de rendimiento y velocidad",
        "Optimización completa de SEO",
        "Migración segura de contenido",
        "Integración de analytics avanzados",
      ],
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
          projectType: "Rediseño Web",
        },
      });
    } else if (serviceType === "web") {
      setSelectedService(serviceType);
      setSelectedPricingSection("web");
      webPricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (serviceType === "ecommerce") {
      setSelectedService(serviceType);
      setSelectedPricingSection("ecommerce");
      ecommercePricingSectionRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-16 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              <Globe size={16} />
              <span>Diseño Web y E-commerce</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Diseño Web <span className="text-yellow-300">Profesional</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
              Creamos sitios web atractivos y tiendas online funcionales para
              impulsar tu presencia digital y aumentar tus conversiones
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <HeroButton
                primary
                onClick={() => {
                  setSelectedPricingSection("web");
                  webPricingSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span>Ver Paquetes Web</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </HeroButton>
              <HeroButton
                onClick={() => {
                  setSelectedPricingSection("ecommerce");
                  ecommercePricingSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <ShoppingCart size={18} />
                <span>Ver Tiendas Online</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} className="text-yellow-500" />
              <span>Soluciones Personalizadas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ofrecemos una amplia gama de servicios de desarrollo web adaptados
              a tus necesidades específicas
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Code size={16} />
              <span>Stack Tecnológico</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tecnologías</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Utilizamos las tecnologías más modernas para crear soluciones
              robustas y escalables que impulsan tu negocio
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <CheckCircle size={16} />
              <span>Cómo Trabajamos</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Un enfoque estructurado para garantizar resultados excepcionales
              en cada proyecto que desarrollamos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <ProcessStep
              icon={CheckCircle}
              title="1. Planificación"
              description="Definimos los objetivos y requerimientos específicos de tu proyecto"
              index={0}
            />
            <ProcessStep
              icon={Layout}
              title="2. Diseño"
              description="Creamos la arquitectura y diseño visual de la solución"
              index={1}
            />
            <ProcessStep
              icon={Code}
              title="3. Desarrollo"
              description="Implementamos la solución con código limpio y eficiente"
              index={2}
            />
            <ProcessStep
              icon={Gauge}
              title="4. Lanzamiento"
              description="Desplegamos y optimizamos tu proyecto para máximo rendimiento"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Web Pricing Section */}
      <div ref={webPricingSectionRef}>
        <WebPricingSection
          initialService={
            selectedPricingSection === "web" ? selectedService : null
          }
        />
      </div>

      {/* E-commerce Pricing Section */}
      <div ref={ecommercePricingSectionRef}>
        <EcommercePricingSection
          initialService={
            selectedPricingSection === "ecommerce" ? selectedService : null
          }
        />
      </div>

      <LandingReviewsCarousel />

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -right-40 -top-40 w-80 h-80 bg-blue-300 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-blue-400 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} className="text-yellow-300" />
            <span>Comienza Tu Proyecto</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para llevar tu negocio al siguiente nivel?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contáctanos para discutir tu proyecto y recibir un presupuesto
            personalizado adapto a tus necesidades
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105 font-medium shadow-md group"
          >
            <span>Contactar Ahora</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentPage;

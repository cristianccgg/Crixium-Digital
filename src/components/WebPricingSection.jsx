import React, { useState, useEffect } from "react";
import { Check, Code, Sparkles, ArrowRight, Globe, Layers } from "lucide-react";
import WordpressCheckoutForm from "./WordpressCheckoutForm";
import CustomCodeCheckoutForm from "./CustomCodeCheckoutForm";

const ServiceSelector = ({ activeService, onServiceChange }) => (
  <div className="flex justify-center gap-4 mb-12">
    <button
      onClick={() => onServiceChange("wordpress")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
        activeService === "wordpress"
          ? "bg-purple-700 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md border border-gray-200"
      }`}
    >
      <Globe
        size={20}
        className={activeService === "wordpress" ? "animate-pulse" : ""}
      />
      <span>WordPress</span>
    </button>
    <button
      onClick={() => onServiceChange("custom")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
        activeService === "custom"
          ? "bg-purple-700 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md border border-gray-200"
      }`}
    >
      <Code
        size={20}
        className={activeService === "custom" ? "animate-pulse" : ""}
      />
      <span>Código Personalizado</span>
    </button>
  </div>
);

const PricingCard = ({
  title,
  price,
  delivery,
  features,
  isPopular,
  onSelect,
  id,
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`bg-white rounded-xl p-8 relative flex flex-col h-full transition-all duration-300 transform ${
        isPopular
          ? "border-2 border-purple-500 shadow-xl"
          : "border border-gray-100 shadow-md"
      } ${hovering ? "scale-105 shadow-xl" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-700 to-purple-800 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
            <Sparkles size={14} className="mr-1 animate-pulse" />
            Más Popular
          </span>
        </div>
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-gray-900">US${price}</span>
          <span className="ml-1 text-gray-500">/proyecto</span>
        </div>
        <div
          className={`${
            isPopular
              ? "bg-purple-50 text-purple-700"
              : "bg-gray-50 text-gray-700"
          } px-4 py-2 rounded-lg mb-6 text-sm font-medium transition-colors duration-300`}
        >
          {delivery}
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <div
                className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center ${
                  isPopular || hovering
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600"
                } transition-colors duration-300 group-hover:bg-purple-100 group-hover:text-purple-700`}
              >
                <Check size={12} />
              </div>
              <span
                className={`text-gray-600 transition-colors duration-300 ${
                  hovering ? "text-gray-900" : ""
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => onSelect(id)}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          isPopular || hovering
            ? "bg-purple-700 text-white hover:bg-coral-400"
            : "bg-purple-50 text-purple-700 hover:bg-purple-700 hover:text-white"
        }`}
      >
        <span>Seleccionar Plan</span>
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

const WebDevPricingSection = ({ initialService }) => {
  const [activeService, setActiveService] = useState(
    initialService || "wordpress"
  );
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const wordpressPackages = [
    {
      id: "wp-basic",
      title: "Landing Page",
      price: "120",
      delivery: "5 días de entrega",
      features: [
        "Diseño profesional responsive",
        "1 página optimizada",
        "Formulario de contacto",
        "Optimización de velocidad",
        "Integración con redes sociales",
        "Instalación de plugins básicos",
        "Diseño adaptado a tu marca",
        "Entrega lista para publicar",
      ],
    },
    {
      id: "wp-standard",
      title: "Sitio Web 3 páginas",
      price: "225",
      delivery: "8 días de entrega",
      features: [
        "Diseño profesional responsive",
        "Hasta 3 páginas optimizadas",
        "Formularios de contacto",
        "Optimización SEO básica",
        "Integración con redes sociales",
        "Instalación de plugins premium",
        "Diseño adaptado a tu marca",
        "Panel de administración personalizado",
        "Entrega lista para publicar",
      ],
      isPopular: true,
    },
    {
      id: "wp-premium",
      title: "Sitio Web Completo",
      price: "315",
      delivery: "12 días de entrega",
      features: [
        "Diseño profesional responsive",
        "Hasta 5 páginas optimizadas",
        "Formularios avanzados",
        "Optimización SEO completa",
        "Integración con redes sociales",
        "Integración con Google Analytics",
        "Instalación de plugins premium",
        "Diseño adaptado a tu marca",
        "Área de blog/noticias",
        "Panel de administración personalizado",
        "1 hora de capacitación incluida",
      ],
    },
  ];

  const customCodePackages = [
    {
      id: "custom-basic",
      title: "Landing Page",
      price: "150",
      delivery: "6 días de entrega",
      features: [
        "Diseño profesional responsive",
        "1 página con HTML, CSS y JS",
        "Formulario de contacto funcional",
        "Optimización de velocidad",
        "Integración con redes sociales",
        "Uso de TailwindCSS/Bootstrap",
        "Animaciones básicas",
        "Entrega de código fuente",
      ],
    },
    {
      id: "custom-standard",
      title: "Sitio Web 3 páginas",
      price: "280",
      delivery: "10 días de entrega",
      features: [
        "Diseño profesional responsive",
        "Hasta 3 páginas con HTML, CSS y JS",
        "Formularios de contacto funcionales",
        "Optimización de velocidad y SEO",
        "Integración con redes sociales",
        "Uso de TailwindCSS/Bootstrap",
        "Animaciones personalizadas",
        "Código limpio y documentado",
        "Optimización para dispositivos móviles",
        "Entrega de código fuente",
      ],
      isPopular: true,
    },
    {
      id: "custom-premium",
      title: "Sitio Web Completo",
      price: "390",
      delivery: "14 días de entrega",
      features: [
        "Diseño profesional responsive",
        "Hasta 5 páginas con HTML, CSS y JS",
        "Formularios avanzados con validación",
        "Optimización de velocidad y SEO avanzado",
        "Integración con redes sociales",
        "Integración con APIs de terceros",
        "Framework React/Vue (opcional)",
        "Animaciones personalizadas avanzadas",
        "Código limpio, modular y documentado",
        "Optimización para todos los dispositivos",
        "Entrega de código fuente con documentación",
      ],
    },
  ];

  const handlePackageSelect = (packageId) => {
    const selected =
      activeService === "wordpress"
        ? wordpressPackages.find((pkg) => pkg.id === packageId)
        : customCodePackages.find((pkg) => pkg.id === packageId);
    setSelectedPackage(selected);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  useEffect(() => {
    if (initialService) {
      setActiveService(initialService);
    }
  }, [initialService]);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            Precios Transparentes
          </div>
          <h2 className="text-3xl font-bold mb-4">Desarrollo Web</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige la tecnología y plan que mejor se adapte a tus necesidades
          </p>
        </div>

        {!showCheckout && (
          <>
            <ServiceSelector
              activeService={activeService}
              onServiceChange={setActiveService}
            />

            <div className="grid md:grid-cols-3 gap-8">
              {activeService === "wordpress"
                ? wordpressPackages.map((pkg) => (
                    <PricingCard
                      key={pkg.id}
                      {...pkg}
                      onSelect={handlePackageSelect}
                    />
                  ))
                : customCodePackages.map((pkg) => (
                    <PricingCard
                      key={pkg.id}
                      {...pkg}
                      onSelect={handlePackageSelect}
                    />
                  ))}
            </div>
          </>
        )}

        {showCheckout && (
          <div className="animate-fadeIn">
            <button
              onClick={handleCloseCheckout}
              className="mb-6 text-gray-600 hover:text-purple-700 flex items-center gap-2 transition-colors duration-200 group bg-white py-2 px-4 rounded-lg shadow-sm"
            >
              <ArrowRight
                size={16}
                className="transform rotate-180 group-hover:-translate-x-1 transition-transform duration-200"
              />
              <span>Volver a los planes</span>
            </button>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              {activeService === "wordpress" ? (
                <WordpressCheckoutForm
                  selectedPackage={selectedPackage}
                  onCancel={handleCloseCheckout}
                />
              ) : (
                <CustomCodeCheckoutForm
                  selectedPackage={selectedPackage}
                  onCancel={handleCloseCheckout}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebDevPricingSection;

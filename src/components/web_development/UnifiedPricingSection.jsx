import React, { useState, useEffect } from "react";
import {
  Check,
  Code,
  Sparkles,
  ArrowRight,
  Globe,
  Layers,
  ShoppingCart,
  Monitor,
  Database,
} from "lucide-react";
import UnifiedCheckoutForm from "./UnifiedCheckoutForm";

// Selector de tipo de proyecto (Web o Ecommerce)
const ProjectTypeSelector = ({ activeType, onTypeChange }) => (
  <div className="flex justify-center gap-4 mb-8">
    <button
      onClick={() => onTypeChange("website")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
        activeType === "website"
          ? "bg-purple-700 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md border border-gray-200"
      }`}
    >
      <Monitor
        size={20}
        className={activeType === "website" ? "animate-pulse" : ""}
      />
      <span>Sitio Web</span>
    </button>
    <button
      onClick={() => onTypeChange("ecommerce")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
        activeType === "ecommerce"
          ? "bg-purple-700 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md border border-gray-200"
      }`}
    >
      <ShoppingCart
        size={20}
        className={activeType === "ecommerce" ? "animate-pulse" : ""}
      />
      <span>Tienda Online</span>
    </button>
  </div>
);

// Selector de tecnología/plataforma
const ServiceSelector = ({ activeService, onServiceChange, projectType }) => {
  // Opciones de plataforma basadas en el tipo de proyecto
  const options =
    projectType === "website"
      ? [
          { id: "wordpress", label: "WordPress", icon: <Globe size={20} /> },
          {
            id: "custom",
            label: "Código Personalizado",
            icon: <Code size={20} />,
          },
        ]
      : [
          {
            id: "wordpress",
            label: "WordPress/WooCommerce",
            icon: <Globe size={20} />,
          },
          { id: "shopify", label: "Shopify", icon: <ShoppingCart size={20} /> },
        ];

  return (
    <div className="flex justify-center gap-4 mb-12">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onServiceChange(option.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
            activeService === option.id
              ? "bg-purple-700 text-white shadow-lg scale-105"
              : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md border border-gray-200"
          }`}
        >
          <span className={activeService === option.id ? "animate-pulse" : ""}>
            {option.icon}
          </span>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

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

// Planes y paquetes para cada tipo y tecnología
const packages = {
  website: {
    wordpress: [
      {
        id: "wp-basic",
        title: "Landing Page",
        price: "120",
        delivery: "10 días de entrega",
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
        price: "250",
        delivery: "14 días de entrega",
        features: [
          "Diseño profesional responsive",
          "Hasta 3 páginas optimizadas",
          "Formularios de contacto",
          "Optimización SEO básica",
          "Integración con redes sociales",
          "Diseño adaptado a tu marca",
          "Entrega lista para publicar",
        ],
        isPopular: true,
      },
      {
        id: "wp-premium",
        title: "Sitio Web Completo",
        price: "350",
        delivery: "20 días de entrega",
        features: [
          "Diseño profesional responsive",
          "Hasta 5 páginas optimizadas",
          "Formularios avanzados",
          "Optimización SEO completa",
          "Integración con redes sociales",
          "Integración con Google Analytics",
          "Diseño adaptado a tu marca",
          "Área de blog/noticias",
          "Panel de administración personalizado",
          "Capacitación incluida",
        ],
      },
    ],
    custom: [
      {
        id: "custom-basic",
        title: "Landing Page",
        price: "150",
        delivery: "10 días de entrega",
        features: [
          "Diseño profesional responsive",
          "1 página con HTML, CSS y JS",
          "Formulario de contacto funcional",
          "Optimización de velocidad",
          "Integración con redes sociales",
          "Uso de TailwindCSS",
          "Animaciones básicas",
          "Entrega de código fuente",
        ],
      },
      {
        id: "custom-standard",
        title: "Sitio Web 3 páginas",
        price: "280",
        delivery: "14 días de entrega",
        features: [
          "Diseño profesional responsive",
          "Hasta 3 páginas con HTML, CSS y JS",
          "Formularios de contacto funcionales",
          "Optimización de velocidad y SEO",
          "Integración con redes sociales",
          "Uso de TailwindCSS",
          "Animaciones personalizadas básicas",
          "Código limpio y documentado",
          "Optimización para dispositivos móviles",
          "Entrega de código fuente",
        ],
        isPopular: true,
      },
      {
        id: "custom-premium",
        title: "Sitio Web Completo",
        price: "550",
        delivery: "20 días de entrega",
        features: [
          "Diseño profesional responsive",
          "Hasta 5 páginas con HTML, CSS y JS",
          "Formularios avanzados con validación",
          "Optimización de velocidad y SEO avanzado",
          "Integración con redes sociales",
          "Integración con APIs de terceros",
          "Framework React (opcional)",
          "Animaciones personalizadas avanzadas",
          "Código limpio, modular y documentado",
          "Optimización para todos los dispositivos",
          "Entrega de código fuente con documentación",
        ],
      },
    ],
  },
  ecommerce: {
    wordpress: [
      {
        id: "woo-basic",
        title: "Tienda Básica",
        price: "350",
        delivery: "10 días de entrega",
        features: [
          "Hasta 50 productos",
          "Diseño responsive basado en platilla",
          "Catálogo de productos",
          "Carrito de compra",
          "Pasarela de pago",
          "Página de inicio y categorías",
          "Formulario de contacto",
          "Optimización básica SEO",
          "Instalación de plugins esenciales",
        ],
      },
      {
        id: "woo-standard",
        title: "Tienda Estándar",
        price: "550",
        delivery: "15 días de entrega",
        features: [
          "Hasta 150 productos",
          "Diseño profesional responsive",
          "Catálogo con filtros",
          "Carrito de compra avanzado",
          "Pasarelas de pago",
          "Configuración de envíos básica",
          "Importación inicial de productos",
          "Optimización SEO completa",
          "Cupones y descuentos",
          "Panel de administración personalizado",
          "Documentacion incluida",
        ],
        isPopular: true,
      },
      {
        id: "woo-premium",
        title: "Tienda Premium",
        price: "850",
        delivery: "21 días de entrega",
        features: [
          "Hasta 300 productos",
          "Diseño premium a medida",
          "Filtros avanzados de productos",
          "Múltiples pasarelas de pago",
          "Configuración de impuestos",
          "Sistema de envíos completo",
          "Importación completa de productos",
          "Sistema de membresías/suscripciones",
          "Optimización SEO avanzada",
          "Panel de administración avanzado",
          "Análisis de velocidad y optimización",
          "Capacitación en video",
        ],
      },
    ],
    shopify: [
      {
        id: "shopify-basic",
        title: "Tienda Básica",
        price: "300",
        delivery: "7 días de entrega",
        features: [
          "Hasta 50 productos",
          "Tema Shopify optimizado",
          "Configuración de productos",
          "Pasarela de pago Shopify",
          "Configuración de envíos básica",
          "Página de inicio y colecciones",
          "Página de contacto",
          "Optimización básica SEO",
          "Configuración de dominio",
          "Nota: No incluye la suscripción mensual a Shopify",
        ],
      },
      {
        id: "shopify-standard",
        title: "Tienda Estándar",
        price: "450",
        delivery: "12 días de entrega",
        features: [
          "Hasta 150 productos",
          "Personalización avanzada del tema",
          "Configuración de productos con variantes",
          "Configuración de envíos avanzada",
          "Importación inicial de productos",
          "Configuración de impuestos",
          "Optimización SEO completa",
          "Configuración de dominio y correos",
          "Apps esenciales instaladas y configuradas",
          "1 hora de capacitación incluida",
          "Nota: No incluye la suscripción mensual a Shopify",
        ],
        isPopular: true,
      },
      {
        id: "shopify-premium",
        title: "Tienda Premium",
        price: "750",
        delivery: "18 días de entrega",
        features: [
          "Hasta 300 productos",
          "Personalización completa del tema",
          "Diseño personalizado de páginas clave",
          "Configuración avanzada de productos",
          "Múltiples pasarelas de pago",
          "Sistema de envíos completo",
          "Importación completa de productos con metadatos",
          "Optimización SEO avanzada",
          "Integración con redes sociales y marketing",
          "Apps premium instaladas y configuradas",
          "Análisis y optimización de conversión",
          "2 horas de capacitación incluidas",
          "Nota: No incluye la suscripción mensual a Shopify",
        ],
      },
    ],
  },
};

const UnifiedPricingSection = ({ initialService, initialType }) => {
  const [projectType, setProjectType] = useState(initialType || "website");
  const [activeService, setActiveService] = useState(
    initialService || "wordpress"
  );
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handlePackageSelect = (packageId) => {
    const selected = packages[projectType][activeService].find(
      (pkg) => pkg.id === packageId
    );

    setSelectedPackage({
      ...selected,
      projectType,
      serviceType: activeService,
    });

    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  const getSectionTitle = () => {
    if (projectType === "website") {
      return "Desarrollo Web";
    } else {
      return "Tiendas Online";
    }
  };

  const getSectionDescription = () => {
    if (projectType === "website") {
      return "Elige la tecnología y plan que mejor se adapte a tus necesidades";
    } else {
      return "Elige la plataforma y plan que mejor se adapte a tu negocio";
    }
  };

  const getAdviceBanner = () => {
    if (projectType === "ecommerce") {
      return (
        <div className="mt-16 bg-purple-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Consideraciones importantes
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-purple-100 text-purple-700">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                WooCommerce: Los precios no incluyen el costo del hosting, que
                puede variar entre $5-$30/mes según tus necesidades.
              </span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-purple-100 text-purple-700">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                Shopify: Los precios no incluyen la suscripción mensual a
                Shopify (desde $29/mes) ni las comisiones por transacción.
              </span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-purple-100 text-purple-700">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                Temas premium o plugins adicionales pueden tener costos extra
                dependiendo de tus necesidades específicas.
              </span>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            Precios Transparentes
          </div>
          <h2 className="text-3xl font-bold mb-4">{getSectionTitle()}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getSectionDescription()}
          </p>
        </div>

        {!showCheckout && (
          <>
            <ProjectTypeSelector
              activeType={projectType}
              onTypeChange={(type) => {
                setProjectType(type);
                // Reiniciar el servicio activo cuando cambia el tipo de proyecto
                setActiveService("wordpress");
              }}
            />

            <ServiceSelector
              activeService={activeService}
              onServiceChange={setActiveService}
              projectType={projectType}
            />

            <div className="grid md:grid-cols-3 gap-8">
              {packages[projectType][activeService].map((pkg) => (
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
              <UnifiedCheckoutForm
                selectedPackage={selectedPackage}
                onCancel={handleCloseCheckout}
              />
            </div>
          </div>
        )}

        {getAdviceBanner()}
      </div>
    </section>
  );
};

export default UnifiedPricingSection;

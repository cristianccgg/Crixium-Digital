import React, { useState, useEffect } from "react";
import {
  Check,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  Globe,
  Layers,
} from "lucide-react";
import EcommerceCheckoutForm from "./EcommerceCheckoutForm";

const ServiceSelector = ({ activeService, onServiceChange }) => (
  <div className="flex justify-center gap-4 mb-12">
    <button
      onClick={() => onServiceChange("wordpress")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
        activeService === "wordpress"
          ? "bg-blue-600 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md border border-gray-200"
      }`}
    >
      <Globe
        size={20}
        className={activeService === "wordpress" ? "animate-pulse" : ""}
      />
      <span>WooCommerce</span>
    </button>
    <button
      onClick={() => onServiceChange("shopify")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
        activeService === "shopify"
          ? "bg-blue-600 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md border border-gray-200"
      }`}
    >
      <ShoppingCart
        size={20}
        className={activeService === "shopify" ? "animate-pulse" : ""}
      />
      <span>Shopify</span>
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
          ? "border-2 border-blue-500 shadow-xl"
          : "border border-gray-100 shadow-md"
      } ${hovering ? "scale-105 shadow-xl" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
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
            isPopular ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700"
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
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                } transition-colors duration-300 group-hover:bg-blue-100 group-hover:text-blue-600`}
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
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
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

const EcommercePricingSection = ({ initialService }) => {
  const [activeService, setActiveService] = useState(
    initialService || "wordpress"
  );
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const woocommercePackages = [
    {
      id: "woo-basic",
      title: "Tienda Básica",
      price: "350",
      delivery: "10 días de entrega",
      features: [
        "Hasta 50 productos",
        "Diseño responsive",
        "Catálogo de productos",
        "Carrito de compra",
        "Pasarela de pago (PayPal/Stripe)",
        "Configuración de envíos básica",
        "Página de inicio y categorías",
        "Página de contacto",
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
        "Múltiples pasarelas de pago",
        "Configuración de envíos avanzada",
        "Importación inicial de productos",
        "Optimización SEO completa",
        "Cupones y descuentos",
        "Panel de administración personalizado",
        "1 hora de capacitación incluida",
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
        "Integración con ERP/CRM (opcional)",
        "Panel de administración avanzado",
        "Análisis de velocidad y optimización",
        "2 horas de capacitación incluidas",
      ],
    },
  ];

  const shopifyPackages = [
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
  ];

  const handlePackageSelect = (packageId) => {
    const selected =
      activeService === "wordpress"
        ? woocommercePackages.find((pkg) => pkg.id === packageId)
        : shopifyPackages.find((pkg) => pkg.id === packageId);
    setSelectedPackage(selected);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  useEffect(() => {
    if (
      initialService &&
      (initialService === "ecommerce" || initialService === "web")
    ) {
      setActiveService("wordpress");
    }
  }, [initialService]);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Soluciones E-commerce
          </div>
          <h2 className="text-3xl font-bold mb-4">Tiendas Online</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige la plataforma y plan que mejor se adapte a tu negocio
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
                ? woocommercePackages.map((pkg) => (
                    <PricingCard
                      key={pkg.id}
                      {...pkg}
                      onSelect={handlePackageSelect}
                    />
                  ))
                : shopifyPackages.map((pkg) => (
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
              className="mb-6 text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors duration-200 group bg-white py-2 px-4 rounded-lg shadow-sm"
            >
              <ArrowRight
                size={16}
                className="transform rotate-180 group-hover:-translate-x-1 transition-transform duration-200"
              />
              <span>Volver a los planes</span>
            </button>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <EcommerceCheckoutForm
                selectedPackage={selectedPackage}
                platform={activeService}
                onCancel={handleCloseCheckout}
              />
            </div>
          </div>
        )}

        <div className="mt-16 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            Consideraciones importantes
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                WooCommerce: Los precios no incluyen el costo del hosting, que
                puede variar entre $5-$30/mes según tus necesidades.
              </span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                Shopify: Los precios no incluyen la suscripción mensual a
                Shopify (desde $29/mes) ni las comisiones por transacción.
              </span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                Temas premium o plugins adicionales pueden tener costos extra
                dependiendo de tus necesidades específicas.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EcommercePricingSection;

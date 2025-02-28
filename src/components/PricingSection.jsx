import React, { useState, useEffect } from "react";
import { Check, Music, Mic, Sparkles, ArrowRight } from "lucide-react";
import JingleCheckoutForm from "./JingleCheckoutForm";
import VoiceoverCheckoutForm from "./VoiceoverCheckoutForm";

const ServiceSelector = ({ activeService, onServiceChange }) => (
  <div className="flex justify-center gap-4 mb-12">
    <button
      onClick={() => onServiceChange("jingles")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
        activeService === "jingles"
          ? "bg-blue-600 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md border border-gray-200"
      }`}
    >
      <Music
        size={20}
        className={activeService === "jingles" ? "animate-pulse" : ""}
      />
      <span>Jingles/Intros</span>
    </button>
    <button
      onClick={() => onServiceChange("voiceover")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
        activeService === "voiceover"
          ? "bg-blue-600 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md border border-gray-200"
      }`}
    >
      <Mic
        size={20}
        className={activeService === "voiceover" ? "animate-pulse" : ""}
      />
      <span>Locución</span>
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
          <span className="ml-1 text-gray-500">/servicio</span>
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

const VoiceoverCard = ({
  title,
  wordCount,
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
          <span className="ml-1 text-gray-500">/servicio</span>
        </div>
        <div
          className={`${
            isPopular ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700"
          } px-4 py-3 rounded-lg mb-6 text-sm font-medium transition-colors duration-300`}
        >
          <div className="font-bold mb-1">Hasta {wordCount} palabras</div>
          <div>{delivery}</div>
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

const PricingSection = ({ initialService }) => {
  const [activeService, setActiveService] = useState(
    initialService || "jingles"
  );
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const packages = [
    {
      id: "basic",
      title: "Your perfect Jingle!",
      price: "30",
      delivery: "3-day delivery",
      features: [
        "Up to 10-second running time",
        "Vocals recording",
        "Original music",
        "Mixing & mastering",
        "Lyrics writing",
        "Commercial use",
        "Unlimited Revisions",
      ],
      type: "music", // Agregar explícitamente estas propiedades
      category: "jingle", // Agregar explícitamente estas propiedades
    },
    {
      id: "standard",
      title: "All you need!",
      price: "50",
      delivery: "3-day delivery",
      features: [
        "Up to 20-second running time",
        "Vocals recording",
        "Original music",
        "Mixing & mastering",
        "Lyrics writing",
        "Commercial use",
        "Unlimited Revisions",
      ],
      isPopular: true,
      type: "music", // Agregar explícitamente estas propiedades
      category: "jingle", // Agregar explícitamente estas propiedades
    },
    {
      id: "premium",
      title: "30 seconds, all inclusive!",
      price: "70",
      delivery: "4-day delivery",
      features: [
        "Up to 30-second running time",
        "Vocals recording",
        "Original music",
        "Mixing & mastering",
        "Lyrics writing",
        "Commercial use",
        "Unlimited Revisions",
      ],
      type: "music", // Agregar explícitamente estas propiedades
      category: "jingle", // Agregar explícitamente estas propiedades
    },
  ];

  const voiceoverPackages = [
    {
      id: "vo-basic",
      title: "Locución Básica",
      wordCount: "100",
      price: "20",
      delivery: "2 días de entrega",
      features: [
        "Locución profesional",
        "Música de fondo incluida",
        "Edición y masterización",
        "2 revisiones incluidas",
        "Audio en formato WAV y MP3",
        "Uso comercial",
        "Calidad de estudio profesional",
      ],
      type: "music", // Agregar explícitamente estas propiedades
      category: "locucion", // Agregar explícitamente estas propiedades
    },
    {
      id: "vo-standard",
      title: "Locución Standard",
      wordCount: "300",
      price: "40",
      delivery: "3 días de entrega",
      features: [
        "Locución profesional",
        "Música de fondo incluida",
        "Efectos de sonido básicos",
        "Edición y masterización",
        "3 revisiones incluidas",
        "Audio en formato WAV y MP3",
        "Uso comercial",
        "Calidad de estudio profesional",
        "Multiple opciones de música",
      ],
      isPopular: true,
      type: "music", // Agregar explícitamente estas propiedades
      category: "locucion", // Agregar explícitamente estas propiedades
    },
    {
      id: "vo-premium",
      title: "Locución Premium",
      wordCount: "500",
      price: "60",
      delivery: "4 días de entrega",
      features: [
        "Locución profesional",
        "Música de fondo incluida",
        "Efectos de sonido premium",
        "Edición y masterización",
        "Revisiones ilimitadas",
        "Audio en todos los formatos",
        "Uso comercial",
        "Calidad de estudio profesional",
        "Biblioteca completa de música",
        "Guión optimizado incluido",
      ],
      type: "music", // Agregar explícitamente estas propiedades
      category: "locucion", // Agregar explícitamente estas propiedades
    },
  ];

  const handlePackageSelect = (packageId) => {
    const selected =
      activeService === "jingles"
        ? packages.find((pkg) => pkg.id === packageId)
        : voiceoverPackages.find((pkg) => pkg.id === packageId);
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
          <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Precios Transparentes
          </div>
          <h2 className="text-3xl font-bold mb-4">Planes y Precios</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige el servicio y plan que mejor se adapte a tus necesidades
          </p>
        </div>

        {!showCheckout && (
          <>
            <ServiceSelector
              activeService={activeService}
              onServiceChange={setActiveService}
            />

            <div className="grid md:grid-cols-3 gap-8">
              {activeService === "jingles"
                ? packages.map((pkg) => (
                    <PricingCard
                      key={pkg.id}
                      {...pkg}
                      onSelect={handlePackageSelect}
                    />
                  ))
                : voiceoverPackages.map((pkg) => (
                    <VoiceoverCard
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
              {activeService === "jingles" ? (
                <JingleCheckoutForm
                  selectedPackage={selectedPackage}
                  onCancel={handleCloseCheckout}
                />
              ) : (
                <VoiceoverCheckoutForm
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

export default PricingSection;

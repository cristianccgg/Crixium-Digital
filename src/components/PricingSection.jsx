import React, { useState } from "react";
import { Check, Music, Mic2 } from "lucide-react";
import JingleCheckoutForm from "./JingleCheckOutForm";
import VoiceoverCheckoutForm from "./VoiceoverCheckoutForm";

const ServiceSelector = ({ activeService, onServiceChange }) => (
  <div className="flex justify-center gap-4 mb-12">
    <button
      onClick={() => onServiceChange("jingles")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
        activeService === "jingles"
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <Music size={20} />
      <span>Jingles</span>
    </button>
    <button
      onClick={() => onServiceChange("voiceover")}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
        activeService === "voiceover"
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <Mic2 size={20} />
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
}) => (
  <div
    className={`bg-white rounded-xl shadow-lg p-8 relative ${
      isPopular ? "border-2 border-blue-500" : ""
    }`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Más Popular
        </span>
      </div>
    )}
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <div className="flex items-baseline mb-4">
      <span className="text-3xl font-bold text-gray-900">US${price}</span>
    </div>
    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg mb-6 text-sm font-medium">
      {delivery}
    </div>
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={() => onSelect(id)}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Seleccionar Plan
    </button>
  </div>
);

const VoiceoverCard = ({
  title,
  wordCount,
  price,
  delivery,
  features,
  isPopular,
  onSelect,
  id,
}) => (
  <div
    className={`bg-white rounded-xl shadow-lg p-8 relative ${
      isPopular ? "border-2 border-blue-500" : ""
    }`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Más Popular
        </span>
      </div>
    )}
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <div className="flex items-baseline mb-4">
      <span className="text-3xl font-bold text-gray-900">US${price}</span>
    </div>
    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg mb-6 text-sm font-medium">
      <div>Hasta {wordCount} palabras</div>
      <div>{delivery}</div>
    </div>
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={() => onSelect(id)}
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Seleccionar Plan
    </button>
  </div>
);

const PricingSection = () => {
  const [activeService, setActiveService] = useState("jingles");
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

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planes y Precios</h2>
          <p className="text-xl text-gray-600">
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
          <div>
            <button
              onClick={handleCloseCheckout}
              className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              ← Volver a los planes
            </button>
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
        )}
      </div>
    </section>
  );
};

export default PricingSection;

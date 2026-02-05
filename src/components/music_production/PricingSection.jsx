import React, { useState, useEffect } from "react";
import {
  Check,
  Music,
  Mic,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";

const ServiceSelector = ({ activeService, onServiceChange }) => {
  const { t } = useTranslation("pricing");

  return (
    <div className="flex justify-center gap-4 mb-12">
      <button
        onClick={() => onServiceChange("jingles")}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
          activeService === "jingles"
            ? "bg-purple-700 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md border border-gray-200"
        }`}
      >
        <Music
          size={20}
          className={activeService === "jingles" ? "animate-pulse" : ""}
        />
        <span>{t("services.jingles")}</span>
      </button>
      <button
        onClick={() => onServiceChange("voiceover")}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform ${
          activeService === "voiceover"
            ? "bg-purple-700 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md border border-gray-200"
        }`}
      >
        <Mic
          size={20}
          className={activeService === "voiceover" ? "animate-pulse" : ""}
        />
        <span>{t("services.voiceover")}</span>
      </button>
    </div>
  );
};

const PricingCard = ({
  title,
  delivery,
  features,
  isPopular,
  whatsappMessage,
}) => {
  const { t, i18n } = useTranslation("pricing");
  const [hovering, setHovering] = useState(false);
  const isES = i18n.language?.startsWith("es");

  const finalMessage = whatsappMessage ||
    (isES
      ? `Hola, me interesa una cotización para ${title}. ¿Podemos hablar?`
      : `Hi, I'm interested in a quote for ${title}. Can we talk?`);
  const whatsappUrl = buildWhatsAppUrl(finalMessage);

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
            {t("package.popular")}
          </span>
        </div>
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
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
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("music_pricing", title)}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          isPopular || hovering
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-green-50 text-green-700 hover:bg-green-600 hover:text-white"
        }`}
      >
        <MessageCircle size={18} />
        <span>{t("package.requestQuote")}</span>
        <ArrowRight
          size={16}
          className={`transition-transform duration-300 ${
            hovering ? "translate-x-1" : ""
          }`}
        />
      </a>
    </div>
  );
};

const VoiceoverCard = ({
  title,
  wordCount,
  delivery,
  features,
  isPopular,
  whatsappMessage,
}) => {
  const { t, i18n } = useTranslation("pricing");
  const [hovering, setHovering] = useState(false);
  const isES = i18n.language?.startsWith("es");

  const finalMessage = whatsappMessage ||
    (isES
      ? `Hola, me interesa una cotización para ${title}. ¿Podemos hablar?`
      : `Hi, I'm interested in a quote for ${title}. Can we talk?`);
  const whatsappUrl = buildWhatsAppUrl(finalMessage);

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
            {t("package.popular")}
          </span>
        </div>
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <div
          className={`${
            isPopular
              ? "bg-purple-50 text-purple-700"
              : "bg-gray-50 text-gray-700"
          } px-4 py-3 rounded-lg mb-6 text-sm font-medium transition-colors duration-300`}
        >
          <div className="font-bold mb-1">
            {t("package.words").replace("{count}", wordCount)}
          </div>
          <div>{delivery}</div>
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
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("voiceover_pricing", title)}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          isPopular || hovering
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-green-50 text-green-700 hover:bg-green-600 hover:text-white"
        }`}
      >
        <MessageCircle size={18} />
        <span>{t("package.requestQuote")}</span>
        <ArrowRight
          size={16}
          className={`transition-transform duration-300 ${
            hovering ? "translate-x-1" : ""
          }`}
        />
      </a>
    </div>
  );
};

const PricingSection = ({ initialService }) => {
  const { t } = useTranslation("pricing");
  const [activeService, setActiveService] = useState(
    initialService || "jingles"
  );

  const packages = [
    {
      id: "basic",
      title: t("jingles.basic.title"),
      delivery: t("jingles.basic.delivery"),
      whatsappMessage: t("jingles.basic.whatsappMessage"),
      features: [
        t("jingles.basic.features.feature1"),
        t("jingles.basic.features.feature2"),
        t("jingles.basic.features.feature3"),
        t("jingles.basic.features.feature4"),
        t("jingles.basic.features.feature5"),
        t("jingles.basic.features.feature6"),
        t("jingles.basic.features.feature7"),
      ],
    },
    {
      id: "standard",
      title: t("jingles.standard.title"),
      delivery: t("jingles.standard.delivery"),
      whatsappMessage: t("jingles.standard.whatsappMessage"),
      features: [
        t("jingles.standard.features.feature1"),
        t("jingles.standard.features.feature2"),
        t("jingles.standard.features.feature3"),
        t("jingles.standard.features.feature4"),
        t("jingles.standard.features.feature5"),
        t("jingles.standard.features.feature6"),
        t("jingles.standard.features.feature7"),
      ],
      isPopular: true,
    },
    {
      id: "premium",
      title: t("jingles.premium.title"),
      delivery: t("jingles.premium.delivery"),
      whatsappMessage: t("jingles.premium.whatsappMessage"),
      features: [
        t("jingles.premium.features.feature1"),
        t("jingles.premium.features.feature2"),
        t("jingles.premium.features.feature3"),
        t("jingles.premium.features.feature4"),
        t("jingles.premium.features.feature5"),
        t("jingles.premium.features.feature6"),
        t("jingles.premium.features.feature7"),
      ],
    },
  ];

  const voiceoverPackages = [
    {
      id: "vo-basic",
      title: t("voiceover.basic.title"),
      wordCount: t("voiceover.basic.wordCount"),
      delivery: t("voiceover.basic.delivery"),
      whatsappMessage: t("voiceover.basic.whatsappMessage"),
      features: [
        t("voiceover.basic.features.feature1"),
        t("voiceover.basic.features.feature2"),
        t("voiceover.basic.features.feature3"),
        t("voiceover.basic.features.feature4"),
        t("voiceover.basic.features.feature5"),
        t("voiceover.basic.features.feature6"),
      ],
    },
    {
      id: "vo-standard",
      title: t("voiceover.standard.title"),
      wordCount: t("voiceover.standard.wordCount"),
      delivery: t("voiceover.standard.delivery"),
      whatsappMessage: t("voiceover.standard.whatsappMessage"),
      features: [
        t("voiceover.standard.features.feature1"),
        t("voiceover.standard.features.feature2"),
        t("voiceover.standard.features.feature3"),
        t("voiceover.standard.features.feature4"),
        t("voiceover.standard.features.feature5"),
        t("voiceover.standard.features.feature6"),
        t("voiceover.standard.features.feature7"),
        t("voiceover.standard.features.feature8"),
      ],
      isPopular: true,
    },
    {
      id: "vo-premium",
      title: t("voiceover.premium.title"),
      wordCount: t("voiceover.premium.wordCount"),
      delivery: t("voiceover.premium.delivery"),
      whatsappMessage: t("voiceover.premium.whatsappMessage"),
      features: [
        t("voiceover.premium.features.feature1"),
        t("voiceover.premium.features.feature2"),
        t("voiceover.premium.features.feature3"),
        t("voiceover.premium.features.feature4"),
        t("voiceover.premium.features.feature5"),
        t("voiceover.premium.features.feature6"),
        t("voiceover.premium.features.feature7"),
        t("voiceover.premium.features.feature8"),
        t("voiceover.premium.features.feature9"),
      ],
    },
  ];

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
            {t("pricing.badge")}
          </div>
          <h2 className="text-3xl font-bold mb-4">{t("pricing.title")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <ServiceSelector
          activeService={activeService}
          onServiceChange={setActiveService}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {activeService === "jingles"
            ? packages.map((pkg) => <PricingCard key={pkg.id} {...pkg} />)
            : voiceoverPackages.map((pkg) => (
                <VoiceoverCard key={pkg.id} {...pkg} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";

const PricingCard = ({ name, description, features, cta, whatsappMessage, isPopular, popularLabel, index }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-2xl p-8 shadow-lg border ${
        isPopular ? "border-purple-400 ring-2 ring-purple-400" : "border-gray-100"
      } hover:shadow-xl transition-all duration-300 flex flex-col`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-purple-700 text-white text-xs font-medium px-4 py-1 rounded-full flex items-center gap-1">
            <Star size={12} fill="currentColor" />
            {popularLabel}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      <div className="space-y-3 mb-8 flex-grow">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      <a
        href={buildWhatsAppUrl(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("pricing_preview", name)}
        className={`group w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
          isPopular
            ? "bg-purple-700 text-white hover:bg-purple-800"
            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
        }`}
      >
        <span>{cta}</span>
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>
    </motion.div>
  );
};

const PricingPreview = () => {
  const { t, i18n } = useTranslation("pricing-preview");

  const getLocalizedPath = (path) => {
    if (i18n.language === "en") {
      return path === "/" ? "/en" : `/en${path}`;
    }
    return path;
  };

  const packages = [
    {
      name: t("packages.starter.name"),
      description: t("packages.starter.description"),
      features: [
        t("packages.starter.features.first"),
        t("packages.starter.features.second"),
        t("packages.starter.features.third"),
        t("packages.starter.features.fourth"),
      ],
      whatsappMessage: t("whatsappMessages.starter"),
      isPopular: false,
    },
    {
      name: t("packages.professional.name"),
      description: t("packages.professional.description"),
      features: [
        t("packages.professional.features.first"),
        t("packages.professional.features.second"),
        t("packages.professional.features.third"),
        t("packages.professional.features.fourth"),
      ],
      whatsappMessage: t("whatsappMessages.professional"),
      isPopular: true,
      popularLabel: t("packages.professional.popular"),
    },
    {
      name: t("packages.ecommerce.name"),
      description: t("packages.ecommerce.description"),
      features: [
        t("packages.ecommerce.features.first"),
        t("packages.ecommerce.features.second"),
        t("packages.ecommerce.features.third"),
        t("packages.ecommerce.features.fourth"),
      ],
      whatsappMessage: t("whatsappMessages.ecommerce"),
      isPopular: false,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <PricingCard
              key={index}
              {...pkg}
              cta={t("cta")}
              index={index}
            />
          ))}
        </div>

        {/* Global features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-purple-50 rounded-2xl p-8 mb-8"
        >
          <p className="font-semibold text-gray-800 mb-4">{t("includes")}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Check size={18} className="text-purple-600" />
              <span className="text-sm text-gray-700">{t("globalFeatures.first")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} className="text-purple-600" />
              <span className="text-sm text-gray-700">{t("globalFeatures.second")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} className="text-purple-600" />
              <span className="text-sm text-gray-700">{t("globalFeatures.third")}</span>
            </div>
          </div>
        </motion.div>

        {/* View all plans link */}
        <div className="text-center">
          <Link
            to={getLocalizedPath("/web-development")}
            className="group inline-flex items-center gap-2 text-purple-700 font-medium hover:text-purple-900 transition-colors"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;

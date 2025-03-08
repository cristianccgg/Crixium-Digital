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
import { useTranslation } from "react-i18next";
import { packageFeaturesEN } from "../packageFeatures.en";
import { packageFeaturesES } from "../packageFeatures.es";

// Selector de tipo de proyecto (Web o Ecommerce)
const ProjectTypeSelector = ({ activeType, onTypeChange }) => {
  const { t } = useTranslation("pricing-section-web");

  return (
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
        <span>{t("projectTypes.website")}</span>
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
        <span>{t("projectTypes.ecommerce")}</span>
      </button>
    </div>
  );
};

// Selector de tecnología/plataforma
const ServiceSelector = ({ activeService, onServiceChange, projectType }) => {
  const { t } = useTranslation("pricing-section-web");

  // Opciones de plataforma basadas en el tipo de proyecto
  const options =
    projectType === "website"
      ? [
          {
            id: "wordpress",
            label: t("services.wordpress"),
            icon: <Globe size={20} />,
          },
          {
            id: "custom",
            label: t("services.custom"),
            icon: <Code size={20} />,
          },
        ]
      : [
          {
            id: "wordpress",
            label: t("services.wordpress"),
            icon: <Globe size={20} />,
          },
          {
            id: "shopify",
            label: t("services.shopify"),
            icon: <ShoppingCart size={20} />,
          },
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
  popularText,
  selectPlanText,
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
            {popularText}
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
        <span>{selectPlanText}</span>
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

const UnifiedPricingSection = ({ initialService, initialType }) => {
  const { t, i18n } = useTranslation("pricing-section-web");
  const [projectType, setProjectType] = useState(initialType || "website");
  const [activeService, setActiveService] = useState(
    initialService || "wordpress"
  );
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // Get current locale's package features
  const getFeatures = () => {
    const currentLanguage = i18n.language;
    return currentLanguage.startsWith("es")
      ? packageFeaturesES
      : packageFeaturesEN;
  };

  const handlePackageSelect = (packageId) => {
    // Parse packageId to determine type and tier
    // Format: 'serviceType-tier' (e.g., 'wp-basic', 'custom-premium')
    const [servicePrefix, tier] = packageId.split("-");

    // Map service prefix to full service name if needed
    let serviceType = activeService;
    if (servicePrefix === "woo") {
      serviceType = "wordpress"; // For WooCommerce
    } else if (servicePrefix === "wp") {
      serviceType = "wordpress";
    }

    // Get features from the correct translation object
    const features = getFeatures();

    // Get translated info for pricing
    const translatedInfo = t(
      `packageBasicInfo.${projectType}.${serviceType}.${tier}`,
      { returnObjects: true }
    );

    const selected = {
      id: packageId,
      title: translatedInfo.title,
      price: translatedInfo.price,
      delivery: translatedInfo.delivery,
      tier,
      projectType,
      serviceType,
      features: features[projectType][serviceType][tier],
      isPopular: tier === "standard",
    };

    setSelectedPackage(selected);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  const getPackageOptions = () => {
    const features = getFeatures();
    const packageTiers = ["basic", "standard", "premium"];

    return packageTiers.map((tier, index) => {
      // Get features from the translation files
      const featuresForTier = features[projectType][activeService][tier];

      // Generate ID based on service and tier
      let id;
      if (activeService === "wordpress" && projectType === "ecommerce") {
        id = `woo-${tier}`;
      } else if (activeService === "wordpress") {
        id = `wp-${tier}`;
      } else {
        id = `${activeService}-${tier}`;
      }

      // Determine if this package is the popular option (middle one)
      const isPopular = index === 1;

      // Get translated basic info
      const translatedInfo = t(
        `packageBasicInfo.${projectType}.${activeService}.${tier}`,
        { returnObjects: true }
      );

      return {
        id,
        title: translatedInfo.title,
        price: translatedInfo.price,
        delivery: translatedInfo.delivery,
        features: featuresForTier,
        isPopular,
        popularText: isPopular
          ? translatedInfo.popular ||
            t("packageBasicInfo.website.wordpress.standard.popular")
          : "",
      };
    });
  };

  const getAdviceBanner = () => {
    if (projectType === "ecommerce") {
      return (
        <div className="mt-16 bg-purple-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">
            {t("ecommerceBanner.title")}
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-purple-100 text-purple-700">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                {t("ecommerceBanner.points.first")}
              </span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-purple-100 text-purple-700">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                {t("ecommerceBanner.points.second")}
              </span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center bg-purple-100 text-purple-700">
                <Check size={12} />
              </div>
              <span className="text-gray-700">
                {t("ecommerceBanner.points.third")}
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
            {t("badge")}
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {t(`sectionTitles.${projectType}`)}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t(`sectionDescriptions.${projectType}`)}
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
              {getPackageOptions().map((pkg) => (
                <PricingCard
                  key={pkg.id}
                  {...pkg}
                  onSelect={handlePackageSelect}
                  selectPlanText={t("buttons.selectPlan")}
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
              <span>{t("buttons.backToPlans")}</span>
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

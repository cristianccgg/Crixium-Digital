import React, { useState, useRef } from "react";
import {
  Monitor,
  ShoppingCart,
  Globe,
  Code,
  ArrowRight,
  Check,
  MessageSquare,
  Sparkles,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { sendContactForm } from "../../services/MailgunService";
import { trackEvent } from "../../utils/analytics";
import { getUTMParams } from "../../hooks/useUTM";

// Selector de tipo de proyecto (Web o Ecommerce)
const ProjectTypeSelector = ({ activeType, onTypeChange }) => {
  const { t } = useTranslation("services-section");

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
  const { t } = useTranslation("services-section");

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

// Componente decorativo para añadir elementos visuales
const DecorativeElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-300 rounded-full opacity-20 blur-3xl"></div>
    <div className="absolute top-1/3 -left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-10"></div>
    <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-pink-400 rounded-full opacity-10"></div>

    {/* Elementos con patrones */}
    <div className="hidden md:block absolute top-20 right-10 opacity-10">
      <div className="grid grid-cols-4 gap-2">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-purple-500 rounded-full"></div>
        ))}
      </div>
    </div>
    <div className="hidden md:block absolute bottom-20 left-10 opacity-10">
      <div className="grid grid-cols-5 gap-1">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-indigo-500 rounded-full"></div>
        ))}
      </div>
    </div>
  </div>
);

// Tarjeta de servicio mejorada
const ServiceCard = ({
  title,
  description,
  features,
  ctaText,
  onClick,
  icon,
  serviceType,
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`bg-white rounded-xl p-8 h-full flex flex-col transition-all duration-500 transform border border-gray-100 shadow-md relative overflow-hidden ${
        hovering ? "scale-105 shadow-xl border-purple-200" : ""
      }`}
    >
      {/* Decoración de la tarjeta */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-purple-50 rounded-full opacity-60"></div>
      <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-indigo-50 rounded-full opacity-60"></div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-md transform transition-transform duration-300 hover:rotate-3">
          <div className="text-white">{icon}</div>
        </div>

        <div className="flex items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {hovering && (
            <Sparkles
              size={18}
              className="ml-2 text-yellow-500 animate-pulse"
            />
          )}
        </div>

        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex-grow">
          <ul className="space-y-3 mb-6">
            {Array.isArray(features) &&
              features.map((feature, index) => (
                <li key={index} className="flex items-start group">
                  <div
                    className={`h-6 w-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center ${
                      hovering
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    } transition-colors duration-300 group-hover:bg-purple-100 group-hover:text-purple-700`}
                  >
                    <Check size={14} />
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
          onClick={onClick}
          className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg transition-all duration-300 ${
            hovering
              ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white"
              : "bg-purple-50 text-purple-700 hover:bg-purple-700 hover:text-white"
          }`}
        >
          <span className="font-medium">{ctaText}</span>
          <ArrowRight
            size={18}
            className={`transition-transform duration-300 ${
              hovering ? "translate-x-1" : ""
            }`}
          />
        </button>
      </div>

      {/* Badge especial */}
      {serviceType === "custom" && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs py-1 px-3 rounded-full flex items-center">
          <Star size={12} className="mr-1" />
          <span>Premium</span>
        </div>
      )}
    </div>
  );
};

// Componente de formulario de contacto
const ContactForm = ({ projectType, technology, onBack }) => {
  const { t } = useTranslation("services-section");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    howSoon: "not-urgent",
    privacyPolicyAccepted: false,
    service: getTechnologyLabel(technology, projectType),
    projectType: getProjectTypeLabel(projectType),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const formStarted = useRef(false);

  // Función para obtener etiqueta legible de tecnología
  function getTechnologyLabel(tech, type) {
    if (tech === "wordpress") {
      return type === "ecommerce" ? "WooCommerce" : "WordPress";
    } else if (tech === "shopify") {
      return "Shopify";
    } else {
      return "Desarrollo personalizado";
    }
  }

  // Función para obtener etiqueta legible de tipo de proyecto
  function getProjectTypeLabel(type) {
    return type === "website" ? "Sitio web" : "Tienda online";
  }

  const handleChange = (e) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackEvent("form_start", {
        source: "services_section",
        project_type: projectType,
        technology: technology,
      });
    }
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Datos del formulario con contexto añadido
    const utmParams = getUTMParams();
    const formDataToSubmit = {
      ...formData,
      service: `Servicio ${getTechnologyLabel(
        technology,
        projectType
      )} - ${getProjectTypeLabel(projectType)}`,
      description: `${formData.description}\n\n---\nPlazo: ${
        formData.howSoon === "urgent"
          ? t("contactForm.timelineOptions.urgent")
          : formData.howSoon === "soon"
          ? t("contactForm.timelineOptions.soon")
          : formData.howSoon === "not-urgent"
          ? t("contactForm.timelineOptions.notUrgent")
          : t("contactForm.timelineOptions.unsure")
      }\nViene desde: Sección de Servicios`,
      source: "services_section",
      ...utmParams,
    };

    // Versión para desarrollo local
    if (process.env.NODE_ENV === "development") {
      console.log("Formulario enviado (modo desarrollo):", formDataToSubmit);
      // Simulamos un retraso para la experiencia de usuario
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
      return;
    }

    // Código para producción
    try {
      // Usar tu servicio Mailgun existente
      const result = await sendContactForm(formDataToSubmit);

      if (result.success) {
        trackEvent("generate_lead", {
          service: getTechnologyLabel(technology, projectType),
          project_type: getProjectTypeLabel(projectType),
          source: "services_section",
        });
        setIsSubmitted(true);
      } else {
        setError(result.message || t("contactForm.errorMessage"));
      }
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      setError(t("contactForm.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-6 bg-white rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-48 h-48 bg-green-50 rounded-full opacity-60"></div>
        <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-purple-50 rounded-full opacity-60"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <Check className="text-white" size={36} />
          </div>
          <h2 className="text-3xl font-bold mb-4">{t("confirmation.title")}</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {t("confirmation.message")}
          </p>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
          >
            {t("general.backToServices")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <button
        onClick={onBack}
        className="mb-6 text-gray-600 hover:text-purple-700 flex items-center gap-2 transition-colors duration-200 group bg-white py-2 px-4 rounded-lg shadow-sm"
      >
        <ArrowRight
          size={16}
          className="transform rotate-180 group-hover:-translate-x-1 transition-transform duration-200"
        />
        <span>{t("general.backToServices")}</span>
      </button>

      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-64 h-64 bg-purple-50 rounded-full opacity-60"></div>
        <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-indigo-50 rounded-full opacity-60"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">{t("contactForm.title")}</h2>
          <p className="text-gray-600 mb-6">{t("contactForm.subtitle")}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("contactForm.fullName")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                placeholder={t("contactForm.fullName")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("contactForm.email")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("contactForm.phone")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="howSoon"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("contactForm.timeline")}
              </label>
              <select
                id="howSoon"
                name="howSoon"
                value={formData.howSoon}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
              >
                <option value="not-urgent">
                  {t("contactForm.timelineOptions.notUrgent")}
                </option>
                <option value="soon">
                  {t("contactForm.timelineOptions.soon")}
                </option>
                <option value="urgent">
                  {t("contactForm.timelineOptions.urgent")}
                </option>
                <option value="unsure">
                  {t("contactForm.timelineOptions.unsure")}
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("contactForm.message")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                placeholder={t("contactForm.messagePlaceholder")}
              />
            </div>

            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                id="privacyPolicyAccepted"
                name="privacyPolicyAccepted"
                checked={formData.privacyPolicyAccepted}
                onChange={handleChange}
                className="mt-1"
                required
              />
              <label
                htmlFor="privacyPolicyAccepted"
                className="text-sm text-gray-700"
              >
                {t("contactForm.privacyPolicy")}{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("contactForm.sending")}
                </>
              ) : (
                t("contactForm.submit")
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Componente CTA modificado (sin botón de agendar llamada)
const CTAButton = ({ onRequestQuote }) => {
  const { t } = useTranslation("services-section");

  return (
    <div className="mt-8 text-center">
      <button
        onClick={onRequestQuote}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
      >
        <MessageSquare size={20} />
        <span className="font-medium">{t("general.requestQuote")}</span>
      </button>
    </div>
  );
};

// Componente principal
const ServicesSection = ({ initialService, initialType }) => {
  const { t } = useTranslation("services-section");
  const [projectType, setProjectType] = useState(initialType || "website");
  const [activeService, setActiveService] = useState(
    initialService || "wordpress"
  );
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactAction, setContactAction] = useState(null);

  // Obtener los servicios según el tipo de proyecto y tecnología
  const getServiceData = () => {
    try {
      // Intentamos obtener la información de servicio de las traducciones
      const serviceInfo = t(`serviceInfo.${projectType}.${activeService}`, {
        returnObjects: true,
      });

      // Verificamos que exista la información
      if (!serviceInfo || typeof serviceInfo !== "object") {
        console.warn(
          `No se encontró información para serviceInfo.${projectType}.${activeService}`
        );
        return getFallbackServiceData();
      }

      let icon;
      if (activeService === "wordpress") {
        icon = <Globe size={24} className="text-white" />;
      } else if (activeService === "shopify") {
        icon = <ShoppingCart size={24} className="text-white" />;
      } else {
        icon = <Code size={24} className="text-white" />;
      }

      // Convertir las características de objeto a array si es necesario
      let featuresArray = [];
      if (serviceInfo.features) {
        if (Array.isArray(serviceInfo.features)) {
          featuresArray = serviceInfo.features;
        } else if (typeof serviceInfo.features === "object") {
          // Convertir objeto de features a array
          featuresArray = Object.values(serviceInfo.features);
        }
      }

      return {
        title: serviceInfo.title || "Servicio",
        description: serviceInfo.description || "Descripción del servicio",
        features: featuresArray,
        icon: icon,
      };
    } catch (error) {
      console.error("Error al obtener datos del servicio:", error);
      return getFallbackServiceData();
    }
  };

  // Datos de servicio de respaldo en caso de error
  const getFallbackServiceData = () => {
    // Datos para sitios web WordPress (datos de respaldo)
    if (projectType === "website" && activeService === "wordpress") {
      return {
        title: "WordPress",
        description:
          "Sitios web profesionales con WordPress, fáciles de gestionar y optimizados para SEO.",
        features: [
          "Diseño personalizado",
          "Panel de administración intuitivo",
          "Formularios de contacto",
          "Optimización para móviles",
          "Integración con redes sociales",
          "Posibilidad de blog integrado",
        ],
        icon: <Globe size={24} className="text-white" />,
      };
    }

    // Datos para sitios web de código personalizado
    else if (projectType === "website" && activeService === "custom") {
      return {
        title: "Desarrollo a Medida",
        description:
          "Sitios web únicos desarrollados desde cero con las últimas tecnologías web.",
        features: [
          "Diseño 100% personalizado",
          "Desarrollo HTML, CSS, JavaScript",
          "Frameworks modernos (React, Vue)",
          "Máximo rendimiento y optimización",
          "Animaciones y efectos avanzados",
          "Integraciones con APIs",
        ],
        icon: <Code size={24} className="text-white" />,
      };
    }

    // Datos para tiendas WooCommerce
    else if (projectType === "ecommerce" && activeService === "wordpress") {
      return {
        title: "WooCommerce",
        description:
          "Potentes tiendas online con WordPress y WooCommerce, personalizables y escalables.",
        features: [
          "Gestión completa de productos",
          "Pasarelas de pago integradas",
          "Opciones de envío configurables",
          "Gestión de inventario",
          "Informes de ventas",
          "Facturas automáticas",
        ],
        icon: <Globe size={24} className="text-white" />,
      };
    }

    // Datos para tiendas Shopify
    else if (projectType === "ecommerce" && activeService === "shopify") {
      return {
        title: "Shopify",
        description:
          "Tiendas en Shopify optimizadas para ventas con diseño a medida y funcionalidades avanzadas.",
        features: [
          "Diseño personalizado de tema",
          "Configuración completa de tienda",
          "Apps y extensiones premium",
          "Optimización para conversiones",
          "Automatizaciones de marketing",
          "Ajustes para SEO",
        ],
        icon: <ShoppingCart size={24} className="text-white" />,
      };
    }

    // Caso por defecto
    return {
      title: "Servicio Web",
      description: "Soluciones digitales a medida para tu negocio.",
      features: [
        "Diseño personalizado",
        "Optimización para móviles",
        "Experiencia de usuario mejorada",
      ],
      icon: <Globe size={24} className="text-white" />,
    };
  };

  const handleRequestQuote = () => {
    setContactAction("quote");
    setShowContactForm(true);
  };

  const handleServiceSelect = () => {
    setContactAction("service");
    setShowContactForm(true);
  };

  const handleBackToServices = () => {
    setShowContactForm(false);
    setContactAction(null);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-50 via-white to-indigo-50 relative">
      {/* Elementos decorativos */}
      <DecorativeElements />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-4 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm font-medium shadow-sm">
            {t("badge")}
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-transparent bg-clip-text">
            {t(`sectionTitles.${projectType}`)}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t(`sectionDescriptions.${projectType}`)}
          </p>
        </div>

        {!showContactForm ? (
          <>
            <ProjectTypeSelector
              activeType={projectType}
              onTypeChange={(type) => {
                setProjectType(type);
                setActiveService("wordpress");
              }}
            />

            <ServiceSelector
              activeService={activeService}
              onServiceChange={setActiveService}
              projectType={projectType}
            />

            <div className="max-w-3xl mx-auto">
              <ServiceCard
                {...getServiceData()}
                serviceType={activeService}
                ctaText={t("general.requestInfo")}
                onClick={handleServiceSelect}
              />

              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg text-center text-sm text-gray-600 border border-purple-100 shadow-sm">
                {t("general.needCustomSolution")}{" "}
                <Link
                  to="/contact"
                  className="text-purple-700 font-medium hover:underline transition-colors"
                >
                  {t("general.contactUs")}
                </Link>{" "}
                {t("general.forCustomSolutions")}
              </div>
            </div>
          </>
        ) : (
          <ContactForm
            projectType={projectType}
            technology={activeService}
            onBack={handleBackToServices}
          />
        )}
      </div>

      {/* Adornos adicionales en la parte inferior */}
      <div className="mt-16 flex justify-center space-x-2 opacity-40">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-purple-500"></div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

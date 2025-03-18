import React, { useState } from "react";
import {
  Monitor,
  ShoppingCart,
  Globe,
  Code,
  ArrowRight,
  Check,
  MessageSquare,
  FileText,
  Calendar,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
        <span>{t("projectTypes.website", "Sitio Web")}</span>
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
        <span>{t("projectTypes.ecommerce", "Tienda Online")}</span>
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
            label: t("services.wordpress", "WordPress"),
            icon: <Globe size={20} />,
          },
          {
            id: "custom",
            label: t("services.custom", "Código Personalizado"),
            icon: <Code size={20} />,
          },
        ]
      : [
          {
            id: "wordpress",
            label: t("services.wordpress", "WordPress / WooCommerce"),
            icon: <Globe size={20} />,
          },
          {
            id: "shopify",
            label: t("services.shopify", "Shopify"),
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

// Tarjeta de servicio
const ServiceCard = ({
  title,
  description,
  features,
  ctaText,
  onClick,
  icon,
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`bg-white rounded-xl p-8 h-full flex flex-col transition-all duration-300 transform border border-gray-100 shadow-md ${
        hovering ? "scale-105 shadow-xl" : ""
      }`}
    >
      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="flex-grow">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start group">
              <div
                className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center ${
                  hovering
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
        onClick={onClick}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
          hovering
            ? "bg-purple-700 text-white"
            : "bg-purple-50 text-purple-700 hover:bg-purple-700 hover:text-white"
        }`}
      >
        <span>{ctaText}</span>
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

// Componente de formulario de contacto simplificado
const ContactForm = ({ projectType, technology, onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    howSoon: "not-urgent",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulando envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Aquí podrías implementar la lógica para enviar el formulario a tu servidor
      console.log("Formulario enviado:", {
        ...formData,
        projectType,
        technology,
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-3">¡Gracias por contactarnos!</h2>
        <p className="text-gray-600 mb-6">
          Hemos recibido tu mensaje. Nos pondremos en contacto contigo en breve
          para discutir tu proyecto de{" "}
          {projectType === "website" ? "sitio web" : "tienda online"} con{" "}
          {technology === "wordpress"
            ? "WordPress"
            : technology === "shopify"
            ? "Shopify"
            : "desarrollo personalizado"}
          .
        </p>
        <button
          onClick={onBack}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Volver a servicios
        </button>
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
        <span>Volver a servicios</span>
      </button>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Contáctanos</h2>
        <p className="text-gray-600 mb-6">
          Cuéntanos sobre tu proyecto de{" "}
          {projectType === "website" ? "sitio web" : "tienda online"} con{" "}
          {technology === "wordpress"
            ? "WordPress"
            : technology === "shopify"
            ? "Shopify"
            : "desarrollo personalizado"}{" "}
          y te ayudaremos a hacerlo realidad.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-500">*</span>
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teléfono
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

          <div>
            <label
              htmlFor="howSoon"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ¿Cuándo necesitas iniciar el proyecto?
            </label>
            <select
              id="howSoon"
              name="howSoon"
              value={formData.howSoon}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            >
              <option value="not-urgent">En los próximos meses</option>
              <option value="soon">En las próximas semanas</option>
              <option value="urgent">Lo antes posible</option>
              <option value="unsure">No estoy seguro</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mensaje <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
              placeholder="Cuéntanos sobre tu proyecto, objetivos, características importantes..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-70 flex items-center justify-center"
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
                Enviando...
              </>
            ) : (
              "Enviar solicitud"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente de botones CTA
const CTAButtons = ({ onRequestQuote, onScheduleCall }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={onRequestQuote}
        className="flex-1 bg-purple-700 text-white px-6 py-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
      >
        <MessageSquare size={20} />
        <span>Solicitar cotización</span>
      </button>

      <button
        onClick={onScheduleCall}
        className="flex-1 bg-white border border-purple-700 text-purple-700 px-6 py-4 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
      >
        <Calendar size={20} />
        <span>Agendar llamada</span>
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
    // Datos para sitios web WordPress
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
        icon: <Globe size={24} className="text-purple-700" />,
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
        icon: <Code size={24} className="text-purple-700" />,
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
        icon: <Globe size={24} className="text-purple-700" />,
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
        icon: <ShoppingCart size={24} className="text-purple-700" />,
      };
    }
  };

  const handleRequestQuote = () => {
    setContactAction("quote");
    setShowContactForm(true);
  };

  const handleScheduleCall = () => {
    setContactAction("call");
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
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            {t("badge", "Nuestros Servicios")}
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {t(
              `sectionTitles.${projectType}`,
              projectType === "website"
                ? "Diseño y Desarrollo de Sitios Web"
                : "Soluciones de Comercio Electrónico"
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t(
              `sectionDescriptions.${projectType}`,
              projectType === "website"
                ? "Creamos sitios web a medida que destacan tu marca y atraen a tu audiencia ideal."
                : "Desarrollamos tiendas online optimizadas para aumentar tus ventas y mejorar la experiencia de compra."
            )}
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
                ctaText="Solicitar información"
                onClick={handleServiceSelect}
              />

              <CTAButtons
                onRequestQuote={handleRequestQuote}
                onScheduleCall={handleScheduleCall}
              />

              <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
                ¿Necesitas algo diferente?{" "}
                <Link to="/contact" className="text-purple-700 hover:underline">
                  Contáctanos
                </Link>{" "}
                para soluciones personalizadas.
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
    </section>
  );
};

export default ServicesSection;

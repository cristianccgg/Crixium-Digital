import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Check,
  Code,
  Globe,
  Package,
  ShoppingCart,
  ArrowRight,
  Loader,
  Database,
  Layout,
  Monitor,
} from "lucide-react";
import SimpleFileUploadComponent from "../web_development/SimpleFileUploadComponent";
import { createOrder } from "../OrderManagerFirebase";
import { sendContactForm } from "../services/MailgunService"; // Para servicios web
// Solo importar PaymentGateway para productos musicales
import PaymentGateway from "../payments/PaymentGateway";

const UnifiedCheckoutForm = ({ selectedPackage, onCancel }) => {
  const { t } = useTranslation("checkout-web");
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [currentTotal, setCurrentTotal] = useState(() => {
    const priceValue = selectedPackage.price || 0;
    return typeof priceValue === "string"
      ? parseInt(priceValue.replace(/[^\d]/g, ""))
      : parseInt(priceValue);
  });

  // Determinar qué tipo de formulario necesitamos
  const projectType = selectedPackage.projectType || "website";
  const serviceType = selectedPackage.serviceType || "wordpress";

  // Personalizar según el tipo de proyecto y servicio
  const isEcommerce = projectType === "ecommerce";
  const isCustomCode = serviceType === "custom";
  const isShopify = serviceType === "shopify";
  const isWordPress = serviceType === "wordpress";
  const isPremiumPlan = selectedPackage.id.includes("premium");

  // Determinar si este es un proyecto web (no música)
  const isWebProject = true; // Siempre true en este componente

  // Definimos el número máximo de pasos según el tipo de proyecto
  // Los proyectos web ahora solo tienen 3 pasos (sin pago), mientras que música tiene 4
  const maxSteps = 3;

  const getServiceName = () => {
    if (isEcommerce) {
      return isShopify
        ? t("serviceName.shopify")
        : t("serviceName.wooCommerce");
    } else {
      return isCustomCode
        ? t("serviceName.customCode")
        : t("serviceName.wordpress");
    }
  };

  const [formData, setFormData] = useState({
    // Package details
    package: selectedPackage.id,
    packageDetails: selectedPackage,
    projectType: projectType,
    serviceType: serviceType,
    extras: [],

    // Campos generales
    name: "",
    email: "",
    phone: "",
    designReference: "",

    // Campos para sitios web
    siteType: "",
    projectDescription: "",
    features: [],
    framework: isCustomCode ? "" : null,

    // Campos para ecommerce
    businessName: isEcommerce ? "" : null,
    businessType: isEcommerce ? "" : null,
    productCount: isEcommerce ? "" : null,
    domain: "",

    storeDescription: isEcommerce ? "" : null,

    // Archivos
    referenceFiles: [],
    productFiles: isEcommerce ? [] : null,

    total: parseInt(selectedPackage.price || 0),
  });

  // Actualizar el total cuando cambian los extras
  useEffect(() => {
    const newTotal = calculateTotal();
    setCurrentTotal(newTotal);

    setFormData((prev) => ({
      ...prev,
      total: newTotal,
    }));
  }, [formData.extras]);

  const setFiles = (newFiles, type = "referenceFiles") => {
    setFormData((prev) => ({
      ...prev,
      [type]: newFiles,
    }));
  };

  // Manejador de cambio para inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Definiciones de servicios extras según el tipo de proyecto
  const getExtraServices = () => {
    if (isEcommerce) {
      return [
        {
          id: "rush",
          title: t("checkout.extras.ecommerce.rush.title"),
          price: 50,
          description: t("checkout.extras.ecommerce.rush.description"),
        },
        {
          id: "seo",
          title: t("checkout.extras.ecommerce.seo.title"),
          price: 35,
          description: t("checkout.extras.ecommerce.seo.description"),
        },
        {
          id: "analytics",
          title: t("checkout.extras.ecommerce.analytics.title"),
          price: 30,
          description: t("checkout.extras.ecommerce.analytics.description"),
        },
        {
          id: "onboarding",
          title: t("checkout.extras.ecommerce.onboarding.title"),
          price: 45,
          description: t("checkout.extras.ecommerce.onboarding.description"),
        },
        {
          id: "products",
          title: t("checkout.extras.ecommerce.products.title"),
          price: 50,
          description: t("checkout.extras.ecommerce.products.description"),
        },
      ];
    } else if (isCustomCode) {
      return [
        {
          id: "rush",
          title: t("checkout.extras.customCode.rush.title"),
          price: 40,
          description: t("checkout.extras.customCode.rush.description"),
        },
        {
          id: "responsive",
          title: t("checkout.extras.customCode.responsive.title"),
          price: 35,
          description: t("checkout.extras.customCode.responsive.description"),
        },
        {
          id: "animations",
          title: t("checkout.extras.customCode.animations.title"),
          price: 45,
          description: t("checkout.extras.customCode.animations.description"),
        },
        {
          id: "api",
          title: t("checkout.extras.customCode.api.title"),
          price: 50,
          description: t("checkout.extras.customCode.api.description"),
        },
        {
          id: "deployment",
          title: t("checkout.extras.customCode.deployment.title"),
          price: 35,
          description: t("checkout.extras.customCode.deployment.description"),
        },
        {
          id: "multi-language",
          title: t("checkout.extras.customCode.multiLanguage.title"),
          price: 40,
          description: t(
            "checkout.extras.customCode.multiLanguage.description"
          ),
        },
        {
          id: "react-framework",
          title: t("checkout.extras.customCode.reactFramework.title"),
          price: 60,
          description: t(
            "checkout.extras.customCode.reactFramework.description"
          ),
          hiddenInPremium: true,
        },
      ];
    } else {
      // WordPress no ecommerce
      return [
        {
          id: "rush",
          title: t("checkout.extras.wordpress.rush.title"),
          price: 30,
          description: t("checkout.extras.wordpress.rush.description"),
        },
        {
          id: "seo",
          title: t("checkout.extras.wordpress.seo.title"),
          price: 40,
          description: t("checkout.extras.wordpress.seo.description"),
        },
        {
          id: "domain",
          title: t("checkout.extras.wordpress.domain.title"),
          price: 30,
          description: t("checkout.extras.wordpress.domain.description"),
        },
        {
          id: "maintenance",
          title: t("checkout.extras.wordpress.maintenance.title"),
          price: 60,
          description: t("checkout.extras.wordpress.maintenance.description"),
        },
      ];
    }
  };

  // Obtener tipos de sitios
  const getSiteTypes = () => {
    if (isEcommerce) {
      return [
        t("siteTypes.ecommerce.fashion"),
        t("siteTypes.ecommerce.food"),
        t("siteTypes.ecommerce.electronics"),
        t("siteTypes.ecommerce.home"),
        t("siteTypes.ecommerce.beauty"),
        t("siteTypes.ecommerce.crafts"),
        t("siteTypes.ecommerce.services"),
        t("siteTypes.ecommerce.others"),
      ];
    } else {
      return [
        t("siteTypes.website.blog"),
        t("siteTypes.website.localBusiness"),
        t("siteTypes.website.portfolio"),
        t("siteTypes.website.corporate"),
        t("siteTypes.website.landing"),
        t("siteTypes.website.educational"),
        t("siteTypes.website.informative"),
      ];
    }
  };

  // Obtener frameworks
  const getFrameworks = () => {
    if (isCustomCode) {
      if (isPremiumPlan) {
        return [
          t("frameworks.premium.htmlCssJs"),
          t("frameworks.premium.htmlTailwind"),
          t("frameworks.premium.reactTailwind"),
          t("frameworks.premium.indifferent"),
        ];
      } else {
        return [
          t("frameworks.standard.htmlCssJs"),
          t("frameworks.standard.htmlTailwind"),
          t("frameworks.standard.indifferent"),
        ];
      }
    }
    return [];
  };

  // Feature options para sitios web
  const featureOptions = isEcommerce
    ? []
    : [
        {
          id: "contact-form",
          title: t("featureOptions.contactForm"),
        },
        {
          id: "gallery",
          title: t("featureOptions.gallery"),
        },
        {
          id: "blog",
          title: t("featureOptions.blog"),
        },
        {
          id: "testimonials",
          title: t("featureOptions.testimonials"),
        },
        {
          id: "maps",
          title: t("featureOptions.maps"),
        },
      ];

  const calculateTotal = () => {
    const basePrice =
      typeof selectedPackage.price === "string"
        ? parseInt(selectedPackage.price.replace(/[^\d]/g, ""))
        : parseInt(selectedPackage.price || 0);
    const extrasTotal = formData.extras.reduce((total, extraId) => {
      const extra = getExtraServices().find((e) => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);

    return basePrice + extrasTotal;
  };

  const handleFrameworkSelect = (framework) => {
    // Si no es plan premium y selecciona React, agregar el extra de React
    if (isCustomCode && !isPremiumPlan && framework === "React") {
      // Añadir el servicio de React si no está ya incluido
      if (!formData.extras.includes("react-framework")) {
        setFormData((prev) => ({
          ...prev,
          framework,
          extras: [...prev.extras, "react-framework"],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          framework,
        }));
      }
    }
    // Si no es plan premium y deselecciona React (selecciona otro), quitar el extra de React
    else if (
      isCustomCode &&
      !isPremiumPlan &&
      formData.framework === "React" &&
      framework !== "React"
    ) {
      setFormData((prev) => ({
        ...prev,
        framework,
        extras: prev.extras.filter((id) => id !== "react-framework"),
      }));
    }
    // Para otros casos, simplemente actualizar el framework
    else {
      setFormData((prev) => ({
        ...prev,
        framework,
      }));
    }
  };

  const handleTypeSelect = (type) => {
    if (isEcommerce) {
      setFormData((prev) => ({
        ...prev,
        businessType: type,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        siteType: type,
      }));
    }
  };

  const handleExtraToggle = (extraId) => {
    // Si es el extra de React, también actualizar el framework seleccionado
    if (extraId === "react-framework") {
      if (formData.extras.includes(extraId)) {
        // Si se está quitando el extra de React, también quitar React como framework
        setFormData((prev) => ({
          ...prev,
          framework: prev.framework === "React" ? "" : prev.framework,
          extras: prev.extras.filter((id) => id !== extraId),
        }));
      } else {
        // Si se está añadiendo el extra de React, también establecer React como framework
        setFormData((prev) => ({
          ...prev,
          framework: "React",
          extras: [...prev.extras, extraId],
        }));
      }
    } else {
      // Para otros extras, mantener el comportamiento original
      setFormData((prev) => ({
        ...prev,
        extras: prev.extras.includes(extraId)
          ? prev.extras.filter((id) => id !== extraId)
          : [...prev.extras, extraId],
      }));
    }
  };

  const handleFeatureToggle = (featureId) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((id) => id !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const validateCurrentStep = () => {
    if (step === 2) {
      // Validación para el paso 2 - Detalles del proyecto
      if (isEcommerce) {
        if (!formData.businessName.trim()) {
          alert("El nombre del negocio es obligatorio");
          return false;
        }
        if (!formData.businessType) {
          alert("El tipo de negocio es obligatorio");
          return false;
        }
        if (!formData.productCount) {
          alert("El número aproximado de productos es obligatorio");
          return false;
        }
        if (!formData.storeDescription.trim()) {
          alert("La descripción de la tienda es obligatoria");
          return false;
        }
      } else {
        if (!formData.projectDescription.trim()) {
          alert("La descripción del proyecto es obligatoria");
          return false;
        }
      }
    } else if (step === 3) {
      // Validación para el paso 3 - Información de contacto
      if (!formData.name.trim()) {
        alert("El nombre es obligatorio");
        return false;
      }
      if (!formData.email.trim()) {
        alert("El email es obligatorio");
        return false;
      }
      // Validación básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Por favor, introduce un email válido");
        return false;
      }
    }
    return true;
  };

  const SelectedPackageDisplay = () => (
    <div className="mb-8 p-4 bg-purple-50 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {isEcommerce ? (
            <ShoppingCart className="text-purple-700" size={24} />
          ) : (
            <Package className="text-purple-700" size={24} />
          )}
        </div>
        <div>
          <h3 className="font-semibold">{selectedPackage.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {projectType === "ecommerce"
              ? t("general.ecommerceShop")
              : t("general.webShop")}{" "}
            • {getServiceName()} • {selectedPackage.delivery}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-purple-700 font-semibold">
              US${selectedPackage.price}
            </span>
            <span className="text-sm text-gray-500">
              {t("general.basePrice")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente para mostrar la confirmación del pedido
  const OrderConfirmation = () => {
    // Determinar qué tipo de instrucciones mostrar según el tipo de servicio
    const isWordPress = serviceType === "wordpress";
    const isShopify = serviceType === "shopify";

    // Contenido específico para cada plataforma
    const getCredentialsInstructions = () => {
      if (isWordPress) {
        return (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-left">
            <h3 className="text-md font-semibold text-purple-700 mb-2">
              Próximos pasos para tu sitio WordPress
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              Gracias por tu interés en nuestros servicios web. Un miembro de
              nuestro equipo se pondrá en contacto contigo pronto para discutir
              los detalles de tu proyecto.
            </p>
            <p className="text-sm text-gray-700">
              Si tienes alguna pregunta, puedes contactarnos en{" "}
              <a
                href="mailto:contact@crixiumdigital.com"
                className="text-blue-700 hover:underline"
              >
                contact@crixiumdigital.com
              </a>
            </p>
          </div>
        );
      } else if (isShopify) {
        return (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-left">
            <h3 className="text-md font-semibold text-purple-700 mb-2">
              Próximos pasos para tu tienda Shopify
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              Gracias por tu interés en nuestros servicios de ecommerce. Uno de
              nuestros especialistas en Shopify revisará tu solicitud y te
              contactará pronto para comenzar a trabajar.
            </p>
            <p className="text-sm text-gray-700">
              Si tienes alguna pregunta, puedes contactarnos en{" "}
              <a
                href="mailto:contact@crixiumdigital.com"
                className="text-blue-700 hover:underline"
              >
                contact@crixiumdigital.com
              </a>
            </p>
          </div>
        );
      } else {
        return (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-left">
            <h3 className="text-md font-semibold text-purple-700 mb-2">
              Próximos pasos para tu proyecto
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              Gracias por tu interés en nuestros servicios. Un miembro de
              nuestro equipo técnico revisará tu solicitud y te contactará
              pronto para discutir los detalles del proyecto.
            </p>
            <p className="text-sm text-gray-700">
              Si tienes alguna pregunta, puedes contactarnos en{" "}
              <a
                href="mailto:contact@crixiumdigital.com"
                className="text-blue-700 hover:underline"
              >
                contact@crixiumdigital.com
              </a>
            </p>
          </div>
        );
      }
    };

    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">¡Solicitud Confirmada!</h2>
        <p className="text-gray-600 mb-6">
          Tu solicitud ha sido recibida. Hemos enviado los detalles a tu correo.{" "}
          <br /> Pronto nos pondremos en contacto contigo para discutir tu
          proyecto.
        </p>

        <div className="p-4 bg-purple-50 rounded-lg inline-block mb-6">
          <p className="text-sm text-gray-700 mb-1">
            Tu número de referencia es:
          </p>
          <p className="text-xl font-mono font-bold">{orderNumber}</p>
        </div>

        {/* Instrucciones específicas según la plataforma */}
        {getCredentialsInstructions()}

        <div className="flex flex-col gap-4 max-w-xs mx-auto mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    try {
      // Si estamos en el último paso, completar el pedido
      if (step === maxSteps) {
        // Crear un objeto limpio con todos los datos necesarios
        const orderData = {
          // Información del paquete
          package: selectedPackage.id,
          packageDetails: selectedPackage,
          serviceType: serviceType,
          projectType: projectType,
          extras: formData.extras || [],
          total: currentTotal,

          // Información de contacto
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",

          // Información común
          designReference: formData.designReference || "",
          referenceFiles: formData.referenceFiles || [],

          // Campos específicos para web no-ecommerce
          siteType: !isEcommerce ? formData.siteType : null,
          projectDescription: !isEcommerce ? formData.projectDescription : null,
          features: !isEcommerce ? [...formData.features] : [], // Forzar copia del array
          framework: isCustomCode ? formData.framework : null,

          // Campos específicos para ecommerce
          businessName: isEcommerce ? formData.businessName : null,
          businessType: isEcommerce ? formData.businessType : null,
          productCount: isEcommerce ? formData.productCount : null,
          storeDescription: isEcommerce ? formData.storeDescription : null,
          productFiles: isEcommerce ? formData.productFiles : null,

          paymentStatus: "inquiry", // Para proyectos web, marcamos como "inquiry" en lugar de "pending"
        };

        // Para proyectos web, utilizamos el servicio de contacto
        // Crear orden en Firestore pero sin requerir pago inmediato
        const result = await createOrder(orderData);

        if (result.success) {
          setOrderNumber(result.orderNumber);

          // También enviar el formulario al servicio de emails
          try {
            // Formatear los datos para el formulario de contacto
            const contactFormData = {
              name: formData.name,
              email: formData.email,
              phone: formData.phone || "",
              service: `${projectType} - ${serviceType}`,
              projectType: projectType,
              budget: `$${currentTotal} USD`,
              description: isEcommerce
                ? formData.storeDescription
                : formData.projectDescription,
              privacyPolicyAccepted: true,
              fileDetails: [],
            };

            // Intentar enviar correo de contacto (no bloquear flujo si falla)
            await sendContactForm(contactFormData);
          } catch (emailError) {
            console.error(
              "Error al enviar formulario de contacto:",
              emailError
            );
            // No interrumpir el flujo por un error de correo
          }

          // Mostrar página de confirmación
          setOrderComplete(true);
        } else {
          alert(
            "Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo."
          );
        }
      } else {
        // Si no estamos en el último paso, avanzar al siguiente
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      alert(
        "Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo."
      );
    }

    setIsSubmitting(false);
  };

  // Si el pedido está completo, mostrar la confirmación
  if (orderComplete) {
    return <OrderConfirmation />;
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[...Array(maxSteps)].map((_, num) => (
        <div key={num} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= num + 1
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {num + 1}
          </div>
          {num < maxSteps - 1 && (
            <div
              className={`w-12 h-1 ${
                step > num + 1 ? "bg-purple-700" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Renderizar el paso actual
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  // Renderizado para el Paso 1: Personalización con extras
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        {isEcommerce
          ? "Personaliza tu Tienda Online"
          : "Personaliza tu Proyecto"}
      </h3>
      <div className="space-y-4">
        {getExtraServices()
          .filter((extra) => !extra.hiddenInPremium || !isPremiumPlan)
          .map((extra) => (
            <div
              key={extra.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.extras.includes(extra.id)
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              }`}
              onClick={() => handleExtraToggle(extra.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.extras.includes(extra.id)
                        ? "border-purple-700 bg-purple-700"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.extras.includes(extra.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{extra.title}</h4>
                    <p className="text-sm text-gray-500">{extra.description}</p>
                  </div>
                </div>
                <span className="font-medium">+${extra.price}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="font-medium">Precio Estimado:</span>
          <span className="text-xl font-bold">${currentTotal}</span>
        </div>
      </div>
    </div>
  );

  // Renderizado para el Paso 2: Detalles del proyecto
  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        {isEcommerce ? "Detalles de la Tienda" : "Detalles del Proyecto"}
      </h3>
      <div className="space-y-4">
        {isEcommerce ? (
          // Formulario para ecommerce
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de tu negocio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Nombre de tu empresa o proyecto"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de negocio <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {getSiteTypes().map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeSelect(type)}
                    className={`p-4 border rounded-lg flex items-center gap-2 ${
                      formData.businessType === type
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <Database size={20} />
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número aproximado de productos{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="productCount"
                  value={formData.productCount}
                  onChange={handleInputChange}
                  placeholder="Ej: 50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dominio (si ya tienes uno)
                </label>
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  placeholder="tunegocio.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Tienes alguna referencia de diseño?
              </label>
              <input
                type="text"
                name="designReference"
                value={formData.designReference}
                onChange={handleInputChange}
                placeholder="Ej: Me gusta el estilo de example.com o link a Figma/PDF..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción de tu tienda y requisitos
              </label>
              <textarea
                name="storeDescription"
                value={formData.storeDescription}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe tu tienda, objetivos, funcionalidades importantes, público objetivo, preferencias de diseño, etc..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                required
              />
            </div>

            <SimpleFileUploadComponent
              files={formData.referenceFiles}
              setFiles={(newFiles) => setFiles(newFiles, "referenceFiles")}
              label="Referencias, Logo o Documentos de Diseño / Catalogo de productos"
              description="Adjunta logo, textos y cualquier referencia visual para tu tienda /Adjunta archivos CSV, Excel o imágenes de tus productos"
              acceptTypes=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.svg,.psd,.ai,.xd,.fig,.sketch"
            />
          </>
        ) : (
          // Formulario para sitios web
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Sitio Web
              </label>
              <div className="grid grid-cols-2 gap-4">
                {getSiteTypes().map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeSelect(type)}
                    className={`p-4 border rounded-lg flex items-center gap-2 ${
                      formData.siteType === type
                        ? "border-purple-700 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <Globe size={20} />
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {isCustomCode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tecnología Preferida
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {getFrameworks().map((framework) => (
                    <button
                      key={framework}
                      type="button"
                      onClick={() => handleFrameworkSelect(framework)}
                      className={`p-4 border rounded-lg flex items-center gap-2 ${
                        formData.framework === framework
                          ? "border-purple-700 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <Code size={20} />
                      <span>{framework}</span>
                    </button>
                  ))}
                </div>
                {!isPremiumPlan && formData.framework === "React" && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700">
                    El uso de React está disponible como un servicio adicional
                    en este plan. Se ha añadido a tus extras.
                  </div>
                )}
              </div>
            )}

            {featureOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Características Deseadas
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {featureOptions.map((feature) => (
                    <div
                      key={feature.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.features.includes(feature.id)
                          ? "border-purple-700 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() => handleFeatureToggle(feature.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            formData.features.includes(feature.id)
                              ? "border-purple-700 bg-purple-700"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.features.includes(feature.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span>{feature.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Tienes alguna referencia de diseño?
              </label>
              <input
                type="text"
                name="designReference"
                value={formData.designReference}
                onChange={handleInputChange}
                placeholder="Ej: Me gusta el estilo de example.com..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Proyecto
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe tu proyecto, objetivo del sitio, características importantes, público objetivo, preferencias de color, etc..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
                required
              />
            </div>

            <SimpleFileUploadComponent
              files={formData.referenceFiles}
              setFiles={setFiles}
              label="Logo, Referencias o Documentos de Diseño"
              description="Adjunta logo, mockups o cualquier referencia visual para tu sitio web"
              acceptTypes=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.svg,.psd,.ai,.xd,.fig,.sketch"
            />
          </>
        )}
      </div>
    </div>
  );

  // Renderizado para el Paso 3: Información de contacto
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h4 className="font-medium mb-2">Resumen del Proyecto</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Paquete Seleccionado ({selectedPackage.title})</span>
            <span>${selectedPackage.price}</span>
          </li>
          {formData.extras.map((extraId) => {
            const extra = getExtraServices().find((e) => e.id === extraId);
            if (!extra) return null;
            return (
              <li key={extraId} className="flex justify-between text-gray-600">
                <span>{extra.title}</span>
                <span>+${extra.price}</span>
              </li>
            );
          })}
          <li className="flex justify-between font-bold pt-2 border-t">
            <span>Precio Estimado</span>
            <span>${currentTotal}</span>
          </li>
        </ul>

        {((formData.referenceFiles && formData.referenceFiles.length > 0) ||
          (formData.productFiles && formData.productFiles.length > 0)) && (
          <div className="mt-3 pt-2 border-t">
            <p className="text-sm font-medium mb-1">
              Archivos adjuntos:{" "}
              {(formData.referenceFiles ? formData.referenceFiles.length : 0) +
                (formData.productFiles ? formData.productFiles.length : 0)}
            </p>
            <p className="text-xs text-gray-500">
              Los archivos serán procesados al enviar el formulario
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Nota:</strong> Este es un formulario de solicitud. Te
            contactaremos para discutir detalles y opciones de pago.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <SelectedPackageDisplay />
      <StepIndicator />

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderCurrentStep()}

        <div className="flex justify-between gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {t("steps.previous")}
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                <span>{t("steps.processing")}</span>
              </>
            ) : step < maxSteps ? (
              <span>{t("steps.next")}</span>
            ) : (
              <span>Enviar Solicitud</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnifiedCheckoutForm;

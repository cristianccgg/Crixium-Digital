import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Layers, Check, Package, Image } from "lucide-react";
import SimpleFileUploadComponent from "./web_development/SimpleFileUploadComponent";
import { createOrder } from "./OrderManagerFirebase";

const WordpressCheckoutForm = ({ selectedPackage, onCancel }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [currentTotal, setCurrentTotal] = useState(
    parseInt(selectedPackage.price || 0)
  );

  const [formData, setFormData] = useState({
    // Package details
    package: selectedPackage.id,
    packageDetails: selectedPackage,
    extras: [],
    // Project details
    siteType: "",
    designReference: "",
    projectDescription: "",
    features: [],
    // Contact info
    name: "",
    email: "",
    phone: "",
    // Archivos de referencia
    referenceFiles: [],
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

  const setFiles = (newFiles) => {
    setFormData((prev) => ({
      ...prev,
      referenceFiles: newFiles,
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

  const handleSiteTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      siteType: type,
    }));
  };

  const extraServices = [
    {
      id: "rush",
      title: "Entrega Express",
      price: 30,
      description:
        "Entrega en 3 días menos del tiempo estimado (sujeto a disponibilidad)",
    },
    {
      id: "seo",
      title: "SEO Avanzado",
      price: 40,
      description:
        "Optimización SEO completa, configuración de metadatos, schema markup y análisis de keywords",
    },
    {
      id: "domain",
      title: "Dominio y Hosting",
      price: 50,
      description:
        "Configuración de dominio y hosting por 1 año (no incluye costo del dominio)",
    },
    {
      id: "training",
      title: "Capacitación Extendida",
      price: 35,
      description:
        "2 horas adicionales de capacitación para administrar tu sitio WordPress",
    },
    {
      id: "maintenance",
      title: "Mantenimiento (3 meses)",
      price: 60,
      description:
        "3 meses de mantenimiento, actualizaciones y soporte técnico",
    },
  ];

  const siteTypes = [
    "Blog/Personal",
    "Negocio Local",
    "Tienda Online",
    "Portfolio",
    "Corporativo",
    "Landing de Ventas",
  ];

  const calculateTotal = () => {
    const basePrice = parseInt(selectedPackage.price || 0);
    const extrasTotal = formData.extras.reduce((total, extraId) => {
      const extra = extraServices.find((e) => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);

    return basePrice + extrasTotal;
  };

  const handleExtraToggle = (extraId) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter((id) => id !== extraId)
        : [...prev.extras, extraId],
    }));
  };

  const SelectedPackageDisplay = () => (
    <div className="mb-8 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{selectedPackage.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {selectedPackage.delivery}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold">
              US${selectedPackage.price}
            </span>
            <span className="text-sm text-gray-500">precio base</span>
          </div>
        </div>
      </div>
    </div>
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= num
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {num}
          </div>
          {num < 3 && (
            <div
              className={`w-12 h-1 ${
                step > num ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Componentes de pasos mediante funciones de renderizado
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Personaliza tu Proyecto</h3>
      <div className="space-y-4">
        {extraServices.map((extra) => (
          <div
            key={extra.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.extras.includes(extra.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => handleExtraToggle(extra.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.extras.includes(extra.id)
                      ? "border-blue-500 bg-blue-500"
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
          <span className="font-medium">Total Estimado:</span>
          <span className="text-xl font-bold">${currentTotal}</span>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Detalles del Proyecto</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Sitio Web
          </label>
          <div className="grid grid-cols-2 gap-4">
            {siteTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleSiteTypeSelect(type)}
                className={`p-4 border rounded-lg flex items-center gap-2 ${
                  formData.siteType === type
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <Globe size={20} />
                <span>{type}</span>
              </button>
            ))}
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
            placeholder="Ej: Me gusta el estilo de example.com..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <SimpleFileUploadComponent
            files={formData.referenceFiles}
            setFiles={setFiles}
            label="Referencias o Documentos de Diseño"
            description="Adjunta mockups, logos, o cualquier referencia visual para tu sitio web"
            acceptTypes=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.svg,.psd,.ai,.xd,.fig,.sketch"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono (opcional)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium mb-2">Resumen del Pedido</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Paquete Base ({selectedPackage.title})</span>
            <span>${selectedPackage.price}</span>
          </li>
          {formData.extras.map((extraId) => {
            const extra = extraServices.find((e) => e.id === extraId);
            return (
              <li key={extraId} className="flex justify-between text-gray-600">
                <span>{extra.title}</span>
                <span>+${extra.price}</span>
              </li>
            );
          })}
          <li className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>${currentTotal}</span>
          </li>
        </ul>
        {formData.referenceFiles.length > 0 && (
          <div className="mt-3 pt-2 border-t">
            <p className="text-sm font-medium mb-1">
              Archivos adjuntos: {formData.referenceFiles.length}
            </p>
            <p className="text-xs text-gray-500">
              Los archivos serán procesados al enviar el formulario
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Componente para mostrar la confirmación del pedido
  const OrderConfirmation = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="text-green-600" size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h2>
      <p className="text-gray-600 mb-6">
        Tu pedido ha sido recibido. Hemos enviado los detalles a tu correo.
      </p>
      <div className="p-4 bg-blue-50 rounded-lg inline-block mb-6">
        <p className="text-sm text-gray-700 mb-1">Tu número de pedido es:</p>
        <p className="text-xl font-mono font-bold">{orderNumber}</p>
      </div>
      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        <button
          onClick={() => navigate(`/tracking?order=${orderNumber}`)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Seguir mi Pedido
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 px-6 py-2 hover:text-blue-600 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Utilizar nuestro sistema de gestión para crear el pedido
      const result = await createOrder(formData);

      if (result.success) {
        setOrderNumber(result.orderNumber);
        setOrderComplete(true);

        // En un entorno real, aquí enviarías un correo electrónico al cliente
        console.log(
          `Email would be sent to ${formData.email} with order number ${result.orderNumber}`
        );
      } else {
        alert(
          "Hubo un error al procesar tu pedido. Por favor, intenta de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert(
        "Hubo un error al procesar tu pedido. Por favor, intenta de nuevo."
      );
    }

    setIsSubmitting(false);
  };

  // Si el pedido está completo, mostrar la confirmación
  if (orderComplete) {
    return <OrderConfirmation />;
  }

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
              Anterior
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? "Procesando..." : "Realizar Pedido"}
              {isSubmitting && (
                <svg
                  className="animate-spin ml-2 h-5 w-5 text-white"
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
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WordpressCheckoutForm;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Check, Package, Database, Loader } from "lucide-react";
import SimpleFileUploadComponent from "./web_development/SimpleFileUploadComponent";
import { createOrder } from "./OrderManagerFirebase";

const EcommerceCheckoutForm = ({ selectedPackage, platform, onCancel }) => {
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
    platform: platform,
    extras: [],
    // Store details
    businessName: "",
    businessType: "",
    productCount: "",
    domain: "",
    hasLogo: "no",
    hasContent: "no",
    hasProducts: "no",
    designReference: "",
    storeDescription: "",
    // Contact info
    name: "",
    email: "",
    phone: "",
    // Archivos de referencia
    referenceFiles: [],
    productFiles: [],
    total: parseInt(selectedPackage.price || 0),
  });

  const platformName = platform === "wordpress" ? "WooCommerce" : "Shopify";

  // Actualizar el total cuando cambian los extras
  useEffect(() => {
    const newTotal = calculateTotal();
    setCurrentTotal(newTotal);

    setFormData((prev) => ({
      ...prev,
      total: newTotal,
    }));
  }, [formData.extras]);

  const setFiles = (newFiles, type) => {
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

  const handleBusinessTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      businessType: type,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const extraServices = [
    {
      id: "rush",
      title: "Entrega Express",
      price: 50,
      description:
        "Entrega en 3 días menos del tiempo estimado (sujeto a disponibilidad)",
    },
    {
      id: "seo",
      title: "Configuración SEO Avanzada",
      price: 35,
      description:
        "Optimización para motores de búsqueda, meta tags y estrategia de palabras clave",
    },
    {
      id: "analytics",
      title: "Integración de Analytics",
      price: 30,
      description:
        "Configuración de Google Analytics, Facebook Pixel y seguimiento avanzado",
    },
    {
      id: "onboarding",
      title: "Onboarding Personalizado",
      price: 45,
      description:
        "4 horas de entrenamiento para administrar tu tienda eficientemente",
    },
    {
      id: "products",
      title: "Carga de Productos (50 unidades)",
      price: 50,
      description:
        "Configuración completa de hasta 50 productos con imágenes y descripciones",
    },
  ];

  const businessTypes = [
    "Moda y ropa",
    "Alimentos y bebidas",
    "Electrónica y tecnología",
    "Hogar y decoración",
    "Belleza y salud",
    "Artesanías",
    "Servicios",
    "Otros",
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
    <div className="mb-8 p-4 bg-purple-50 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="text-purple-700" size={24} />
        </div>
        <div>
          <h3 className="font-semibold">{selectedPackage.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            Plataforma: {platformName} • {selectedPackage.delivery}
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
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {num}
          </div>
          {num < 3 && (
            <div
              className={`w-12 h-1 ${
                step > num ? "bg-purple-700" : "bg-gray-200"
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
      <h3 className="text-xl font-semibold mb-4">
        Personaliza tu Tienda Online
      </h3>
      <div className="space-y-4">
        {extraServices.map((extra) => (
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
      <h3 className="text-xl font-semibold mb-4">Detalles de la Tienda</h3>
      <div className="space-y-4">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de negocio <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            {businessTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleBusinessTypeSelect(type)}
                className={`p-4 border rounded-lg flex items-center gap-2 ${
                  formData.businessType === type
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-blue-300"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Tienes logo?
            </label>
            <select
              name="hasLogo"
              value={formData.hasLogo}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="yes">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Tienes contenido?
            </label>
            <select
              name="hasContent"
              value={formData.hasContent}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="yes">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Tienes productos listos?
            </label>
            <select
              name="hasProducts"
              value={formData.hasProducts}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="yes">Sí</option>
              <option value="no">No</option>
            </select>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <SimpleFileUploadComponent
          files={formData.referenceFiles}
          setFiles={(newFiles) => setFiles(newFiles, "referenceFiles")}
          label="Referencias o Documentos de Diseño"
          description="Adjunta mockups, logos, o cualquier referencia visual para tu tienda"
          acceptTypes=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.svg,.psd,.ai,.xd,.fig,.sketch"
        />

        <SimpleFileUploadComponent
          files={formData.productFiles}
          setFiles={(newFiles) => setFiles(newFiles, "productFiles")}
          label="Catálogo de productos (opcional)"
          description="Adjunta archivos CSV, Excel o imágenes de tus productos"
          acceptTypes=".csv,.xlsx,.xls,.pdf,.zip,.jpg,.jpeg,.png"
        />
      </div>
    </div>
  );

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium mb-2">Resumen del Pedido</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>
              Paquete Base ({selectedPackage.title} - {platformName})
            </span>
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

        {(formData.referenceFiles.length > 0 ||
          formData.productFiles.length > 0) && (
          <div className="mt-3 pt-2 border-t">
            <p className="text-sm font-medium mb-1">
              Archivos adjuntos:{" "}
              {formData.referenceFiles.length + formData.productFiles.length}
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
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-coral-400 transition-colors"
        >
          Seguir mi Pedido
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 px-6 py-2 hover:text-purple-700 transition-colors"
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
              className="flex-1 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-coral-400 transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-coral-400 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="animate-spin mr-2" />
                  <span>Procesando...</span>
                </>
              ) : (
                <span>Realizar Pedido</span>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EcommerceCheckoutForm;

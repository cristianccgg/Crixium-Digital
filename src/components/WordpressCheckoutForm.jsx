import React, { useState } from "react";
import { Globe, Layers, Check, Package, Image } from "lucide-react";

const WordpressCheckoutForm = ({ selectedPackage, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Package details
    package: selectedPackage.id,
    packageDetails: selectedPackage,
    extras: [],
    // Project details
    siteType: "",
    designReference: "",
    projectDescription: "",
    // Contact info
    name: "",
    email: "",
    phone: "",
  });

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
    const basePrice = parseInt(selectedPackage.price);
    const extrasTotal = formData.extras.reduce((total, extraId) => {
      const extra = extraServices.find((e) => e.id === extraId);
      return total + (extra?.price || 0);
    }, 0);

    return basePrice + extrasTotal;
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

  const handleExtraToggle = (extraId) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter((id) => id !== extraId)
        : [...prev.extras, extraId],
    }));
  };

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

  const Step1_Extras = () => (
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
          <span className="text-xl font-bold">${calculateTotal()}</span>
        </div>
      </div>
    </div>
  );

  const Step2_Details = () => (
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
                onClick={() =>
                  setFormData((prev) => ({ ...prev, siteType: type }))
                }
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
            value={formData.designReference}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                designReference: e.target.value,
              }))
            }
            placeholder="Ej: Me gusta el estilo de example.com..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción del Proyecto
          </label>
          <textarea
            value={formData.projectDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                projectDescription: e.target.value,
              }))
            }
            rows={4}
            placeholder="Describe tu proyecto, objetivo del sitio, características importantes, público objetivo, preferencias de color, etc..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
    </div>
  );

  const Step3_Contact = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
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
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
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
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
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
            <span>${calculateTotal()}</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <SelectedPackageDisplay />
      <StepIndicator />

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && <Step1_Extras />}
        {step === 2 && <Step2_Details />}
        {step === 3 && <Step3_Contact />}

        <div className="flex justify-between gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Realizar Pedido
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WordpressCheckoutForm;

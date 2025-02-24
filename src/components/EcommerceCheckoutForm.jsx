import React, { useState } from "react";
import {
  ShoppingCart,
  CreditCard,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  Check,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader,
} from "lucide-react";

const EcommerceCheckoutForm = ({ selectedPackage, platform, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    productCount: "",
    requirements: "",
    domain: "",
    hasLogo: "no",
    hasContent: "no",
    hasProducts: "no",
    paymentMethod: "paypal",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSuccess(true);

    // Aquí iría la lógica real para enviar el formulario a tu backend
    // Por ejemplo: await fetch('/api/ecommerce-orders', { method: 'POST', body: JSON.stringify(formData) })
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const platformName = platform === "wordpress" ? "WooCommerce" : "Shopify";

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-4">¡Pedido Recibido!</h2>
        <p className="text-gray-600 mb-6">
          Gracias por tu pedido. Hemos recibido todos los detalles y nos
          pondremos en contacto contigo pronto para comenzar con tu proyecto de
          tienda online.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg inline-block">
          <p className="text-blue-800 font-medium">
            Referencia: ECM-{Date.now().toString().slice(-6)}
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a los planes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowDetails(!showDetails)}
        >
          <h2 className="text-2xl font-bold">Detalles del Plan</h2>
          {showDetails ? (
            <ChevronUp size={20} className="text-gray-500" />
          ) : (
            <ChevronDown size={20} className="text-gray-500" />
          )}
        </div>

        {showDetails && (
          <div className="mt-4 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedPackage.title}</h3>
                <p className="text-gray-600">Plataforma: {platformName}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-y-4 mb-6">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-blue-600" />
                  <span className="font-semibold">Precio:</span>
                </div>
                <p className="ml-6 text-gray-700">US${selectedPackage.price}</p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" />
                  <span className="font-semibold">Tiempo de entrega:</span>
                </div>
                <p className="ml-6 text-gray-700">{selectedPackage.delivery}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Award size={16} className="text-blue-600" />
                <span className="font-semibold">Características:</span>
              </div>
              <ul className="ml-6 space-y-1">
                {selectedPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-1"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {step}
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-lg">
              {step === 1
                ? "Información Personal"
                : step === 2
                ? "Detalles de la Tienda"
                : "Confirmación"}
            </h3>
            <p className="text-gray-600 text-sm">
              {step === 1
                ? "Datos de contacto"
                : step === 2
                ? "Información sobre tu negocio"
                : "Revisa y confirma tu pedido"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="name">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">
                  Correo electrónico <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="phone">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="+1 (123) 456-7890"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Continuar</span>
                  <ChevronDown className="transform rotate-270" size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="businessName"
                >
                  Nombre de tu negocio <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Nombre de tu empresa o proyecto"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="businessType"
                >
                  Tipo de negocio <span className="text-red-500">*</span>
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="ropa">Moda y ropa</option>
                  <option value="alimentos">Alimentos y bebidas</option>
                  <option value="electronica">Electrónica y tecnología</option>
                  <option value="hogar">Hogar y decoración</option>
                  <option value="belleza">Belleza y salud</option>
                  <option value="artesania">Artesanías</option>
                  <option value="servicios">Servicios</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="productCount"
                >
                  Número aproximado de productos{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="productCount"
                  name="productCount"
                  value={formData.productCount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Ej: 50"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="domain">
                  Dominio (si ya tienes uno)
                </label>
                <input
                  type="text"
                  id="domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="tunegocio.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">
                    ¿Tienes logo?
                  </label>
                  <select
                    name="hasLogo"
                    value={formData.hasLogo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="yes">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    ¿Tienes contenido?
                  </label>
                  <select
                    name="hasContent"
                    value={formData.hasContent}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="yes">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    ¿Tienes productos listos?
                  </label>
                  <select
                    name="hasProducts"
                    value={formData.hasProducts}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="yes">Sí</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="requirements"
                >
                  Requisitos adicionales o comentarios
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Describe cualquier requerimiento específico..."
                  rows="4"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/2 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-1/2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertCircle
                    className="text-blue-600 mr-2 flex-shrink-0 mt-1"
                    size={18}
                  />
                  <p className="text-blue-800 text-sm">
                    Revisa cuidadosamente los detalles de tu pedido antes de
                    confirmar. Una vez completado el pago, nos pondremos en
                    contacto contigo para comenzar el proyecto.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-3">Resumen del pedido</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">
                      {selectedPackage.title} ({platformName})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-medium">
                      US${selectedPackage.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo estimado:</span>
                    <span className="font-medium">
                      {selectedPackage.delivery}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Correo:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teléfono:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Negocio:</span>
                    <span className="font-medium">{formData.businessName}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">Método de pago</h4>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span>PayPal / Tarjeta de crédito</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === "transfer"}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span>Transferencia bancaria</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/2 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin mr-2" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <span>Confirmar Pedido</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EcommerceCheckoutForm;

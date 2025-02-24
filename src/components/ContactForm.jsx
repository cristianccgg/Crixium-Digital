import React, { useState, useEffect } from "react";
import { Mail, Send, Music2, Globe, Code } from "lucide-react";

const ContactForm = ({ initialService = "", initialProjectType = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: initialService,
    projectType: initialProjectType,
    budget: "",
    description: "",
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService,
        projectType: initialProjectType || prev.projectType,
      }));
    }
  }, [initialService, initialProjectType]);

  const services = [
    { id: "web", label: "Desarrollo Web", icon: Globe },
    { id: "music", label: "Producción Musical", icon: Music2 },
    { id: "other", label: "Otro Tipo de Proyecto", icon: Code },
  ];

  const webProjectTypes = [
    "Sitio Web Corporativo",
    "Tienda en Línea",
    "Landing Page",
    "Blog",
    "Aplicación Web",
    "Otro",
  ];

  const musicProjectTypes = [
    "Jingle Publicitario",
    "Música Corporativa",
    "Spot de Radio",
    "Música para Cine/TV",
    "Banda Sonora",
    "Audiolibro",
    "Música Infantil",
    "Proyecto Personalizado",
    "Otro",
  ];

  const budgetRanges = [
    "Menos de $500",
    "$500 - $1000",
    "$1000 - $2000",
    "$2000 - $5000",
    "Más de $5000",
    "Por definir",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={`max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg ${
        initialService ? "border-2 border-blue-200" : ""
      }`}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {initialProjectType === "Proyecto Personalizado"
            ? "Solicitud de Cotización Personalizada"
            : "Contacta con Nosotros"}
        </h2>
        <p className="text-gray-600">
          {initialProjectType === "Proyecto Personalizado"
            ? "Cuéntanos los detalles de tu proyecto musical y te enviaremos una cotización personalizada"
            : "Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Personal */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Selección de Servicio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Servicio
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "service", value: id } })
                }
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  formData.service === id
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <Icon size={24} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de Proyecto */}
        {formData.service && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Proyecto
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecciona un tipo de proyecto</option>
              {formData.service === "web" &&
                webProjectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              {formData.service === "music" &&
                musicProjectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              {formData.service === "other" && (
                <option value="custom">Proyecto Personalizado</option>
              )}
            </select>
          </div>
        )}

        {/* Presupuesto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Presupuesto Estimado
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Selecciona un rango de presupuesto</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Descripción del Proyecto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del Proyecto
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={
              initialProjectType === "Proyecto Personalizado"
                ? "Describe tu proyecto musical: duración estimada, estilo musical, instrumentación deseada, referencias similares, fechas límite si las hay..."
                : "Cuéntanos más sobre tu proyecto y tus objetivos..."
            }
            required
          />
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Enviar Solicitud
        </button>

        {/* Nota Informativa */}
        <p className="text-sm text-gray-500 text-center mt-4">
          {formData.service === "other"
            ? "Para proyectos más complejos o personalizados, evaluaremos tu solicitud y te contactaremos con una propuesta adaptada a tus necesidades."
            : "Te responderemos con una propuesta detallada en menos de 24 horas."}
        </p>
      </form>
    </div>
  );
};

export default ContactForm;

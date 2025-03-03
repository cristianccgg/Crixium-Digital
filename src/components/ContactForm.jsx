import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Send,
  Music2,
  Globe,
  Code,
  Phone,
  AlertCircle,
  CheckCircle,
  Upload,
  File,
  X,
  FileText,
  Music,
  // Reemplazamos iconos no disponibles por File con variaciones
  File as FileDocument,
  FileImage,
} from "lucide-react";

const ContactForm = ({ initialService = "", initialProjectType = "" }) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    projectType: initialProjectType,
    budget: "",
    description: "",
    referenceFiles: [], // Campo para archivos
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
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
    "Rediseño Web",
    "Mantenimiento Web",
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

  // Manejo de archivos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      referenceFiles: [...prev.referenceFiles, ...files],
    }));
  };

  const removeFile = (fileName) => {
    setFormData((prev) => ({
      ...prev,
      referenceFiles: prev.referenceFiles.filter(
        (file) => file.name !== fileName
      ),
    }));
  };

  // Función para determinar el icono del archivo según su tipo
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    if (["pdf"].includes(extension)) return FileDocument;
    if (["doc", "docx", "txt", "rtf"].includes(extension)) return FileText;
    if (["mp3", "wav", "ogg", "flac"].includes(extension)) return Music;
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension))
      return FileImage;

    return File;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío de formulario exitoso
    console.log("Form submitted:", formData);

    // Simulamos un tiempo de carga
    setFormStatus({
      submitted: true,
      error: false,
      message: "Procesando tu solicitud...",
    });

    // Después de 2 segundos, mostramos éxito
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: "¡Gracias por contactarnos! Te responderemos en breve.",
      });
    }, 2000);

    // En un caso real, aquí iría el código para enviar el formulario a tu backend
    // y manejar errores si los hay
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Personalizar el mensaje de la sección de carga según el tipo de servicio
  const getFileUploadMessage = () => {
    if (formData.service === "music") {
      return "Adjunta muestras de música, letras, referencias o detalles relevantes para tu proyecto musical";
    } else if (formData.service === "web") {
      return "Adjunta bocetos, diseños, imágenes o cualquier material relevante para tu proyecto web";
    } else {
      return "Adjunta cualquier documento, imagen o archivo que nos ayude a entender mejor tu proyecto";
    }
  };

  // Si el formulario se envió exitosamente, mostramos un mensaje de confirmación
  if (formStatus.submitted && !formStatus.error) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          {formStatus.message === "Procesando tu solicitud..." ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-700 mb-4"></div>
              <h2 className="text-2xl font-bold">{formStatus.message}</h2>
              <p className="text-gray-600 mt-2">
                Esto solo tomará un momento...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold">¡Mensaje Enviado!</h2>
              <p className="text-gray-600 mt-2 max-w-md">
                {formStatus.message}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setFormStatus({
                submitted: false,
                error: false,
                message: "",
              });
              setFormData({
                name: "",
                email: "",
                phone: "",
                service: initialService,
                projectType: initialProjectType,
                budget: "",
                description: "",
                referenceFiles: [],
              });
            }}
            className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-coral-400 transition-colors inline-flex items-center gap-2"
          >
            Enviar Otro Mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border ${
        initialService ? "border-purple-200" : "border-gray-100"
      }`}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-10 transition-all"
                required
                placeholder="tu@email.com"
              />
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Teléfono (opcional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono (opcional)
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-10 transition-all"
              placeholder="+1 234 567 890"
            />
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
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
                className={`p-5 border rounded-xl flex flex-col items-center gap-3 transition-all duration-300 ${
                  formData.service === id
                    ? "border-purple-500 bg-purple-50 text-purple-700 shadow-md"
                    : "border-gray-200 hover:border-purple-200 hover:shadow-sm"
                }`}
              >
                <Icon size={28} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de Proyecto */}
        {formData.service && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Proyecto
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Presupuesto Estimado
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción del Proyecto
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder={
              initialProjectType === "Proyecto Personalizado"
                ? "Describe tu proyecto musical: duración estimada, estilo musical, instrumentación deseada, referencias similares, fechas límite si las hay..."
                : "Cuéntanos más sobre tu proyecto y tus objetivos..."
            }
            required
          />
        </div>

        {/* File Upload Section - Siempre visible */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Referencias o Archivos Adicionales{" "}
            <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <p className="text-sm text-gray-500 mb-4">{getFileUploadMessage()}</p>

          <div className="mt-2 flex flex-col gap-3">
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
            >
              <Upload className="text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-500">
                Haz clic para subir archivos o arrastra aquí
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, DOC, TXT, MP3, JPG, PNG (máx 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.mp3,.jpg,.jpeg,.png"
              />
            </div>

            {formData.referenceFiles.length > 0 && (
              <div className="mt-3 space-y-3">
                {formData.referenceFiles.map((file, index) => {
                  const FileIcon = getFileIcon(file.name);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                          <FileIcon size={16} className="text-purple-700" />
                        </div>
                        <div>
                          <span className="text-sm truncate max-w-xs">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-400 block">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.name)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-4 px-6 rounded-lg hover:bg-coral-400 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-[1.01] font-medium"
        >
          <Send size={20} />
          Enviar Solicitud
        </button>

        {/* Nota Informativa */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-purple-700" />
            </div>
            <p className="text-sm text-gray-700">
              {formData.service === "other" ||
              formData.projectType === "Proyecto Personalizado"
                ? "Para proyectos personalizados, evaluaremos tu solicitud y te contactaremos con una propuesta adaptada a tus necesidades específicas."
                : "Te responderemos con una propuesta detallada en menos de 24 horas. Si necesitas asistencia inmediata, escribenos al Whatsapp al +57 313 272 81 88."}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

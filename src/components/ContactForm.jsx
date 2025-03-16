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
  FileImage,
} from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Asegúrate de importar el storage desde tu configuración de Firebase
import { v4 as uuidv4 } from "uuid"; // Si no tienes uuid instalado: npm install uuid
import { useTranslation } from "react-i18next";
// Importa el nuevo servicio de Mailgun
import { sendContactForm } from "../services/MailgunService";

const ContactForm = ({ initialService = "", initialProjectType = "" }) => {
  const { t } = useTranslation("contact-form");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    projectType: initialProjectType,
    budget: "",
    description: "",
    referenceFiles: [],
    privacyPolicyAccepted: false, // Agregamos el nuevo campo para el checkbox
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
    isLoading: false,
    progress: 0,
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

  const services = {
    web: {
      id: "web",
      label: t("contactForm.fields.service.options.web"),
      icon: Globe,
    },
    music: {
      id: "music",
      label: t("contactForm.fields.service.options.music"),
      icon: Music2,
    },
    other: {
      id: "other",
      label: t("contactForm.fields.service.options.other"),
      icon: Code,
    },
  };

  // Definimos los tipos de proyecto como objetos en lugar de arrays
  const webProjectTypes = {
    corporate: t("contactForm.fields.projectType.web.corporate"),
    ecommerce: t("contactForm.fields.projectType.web.ecommerce"),
    landing: t("contactForm.fields.projectType.web.landing"),
    blog: t("contactForm.fields.projectType.web.blog"),
    webApp: t("contactForm.fields.projectType.web.webApp"),
    redesign: t("contactForm.fields.projectType.web.redesign"),
    maintenance: t("contactForm.fields.projectType.web.maintenance"),
    other: t("contactForm.fields.projectType.web.other"),
  };

  const musicProjectTypes = {
    jingle: t("contactForm.fields.projectType.music.jingle"),
    corporate: t("contactForm.fields.projectType.music.corporate"),
    radio: t("contactForm.fields.projectType.music.radio"),
    cinemaTV: t("contactForm.fields.projectType.music.cinemaTV"),
    soundtrack: t("contactForm.fields.projectType.music.soundtrack"),
    audiobook: t("contactForm.fields.projectType.music.audiobook"),
    children: t("contactForm.fields.projectType.music.children"),
    custom: t("contactForm.fields.projectType.music.custom"),
    other: t("contactForm.fields.projectType.music.other"),
  };

  const budgetRanges = {
    under500: t("contactForm.fields.budget.options.under500"),
    range500to1000: t("contactForm.fields.budget.options.500to1000"),
    range1000to2000: t("contactForm.fields.budget.options.1000to2000"),
    range2000to5000: t("contactForm.fields.budget.options.2000to5000"),
    over5000: t("contactForm.fields.budget.options.over5000"),
    undefined: t("contactForm.fields.budget.options.undefined"),
  };

  // Manejo de archivos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Limitamos el tamaño a 10MB
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024);

    if (validFiles.length < files.length) {
      alert("Algunos archivos superan el límite de 10MB y no serán incluidos.");
    }

    setFormData((prev) => ({
      ...prev,
      referenceFiles: [...prev.referenceFiles, ...validFiles],
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

    if (["pdf"].includes(extension)) return File;
    if (["doc", "docx", "txt", "rtf"].includes(extension)) return FileText;
    if (["mp3", "wav", "ogg", "flac"].includes(extension)) return Music;
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension))
      return FileImage;

    return File;
  };

  // Función para subir archivos a Firebase Storage
  const uploadFilesToStorage = async (files) => {
    if (!files || files.length === 0)
      return { urls: [], fileNames: [], fileDetails: [] };

    // Crear un ID único para el contacto
    const contactId = uuidv4();
    const currentDate = new Date();
    const dateFormatted = currentDate.toISOString().split("T")[0];

    const fileUrls = [];
    const fileDetails = [];

    setFormStatus((prev) => ({
      ...prev,
      message: t("contactForm.statusMessages.uploading"),
      progress: 0,
    }));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Crear la ruta en Storage
      const storagePath = `contact-uploads/${
        formData.service || "general"
      }/${dateFormatted}/${contactId}/${file.name}`;
      const storageRef = ref(storage, storagePath);

      // Subir el archivo
      await uploadBytes(storageRef, file);

      // Obtener la URL
      const downloadUrl = await getDownloadURL(storageRef);

      // Guardar los detalles del archivo
      fileUrls.push(downloadUrl);
      fileDetails.push({
        name: file.name,
        size: file.size,
        type: file.type,
        url: downloadUrl,
        path: storagePath,
      });

      // Actualizar progreso
      const progress = Math.round(((i + 1) / files.length) * 100);
      setFormStatus((prev) => ({
        ...prev,
        progress,
      }));
    }

    return { urls: fileUrls, fileDetails };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que la política de privacidad ha sido aceptada
    if (!formData.privacyPolicyAccepted) {
      // Mostrar mensaje de error
      setFormStatus({
        submitted: false,
        error: true,
        message: "Debes aceptar la política de privacidad para continuar",
        isLoading: false,
        progress: 0,
      });
      return; // Detener el envío
    }

    setFormStatus({
      submitted: false,
      error: false,
      message: t("contactForm.statusMessages.processing"),
      isLoading: true,
      progress: 0,
    });

    try {
      // Subir archivos si existen
      const { fileDetails } = await uploadFilesToStorage(
        formData.referenceFiles
      );

      // Crear un ID único para el mensaje
      const messageId = uuidv4();

      // Datos para enviar
      const dataToSend = {
        messageId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "No proporcionado",
        service: formData.service,
        projectType: formData.projectType,
        budget: formData.budget,
        description: formData.description,
        fileDetails: fileDetails, // Información completa de los archivos
        timestamp: new Date().toISOString(),
        source: "contact_form",
        privacyPolicyAccepted: formData.privacyPolicyAccepted, // Agregar esta información al envío
      };

      setFormStatus((prev) => ({
        ...prev,
        message: t("contactForm.statusMessages.sending"),
      }));

      // Usar el nuevo servicio de Mailgun en lugar de la Cloud Function
      const result = await sendContactForm(dataToSend);

      if (result.success) {
        // Éxito
        setFormStatus({
          submitted: true,
          error: false,
          message: t("contactForm.statusMessages.thankYou"),
          isLoading: false,
          progress: 100,
        });
      } else {
        throw new Error(result.message || "Error al enviar el correo");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus({
        submitted: false,
        error: true,
        message: t("contactForm.statusMessages.errorMessage"),
        isLoading: false,
        progress: 0,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Personalizar el mensaje de la sección de carga según el tipo de servicio
  const getFileUploadMessage = () => {
    if (formData.service === "music") {
      return t("contactForm.fields.files.message.music");
    } else if (formData.service === "web") {
      return t("contactForm.fields.files.message.web");
    } else {
      return t("contactForm.fields.files.message.default");
    }
  };

  // Si el formulario se envió exitosamente o está procesando, mostramos un mensaje de confirmación
  if (formStatus.isLoading || (formStatus.submitted && !formStatus.error)) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          {formStatus.isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-700 mb-4"></div>
              <h2 className="text-2xl font-bold">{formStatus.message}</h2>
              {formData.referenceFiles.length > 0 && (
                <div className="w-full max-w-md mt-4">
                  <div className="bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-purple-700 h-2.5 rounded-full"
                      style={{ width: `${formStatus.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formStatus.progress}%
                  </p>
                </div>
              )}
              <p className="text-gray-600 mt-2">
                {t("contactForm.statusMessages.loading")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold">
                {t("contactForm.statusMessages.success")}
              </h2>
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
                isLoading: false,
                progress: 0,
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
                privacyPolicyAccepted: false, // Reiniciar también este campo
              });
            }}
            className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-coral-400 transition-colors inline-flex items-center gap-2"
          >
            {t("contactForm.buttons.another")}
          </button>
        </div>
      </div>
    );
  }

  // Si hay un error, mostramos el mensaje y permitimos reintentarlo
  if (formStatus.error) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold">
              {t("contactForm.statusMessages.error")}
            </h2>
            <p className="text-gray-600 mt-2 max-w-md">{formStatus.message}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setFormStatus({
                submitted: false,
                error: false,
                message: "",
                isLoading: false,
                progress: 0,
              });
            }}
            className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-coral-400 transition-colors inline-flex items-center gap-2"
          >
            {t("contactForm.buttons.retry")}
          </button>
        </div>
      </div>
    );
  }

  // Formulario normal
  return (
    <div
      className={`max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border ${
        initialService ? "border-purple-200" : "border-gray-100"
      }`}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-3">
          {initialProjectType === "Proyecto Personalizado"
            ? t("contactForm.title.custom")
            : t("contactForm.title.default")}
        </h2>
        <p className="text-gray-600">
          {initialProjectType === "Proyecto Personalizado"
            ? t("contactForm.description.custom")
            : t("contactForm.description.default")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Personal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("contactForm.fields.fullName.label")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
              placeholder={t("contactForm.fields.fullName.placeholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("contactForm.fields.email.label")}
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-10 transition-all"
                required
                placeholder={t("contactForm.fields.email.placeholder")}
              />
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Teléfono (opcional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("contactForm.fields.phone.label")}
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-10 transition-all"
              placeholder={t("contactForm.fields.phone.placeholder")}
            />
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Selección de Servicio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("contactForm.fields.service.label")}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(services).map(({ id, label, icon: Icon }) => (
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
              {t("contactForm.fields.projectType.label")}
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            >
              <option value="">
                {t("contactForm.fields.projectType.placeholder")}
              </option>
              {formData.service === "web" &&
                Object.entries(webProjectTypes).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              {formData.service === "music" &&
                Object.entries(musicProjectTypes).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              {formData.service === "other" && (
                <option value="Proyecto Personalizado">
                  {t("contactForm.fields.projectType.other.custom")}
                </option>
              )}
            </select>
          </div>
        )}

        {/* Presupuesto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("contactForm.fields.budget.label")}
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          >
            <option value="">
              {t("contactForm.fields.budget.placeholder")}
            </option>
            {Object.values(budgetRanges).map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Descripción del Proyecto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("contactForm.fields.description.label")}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder={
              initialProjectType === "Proyecto Personalizado"
                ? t("contactForm.fields.description.placeholder.custom")
                : t("contactForm.fields.description.placeholder.default")
            }
            required
          />
        </div>

        {/* File Upload Section */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("contactForm.fields.files.label")}{" "}
            <span className="text-gray-400 text-xs">
              {t("contactForm.fields.files.optional")}
            </span>
          </label>
          <p className="text-sm text-gray-500 mb-4">{getFileUploadMessage()}</p>

          <div className="mt-2 flex flex-col gap-3">
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
            >
              <Upload className="text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-500">
                {t("contactForm.fields.files.dropzone.text")}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {t("contactForm.fields.files.dropzone.formats")}
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
                            {(file.size / 1024).toFixed(1)}{" "}
                            {t("contactForm.fields.files.fileSize")}
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

        {/* Checkbox de aceptación de política de privacidad */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 pt-1">
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicyAccepted"
                checked={formData.privacyPolicyAccepted}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="privacyPolicy" className="text-sm text-gray-700">
                He leído y acepto la{" "}
                <a
                  href="/politica-privacidad"
                  target="_blank"
                  className="text-purple-700 hover:text-purple-900 underline"
                >
                  Política de Privacidad
                </a>{" "}
                y el{" "}
                <a
                  href="/aviso-legal"
                  target="_blank"
                  className="text-purple-700 hover:text-purple-900 underline"
                >
                  Aviso Legal
                </a>
                . Consiento el tratamiento de mis datos según lo establecido en
                la política de privacidad.
              </label>
            </div>
          </div>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-4 px-6 rounded-lg hover:bg-coral-400 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-[1.01] font-medium"
        >
          <Send size={20} />
          {t("contactForm.buttons.submit")}
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
                ? t("contactForm.infoNote.custom")
                : t("contactForm.infoNote.default")}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

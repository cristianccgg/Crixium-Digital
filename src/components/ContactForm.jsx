import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Send,
  Music2,
  Globe,
  Code,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { sendContactForm } from "../services/MailgunService";
import { v4 as uuidv4 } from "uuid";

const ContactForm = ({ initialService = "", initialProjectType = "" }) => {
  const { t } = useTranslation("contact-form");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: initialService,
    projectType: initialProjectType,
    description: "",
    privacyPolicyAccepted: false,
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
    isLoading: false,
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
      });
      return; // Detener el envío
    }

    setFormStatus({
      submitted: false,
      error: false,
      message: t("contactForm.statusMessages.processing"),
      isLoading: true,
    });

    try {
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
        description: formData.description,
        timestamp: new Date().toISOString(),
        source: "contact_form",
        privacyPolicyAccepted: formData.privacyPolicyAccepted,
      };

      setFormStatus((prev) => ({
        ...prev,
        message: t("contactForm.statusMessages.sending"),
      }));

      // Usar el servicio de Mailgun
      const result = await sendContactForm(dataToSend);

      if (result.success) {
        // Éxito
        setFormStatus({
          submitted: true,
          error: false,
          message: t("contactForm.statusMessages.thankYou"),
          isLoading: false,
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

  // Si el formulario se envió exitosamente o está procesando, mostramos un mensaje de confirmación
  if (formStatus.isLoading || (formStatus.submitted && !formStatus.error)) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          {formStatus.isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-700 mb-4"></div>
              <h2 className="text-2xl font-bold">{formStatus.message}</h2>
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
              });
              setFormData({
                name: "",
                email: "",
                phone: "",
                service: initialService,
                projectType: initialProjectType,
                description: "",
                privacyPolicyAccepted: false,
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
            <div className="ml-3 text-sm">
              <label
                htmlFor="privacyPolicy"
                className="font-medium text-gray-700"
              >
                {t("contactForm.fields.dataConsent.label")}
              </label>
              <p className="text-gray-500">
                {t("contactForm.fields.dataConsent.description")}{" "}
                <Link
                  to="/privacy-policy"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  {t("contactForm.fields.dataConsent.privacyLink")}
                </Link>
              </p>
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

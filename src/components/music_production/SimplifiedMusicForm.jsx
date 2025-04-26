import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Music, Mic, Check, Package, Loader } from "lucide-react";
import { sendContactForm } from "../../services/MailgunService";

const SimplifiedMusicForm = ({ selectedPackage, onCancel }) => {
  // Usar el archivo de traducciones music-contact.json
  const { t } = useTranslation("music-contact");
  // Para traducciones específicas del paquete
  const { t: pricingT } = useTranslation("pricing");

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState("");

  // Determinar si es jingle o voiceover
  const isJingle = selectedPackage.category === "jingle";
  const isVoiceover = selectedPackage.category === "locucion";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacyPolicyAccepted: false,
  });

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
            {isVoiceover
              ? `${t("package.upTo")} ${selectedPackage.wordCount} ${pricingT(
                  "package.words"
                ).replace("{count}", "")} | ${selectedPackage.delivery}`
              : selectedPackage.delivery}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-purple-700 font-semibold">
              US${selectedPackage.price}
            </span>
            <span className="text-sm text-gray-500">
              {t("package.basePrice")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Order Confirmation Component
  const OrderConfirmation = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="text-green-600" size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2">{t("confirmation.title")}</h2>
      <p className="text-gray-600 mb-6">{t("confirmation.message")}</p>

      <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg text-left">
        <h3 className="text-md font-semibold text-purple-700 mb-2">
          {isJingle
            ? t("confirmation.nextSteps.jingle")
            : t("confirmation.nextSteps.voiceover")}
        </h3>
        <p className="text-sm text-gray-700 mb-2">
          {t("confirmation.nextSteps.description")}
        </p>
        <p className="text-sm text-gray-700">
          {t("confirmation.nextSteps.contact")}{" "}
          <a
            href="mailto:contact@crixiumdigital.com"
            className="text-blue-700 hover:underline"
          >
            contact@crixiumdigital.com
          </a>
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-xs mx-auto mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
        >
          {t("confirmation.buttons.backToHome")}
        </button>
      </div>
    </div>
  );

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError(t("errors.nameRequired"));
      return false;
    }
    if (!formData.email.trim()) {
      setError(t("errors.emailRequired"));
      return false;
    }
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t("errors.validEmail"));
      return false;
    }
    if (!formData.privacyPolicyAccepted) {
      setError(t("errors.privacyPolicy"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Formatear los datos para el formulario de contacto
      const contactFormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        service: `Music - ${isJingle ? "Jingle" : "Voiceover"} - ${
          selectedPackage.title
        }`,
        projectType: "music",
        budget: `$${selectedPackage.price} USD`,
        description:
          formData.message || `Interesado en ${selectedPackage.title}`,
        privacyPolicyAccepted: formData.privacyPolicyAccepted,
      };

      // Enviar correo de contacto
      await sendContactForm(contactFormData);

      // Mostrar página de confirmación
      setOrderComplete(true);
    } catch (error) {
      console.error("Error al enviar formulario de contacto:", error);
      setError(t("errors.general"));
    }

    setIsSubmitting(false);
  };

  // Si el pedido está completo, mostrar la confirmación
  if (orderComplete) {
    return <OrderConfirmation />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <SelectedPackageDisplay />

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">{t("contactForm.title")}</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("contactForm.fields.name")}{" "}
              <span className="text-red-500">*</span>
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
              {t("contactForm.fields.email")}{" "}
              <span className="text-red-500">*</span>
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
              {t("contactForm.fields.phone")}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 123456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("contactForm.fields.message")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder={
                isJingle
                  ? t("contactForm.placeholders.jingleMessage")
                  : t("contactForm.placeholders.voiceoverMessage")
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-transparent"
            />
          </div>

          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              id="privacyPolicyAccepted"
              name="privacyPolicyAccepted"
              checked={formData.privacyPolicyAccepted}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
            <label
              htmlFor="privacyPolicyAccepted"
              className="text-sm text-gray-700"
            >
              {t(
                "contactForm.fields.privacyPolicy",
                "Acepto la política de privacidad"
              )}{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>{t("contactForm.notes.note")}</strong>{" "}
            {t("contactForm.notes.contactOnly")}
          </p>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("contactForm.buttons.back")}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                <span>{t("contactForm.buttons.processing")}</span>
              </>
            ) : (
              <span>{t("contactForm.buttons.submit")}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimplifiedMusicForm;

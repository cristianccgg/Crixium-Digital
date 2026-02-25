import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  MessageCircle,
  ArrowRight,
  UtensilsCrossed,
  Shield,
  SearchX,
  PhoneOff,
  BookOpen,
  TrendingUp,
  Send,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SimpleSEO from "../SEO/SimpleSEO";
import WhatsAppButton from "../WhatsAppButton";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";
import { sendContactForm } from "../../services/MailgunService";
import { trackEvent } from "../../utils/analytics";
import { getUTMParams } from "../../hooks/useUTM";
import { v4 as uuidv4 } from "uuid";
import LandingReviewsCarousel from "../LandingReviewsCarousel";
import bulgariaPng from "../../assets/web_projects/bulgaria.png";
import famigliasPng from "../../assets/web_projects/famiglia.png";

const PAIN_ICONS = [SearchX, PhoneOff, BookOpen, TrendingUp];

const RestaurantContactForm = ({ isES, whatsappUrl, onWhatsAppClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    privacyPolicyAccepted: false,
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const formStarted = useRef(false);

  const handleChange = (e) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackEvent("form_start", { source: "restaurant_landing" });
    }
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.privacyPolicyAccepted) {
      setStatus({ state: "error", message: isES ? "Debes aceptar la política de privacidad." : "You must accept the privacy policy." });
      return;
    }
    setStatus({ state: "loading", message: "" });
    try {
      const result = await sendContactForm({
        messageId: uuidv4(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "No proporcionado",
        service: "web",
        projectType: "Página web para restaurante",
        description: formData.description,
        timestamp: new Date().toISOString(),
        source: "restaurant_landing",
        privacyPolicyAccepted: true,
        ...getUTMParams(),
      });
      if (result.success) {
        trackEvent("generate_lead", { service: "web", project_type: "restaurant", source: "restaurant_landing" });
        setStatus({ state: "success", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      setStatus({ state: "error", message: isES ? "Hubo un error. Inténtalo de nuevo." : "Something went wrong. Please try again." });
    }
  };

  if (status.state === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-purple-700 mb-4" />
        <p className="text-gray-600">{isES ? "Enviando..." : "Sending..."}</p>
      </div>
    );
  }

  if (status.state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2">{isES ? "¡Mensaje enviado!" : "Message sent!"}</h3>
        <p className="text-gray-600 max-w-sm">
          {isES ? "Te responderemos con una propuesta en menos de 24 horas." : "We'll send you a proposal in less than 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isES ? "Nombre completo" : "Full name"} *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={isES ? "Tu nombre" : "Your name"}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isES ? "Correo electrónico" : "Email"} *
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isES ? "Teléfono (opcional)" : "Phone (optional)"}
        </label>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={isES ? "+57 300 000 0000" : "+1 234 567 890"}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isES ? "Cuéntanos sobre tu restaurante" : "Tell us about your restaurant"} *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder={isES ? "Nombre del restaurante, tipo de cocina, qué necesitas..." : "Restaurant name, cuisine type, what you need..."}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy"
            name="privacyPolicyAccepted"
            checked={formData.privacyPolicyAccepted}
            onChange={handleChange}
            required
            className="h-4 w-4 mt-0.5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
          />
          <label htmlFor="privacy" className="text-sm text-gray-600">
            {isES ? "Acepto el tratamiento de mis datos según la " : "I accept the processing of my data per the "}
            <Link to="/privacy-policy" className="text-purple-600 hover:underline">
              {isES ? "Política de Privacidad" : "Privacy Policy"}
            </Link>
          </label>
        </div>
      </div>

      {status.state === "error" && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
          <AlertCircle size={18} />
          <p className="text-sm">{status.message}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-purple-700 text-white py-4 px-6 rounded-lg hover:bg-coral-400 transition-all flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.01]"
      >
        <Send size={20} />
        {isES ? "Solicitar cotización gratis" : "Get a free quote"}
      </button>

      <p className="text-center text-gray-500 text-sm">
        {isES ? "¿Prefieres hablar directo?" : "Prefer to talk directly?"}{" "}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWhatsAppClick}
          className="text-green-600 font-medium hover:underline"
        >
          WhatsApp
        </a>
      </p>
    </form>
  );
};

const RestaurantLandingPage = () => {
  const { t, i18n } = useTranslation("restaurant-landing");
  const isES = i18n.language?.startsWith("es");

  const whatsappMessage = isES
    ? "Hola, vi su anuncio y me interesa una página web para mi restaurante. ¿Podemos hablar?"
    : "Hi, I saw your ad and I'm interested in a website for my restaurant. Can we talk?";
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  const painItems = t("pain.items", { returnObjects: true });
  const includedItems = [
    "included.items.menu",
    "included.items.seo",
    "included.items.responsive",
    "included.items.whatsapp",
    "included.items.speed",
    "included.items.ssl",
    "included.items.analytics",
    "included.items.support",
  ];

  return (
    <div className="min-h-screen bg-white">
      <SimpleSEO
        titleKey={t("seo.title")}
        descriptionKey={t("seo.description")}
        canonicalUrl="/servicios/web-para-restaurantes"
        ogType="website"
        ogImage="/logo.png"
      />

      {/* Minimal Header */}
      <header className="bg-purple-700 py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/bombillo.webp"
              alt="Crixium Digital"
              className="h-8 w-auto"
              loading="eager"
            />
            <span className="font-bold text-lg text-coral-400">
              Crixium Digital
            </span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("restaurant_header", "web")}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-coral-400 border border-white/30 transition-colors flex items-center gap-2"
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">{t("header.cta")}</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <UtensilsCrossed size={16} />
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t("hero.title.part1")}
            <span className="text-yellow-300">{t("hero.title.highlight")}</span>
            {t("hero.title.part2")}
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-3xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("restaurant_hero", "web")}
            className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <MessageCircle size={22} />
            <span>{t("hero.cta")}</span>
            <ArrowRight size={20} />
          </a>
          <p className="mt-4 text-purple-200 text-sm">{t("hero.ctaSubtext")}</p>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-700">600+</div>
              <div className="text-sm text-gray-600">{t("stats.clients")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-700">8+</div>
              <div className="text-sm text-gray-600">{t("stats.years")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-700">250+</div>
              <div className="text-sm text-gray-600">{t("stats.projects")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-700">100%</div>
              <div className="text-sm text-gray-600">{t("stats.satisfaction")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {t("pain.title")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {Array.isArray(painItems) &&
              painItems.map((item, index) => {
                const Icon = PAIN_ICONS[index] || SearchX;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 bg-red-50 border border-red-100 rounded-xl"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-red-500" size={20} />
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {t("included.title")}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {t("included.subtitle")}
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {includedItems.map((key, index) => (
              <div key={index} className="flex items-center gap-3 p-3">
                <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <Check size={14} />
                </div>
                <span className="text-gray-700">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {t("showcase.title")}
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            {t("showcase.subtitle")}
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            <a
              href="https://restaurantkushtata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-md overflow-hidden group block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={bulgariaPng}
                  alt={isES ? "Página web restaurante Bulgaria" : "Restaurant website Bulgaria"}
                  className="w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-5 text-left">
                <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                  {isES ? "Caso real" : "Real project"}
                </span>
                <h3 className="font-bold text-base mt-1 text-gray-900 group-hover:text-purple-700 transition-colors">
                  Bulgaria Restaurant
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {isES
                    ? "Sitio web con menú digital, integración WhatsApp y SEO local."
                    : "Website with digital menu, WhatsApp integration and local SEO."}
                </p>
                <span className="inline-flex items-center gap-1 text-purple-700 text-xs font-medium mt-2">
                  {isES ? "Ver sitio" : "View site"} <ArrowRight size={12} />
                </span>
              </div>
            </a>
            <a
              href="https://pizzeriayambol.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-md overflow-hidden group block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={famigliasPng}
                  alt={isES ? "Página web restaurante Famiglia" : "Restaurant website Famiglia"}
                  className="w-full h-56 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-5 text-left">
                <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                  {isES ? "Caso real" : "Real project"}
                </span>
                <h3 className="font-bold text-base mt-1 text-gray-900 group-hover:text-purple-700 transition-colors">
                  Famiglia Pizzeria
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {isES
                    ? "Diseño personalizado, pedidos por WhatsApp y presencia en Google."
                    : "Custom design, WhatsApp orders and Google visibility."}
                </p>
                <span className="inline-flex items-center gap-1 text-purple-700 text-xs font-medium mt-2">
                  {isES ? "Ver sitio" : "View site"} <ArrowRight size={12} />
                </span>
              </div>
            </a>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("restaurant_showcase", "web")}
            className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-800 transition-colors"
          >
            {t("showcase.cta")} <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Real Testimonials */}
      <section className="overflow-hidden">
        <LandingReviewsCarousel />
      </section>

      {/* Guarantee */}
      <section className="py-12 px-4 bg-purple-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="text-purple-700" size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{t("guarantee.title")}</h3>
            <p className="text-gray-600">{t("guarantee.description")}</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {t("finalCta.title")}
          </h2>
          <p className="text-gray-600 text-center mb-10">
            {t("finalCta.subtitle")}
          </p>
          <RestaurantContactForm
            isES={isES}
            whatsappUrl={whatsappUrl}
            onWhatsAppClick={() => trackWhatsAppClick("restaurant_final_cta", "web")}
          />
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 bg-gray-900 text-gray-400 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Crixium Digital.{" "}
          {t("footer.rights")}
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">
            {isES ? "Política de Privacidad" : "Privacy Policy"}
          </Link>
          <Link to="/terms-conditions" className="hover:text-white transition-colors">
            {isES ? "Términos y Condiciones" : "Terms & Conditions"}
          </Link>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default RestaurantLandingPage;

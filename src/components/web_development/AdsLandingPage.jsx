import React from "react";
import {
  Check,
  MessageCircle,
  ArrowRight,
  Clock,
  Eye,
  Palette,
  Star,
  Shield,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SimpleSEO from "../SEO/SimpleSEO";
import WhatsAppButton from "../WhatsAppButton";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";

const AdsLandingPage = () => {
  const { t, i18n } = useTranslation("ads-landing");
  const isES = i18n.language?.startsWith("es");

  const whatsappMessage = isES
    ? "Hola, vi su anuncio y me interesa una cotización para desarrollo web. ¿Podemos hablar?"
    : "Hi, I saw your ad and I'm interested in a quote for web development. Can we talk?";
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <div className="min-h-screen bg-white">
      <SimpleSEO
        titleKey={t("seo.title")}
        descriptionKey={t("seo.description")}
        canonicalUrl="/servicios/desarrollo-web"
        ogType="website"
        ogImage="/logo.png"
      />

      {/* Minimal Header - no full navigation */}
      <header className="bg-white border-b border-gray-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Crixium Digital"
              className="h-8 w-auto"
              loading="eager"
            />
            <span className="font-bold text-lg text-gray-900">
              Crixium Digital
            </span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("ads_header", "web")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">{t("header.cta")}</span>
          </a>
        </div>
      </header>

      {/* Hero - Ultra focused */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t("hero.title.part1")}
            <span className="text-coral-400">{t("hero.title.highlight")}</span>
            {t("hero.title.part2")}
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-3xl mx-auto">
            {t("hero.subtitle")}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("ads_hero", "web")}
            className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <MessageCircle size={22} />
            <span>{t("hero.cta")}</span>
            <ArrowRight size={20} />
          </a>

          <p className="mt-4 text-purple-200 text-sm">
            {t("hero.ctaSubtext")}
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
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
              <div className="text-sm text-gray-600">
                {t("stats.projects")}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-700">100%</div>
              <div className="text-sm text-gray-600">
                {t("stats.satisfaction")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("benefits.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="text-purple-700" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {t("benefits.fast.title")}
              </h3>
              <p className="text-gray-600">{t("benefits.fast.description")}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="text-purple-700" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {t("benefits.tracking.title")}
              </h3>
              <p className="text-gray-600">
                {t("benefits.tracking.description")}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Palette className="text-purple-700" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {t("benefits.custom.title")}
              </h3>
              <p className="text-gray-600">
                {t("benefits.custom.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t("included.title")}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {t("included.subtitle")}
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "included.items.responsive",
              "included.items.seo",
              "included.items.ssl",
              "included.items.speed",
              "included.items.analytics",
              "included.items.support",
              "included.items.contact",
              "included.items.social",
            ].map((key, index) => (
              <div key={index} className="flex items-center gap-3 p-3">
                <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                  <Check size={14} />
                </div>
                <span className="text-gray-700">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Minimal */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <blockquote className="text-xl text-gray-700 italic mb-4 max-w-2xl mx-auto">
            "{t("testimonial.quote")}"
          </blockquote>
          <p className="text-gray-500 font-medium">{t("testimonial.author")}</p>
        </div>
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

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-purple-700 to-purple-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("finalCta.title")}
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            {t("finalCta.subtitle")}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("ads_final_cta", "web")}
            className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-5 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <MessageCircle size={22} />
            <span>{t("finalCta.cta")}</span>
            <ArrowRight size={20} />
          </a>
          <p className="mt-4 text-purple-200 text-sm">
            {t("finalCta.benefit")}
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 bg-gray-900 text-gray-400 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Crixium Digital.{" "}
          {t("footer.rights")}
        </p>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default AdsLandingPage;

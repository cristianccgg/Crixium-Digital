import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ContactForm from "./ContactForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SimpleSEO from "./SEO/SimpleSEO";
import SimpleSchemaData from "./SEO/SimpleSchemaData";

const ContactInfoCard = ({ icon: Icon, title, content, link, linkText }) => (
  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-purple-100 transform hover:scale-[1.02] duration-300">
    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
      <Icon className="text-purple-700" size={28} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-center mb-4">{content}</p>
    {link && (
      <div className="text-center">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-purple-700 font-medium hover:text-coral-400 group"
        >
          {linkText}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    )}
  </div>
);

const ContactPage = () => {
  const { t } = useTranslation("contact-page");
  const seoTitle = "Contáctanos | Servicios Digitales | Crixium Digital";
  const seoDescription =
    "Ponte en contacto con nuestro equipo para discutir tu próximo proyecto digital. Desarrollo web, producción musical y soluciones digitales personalizadas para tu negocio.";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Components */}
      <SimpleSEO
        titleKey="seo:contact.title"
        descriptionKey="seo:contact.description"
        canonicalUrl="/contact"
        ogType="website"
        ogImage="/logo.png"
      />
      <SimpleSchemaData
        pageType="ContactPage"
        data={{
          path: "/contact",
        }}
      />
      {/* Hero Section */}
      <section className="relative md:min-h-[60vh] min-h-screen flex items-center pt-16 px-4 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              <MessageCircle size={16} />
              <span>{t("contact.heroSubtitle")}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t("contact.title")}
              <span className="text-coral-400">{t("contact.title2")}</span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-purple-100 max-w-3xl mx-auto">
              {t("contact.description")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/web-development"
                className="bg-white/20 font-semibold hover:bg-coral-400 backdrop-blur-sm text-white px-8 py-4 rounded-lg border border-white/30 transition-all duration-300 flex items-center gap-2"
              >
                {t("contact.webServices")}
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/music-production"
                className="bg-white font-semibold text-purple-700 hover:bg-coral-400 hover:text-white backdrop-blur-sm  px-8 py-4 rounded-lg border border-white/30 transition-all duration-300 flex items-center gap-2"
              >
                {t("contact.musicServices")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Imagen o gráfico decorativo */}
        <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-full pointer-events-none opacity-30 md:opacity-50">
          <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
            <svg viewBox="0 0 200 200" width="500" height="500">
              <path
                fill="rgba(255, 255, 255, 0.1)"
                d="M45.4,-77.1C58.2,-69.3,67.9,-56.3,74.8,-42.3C81.7,-28.4,85.8,-14.2,85.1,-0.4C84.5,13.4,79.1,26.9,70.8,38.2C62.4,49.6,51.2,59,38.8,62.4C26.3,65.8,13.2,63.3,1.7,60.7C-9.8,58.1,-19.5,55.4,-31.6,51.9C-43.6,48.3,-58,43.8,-65.8,34.4C-73.7,25,-75.1,10.6,-73.3,-3C-71.5,-16.6,-66.5,-29.5,-57.7,-38.2C-49,-46.9,-36.4,-51.3,-24.5,-59.5C-12.5,-67.8,-1.3,-80,11.4,-82.6C24.1,-85.2,32.6,-84.9,45.4,-77.1Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} className="text-coral-400" />
              <span>{t("contact.formSection.badge")}</span>
            </div>
            {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("contact.formSection.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("contact.formSection.description")}
            </p> */}
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <Phone size={16} />
              <span>{t("contact.infoSection.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("contact.infoSection.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("contact.infoSection.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ContactInfoCard
              icon={Phone}
              title={t("contact.infoSection.whatsapp.title")}
              content={t("contact.infoSection.whatsapp.content")}
              link="https://wa.me/573219746045?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20tus%20servicios."
              linkText={t("contact.infoSection.whatsapp.linkText")}
            />

            <ContactInfoCard
              icon={Mail}
              title={t("contact.infoSection.email.title")}
              content={t("contact.infoSection.email.content")}
              link="mailto:contact@crixiumdigital.com"
              linkText={t("contact.infoSection.email.linkText")}
            />
          </div>
        </div>
      </section>

      {/* FAQ or Additional Information */}
      <section className="py-16 px-4 bg-purple-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -right-40 -top-40 w-80 h-80 bg-purple-300 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-purple-400 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} className="text-coral-400" />
            <span>{t("contact.faqSection.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("contact.faqSection.title")}
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            {t("contact.faqSection.description")}
          </p>
          <a
            href="https://wa.me/573219746045?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20tus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg hover:bg-purple-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105 font-medium shadow-md group"
          >
            <span>{t("contact.faqSection.button")}</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

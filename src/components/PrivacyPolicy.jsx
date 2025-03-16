import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SimpleSEO from "./SEO/SimpleSEO";
import SimpleSchemaData from "./SEO/SimpleSchemaData";

const PrivacyPolicy = () => {
  const { t } = useTranslation("privacy");

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Components */}
      <SimpleSEO
        titleKey="privacy.title"
        descriptionKey="privacy.description"
        canonicalUrl="/privacy-policy"
        ogType="website"
        ogImage="/logo.png"
      />
      <SimpleSchemaData
        pageType="WebPage"
        data={{
          path: "/privacy-policy",
        }}
      />

      <div className="bg-purple-700 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              {t("lastUpdated")}: {t("date")}
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section1.title")}
              </h2>
              <p className="mb-4">{t("section1.p1")}</p>
              <p>{t("section1.p2")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section2.title")}
              </h2>
              <p className="mb-4">{t("section2.p1")}</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">{t("section2.list.item1")}</li>
                <li className="mb-2">{t("section2.list.item2")}</li>
                <li className="mb-2">{t("section2.list.item3")}</li>
                <li className="mb-2">{t("section2.list.item4")}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section3.title")}
              </h2>
              <p className="mb-4">{t("section3.p1")}</p>
              <p>{t("section3.p2")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section4.title")}
              </h2>
              <p className="mb-4">{t("section4.p1")}</p>
              <p className="mb-6">{t("section4.p2")}</p>

              {/* Cookies Esenciales */}
              <div className="mb-4 pl-4 border-l-4 border-purple-200">
                <h3 className="font-bold text-purple-700 mb-2">
                  {t("section4.cookieTypes.essential.title")}
                </h3>
                <p className="mb-1">
                  <span className="font-medium">• {t("purpose")}</span>:{" "}
                  {t("section4.cookieTypes.essential.purpose")}
                </p>
                <p className="mb-1">
                  <span className="font-medium">• {t("duration")}</span>:{" "}
                  {t("section4.cookieTypes.essential.duration")}
                </p>
                <p>
                  <span className="font-medium">• {t("legal")}</span>:{" "}
                  {t("section4.cookieTypes.essential.legal")}
                </p>
              </div>

              {/* Cookies de Preferencias */}
              <div className="mb-4 pl-4 border-l-4 border-purple-200">
                <h3 className="font-bold text-purple-700 mb-2">
                  {t("section4.cookieTypes.preferences.title")}
                </h3>
                <p className="mb-1">
                  <span className="font-medium">• {t("purpose")}</span>:{" "}
                  {t("section4.cookieTypes.preferences.purpose")}
                </p>
                <p className="mb-1">
                  <span className="font-medium">• {t("duration")}</span>:{" "}
                  {t("section4.cookieTypes.preferences.duration")}
                </p>
                <p>
                  <span className="font-medium">• {t("legal")}</span>:{" "}
                  {t("section4.cookieTypes.preferences.legal")}
                </p>
              </div>

              {/* Cookies Estadísticas */}
              <div className="mb-4 pl-4 border-l-4 border-purple-200">
                <h3 className="font-bold text-purple-700 mb-2">
                  {t("section4.cookieTypes.statistics.title")}
                </h3>
                <p className="mb-1">
                  <span className="font-medium">• {t("purpose")}</span>:{" "}
                  {t("section4.cookieTypes.statistics.purpose")}
                </p>
                <p className="mb-1">
                  <span className="font-medium">• {t("examples")}</span>:{" "}
                  {t("section4.cookieTypes.statistics.examples")}
                </p>
                <p className="mb-1">
                  <span className="font-medium">• {t("duration")}</span>:{" "}
                  {t("section4.cookieTypes.statistics.duration")}
                </p>
                <p>
                  <span className="font-medium">• {t("legal")}</span>:{" "}
                  {t("section4.cookieTypes.statistics.legal")}
                </p>
              </div>

              {/* Cookies de Marketing */}
              <div className="mb-6 pl-4 border-l-4 border-purple-200">
                <h3 className="font-bold text-purple-700 mb-2">
                  {t("section4.cookieTypes.marketing.title")}
                </h3>
                <p className="mb-1">
                  <span className="font-medium">• {t("purpose")}</span>:{" "}
                  {t("section4.cookieTypes.marketing.purpose")}
                </p>
                <p className="mb-1">
                  <span className="font-medium">• {t("examples")}</span>:{" "}
                  {t("section4.cookieTypes.marketing.examples")}
                </p>
                <p className="mb-1">
                  <span className="font-medium">• {t("duration")}</span>:{" "}
                  {t("section4.cookieTypes.marketing.duration")}
                </p>
                <p>
                  <span className="font-medium">• {t("legal")}</span>:{" "}
                  {t("section4.cookieTypes.marketing.legal")}
                </p>
              </div>

              {/* Control de Cookies */}
              <h3 className="font-bold text-purple-700 mb-2">
                {t("section4.control.title")}
              </h3>
              <p className="mb-2">{t("section4.control.p1")}</p>
              <ol className="list-decimal pl-5 mb-4">
                <li className="mb-1">{t("section4.control.banner")}</li>
                <li>{t("section4.control.browser")}</li>
              </ol>
              <p className="mb-2">{t("section4.control.more")}</p>
              <ul className="list-disc pl-5 mb-6">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    Edge
                  </a>
                </li>
              </ul>

              {/* Cookies de Terceros */}
              <h3 className="font-bold text-purple-700 mb-2">
                {t("section4.thirdParty.title")}
              </h3>
              <p className="mb-6">{t("section4.thirdParty.p1")}</p>

              {/* Cambios en la Política */}
              <h3 className="font-bold text-purple-700 mb-2">
                {t("section4.changes.title")}
              </h3>
              <p className="mb-6">{t("section4.changes.p1")}</p>

              {/* Contacto */}
              <h3 className="font-bold text-purple-700 mb-2">
                {t("section4.contact.title")}
              </h3>
              <p>{t("section4.contact.p1")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section5.title")}
              </h2>
              <p>{t("section5.p1")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section6.title")}
              </h2>
              <p>{t("section6.p1")}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section7.title")}
              </h2>
              <p className="mb-4">{t("section7.p1")}</p>
              <p>
                {t("section7.contact")}:{" "}
                <a
                  href="mailto:contact@crixiumdigital.com"
                  className="text-purple-600 hover:text-purple-800"
                >
                  contact@crixiumdigital.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

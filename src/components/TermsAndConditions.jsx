import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SimpleSEO from "./SEO/SimpleSEO";
import SimpleSchemaData from "./SEO/SimpleSchemaData";

const TermsAndConditions = () => {
  const { t } = useTranslation("terms");

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Components */}
      <SimpleSEO
        titleKey="terms.title"
        descriptionKey="terms.description"
        canonicalUrl="/terms-conditions"
        ogType="website"
        ogImage="/logo.png"
      />
      <SimpleSchemaData
        pageType="WebPage"
        data={{
          path: "/terms-conditions",
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
              <p>{t("section2.p1")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section3.title")}
              </h2>
              <p className="mb-4">{t("section3.p1")}</p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">{t("section3.list.item1")}</li>
                <li className="mb-2">{t("section3.list.item2")}</li>
                <li className="mb-2">{t("section3.list.item3")}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section4.title")}
              </h2>
              <p>{t("section4.p1")}</p>
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

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section7.title")}
              </h2>
              <p>{t("section7.p1")}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                {t("section8.title")}
              </h2>
              <p className="mb-4">{t("section8.p1")}</p>
              <p>
                {t("section8.contact")}:{" "}
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

export default TermsAndConditions;

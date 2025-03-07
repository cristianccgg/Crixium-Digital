import React from "react";
import { Package, Clock, Lock, MessageSquare, Download } from "lucide-react";
import { Link } from "react-router-dom";
import TrackingPreview from "./TrackingPreview";
import ana from "../assets/users_pictures/ana.webp";
import { useTranslation } from "react-i18next";

const TrackingLanding = () => {
  const { t } = useTranslation("tracking");
  return (
    <div>
      {/* Sección de característica destacada - Tracking */}
      <section className="py-24 px-4 bg-white overflow-hidden relative">
        {/* Elementos decorativos sutiles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full opacity-70 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-50 rounded-full opacity-70 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
              {t("badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t("title.part1")}
              <br />
              {t("title.part2")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t("main-subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Demo de TrackingPreview */}
            <div className="order-2 md:order-1">
              <TrackingPreview />
            </div>

            {/* Features y beneficios */}
            <div className="order-1 md:order-2">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("features.titles.first")}
                    </h3>
                    <p className="text-gray-600">
                      {t("features.descriptions.first")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("features.titles.second")}
                    </h3>
                    <p className="text-gray-600">
                      {t("features.descriptions.second")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <Download size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("features.titles.third")}
                    </h3>
                    <p className="text-gray-600">
                      {t("features.descriptions.third")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("features.titles.fourth")}
                    </h3>
                    <p className="text-gray-600">
                      {t("features.descriptions.fourth")}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/tracking"
                    className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-coral-400 transition-all duration-300 inline-flex items-center gap-2 font-medium"
                  >
                    <Package size={18} />
                    <span>{t("button")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonio específico sobre tracking */}
          <div className="mt-20 bg-purple-50 p-8 rounded-2xl border border-purple-100 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-purple-200 flex items-center justify-center">
                  <img src={ana} alt="avatar" />
                </div>
              </div>
              <div>
                <p className="text-gray-700 italic mb-4">{t("testimonial")}</p>
                <div>
                  <p className="font-semibold">{t("name")}</p>
                  <p className="text-sm text-gray-500">{t("position")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackingLanding;

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Clock, Eye, Palette, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";

const EnhancedHeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { t, i18n } = useTranslation("hero");

  const whatsappMessage =
    i18n.language === "en"
      ? "Hi, I'm interested in getting a quote for a web development project."
      : "Hola, me interesa una cotización para un proyecto de desarrollo web.";

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative sm:min-h-[70vh] min-h-screen flex items-center xl:py-16 py-20 px-4 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient circles */}
        <div
          className={`absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl transition-all duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate(${scrollPosition * 0.05}px, ${
              -scrollPosition * 0.02
            }px)`,
          }}
        ></div>
        <div
          className={`absolute bottom-10 left-20 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl transition-all duration-1500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate(${-scrollPosition * 0.03}px, ${
              -scrollPosition * 0.01
            }px)`,
          }}
        ></div>
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 animate-float">
          <div className="w-12 h-12 border border-white/20 rounded-lg rotate-12 opacity-60"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-delay">
          <div className="w-8 h-8 border border-white/20 rounded-full opacity-60"></div>
        </div>

        {/* Reduced particles for better mobile performance */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30 animate-particle"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left content */}
          <div
            className={`transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex w-fit items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              <Sparkles size={16} className="text-coral-400" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("title.part1")}
              <span className="relative inline-block text-coral-400">
                {t("title.highlight1")}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5.5 C50,0.5 150,0.5 200,5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
              {t("title.and")}
              <span className="relative inline-block text-coral-400">
                {t("title.highlight2")}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5.5 C50,0.5 150,0.5 200,5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-lg">
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero", "web")}
                className="group bg-coral-500 text-white px-8 py-4 rounded-lg hover:bg-coral-600 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                <span>{t("buttons.primary")}</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#proyectos"
                className="group bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 font-medium backdrop-blur-sm"
              >
                <span>{t("buttons.secondary")}</span>
              </a>
            </div>
          </div>

          {/* Right side - Key benefits card */}
          <div
            className={`hidden md:flex items-center justify-center relative transition-all duration-1000 delay-300 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="absolute w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-sm border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-white">
                {i18n.language === "en" ? "Why choose us?" : "¿Por qué elegirnos?"}
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-coral-400/20 flex items-center justify-center">
                    <Clock size={20} className="text-coral-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t("heroFeatures.first")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-coral-400/20 flex items-center justify-center">
                    <Eye size={20} className="text-coral-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t("heroFeatures.second")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-coral-400/20 flex items-center justify-center">
                    <Palette size={20} className="text-coral-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t("heroFeatures.third")}</p>
                  </div>
                </div>
              </div>

              {/* Mini social proof */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-sm text-purple-100">
                    {i18n.language === "en"
                      ? "600+ satisfied clients worldwide"
                      : "600+ clientes satisfechos en todo el mundo"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;

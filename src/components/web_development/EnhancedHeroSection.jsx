import React, { useEffect, useState } from "react";
import { Sparkles, Globe, Music2, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EnhancedHeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative md:min-h-[70vh] min-h-screen flex items-center py-16 px-4 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white overflow-hidden">
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
        <div
          className={`absolute top-1/3 left-1/3 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl transition-all duration-2000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate(${scrollPosition * 0.02}px, ${
              scrollPosition * 0.03
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
        <div className="absolute top-1/3 left-1/4 animate-float-slow">
          <div className="w-10 h-10 border border-white/20 rounded-md rotate-45 opacity-60"></div>
        </div>

        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
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
              <span>Servicio único con seguimiento en tiempo real</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Eleva tu Marca con{" "}
              <span className="relative inline-block text-coral-400">
                Creatividad
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
              </span>{" "}
              y{" "}
              <span className="relative inline-block text-coral-400">
                Tecnología
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

            <p className="text-xl md:text-2xl mb-10 text-purple-100 max-w-lg">
              Desarrollo web impactante y producción musical de primer nivel
              para hacer destacar tu negocio.
            </p>

            {/* Improved Button Layout - grid with equal sizing and responsive behavior */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/web-development"
                className="group bg-white text-purple-900 px-6 py-4 rounded-lg hover:bg-coral-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/30 transform -translate-x-full transition-transform group-hover:translate-x-0"></span>
                <Globe size={20} className="relative z-10" />
                <span className="relative z-10">Desarrollo Web</span>
              </Link>

              <Link
                to="/music-production"
                className="group bg-white text-purple-900 px-6 py-4 rounded-lg hover:bg-coral-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/30 transform -translate-x-full transition-transform group-hover:translate-x-0"></span>
                <Music2 size={20} className="relative z-10" />
                <span className="relative z-10">Producción Musical</span>
              </Link>

              <Link
                to="/tracking"
                className="group bg-purple-600 text-white border border-white/20 px-6 py-4 rounded-lg hover:bg-coral-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl relative overflow-hidden sm:col-span-2 lg:col-span-1"
              >
                <span className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full transition-transform group-hover:translate-x-0"></span>
                <Package size={20} className="relative z-10" />
                <span className="relative z-10">Ver Ejemplos de Tracking</span>
              </Link>
            </div>
          </div>

          {/* Right side content */}
          <div
            className={`hidden md:flex items-center justify-center relative transition-all duration-1000 delay-300 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="absolute w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>

            {/* Preview card with animated elements */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-sm transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-purple-100 relative">
              {/* Header */}
              <div className="bg-purple-700 text-white p-3 flex items-center gap-2">
                <Package size={18} />
                <h3 className="font-medium">Sistema de Seguimiento</h3>
              </div>

              {/* Body with animated elements */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">Proyecto #ORD12345</h4>
                    <p className="text-sm text-gray-600">
                      Sitio Web Corporativo
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                    En Progreso
                  </span>
                </div>

                {/* Timeline with enhanced animations */}
                <div className="relative space-y-4 my-6 pl-6 before:absolute before:left-[9px] before:top-1 before:bottom-1 before:w-0.5 before:bg-purple-100">
                  <div className="relative">
                    <div className="absolute left-[-24px] w-5 h-5 rounded-full bg-purple-700 flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Diseño Aprobado</p>
                    <p className="text-xs text-gray-500">Completado 12/02</p>
                  </div>

                  <div className="relative animate-pulse">
                    <div className="absolute left-[-24px] w-5 h-5 rounded-full bg-purple-100 border-2 border-purple-700 flex items-center justify-center">
                      <svg
                        className="animate-spin text-purple-700"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 6V12L16 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-purple-700">
                      Desarrollo Frontend
                    </p>
                    <p className="text-xs text-gray-500">En curso</p>
                  </div>

                  <div className="relative opacity-50">
                    <div className="absolute left-[-24px] w-5 h-5 rounded-full bg-gray-200"></div>
                    <p className="text-sm font-medium">Pruebas Finales</p>
                    <p className="text-xs text-gray-500">Próximamente</p>
                  </div>
                </div>

                {/* CTA with animated hover effect */}
                <Link
                  to="/tracking"
                  className="group w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-coral-400 transition-colors text-sm flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full transition-transform group-hover:translate-x-0"></span>
                  <span className="relative z-10">
                    Ver detalles del proyecto
                  </span>
                  <ArrowRight
                    size={14}
                    className="relative z-10 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;

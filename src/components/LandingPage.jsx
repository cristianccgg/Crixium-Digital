import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Music2,
  Globe,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import LandingReviewsCarousel from "./LandingReviewsCarousel";

const ServiceCard = ({ icon: Icon, title, description, link, color }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full border border-gray-100">
      <div
        className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6`}
      >
        <Icon className="text-white" size={28} />
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <button
        onClick={() => navigate(link)}
        className="group text-purple-700 flex items-center text-sm font-medium hover:text-purple-900"
      >
        Explorar servicios{" "}
        <ChevronRight
          size={18}
          className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};

// Componente para los números/estadísticas
const StatCard = ({ number, label }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-purple-700 mb-2">
      {number}
    </div>
    <p className="text-gray-600">{label}</p>
  </div>
);

const LandingPage = () => {
  const heroRef = useRef(null);

  // Efecto para la animación inicial
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
    }
  }, []);

  return (
    <>
      {/* Hero Section con diseño más moderno */}
      <section
        ref={heroRef}
        className="relative min-h-[100vh] md:min-h-[70vh] flex items-center py-16 px-4 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white overflow-hidden"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Eleva tu Marca con{" "}
              <span className="text-coral-400">Creatividad</span> y{" "}
              <span className="text-coral-400">Tecnología</span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-purple-100">
              Desarrollo web impactante y producción musical de primer nivel
              para hacer destacar tu negocio.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/web-development"
                className="bg-white text-purple-900 px-8 py-4 rounded-lg hover:bg-coral-400 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                <Globe size={20} />
                Desarrollo Web
              </Link>
              <Link
                to="/music-production"
                className="bg-white text-purple-900 px-8 py-4 rounded-lg hover:bg-coral-400 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                <Music2 size={20} />
                Producción Musical
              </Link>
            </div>
          </div>
        </div>

        {/* Imagen o gráfico decorativo */}
        <div className="absolute right-0 bottom-0 w-full md:w-1/2 h-full pointer-events-none opacity-30 md:opacity-70">
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

      {/* Sección de servicios principales */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Servicios Profesionales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluciones creativas y técnicas para impulsar tu presencia digital
              y sonora
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard
              icon={Globe}
              title="Desarrollo Web"
              description="Sitios web y tiendas online de alto impacto visual con las tecnologías más avanzadas para garantizar rendimiento óptimo y experiencias memorables."
              link="/web-development"
              color="bg-purple-700"
            />
            <ServiceCard
              icon={Music2}
              title="Producción Musical"
              description="Creamos la identidad sonora de tu marca con jingles, spots publicitarios y música original que conecta emocionalmente con tu audiencia."
              link="/music-production"
              color="bg-purple-800"
            />
          </div>
        </div>
      </section>

      {/* Carrusel de Reseñas */}
      <LandingReviewsCarousel />

      {/* Sección Stats/Cifras */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="250+" label="Clientes satisfechos" />
            <StatCard number="600+" label="Proyectos completados" />
            <StatCard number="8+" label="Años de experiencia" />
            <StatCard number="100%" label="Compromiso con la calidad" />
          </div>
        </div>
      </section>

      {/* Sección de propuesta única de valor */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Por qué elegirnos?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChevronRight size={16} className="text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Soluciones Integrales
                    </h3>
                    <p className="text-gray-600">
                      Desarrollo web y producción musical bajo un mismo techo,
                      garantizando coherencia en todos los puntos de contacto
                      con tu audiencia.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChevronRight size={16} className="text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Enfoque Creativo</h3>
                    <p className="text-gray-600">
                      Combinamos la última tecnología con un enfoque creativo
                      original para resultados que destacan en el mercado.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ChevronRight size={16} className="text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Atención Personalizada
                    </h3>
                    <p className="text-gray-600">
                      Cada proyecto es único y recibe nuestra dedicación
                      completa, con comunicación constante y resultados a
                      medida.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Imagen o elemento visual representativo */}
            <div className="relative h-80 md:h-full min-h-[320px] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-purple-600 rounded-xl overflow-hidden">
                {/* Elementos decorativos */}
                <div className="absolute top-10 right-10 w-20 h-20 rounded-full border-4 border-white/30"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border-4 border-white/20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full"></div>

                {/* Iconos representativos */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white/80">
                  <Globe size={32} />
                </div>
                <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 text-white/80">
                  <Music2 size={32} />
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                  <Code size={48} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos de fondo */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-30"></div>
        <div className="absolute top-10 -left-10 w-32 h-32 bg-purple-100 rounded-full opacity-40"></div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para iniciar tu próximo proyecto?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos
          </p>
          <Link
            to="/contact"
            className="bg-coral-500 text-white px-8 py-4 rounded-lg hover:bg-coral-600 transition-all duration-300 inline-flex items-center gap-2 font-medium shadow-lg group"
          >
            <span>Contactar Ahora</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;

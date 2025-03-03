import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Music2,
  Globe,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Package,
  Clock,
  CheckCircle,
  Lock,
  MessageSquare,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import LandingReviewsCarousel from "./LandingReviewsCarousel";
import TrackingPreview from "./TrackingPreview";
import EnhancedHeroSection from "./web_development/EnhancedHeroSection";
import EnhancedServices from "./web_development/EnhancedServices";
import FeaturedProjectsLanding from "./web_development/FeaturedProjectsLanding";
import TechnologiesSection from "./web_development/TechnologiesSection";
import ana from "../assets/users_pictures/ana.webp";

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
    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
      {number}
    </div>
    <p className="text-white">{label}</p>
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
      {/* Hero Section con tracking highlight */}
      <EnhancedHeroSection />

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

          <EnhancedServices />
        </div>
      </section>

      <FeaturedProjectsLanding />

      <TechnologiesSection />

      {/* Sección de característica destacada - Tracking */}
      <section className="py-24 px-4 bg-white overflow-hidden relative">
        {/* Elementos decorativos sutiles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full opacity-70 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-50 rounded-full opacity-70 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
              Experiencia única para nuestros clientes
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Seguimiento transparente
              <br />
              en cada etapa del proceso
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Mantente informado sobre el progreso de tu proyecto en tiempo real
              con nuestra plataforma exclusiva de seguimiento.
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
                      Progreso en tiempo real
                    </h3>
                    <p className="text-gray-600">
                      Visualiza exactamente en qué etapa está tu proyecto y qué
                      pasos faltan para completarlo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Comunicación directa
                    </h3>
                    <p className="text-gray-600">
                      Envía comentarios, solicita cambios o haz preguntas
                      directamente desde la plataforma.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <Download size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Entregas accesibles
                    </h3>
                    <p className="text-gray-600">
                      Accede y descarga los archivos y entregas a medida que
                      estén disponibles.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Acceso seguro y privado
                    </h3>
                    <p className="text-gray-600">
                      Toda la información de tu proyecto está protegida y solo
                      tú puedes acceder con tu número de orden.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/tracking"
                    className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-coral-400 transition-all duration-300 inline-flex items-center gap-2 font-medium"
                  >
                    <Package size={18} />
                    <span>Probar demo de seguimiento</span>
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
                <p className="text-gray-700 italic mb-4">
                  "Lo que más me gustó del servicio fue poder ver exactamente en
                  qué etapa estaba mi proyecto. La transparencia y comunicación
                  constante me dieron mucha tranquilidad durante todo el
                  proceso."
                </p>
                <div>
                  <p className="font-semibold">Ana Castillo</p>
                  <p className="text-sm text-gray-500">
                    Emprendedora, Decoraciones DECO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Stats/Cifras */}
      <section className="py-16 px-4 bg-purple-700 ">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
            <StatCard number="250+" label="Clientes satisfechos" />
            <StatCard number="600+" label="Proyectos completados" />
            <StatCard number="8+" label="Años de experiencia" />
            <StatCard number="100%" label="Compromiso con la calidad" />
          </div>
        </div>
      </section>

      {/* Carrusel de Reseñas */}
      <LandingReviewsCarousel />

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
    </>
  );
};

export default LandingPage;

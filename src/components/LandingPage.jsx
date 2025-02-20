import React from "react";
import { useNavigate } from "react-router-dom";
import { Code, Music2, Globe, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ icon: Icon, title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-blue-600" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button
        onClick={() => navigate(link)}
        className="mt-4 text-blue-600 flex items-center hover:text-blue-700"
      >
        Saber más <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Soluciones Creativas para tu Negocio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Desarrollo web profesional y producción musical para hacer destacar
            tu marca
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#services"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Ver Servicios
            </a>

            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Globe}
              title="Desarrollo Web"
              description="Sitios web modernos y responsivos con React, WordPress y las últimas tecnologías."
              link="/web-development"
            />
            <ServiceCard
              icon={Music2}
              title="Producción Musical"
              description="Jingles publicitarios, música corporativa y producción musical profesional."
              link="/music-production"
            />
            <ServiceCard
              icon={Code}
              title="Soluciones Digitales"
              description="¿Necesitas una aplicación personalizada o un proyecto digital más complejo? Evaluamos tu caso y te conectamos con las soluciones adecuadas."
              link="/contact?service=other"
            />
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="portfolio" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Proyectos Destacados
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Aquí podrías agregar previsualizaciones de tus mejores proyectos */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-gray-600 mb-8">
            Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos
          </p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;

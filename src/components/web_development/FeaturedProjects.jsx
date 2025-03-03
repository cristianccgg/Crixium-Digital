import React, { useState, useEffect, useRef } from "react";
import { Layout, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import automateHQ from "../../assets/web_projects/automateHQ.png";
import EvaPro from "../../assets/web_projects/EvaPro.png";
import ciom from "../../assets/web_projects/ciom.png";
import designo from "../../assets/web_projects/designo.png";
import clout from "../../assets/web_projects/clout.png";
import hoodLab from "../../assets/web_projects/hoodlab.png";
import FB from "../../assets/web_projects/FB.png";

const ProjectCard = ({
  title,
  description,
  techStack,
  imageUrl,
  deployUrl,
  repoUrl,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-xl hover:scale-105 hover:border-purple-100 border border-transparent h-full flex flex-col">
    <div className="h-48 bg-gray-200 relative">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Layout size={48} className="text-gray-400" />
        </div>
      )}
      {deployUrl && (
        <div className="absolute top-3 right-3">
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/70 hover:bg-black p-2 rounded-full text-white flex items-center justify-center"
            title="Ver proyecto desplegado"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      )}
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 flex-1">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-auto">
        {deployUrl && (
          <a
            href={deployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-coral-400 text-sm font-medium flex items-center transition-colors duration-300"
          >
            <span>Ver proyecto</span>
            <ExternalLink size={14} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  </div>
);

const CarouselIndicator = ({ active, onClick }) => (
  <button
    className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
      active ? "bg-purple-600" : "bg-gray-300 hover:bg-purple-300"
    }`}
    onClick={onClick}
    aria-label={active ? "Current slide" : "Go to slide"}
  />
);

const FeaturedProjects = ({ ref }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);
  const slidesPerView = 3; // Cantidad de slides visibles (en escritorio)
  const autoplayDelay = 5000; // Tiempo entre slides automáticos (ms)
  const autoplayIntervalRef = useRef(null);

  // Reemplaza estos datos con tus propios proyectos de Vercel
  const projects = [
    {
      title: "The Hood Lab Store",
      description:
        "Ecommerce para la venta de productos de moda urbana y accesorios",
      techStack: ["Wordpress", "CSS", "Woocomerce"],
      deployUrl: "https://thehoodlab.com",
      imageUrl: hoodLab,
    },
    {
      title: "Designo",
      description:
        "Sitio Web de una agencia de diseño que ofrece servicios de diseño web, diseño gráfico y branding",
      techStack: ["React", "TailwindCSS", "Vite"],
      deployUrl: "https://designo-website-seven.vercel.app",
      imageUrl: designo,
    },
    {
      title: "Eva Pro",
      description:
        "LMS empresarial diseñado para respaldar incluso los programas de capacitación más exigentes",
      techStack: ["HTML", "TailwindCSS", "JavaScript"],
      deployUrl: "https://eva-pro-website.vercel.app",
      imageUrl: EvaPro,
    },
    {
      title: "Automate HQ",
      description:
        "Aplicación para gestionar tareas diarias con inteligencia artificial",
      techStack: ["HTML", "TailwindCSS", "JavaScript"],
      deployUrl: "https://automate-hq-website.vercel.app",
      imageUrl: automateHQ,
    },
    {
      title: "Ciom",
      description:
        "Sitio Web que proporciona una solución avanzada para la gestión de indicadores clave de desempeño (KPIs)",
      techStack: ["HTML", "CSS", "JavaScript"],
      deployUrl: "https://ciom-website-2.vercel.app",
      imageUrl: ciom,
    },
    {
      title: "Clout",
      description:
        "Plataforma de redes sociales para compartir y descubrir contenido",
      techStack: ["HTML", "TailwindCSS", "JavaScript"],
      deployUrl: "https://clout-website.vercel.app",
      imageUrl: clout,
    },
    {
      title: "FB Media Digital",
      description: "Ventas y agendas automatizadas con IA",
      techStack: ["Wordpress", "CSS", "JavaScript"],
      deployUrl: "https://fbmediadigital.com",
      imageUrl: FB,
    },
  ];

  // Número total de slides del carrusel (implementando carrusel infinito)
  // Con un carrusel infinito, podemos mostrar la misma cantidad de slides que proyectos tenemos
  const totalSlides = projects.length;

  // Control de autoplay
  useEffect(() => {
    startAutoplay();
    return () => clearInterval(autoplayIntervalRef.current);
  }, [activeSlide]);

  const startAutoplay = () => {
    clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(() => {
      next();
    }, autoplayDelay);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayIntervalRef.current);
  };

  // Navegación del carrusel con lógica de carrusel infinito
  const goToSlide = (slideIndex) => {
    setActiveSlide(slideIndex);
  };

  const next = () => {
    setActiveSlide((current) => (current + 1) % totalSlides);
  };

  const prev = () => {
    setActiveSlide((current) =>
      current === 0 ? totalSlides - 1 : current - 1
    );
  };

  // Soporte para gestos táctiles (swipe)
  const handleTouchStart = (e) => {
    stopAutoplay();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    startAutoplay();
    if (touchStart - touchEnd > 150) {
      next();
    }
    if (touchStart - touchEnd < -150) {
      prev();
    }
  };

  // Cálculo de qué proyectos mostrar en la vista actual (con carrusel infinito)
  const getVisibleProjects = () => {
    const projectsCount = projects.length;
    const start = (activeSlide * slidesPerView) % projectsCount;
    let visibleProjects = [];

    // Aseguramos que siempre mostremos slidesPerView proyectos
    for (let i = 0; i < slidesPerView; i++) {
      const index = (start + i) % projectsCount;
      visibleProjects.push(projects[index]);
    }

    return visibleProjects;
  };

  return (
    <section ref={ref} className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            Mis Proyectos
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Proyectos <span className="text-coral-400">Recientes</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Una selección de mis mejores proyectos desplegados en Vercel
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative">
          {/* Botones de navegación para desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => {
                prev();
                stopAutoplay();
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-purple-50 transition-colors duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} className="text-purple-700" />
            </button>
            <button
              onClick={() => {
                next();
                stopAutoplay();
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-purple-50 transition-colors duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} className="text-purple-700" />
            </button>
          </div>

          {/* Contenedor principal del carrusel con soporte táctil */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            {/* Vista de escritorio: grid con 3 tarjetas */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {getVisibleProjects().map((project, index) => (
                <ProjectCard
                  key={`desktop-${activeSlide}-${index}`}
                  {...project}
                />
              ))}
            </div>

            {/* Vista móvil: una tarjeta a la vez */}
            <div className="md:hidden">
              <div className="w-full">
                <ProjectCard {...projects[activeSlide % projects.length]} />
              </div>
            </div>
          </div>

          {/* Indicadores del carrusel */}
          <div className="flex justify-center mt-8">
            {/* Para móvil: mostramos un indicador por cada proyecto */}
            <div className="md:hidden flex">
              {projects.map((_, index) => (
                <CarouselIndicator
                  key={`mobile-indicator-${index}`}
                  active={activeSlide % projects.length === index}
                  onClick={() => {
                    goToSlide(index);
                    stopAutoplay();
                  }}
                />
              ))}
            </div>

            {/* Para desktop: mostramos un indicador por cada grupo de proyectos */}
            <div className="hidden md:flex">
              {Array.from({
                length: Math.min(totalSlides, projects.length),
              }).map((_, index) => (
                <CarouselIndicator
                  key={`desktop-indicator-${index}`}
                  active={activeSlide % totalSlides === index}
                  onClick={() => {
                    goToSlide(index);
                    stopAutoplay();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

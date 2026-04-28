import React, { useState, useEffect, useRef } from "react";
import { Layout, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import automateHQ from "../../assets/web_projects/automateHQ.webp";
import EvaPro from "../../assets/web_projects/EvaPro.webp";
import ciom from "../../assets/web_projects/ciom.webp";
import designo from "../../assets/web_projects/designo.webp";
import clout from "../../assets/web_projects/clout.webp";
import hoodLab from "../../assets/web_projects/hoodlab.webp";
import FB from "../../assets/web_projects/FB.webp";
import harvvest from "../../assets/web_projects/harvvest.app.webp";
import tempest from "../../assets/web_projects/Tempest Digital - www.tempest-digital.io.webp";
import hanahomes from "../../assets/web_projects/www.hanahomes.co.webp";
import { useTranslation } from "react-i18next";

const ProjectCard = ({
  title,
  description,
  techStack,
  imageUrl,
  deployUrl,
  repoUrl,
  viewProjectText,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-xl hover:scale-105 hover:border-purple-100 border border-transparent h-full flex flex-col">
    <div className="h-48 bg-gray-200 relative">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
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
            title={viewProjectText}
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
            <span>{viewProjectText}</span>
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
  const { t } = useTranslation("featured-projects");
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);
  const slidesPerView = 3; // Cantidad de slides visibles (en escritorio)
  const autoplayDelay = 5000; // Tiempo entre slides automáticos (ms)
  const autoplayIntervalRef = useRef(null);

  // Definimos los techStacks de manera estática ya que no necesitan traducción
  const hoodlabTechStack = ["Wordpress", "CSS", "Woocomerce"];
  const designoTechStack = ["React", "TailwindCSS", "Vite"];
  const evaProTechStack = ["HTML", "TailwindCSS", "JavaScript"];
  const automateHQTechStack = ["HTML", "TailwindCSS", "JavaScript"];
  const ciomTechStack = ["HTML", "CSS", "JavaScript"];
  const cloutTechStack = ["HTML", "TailwindCSS", "JavaScript"];
  const fbTechStack = ["Wordpress", "CSS", "JavaScript"];
  const harvvestTechStack = ["React", "TailwindCSS", "Framer Motion"];
  const tempestTechStack = ["React", "TailwindCSS", "GSAP"];
  const hanahomesTechStack = ["React", "TailwindCSS", "JavaScript"];

  // Proyectos con traducciones para el título y descripción, pero techStack estático
  const projects = [
    {
      title: t("projects.harvvest.title"),
      description: t("projects.harvvest.description"),
      techStack: harvvestTechStack,
      deployUrl: "https://harvvest.app",
      imageUrl: harvvest,
    },
    {
      title: t("projects.tempest.title"),
      description: t("projects.tempest.description"),
      techStack: tempestTechStack,
      deployUrl: "https://www.tempest-digital.io",
      imageUrl: tempest,
    },
    {
      title: t("projects.hanahomes.title"),
      description: t("projects.hanahomes.description"),
      techStack: hanahomesTechStack,
      deployUrl: "https://www.hanahomes.co",
      imageUrl: hanahomes,
    },
    {
      title: t("projects.hoodlab.title"),
      description: t("projects.hoodlab.description"),
      techStack: hoodlabTechStack,
      deployUrl: "https://thehoodlab.com",
      imageUrl: hoodLab,
    },
    {
      title: t("projects.designo.title"),
      description: t("projects.designo.description"),
      techStack: designoTechStack,
      deployUrl: "https://designo-website-seven.vercel.app",
      imageUrl: designo,
    },
    {
      title: t("projects.evapro.title"),
      description: t("projects.evapro.description"),
      techStack: evaProTechStack,
      deployUrl: "https://eva-pro-website.vercel.app",
      imageUrl: EvaPro,
    },
    {
      title: t("projects.automatehq.title"),
      description: t("projects.automatehq.description"),
      techStack: automateHQTechStack,
      deployUrl: "https://automate-hq-website.vercel.app",
      imageUrl: automateHQ,
    },
    {
      title: t("projects.ciom.title"),
      description: t("projects.ciom.description"),
      techStack: ciomTechStack,
      deployUrl: "https://ciom-website-2.vercel.app",
      imageUrl: ciom,
    },
    {
      title: t("projects.clout.title"),
      description: t("projects.clout.description"),
      techStack: cloutTechStack,
      deployUrl: "https://clout-website.vercel.app",
      imageUrl: clout,
    },
    {
      title: t("projects.fbmedia.title"),
      description: t("projects.fbmedia.description"),
      techStack: fbTechStack,
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
            {t("badge")}
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {t("title.first")}
            <span className="text-coral-400">{t("title.second")}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
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
              aria-label={t("buttons.prev")}
            >
              <ChevronLeft size={24} className="text-purple-700" />
            </button>
            <button
              onClick={() => {
                next();
                stopAutoplay();
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-purple-50 transition-colors duration-300"
              aria-label={t("buttons.next")}
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
                  viewProjectText={t("viewProject")}
                />
              ))}
            </div>

            {/* Vista móvil: una tarjeta a la vez */}
            <div className="md:hidden">
              <div className="w-full">
                <ProjectCard
                  {...projects[activeSlide % projects.length]}
                  viewProjectText={t("viewProject")}
                />
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

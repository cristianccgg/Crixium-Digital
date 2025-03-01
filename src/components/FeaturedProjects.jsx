import React from "react";
import { Layout, ExternalLink } from "lucide-react";
import automateHQ from "../assets/web_projects/automateHQ.png";
import EvaPro from "../assets/web_projects/EvaPro.png";
import ciom from "../assets/web_projects/ciom.png";
import designo from "../assets/web_projects/designo.png";
import clout from "../assets/web_projects/clout.png";
import hoodLab from "../assets/web_projects/hoodlab.png";

const ProjectCard = ({
  title,
  description,
  techStack,
  imageUrl,
  deployUrl,
  repoUrl,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-xl hover:scale-105 hover:border-purple-100 border border-transparent">
    <div className="h-48 bg-gray-200 relative">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full  object-cover object-top"
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
    <div className="p-6">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
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
      <div className="flex justify-between">
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

const FeaturedProjects = ({ ref }) => {
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
        "Sitio Web que proporciona una solución avanzada para la gestión de indicadores clave de desempeño (KPIs",
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
  ];

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
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

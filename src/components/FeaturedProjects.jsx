import React from "react";
import { Layout, ExternalLink } from "lucide-react";
import automateHQ from "../assets/web_projects/automateHQ.png";
import EvaPro from "../assets/web_projects/EvaPro.png";
import ciom from "../assets/web_projects/ciom.png";
import designo from "../assets/web_projects/designo.png";
import clout from "../assets/web_projects/clout.png";

const ProjectCard = ({
  title,
  description,
  techStack,
  imageUrl,
  deployUrl,
  repoUrl,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-xl hover:scale-105">
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
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
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
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
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
      title: "Eva Pro",
      description:
        "Mi sitio web personal donde muestro mis proyectos y habilidades",
      techStack: ["React", "Vite", "TailwindCSS", "Vercel"],
      deployUrl: "https://eva-pro-website.vercel.app",
      imageUrl: EvaPro,
    },
    {
      title: "Automate HQ",
      description:
        "Panel de control para visualizar datos de negocio con gráficos interactivos",
      techStack: ["React", "NextJS", "TailwindCSS", "Chart.js", "Vercel"],
      deployUrl: "https://automate-hq-website.vercel.app",
      imageUrl: automateHQ,
    },
    {
      title: "Ciom",
      description:
        "Aplicación para gestionar tareas diarias con funcionalidad de arrastrar y soltar",
      techStack: ["React", "TailwindCSS", "Vite", "DnD Kit", "Vercel"],
      deployUrl: "https://ciom-website-2.vercel.app",
      imageUrl: ciom,
    },
    {
      title: "Designo",
      description:
        "Aplicación para gestionar tareas diarias con funcionalidad de arrastrar y soltar",
      techStack: ["React", "TailwindCSS", "Vite", "DnD Kit", "Vercel"],
      deployUrl: "https://designo-website-seven.vercel.app",
      imageUrl: designo,
    },
    {
      title: "Clout",
      description:
        "Aplicación para gestionar tareas diarias con funcionalidad de arrastrar y soltar",
      techStack: ["React", "TailwindCSS", "Vite", "DnD Kit", "Vercel"],
      deployUrl: "https://clout-website.vercel.app",
      imageUrl: clout,
    },
  ];

  return (
    <section ref={ref} className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Mis Proyectos
          </div>
          <h2 className="text-3xl font-bold mb-4">Proyectos Recientes</h2>
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

import React from "react";
import {
  Globe,
  Code,
  Laptop,
  Database,
  Settings,
  Layout,
  Smartphone,
  Gauge,
  CheckCircle,
} from "lucide-react";

const TechnologyCard = ({ icon: Icon, name }) => (
  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <Icon className="text-blue-600" size={20} />
    </div>
    <span className="font-medium">{name}</span>
  </div>
);

const ServiceFeature = ({ icon: Icon, title, description }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <Icon className="text-blue-600" size={24} />
    </div>
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const ProjectCard = ({ title, description, techStack, imageUrl }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="h-48 bg-gray-200">
      {/* Aquí iría la imagen del proyecto */}
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Layout size={48} className="text-gray-400" />
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const WebDevelopmentPage = () => {
  const technologies = [
    { icon: Code, name: "React.js" },
    { icon: Layout, name: "Next.js" },
    { icon: Globe, name: "WordPress" },
    { icon: Database, name: "Node.js" },
    { icon: Settings, name: "TypeScript" },
    { icon: Smartphone, name: "React Native" },
  ];

  const projects = [
    {
      title: "E-commerce Moderno",
      description:
        "Tienda en línea completa con catálogo de productos y pasarela de pagos",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Aplicación Web Empresarial",
      description: "Sistema de gestión interno para empresa de logística",
      techStack: ["Next.js", "TypeScript", "PostgreSQL"],
    },
    {
      title: "Sitio Web Corporativo",
      description: "Página web responsiva con CMS personalizado",
      techStack: ["WordPress", "PHP", "MySQL"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Desarrollo Web Profesional
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creamos soluciones web modernas y escalables utilizando las
              últimas tecnologías
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ServiceFeature
              icon={Globe}
              title="Sitios Web Corporativos"
              description="Diseñamos y desarrollamos sitios web profesionales que representan la identidad de tu marca."
            />
            <ServiceFeature
              icon={Code}
              title="Aplicaciones Web"
              description="Creamos aplicaciones web personalizadas y escalables para tu negocio."
            />
            <ServiceFeature
              icon={Smartphone}
              title="Diseño Responsivo"
              description="Todos nuestros desarrollos se adaptan perfectamente a cualquier dispositivo."
            />
            <ServiceFeature
              icon={Gauge}
              title="Optimización y Rendimiento"
              description="Aseguramos que tu sitio web cargue rápidamente y funcione de manera eficiente."
            />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tecnologías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <TechnologyCard key={index} {...tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Proyectos Destacados
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestro Proceso
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">1. Planificación</h3>
              <p className="text-gray-600">
                Definimos los objetivos y requerimientos del proyecto
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layout className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">2. Diseño</h3>
              <p className="text-gray-600">
                Creamos la arquitectura y diseño de la solución
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">3. Desarrollo</h3>
              <p className="text-gray-600">
                Implementamos la solución con código limpio y eficiente
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gauge className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold mb-2">4. Lanzamiento</h3>
              <p className="text-gray-600">
                Desplegamos y optimizamos tu proyecto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="text-gray-600 mb-8">
            Contáctanos para discutir tus necesidades y obtener una cotización
            personalizada
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Solicitar Presupuesto
          </button>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentPage;

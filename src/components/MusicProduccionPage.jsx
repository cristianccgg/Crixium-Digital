import React, { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  Music,
  Mic2,
  Radio,
  Waves,
  ChevronRight,
  Clock,
  Award,
  Headphones,
} from "lucide-react";

const AudioPlayer = ({ title, category, duration, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Music className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="text-sm text-gray-500">{category}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="flex-1">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500">1:23</span>
            <span className="text-sm text-gray-500">{duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 size={18} className="text-gray-500" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, features }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <Icon className="text-blue-600" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-sm text-gray-600">
          <ChevronRight size={16} className="text-blue-600 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-colors">
      Solicitar Presupuesto
    </button>
  </div>
);

const ProcessStep = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <Icon className="text-blue-600" size={24} />
    </div>
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const MusicProductionPage = () => {
  const portfolioItems = [
    {
      title: "Jingle Comercial - Empresa XYZ",
      category: "Jingle Publicitario",
      duration: "0:30",
      audioUrl: "/path/to/audio1.mp3",
    },
    {
      title: "Música Corporativa - ABC Corp",
      category: "Música Corporativa",
      duration: "1:00",
      audioUrl: "/path/to/audio2.mp3",
    },
    {
      title: "Spot de Radio - Cliente DEF",
      category: "Spot Publicitario",
      duration: "0:20",
      audioUrl: "/path/to/audio3.mp3",
    },
  ];

  const services = [
    {
      icon: Mic2,
      title: "Jingles Publicitarios",
      description: "Música memorable para tu marca",
      features: [
        "Jingles originales",
        "Adaptaciones de canciones",
        "Diferentes duraciones",
        "Incluye derechos comerciales",
      ],
    },
    {
      icon: Radio,
      title: "Spots de Radio",
      description: "Producción completa para radio",
      features: [
        "Guión creativo",
        "Locución profesional",
        "Música original",
        "Efectos sonoros",
      ],
    },
    {
      icon: Waves,
      title: "Música Corporativa",
      description: "Identidad sonora para empresas",
      features: [
        "Música para videos",
        "Audio branding",
        "Música para eventos",
        "Sonido ambiental",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Producción Musical Profesional
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creamos la identidad sonora perfecta para tu marca con música
              original y producción de alta calidad
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
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trabajos Recientes
          </h2>
          <div className="grid gap-6">
            {portfolioItems.map((item, index) => (
              <AudioPlayer key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestro Proceso
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep
              icon={Headphones}
              title="1. Briefing"
              description="Entendemos tu visión y objetivos para crear el concepto perfecto"
            />
            <ProcessStep
              icon={Music}
              title="2. Composición"
              description="Creamos la música original que mejor represente tu marca"
            />
            <ProcessStep
              icon={Waves}
              title="3. Producción"
              description="Producimos y mezclamos hasta lograr un sonido profesional"
            />
            <ProcessStep
              icon={Award}
              title="4. Entrega"
              description="Entregamos los archivos finales en los formatos necesarios"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para dar sonido a tu marca?
          </h2>
          <p className="text-gray-600 mb-8">
            Contáctanos para discutir tu proyecto y recibir un presupuesto
            personalizado
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Solicitar Presupuesto
          </button>
        </div>
      </section>
    </div>
  );
};

export default MusicProductionPage;

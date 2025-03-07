import React from "react";
import { motion } from "framer-motion";
import { Globe, Zap, Target } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      className="group relative p-6 bg-white rounded-xl shadow-lg overflow-hidden border border-transparent hover:border-purple-200"
    >
      <motion.div
        className={`absolute -top-6 -right-6 w-20 h-20 ${color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        initial={{ scale: 0 }}
        whileHover={{ scale: 1.2 }}
      ></motion.div>

      <div className="relative z-10 flex flex-col items-start">
        <motion.div
          className={`mb-4 p-3 ${color} bg-opacity-20 rounded-full`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {Icon ? (
            <Icon className={`w-8 h-8 ${color.replace("bg-", "text-")}`} />
          ) : null}
        </motion.div>

        <motion.h3
          className="text-xl font-bold mb-3 text-gray-800"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-gray-600 mb-4"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const WhyToChoose = () => {
  const features = [
    {
      icon: Globe,
      title: "Soluciones Integrales",
      description:
        "Desarrollo web y producción musical bajo un mismo techo, garantizando coherencia en todos los puntos de contacto con tu audiencia.",
      color: "bg-blue-100",
    },
    {
      icon: Zap,
      title: "Enfoque Creativo",
      description:
        "Combinamos la última tecnología con un enfoque creativo original para resultados que destacan en el mercado.",
      color: "bg-purple-100",
    },
    {
      icon: Target,
      title: "Atención Personalizada",
      description:
        "Cada proyecto es único y recibe nuestra dedicación completa, con comunicación constante y resultados a medida.",
      color: "bg-green-100",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="py-20 px-4 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre cómo transformamos ideas en experiencias digitales y
            sonoras únicas.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-30"></div>
      <div className="absolute top-10 -left-10 w-32 h-32 bg-purple-100 rounded-full opacity-40"></div>
    </motion.section>
  );
};

export default WhyToChoose;

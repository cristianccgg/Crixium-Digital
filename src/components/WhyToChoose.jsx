import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Target, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const FeatureCard = ({
  icon,
  title,
  description,
  color,
  colorClass,
  index,
}) => {
  // Renderizar explícitamente según el tipo de icono
  const renderIcon = () => {
    if (icon === TrendingUp) return <TrendingUp className={`w-8 h-8 ${colorClass}`} />;
    if (icon === Zap) return <Zap className={`w-8 h-8 ${colorClass}`} />;
    if (icon === Target) return <Target className={`w-8 h-8 ${colorClass}`} />;
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        delay: index * 0.1,
      }}
      viewport={{ once: true }}
      className="group relative p-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-transparent hover:border-purple-200 flex flex-col h-full"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Fondo decorativo con gradiente */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-in-out bg-gradient-to-br ${
          color === "bg-blue-100"
            ? "from-blue-300 to-indigo-500"
            : color === "bg-purple-100"
            ? "from-purple-300 to-pink-500"
            : "from-green-300 to-teal-500"
        }`}
      />

      {/* Círculo decorativo */}
      <motion.div
        className={`absolute -top-6 -right-6 w-32 h-32 ${color} rounded-full opacity-20 group-hover:opacity-40 transition-all duration-700`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1, rotate: -15 }}
        whileHover={{ scale: 1.3, rotate: 0 }}
      />

      {/* Pequeños círculos decorativos */}
      <motion.div
        className={`absolute bottom-4 left-4 w-8 h-8 ${color} rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700`}
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        whileHover={{ y: -5 }}
      />

      <motion.div
        className={`absolute bottom-12 left-12 w-4 h-4 ${color} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ delay: 0.1 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icono */}
        <motion.div
          className={`mb-6 p-4 ${color} rounded-2xl bg-opacity-30 w-fit`}
          whileHover={{
            rotate: 360,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          {renderIcon()}
        </motion.div>

        {/* Título */}
        <motion.h3
          className="text-2xl font-bold mb-4 text-gray-800"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>

        {/* Descripción */}
        <motion.p
          className="text-gray-600 mb-6 flex-grow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const WhyToChoose = () => {
  const { t } = useTranslation("whytochoose");
  const features = [
    {
      icon: TrendingUp,
      title: t("soluciones"),
      description: t("soluciones-description"),
      color: "bg-blue-100",
      colorClass: "text-blue-500",
    },
    {
      icon: Zap,
      title: t("enfoque"),
      description: t("enfoque-description"),
      color: "bg-purple-100",
      colorClass: "text-purple-500",
    },
    {
      icon: Target,
      title: t("atencion"),
      description: t("atencion-description"),
      color: "bg-green-100",
      colorClass: "text-green-500",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="py-24 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Elementos decorativos del fondo */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-16 -left-16 w-48 h-48 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-100 rounded-full opacity-10 blur-md"></div>

      {/* Elementos de diseño en malla */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("description")}
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
              colorClass={feature.colorClass}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyToChoose;

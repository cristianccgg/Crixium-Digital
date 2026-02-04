import React from "react";
import { motion } from "framer-motion";
import { Globe, RefreshCw, Compass, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const WHATSAPP_NUMBER = "573219746045";

const ProblemSolutionCard = ({ icon: Icon, problem, solution, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-5">
        <Icon size={24} className="text-purple-700" />
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-3">{problem}</h3>

      <div className="w-8 h-0.5 bg-coral-400 mb-3"></div>

      <p className="text-gray-600 leading-relaxed">{solution}</p>
    </motion.div>
  );
};

const ProblemSolution = () => {
  const { t, i18n } = useTranslation("problem-solution");

  const whatsappMessage = encodeURIComponent(
    i18n.language === "en"
      ? "Hi, I'd like to discuss a web project. Can you help me?"
      : "Hola, me gustaría hablar sobre un proyecto web. ¿Pueden ayudarme?"
  );

  const problems = [
    {
      icon: Globe,
      problem: t("problems.first.problem"),
      solution: t("problems.first.solution"),
    },
    {
      icon: RefreshCw,
      problem: t("problems.second.problem"),
      solution: t("problems.second.solution"),
    },
    {
      icon: Compass,
      problem: t("problems.third.problem"),
      solution: t("problems.third.solution"),
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((item, index) => (
            <ProblemSolutionCard key={index} {...item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-purple-700 text-white px-8 py-4 rounded-lg hover:bg-purple-800 transition-all duration-300 font-medium shadow-lg"
          >
            <span>{t("cta")}</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;

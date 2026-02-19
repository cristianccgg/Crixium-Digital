import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Clock, Eye, Palette, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { buildWhatsAppUrl, trackWhatsAppClick } from "../../utils/whatsapp";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.55 + i * 0.1, ease: "easeOut" },
  }),
};

const EnhancedHeroSection = () => {
  const { t, i18n } = useTranslation("hero");

  const whatsappMessage =
    i18n.language === "en"
      ? "Hi, I'm interested in getting a quote for a web development project."
      : "Hola, me interesa una cotización para un proyecto de desarrollo web.";

  const features = [
    { icon: Clock, key: "first" },
    { icon: Eye, key: "second" },
    { icon: Palette, key: "third" },
  ];

  return (
    <section className="relative sm:min-h-[70vh] min-h-screen flex items-center xl:py-16 py-20 px-4 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-12 h-12 border border-white/20 rounded-lg rotate-12 opacity-60" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/3"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-8 h-8 border border-white/20 rounded-full opacity-60" />
        </motion.div>

        {/* Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: `${(i % 3) * 2 + 3}px`,
              height: `${(i % 3) * 2 + 3}px`,
              top: `${10 + i * 11}%`,
              left: `${5 + i * 12}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="flex w-fit items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6"
            >
              <Sparkles size={16} className="text-coral-400" />
              <span>{t("badge")}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {t("title.part1")}
              <span className="relative inline-block text-coral-400">
                {t("title.highlight1")}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5.5 C50,0.5 150,0.5 200,5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
              {t("title.and")}
              <span className="relative inline-block text-coral-400">
                {t("title.highlight2")}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5.5 C50,0.5 150,0.5 200,5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-8 text-purple-100 max-w-lg"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero", "web")}
                className="group bg-coral-500 text-white px-8 py-4 rounded-lg hover:bg-coral-600 transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -8px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{t("buttons.primary")}</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.a>

              <motion.a
                href="#proyectos"
                className="group bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2 font-medium backdrop-blur-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{t("buttons.secondary")}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Key benefits card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center justify-center relative"
          >
            <div className="absolute w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />

            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-sm border border-white/20"
              whileHover={{ y: -4, boxShadow: "0 32px 64px -16px rgba(0,0,0,0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">
                {i18n.language === "en" ? "Why choose us?" : "¿Por qué elegirnos?"}
              </h3>

              <div className="space-y-5">
                {features.map(({ icon: Icon, key }, i) => (
                  <motion.div
                    key={key}
                    className="flex items-start gap-4"
                    custom={i}
                    variants={featureItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-coral-400/20 flex items-center justify-center">
                      <Icon size={20} className="text-coral-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{t(`heroFeatures.${key}`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-6 pt-6 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-sm text-purple-100">
                    {i18n.language === "en"
                      ? "600+ satisfied clients worldwide"
                      : "600+ clientes satisfechos en todo el mundo"}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;

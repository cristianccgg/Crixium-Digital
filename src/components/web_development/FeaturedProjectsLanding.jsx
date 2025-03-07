import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Globe, Music2, ArrowRight, Play, Pause } from "lucide-react";
import { useTranslation } from "react-i18next";
import hoodlabImage from "../../assets/web_projects/hoodlab.png";
import jingleAudio from "../../assets/jingles/AI_United_English.wav";
import promovideo from "../../assets/jingles/jinglepromo.MP4";
import fiverr from "../../assets/users_pictures/fiverr.webp";
import audioimg from "../../assets/users_pictures/audioimg.jpg";

const FeaturedProject = ({ title, description, media, type, isEven, tags }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // Determinar la ruta según el tipo de proyecto
  const getProjectRoute = () => {
    switch (type) {
      case "web":
        return "web-development";
      case "music":
      case "video":
        return "music-production";
      default:
        return "web-development";
    }
  };

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref]);

  // Manejar eventos de reproducción para actualizar estados
  useEffect(() => {
    if (type === "music" && audioRef.current) {
      const audio = audioRef.current;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      };
    }

    if (type === "video" && videoRef.current) {
      const video = videoRef.current;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, [type]);

  // Reproducir/pausar audio
  const toggleAudio = () => {
    setError(null);

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Mostrar debug
      console.log("Intentando reproducir audio:", media.audio);

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio reproduciendo correctamente");
          })
          .catch((err) => {
            console.error("Error reproduciendo audio:", err);
            setError(
              `Error: ${err.message || "No se pudo reproducir el audio"}`
            );
          });
      }
    }
  };

  // Reproducir/pausar video
  const toggleVideo = () => {
    setError(null);

    if (!videoRef.current) return;

    // Siempre mostrar controles nativos
    videoRef.current.controls = true;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      // Mostrar debug
      console.log("Intentando reproducir video:", media.videoUrl);

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video reproduciendo correctamente");
          })
          .catch((err) => {
            console.error("Error reproduciendo video:", err);
            setError(
              `Error: ${err.message || "No se pudo reproducir el video"}`
            );
          });
      }
    }
  };

  // Manejar errores de medios
  const handleMediaError = (e) => {
    console.error("Error de reproducción:", e);
    setIsPlaying(false);

    // Mostrar mensaje de error más descriptivo
    let errorMsg = "Error al cargar el medio.";
    if (e?.target?.error) {
      switch (e.target.error.code) {
        case 1:
          errorMsg = "Operación abortada.";
          break;
        case 2:
          errorMsg = "Error de red o medio no encontrado.";
          break;
        case 3:
          errorMsg = "Formato no soportado.";
          break;
        case 4:
          errorMsg = "Contenido protegido.";
          break;
        default:
          errorMsg = `Error ${e.target.error.code}: No se pudo cargar el medio.`;
      }
    }

    setError(errorMsg);
  };

  // Limpiar reproducción al desmontar
  useEffect(() => {
    return () => {
      if (type === "music" && audioRef.current) {
        audioRef.current.pause();
      } else if (type === "video" && videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [type]);

  return (
    <div
      ref={setRef}
      className={`flex flex-col md:flex-row items-center gap-8 py-16 transition-all duration-1000 ${
        isEven ? "md:flex-row-reverse" : ""
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Project media (image, audio, or video) */}
      <div className="w-full md:w-1/2 relative">
        <div className="relative overflow-hidden rounded-xl shadow-xl group">
          {/* Display appropriate media based on type */}
          {type === "web" && (
            <div className="aspect-video w-full overflow-hidden group-hover:scale-105 transition-all duration-700">
              {media.image ? (
                <img
                  src={media.image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-100 w-full h-full">
                  <Globe size={64} className="text-purple-500 opacity-40" />
                </div>
              )}

              {/* View project overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
                  <a
                    href="https://thehoodlab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-white text-purple-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-coral-400 transition-all duration-300">
                      Ver pagina web
                      <ArrowRight size={16} />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}

          {type === "music" && (
            <div className="aspect-video w-full relative overflow-hidden group-hover:scale-105 transition-all duration-700 bg-gradient-to-br from-purple-300 to-purple-100">
              {/* Fondo decorativo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={audioimg} alt="audio-img" />
              </div>

              {/* Audio player */}
              <audio
                ref={audioRef}
                src={media.audio}
                onError={handleMediaError}
                preload="auto"
                className="hidden"
              />

              {/* Play/Pause button */}
              <button
                onClick={toggleAudio}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-20"
              >
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                  {isPlaying ? (
                    <Pause size={28} className="text-purple-700" />
                  ) : (
                    <Play size={28} className="text-purple-700 ml-1" />
                  )}
                </div>
              </button>

              {/* Indicador de estado */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                {isPlaying && (
                  <div className="bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-purple-700">
                    Reproduciendo...
                  </div>
                )}
              </div>
            </div>
          )}

          {type === "video" && (
            <div className="aspect-video w-full overflow-hidden relative">
              {/* Video con controles nativos siempre visibles */}
              <video
                ref={videoRef}
                src={media.videoUrl}
                poster={media.poster}
                onError={handleMediaError}
                className="w-full h-full object-contain"
                playsInline
                preload="auto"
                controls
              />

              {/* Overlay de reproducción - solo visible cuando el video no está reproduciéndose */}
              {!isPlaying && (
                <button
                  onClick={toggleVideo}
                  className="absolute inset-0 w-full h-full flex items-center justify-center z-20 bg-black/30"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                    <Play size={28} className="text-purple-700 ml-1" />
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Error message if present */}
          {error && (
            <div className="absolute bottom-4 left-0 right-0 bg-red-500/80 text-white text-center py-2 text-sm mx-4 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Badge */}
        <div className="absolute -top-3 -left-3 px-4 py-2 bg-purple-700 text-white rounded-lg shadow-lg z-20">
          {type === "web"
            ? "Desarrollo Web"
            : type === "music"
            ? "Producción Musical"
            : "Video Promocional"}
        </div>
      </div>

      {/* Project details */}
      <div className="w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
        </div>

        <Link
          to={getProjectRoute()}
          className="text-purple-700 flex items-center gap-2 font-medium hover:text-purple-900 transition-colors"
        >
          Ver más proyectos
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

const FeaturedProjectsLanding = () => {
  const { t } = useTranslation("projects");

  console.log("Traducción de proyectos:", t("ourWork"));

  return (
    <section className="py-20 px-4 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-8 border-purple-200 opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border-8 border-purple-200 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            {t("ourWork")}
          </div>
          <h2 className="text-4xl font-bold mb-4">{t("featuredProjects")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("featuredProjectsDescription")}
          </p>
        </div>

        {/* Projects list */}
        <div className="space-y-24">
          <FeaturedProject
            title={t("hoodlabTitle")}
            description={t("hoodlabDescription")}
            media={{
              image: hoodlabImage,
            }}
            type="web"
            isEven={false}
            tags={["WordPress", "WooCommerce", "Custom CSS", "Responsive"]}
          />

          <FeaturedProject
            title={t("jingleTitle")}
            description={t("jingleDescription")}
            media={{
              audio: jingleAudio,
            }}
            type="music"
            isEven={true}
            tags={["Jingle", "Audio Branding", "Producción"]}
          />

          <FeaturedProject
            title={t("videoTitle")}
            description={t("videoDescription")}
            media={{
              videoUrl: promovideo,
              poster: fiverr,
            }}
            type="video"
            isEven={false}
            tags={["Producción Audiovisual", "Promoción", "Identidad de Marca"]}
          />
        </div>

        {/* View all projects button */}
        <div className="flex justify-center mt-16">
          <Link
            to="web-development"
            className="group bg-purple-700 text-white px-8 py-4 rounded-lg hover:bg-purple-800 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg"
          >
            {t("viewAllProjects")}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsLanding;

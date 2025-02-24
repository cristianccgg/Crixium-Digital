import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Music,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Mic,
  Radio,
  Headphones,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import FoodinMaster from "../assets/jingles/FoodinMaster.wav";
import AI_United_Spanish from "../assets/jingles/AI_United_Spanish.wav";
import AI_United_English from "../assets/jingles/AI_United_English.wav";
import Virtual_Couch from "../assets/jingles/Virtual_Couch.wav";
import Alexis_Vee from "../assets/jingles/Alexis_Vee.wav";
import Andy_Jackson from "../assets/jingles/Andy_Jackson.wav";
import Aussie_Forklifts from "../assets/jingles/Aussie_Forklifts.wav";
import BOs_Smokey from "../assets/jingles/BOs_Smokey.wav";
import Busillis from "../assets/jingles/Busillis.wav";
import Agua_de_La_Villa from "../assets/jingles/Agua_de_La_Villa.wav";
import Cardio_Flex from "../assets/jingles/Cardio_Flex.wav";
import El_Abogado_de_la_Ley from "../assets/jingles/El_Abogado_de_la_Ley.wav";
import DJ_Dis_Moi_Oui from "../assets/jingles/DJ_Dis_Moi_Oui.wav";
import Evan_Radio from "../assets/jingles/Evan_Radio.wav";
import La_Torre_Law_Firm_Master from "../assets/jingles/La_Torre_Law_Firm_Master.wav";
import Matts_Total_Tree_Care_Master from "../assets/jingles/Matts_Total_Tree_Care_Master.wav";
import Mental_Health_Minute from "../assets/jingles/Mental_Health_Minute.wav";
import Podcast_Intro from "../assets/jingles/Podcast_Intro.wav";
import Radio_Insular from "../assets/jingles/Radio_Insular.wav";
import Radio_Sin_Fronteras from "../assets/jingles/Radio_Sin_Fronteras.wav";
import Serious_Beef from "../assets/jingles/Serious_Beef.wav";
import Superculiar_Creature_Features_Master from "../assets/jingles/Superculiar_Creature_Features_Master.wav";
import Wiz from "../assets/jingles/Wiz.wav";
import Wordpress_Roulette from "../assets/jingles/Wordpress_Roulette.wav";

const AudioPlayer = ({ title, category, audioUrl, voiceType, language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [hovering, setHovering] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const handleProgressChange = (e) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = audioDuration
    ? (currentTime / audioDuration) * 100
    : 0;

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`bg-white rounded-xl border border-gray-100 p-5 flex flex-col h-full transition-all duration-300 ${
        hovering ? "shadow-xl transform scale-[1.02]" : "shadow-md"
      }`}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 transition-colors duration-300">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <span
            className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
              category === "Jingles"
                ? "bg-blue-100 text-blue-700"
                : category === "Locuciones"
                ? "bg-purple-100 text-purple-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {category}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
            {voiceType}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              language === "Español"
                ? "bg-red-100 text-red-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {language}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={togglePlay}
            className={`p-3 rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-blue-600 text-white"
                : hovering
                ? "bg-blue-500 text-white scale-110"
                : "bg-blue-100 text-blue-600"
            } hover:bg-blue-600 hover:text-white hover:scale-110 transform`}
          >
            {isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-0.5" />
            )}
          </button>

          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={audioDuration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
              style={{
                background: `linear-gradient(to right, #2563eb ${progressPercentage}%, #e5e7eb ${progressPercentage}%)`,
              }}
            />
          </div>

          <div className="relative">
            <button
              onMouseEnter={() => setShowVolumeControl(true)}
              onMouseLeave={() => setShowVolumeControl(false)}
              className="p-2 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Volume2
                size={18}
                className={`${
                  hovering ? "text-blue-600" : "text-gray-500"
                } transition-colors duration-300`}
              />
            </button>
            {showVolumeControl && (
              <div
                className="absolute bottom-full right-0 mb-2 p-2 bg-white shadow-lg rounded-lg border border-gray-100"
                onMouseEnter={() => setShowVolumeControl(true)}
                onMouseLeave={() => setShowVolumeControl(false)}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-2"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(audioDuration)}</span>
        </div>
      </div>
    </div>
  );
};

const CategoryButton = ({ label, iconComponent, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 transform ${
      isActive
        ? "bg-blue-600 text-white shadow-md scale-105"
        : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 shadow-sm"
    }`}
  >
    {iconComponent}
    <span className="mt-2 font-medium text-sm">{label}</span>
  </button>
);

const FilterItem = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm transform scale-105"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {label}
  </button>
);

const AudioPortfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVoiceTypes, setSelectedVoiceTypes] = useState(new Set());
  const [selectedLanguages, setSelectedLanguages] = useState(new Set());
  const [visibleItems, setVisibleItems] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const defaultVisibleItems = 3;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const portfolioItems = [
    {
      title: "Jingles - Foodin",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "Español",
      duration: "0:10",
      audioUrl: FoodinMaster,
    },
    {
      title: "Jingles - AI United Insurance (English)",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "1:00",
      audioUrl: AI_United_English,
    },
    {
      title: "Jingles - AI United Insurance (Spanish)",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "Español",
      duration: "0:20",
      audioUrl: AI_United_Spanish,
    },
    {
      title: "Podcast Intro - The Virtual Couch",
      category: "Podcast/YouTube Intro",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: Virtual_Couch,
    },
    {
      title: "Youtube Intro - Alexis Vee Book Reviews",
      category: "Podcast/YouTube Intro",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: Alexis_Vee,
    },
    {
      title: "Jingles - Andy Jackson",
      category: "Podcast/YouTube Intro",
      voiceType: "Acapella",
      language: "English",
      duration: "0:20",
      audioUrl: Andy_Jackson,
    },
    {
      title: "Jingles - Aussie Forklifts",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: Aussie_Forklifts,
    },
    {
      title: "Jingles - BO's Smokey",
      category: "Jingles",
      voiceType: "Acapella",
      language: "English",
      duration: "0:20",
      audioUrl: BOs_Smokey,
    },
    {
      title: "Jingles - Busillis",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: Busillis,
    },
    {
      title: "Jingles - Agua de La Villa",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "Español",
      duration: "0:20",
      audioUrl: Agua_de_La_Villa,
    },
    {
      title: "Jingles - Cardio Flex",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: Cardio_Flex,
    },
    {
      title: "Jingles - El Abogado de la Ley",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "Español",
      duration: "0:20",
      audioUrl: El_Abogado_de_la_Ley,
    },
    {
      title: "Locuciones - DJ Dis Moi Oui",
      category: "Locuciones",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: DJ_Dis_Moi_Oui,
    },
    {
      title: "Jingles - Evan Radio",
      category: "Jingles",
      voiceType: "Acapella",
      language: "Español",
      duration: "0:20",
      audioUrl: Evan_Radio,
    },
    {
      title: "Jingles - La Torre Law Firm",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "Español",
      duration: "0:20",
      audioUrl: La_Torre_Law_Firm_Master,
    },
    {
      title: "Jingles - Matt's Total Tree Care",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: Matts_Total_Tree_Care_Master,
    },
    {
      title: "Mental Health Minute",
      category: "Jingles",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: Mental_Health_Minute,
    },
    {
      title: "Podcast Intro (Instrumental)",
      category: "Podcast/YouTube Intro",
      voiceType: "Voz Masculina",
      language: "English",
      duration: "0:20",
      audioUrl: Podcast_Intro,
    },
    {
      title: "Radio Insular",
      category: "Jingles",
      voiceType: "Acapella",
      language: "Español",
      duration: "0:20",
      audioUrl: Radio_Insular,
    },
    {
      title: "Radio Sin Fronteras",
      category: "Jingles",
      voiceType: "Acapella",
      language: "Español",
      duration: "0:20",
      audioUrl: Radio_Sin_Fronteras,
    },
    {
      title: "Serious Beef",
      category: "Jingles",
      voiceType: "Voz Femenina",
      language: "English",
      duration: "0:20",
      audioUrl: Serious_Beef,
    },
    {
      title: "Superculiar Creature Features",
      category: "Podcast/YouTube Intro",
      voiceType: "Acapella",
      language: "English",
      duration: "0:20",
      audioUrl: Superculiar_Creature_Features_Master,
    },
    {
      title: "Wiz Video World",
      category: "Jingles",
      voiceType: "Voz Femenina",
      language: "English",
      duration: "0:20",
      audioUrl: Wiz,
    },
    {
      title: "Wordpress Roulette",
      category: "Jingles",
      voiceType: "Voz Femenina",
      language: "English",
      duration: "0:20",
      audioUrl: Wordpress_Roulette,
    },
  ];

  const mainCategories = [
    {
      id: "Jingles",
      label: "Jingles",
      icon: (
        <Music
          className={`w-6 h-6 transition-colors duration-300 ${
            selectedCategory === "Jingles" ? "text-white" : "text-blue-600"
          }`}
        />
      ),
    },
    {
      id: "Locuciones",
      label: "Locuciones",
      icon: (
        <Mic
          className={`w-6 h-6 transition-colors duration-300 ${
            selectedCategory === "Locuciones" ? "text-white" : "text-blue-600"
          }`}
        />
      ),
    },
    {
      id: "Podcast/YouTube Intro",
      label: "Intros",
      icon: (
        <Radio
          className={`w-6 h-6 transition-colors duration-300 ${
            selectedCategory === "Podcast/YouTube Intro"
              ? "text-white"
              : "text-blue-600"
          }`}
        />
      ),
    },
  ];

  const voiceTypes = [...new Set(portfolioItems.map((item) => item.voiceType))];
  const languages = [...new Set(portfolioItems.map((item) => item.language))];

  const toggleVoiceType = (voiceType) => {
    const newVoiceTypes = new Set(selectedVoiceTypes);
    if (newVoiceTypes.has(voiceType)) {
      newVoiceTypes.delete(voiceType);
    } else {
      newVoiceTypes.add(voiceType);
    }
    setSelectedVoiceTypes(newVoiceTypes);
  };

  const toggleLanguage = (language) => {
    const newLanguages = new Set(selectedLanguages);
    if (newLanguages.has(language)) {
      newLanguages.delete(language);
    } else {
      newLanguages.add(language);
    }
    setSelectedLanguages(newLanguages);
  };

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory =
      !selectedCategory || selectedCategory === item.category;
    const matchesVoiceType =
      selectedVoiceTypes.size === 0 || selectedVoiceTypes.has(item.voiceType);
    const matchesLanguage =
      selectedLanguages.size === 0 || selectedLanguages.has(item.language);
    return matchesCategory && matchesVoiceType && matchesLanguage;
  });

  const clearFilters = () => {
    setSelectedVoiceTypes(new Set());
    setSelectedLanguages(new Set());
  };

  const resetAll = () => {
    setSelectedCategory(null);
    clearFilters();
  };

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasMoreItems = visibleItems < filteredItems.length;

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 3, filteredItems.length));
  };

  const showLess = () => {
    setVisibleItems(defaultVisibleItems);
    document
      .getElementById("audio-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getActiveFiltersCount = () => {
    return selectedVoiceTypes.size + selectedLanguages.size;
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 overflow-hidden relative">
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
      <div
        className="absolute bottom-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-12">
            <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <div className="flex items-center gap-2">
                <Headphones size={16} />
                <span>Nuestro Trabajo</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Portfolio de Audio</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explora nuestra colección de muestras de audio y descubre la
              calidad que ofrecemos en cada proyecto
            </p>
          </div>

          {/* Main Category Selector */}
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
              ¿Qué estás buscando?
            </h3>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {mainCategories.map((category) => (
                <CategoryButton
                  key={category.id}
                  label={category.label}
                  iconComponent={category.icon}
                  isActive={selectedCategory === category.id}
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    );
                    setVisibleItems(defaultVisibleItems);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Filter Section */}
          <div className="mb-8 bg-blue-50 rounded-xl p-5 border border-blue-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Filter size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Refina tu búsqueda
                  </h3>
                  <p className="text-sm text-gray-600">
                    Filtra por tipo de voz e idioma
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {(selectedCategory || getActiveFiltersCount() > 0) && (
                  <button
                    onClick={resetAll}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Limpiar todo
                  </button>
                )}

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${
                    showFilters
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-200"
                  } rounded-lg hover:bg-blue-700 hover:text-white font-medium`}
                >
                  {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
                  {getActiveFiltersCount() > 0 && (
                    <span
                      className={`${
                        showFilters
                          ? "bg-white text-blue-600"
                          : "bg-blue-600 text-white"
                      } text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold`}
                    >
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div
            className={`mb-8 rounded-lg transition-all duration-300 overflow-hidden ${
              showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Voice Types */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Mic size={16} className="mr-2 text-blue-600" />
                    Tipo de Voz
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {voiceTypes.map((voiceType) => (
                      <FilterItem
                        key={voiceType}
                        label={voiceType}
                        isActive={selectedVoiceTypes.has(voiceType)}
                        onClick={() => toggleVoiceType(voiceType)}
                      />
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <span className="mr-2 text-blue-600">🌐</span>
                    Idioma
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <FilterItem
                        key={language}
                        label={language}
                        isActive={selectedLanguages.has(language)}
                        onClick={() => toggleLanguage(language)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {getActiveFiltersCount() > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors px-3 py-1 bg-blue-50 rounded-lg"
                  >
                    <X size={14} />
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Counter */}
          <p className="text-center text-gray-600 mb-8">
            Mostrando {displayedItems.length} de {filteredItems.length} ejemplos
          </p>

          {/* Audio Players Grid */}
          <div
            id="audio-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedItems.map((item, index) => (
              <div
                key={index}
                className="transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AudioPlayer {...item} />
              </div>
            ))}
          </div>

          {/* Load More / Show Less Buttons */}
          {filteredItems.length > 0 && (
            <div className="flex justify-center mt-8 gap-4">
              {hasMoreItems && (
                <button
                  onClick={loadMore}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors transform hover:scale-105 duration-300"
                >
                  Cargar más <ChevronDown size={18} />
                </button>
              )}
              {visibleItems > defaultVisibleItems && (
                <button
                  onClick={showLess}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors transform hover:scale-105 duration-300"
                >
                  Mostrar menos <ChevronUp size={18} />
                </button>
              )}
            </div>
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Music
                className="mx-auto text-gray-400 mb-4 animate-pulse"
                size={48}
              />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-500 mb-4">
                Prueba con una combinación diferente de filtros
              </p>
              <button
                onClick={resetAll}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg mx-auto hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                <span>Restablecer filtros</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPortfolio;

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Music,
  ChevronDown,
  ChevronUp,
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
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header */}
      <div className="mb-3">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {category}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
            {voiceType}
          </span>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
            {language}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={togglePlay}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
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
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Volume2 size={18} className="text-gray-500" />
            </button>
            {showVolumeControl && (
              <div
                className="absolute bottom-full right-0 mb-2 p-2 bg-white shadow-lg rounded-lg"
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

const FilterButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
  >
    {label}
  </button>
);

const AudioPortfolio = () => {
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedVoiceTypes, setSelectedVoiceTypes] = useState(new Set());
  const [selectedLanguages, setSelectedLanguages] = useState(new Set());
  const [visibleItems, setVisibleItems] = useState(6);
  const defaultVisibleItems = 6;

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

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 6, filteredItems.length));
  };

  const showLess = () => {
    setVisibleItems(defaultVisibleItems);
    // Scroll back to the top of the grid
    document
      .getElementById("audio-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const categories = [...new Set(portfolioItems.map((item) => item.category))];
  const voiceTypes = [...new Set(portfolioItems.map((item) => item.voiceType))];
  const languages = [...new Set(portfolioItems.map((item) => item.language))];

  const toggleCategory = (category) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

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
      selectedCategories.size === 0 || selectedCategories.has(item.category);
    const matchesVoiceType =
      selectedVoiceTypes.size === 0 || selectedVoiceTypes.has(item.voiceType);
    const matchesLanguage =
      selectedLanguages.size === 0 || selectedLanguages.has(item.language);
    return matchesCategory && matchesVoiceType && matchesLanguage;
  });

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedVoiceTypes(new Set());
    setSelectedLanguages(new Set());
  };

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasMoreItems = visibleItems < filteredItems.length;
  const hasExpandedItems = visibleItems > defaultVisibleItems;

  return (
    <div className="bg-gray-50">
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-4xl font-bold text-center mb-8">
              Portfolio de Audio
            </h2>

            {/* Filters Section */}
            <div className="mb-8 space-y-6">
              <div className="flex flex-wrap justify-center gap-8">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-center">
                    Categorías
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <FilterButton
                        key={category}
                        label={category}
                        isActive={selectedCategories.has(category)}
                        onClick={() => toggleCategory(category)}
                      />
                    ))}
                  </div>
                </div>

                {/* Voice Types */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-center">
                    Tipo de Voz
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {voiceTypes.map((voiceType) => (
                      <FilterButton
                        key={voiceType}
                        label={voiceType}
                        isActive={selectedVoiceTypes.has(voiceType)}
                        onClick={() => toggleVoiceType(voiceType)}
                      />
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-center">
                    Idioma
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <FilterButton
                        key={language}
                        label={language}
                        isActive={selectedLanguages.has(language)}
                        onClick={() => toggleLanguage(language)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategories.size > 0 ||
                selectedVoiceTypes.size > 0 ||
                selectedLanguages.size > 0) && (
                <div className="flex justify-center">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>

            {/* Active Filters */}
            {(selectedCategories.size > 0 ||
              selectedVoiceTypes.size > 0 ||
              selectedLanguages.size > 0) && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Filtros activos:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    ...selectedCategories,
                    ...selectedVoiceTypes,
                    ...selectedLanguages,
                  ].map((filter) => (
                    <span
                      key={filter}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                    >
                      {filter}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results Counter */}
            <p className="text-center text-gray-600 mb-8">
              Mostrando {displayedItems.length} de {filteredItems.length}{" "}
              ejemplos
            </p>

            {/* Audio Players Grid */}
            <div
              id="audio-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedItems.map((item, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <AudioPlayer {...item} />
                </div>
              ))}
            </div>

            {/* Load More / Show Less Buttons */}
            <div className="flex justify-center mt-8 gap-4">
              {hasMoreItems && (
                <button
                  onClick={loadMore}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  Cargar más <ChevronDown size={18} />
                </button>
              )}
              {hasExpandedItems && (
                <button
                  onClick={showLess}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                >
                  Mostrar menos <ChevronUp size={18} />
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Music className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-500">
                  Prueba con una combinación diferente de filtros
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AudioPortfolio;

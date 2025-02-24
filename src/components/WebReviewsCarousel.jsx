import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Star,
  StarHalf,
  MessageCircle,
  Globe,
  Quote,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import images - asegúrate de que las rutas sean correctas
import emplaw from "../assets/users_pictures/emplaw.webp";
import laura from "../assets/users_pictures/laura.webp";
import masha from "../assets/users_pictures/masha.webp";
import q from "../assets/users_pictures/q.webp";

// Configuración responsive para el carrusel
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const ReviewCard = ({ review }) => {
  const [isHovering, setIsHovering] = useState(false);

  // Función para renderizar estrellas basado en el rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="text-yellow-400 fill-yellow-400"
          size={16}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="text-yellow-400 fill-yellow-400"
          size={16}
        />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="text-gray-300" size={16} />
      );
    }

    return stars;
  };

  // Función para truncar el texto del comentario si es muy largo
  const truncateText = (text, maxLength = 140) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="p-3 mb-8">
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-100 h-full transition-all duration-300"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Icono de comillas decorativo */}
        <div className="quote-icon absolute -top-3 -left-1 bg-blue-600 text-white p-1.5 rounded-full shadow-md">
          <Quote size={16} className="rotate-180" />
        </div>

        <div className="flex flex-col h-full">
          {/* Estrellas de calificación */}
          <div className="star-rating flex items-center gap-1 mb-4">
            {renderStars(review.rating)}
          </div>

          {/* Comentario del cliente */}
          <p className="text-gray-600 leading-relaxed italic mb-5 flex-grow text-sm md:text-base">
            "{truncateText(review.comment)}"
          </p>

          {/* Información del cliente */}
          <div className="flex items-center mt-auto">
            <div className="mr-3">
              {review.userImage ? (
                <div className="border-2 border-blue-100 w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                  <MessageCircle className="text-blue-600" size={20} />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{review.userName}</h3>
              <div className="flex items-center">
                <Globe size={12} className="text-gray-500 mr-1" />
                <span className="text-xs text-gray-500">{review.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingReviewsCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Observer para detectar cuando el carrusel está visible
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

  // Array de reviews
  const reviews = [
    {
      userName: "John W.",
      userImage: q,
      country: "Estados Unidos",
      rating: 5,
      comment:
        "We asked Christian to create a short jingle we could use for our social media videos. Christian hit the nail on the head- absolutely perfect piece. 10/10 would use again.",
      projectType: "Jingle",
    },
    {
      userName: "Tony O.",
      userImage: null,
      country: "Estados Unidos",
      rating: 5,
      comment:
        "Christian delivered an EXCELLENT jingle that showcased superb musicality, sound quality, and creativity. His deep understanding ensured the project was completed on time.",
      projectType: "Música Corporativa",
    },
    {
      userName: "Masha H.",
      userImage: masha,
      country: "Malasia",
      rating: 5,
      comment:
        "Great to work with and the attention to details were exceptional! He also made thorough research before executing the request. Would certainly recommended!",
      projectType: "Spot de Radio",
    },
    {
      userName: "Luis E.",
      userImage: emplaw,
      country: "México",
      rating: 5,
      comment:
        "Christian delivered top-tier work with incredible attention to detail and professionalism that EXCEEDED my expectations. Working together was a breeze!",
      projectType: "Audio Branding",
    },
  ];

  // Componentes personalizados para el carrusel
  const CustomDot = ({ onClick, active }) => {
    return (
      <button
        className={`
          mx-1 h-2 transition-all duration-300 rounded-full
          ${active ? "w-8 bg-blue-600" : "w-2 bg-gray-300 hover:bg-blue-300"}
        `}
        onClick={() => onClick()}
      />
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute right-0 -mr-4 bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-50 transition-all duration-300 z-10 flex items-center justify-center border border-gray-100 transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute left-0 -ml-4 bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-50 transition-all duration-300 z-10 flex items-center justify-center border border-gray-100 transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gray-50 relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div
        className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} className="text-yellow-500" />
            <span>Testimonios</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Clientes satisfechos que confían en nuestros servicios
          </p>
        </div>

        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          showDots={true}
          customDot={<CustomDot />}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style mt-6"
          itemClass="carousel-item-padding"
        >
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </Carousel>

        <div className="mt-12 text-center">
          <Link
            to="/music-production"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm group"
          >
            <span>Ver más testimonios</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingReviewsCarousel;

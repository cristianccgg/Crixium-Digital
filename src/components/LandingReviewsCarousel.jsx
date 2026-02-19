import { useState } from "react";
import { motion } from "framer-motion";
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
import { useTranslation } from "react-i18next";

// Import images - asegúrate de que las rutas sean correctas
import emplaw from "../assets/users_pictures/emplaw.webp";
import masha from "../assets/users_pictures/masha.webp";
import q from "../assets/users_pictures/q.webp";
import alison from "../assets/users_pictures/alison.webp";
import christina from "../assets/users_pictures/christina.webp";
import peter from "../assets/users_pictures/peter.webp";
import fernando from "../assets/users_pictures/fernando.webp";

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
    <div className="py-8 px-4 mb-8">
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-100 h-80 transition-all duration-300"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Icono de comillas decorativo */}
        <div className="quote-icon absolute -top-3 -left-1 bg-purple-700 text-white p-1.5 rounded-full shadow-md">
          <Quote size={16} className="rotate-180" />
        </div>

        <div className="flex flex-col h-full">
          {/* Estrellas de calificación */}
          <div className="star-rating flex items-center gap-1 mb-4">
            {renderStars(review.rating)}
          </div>

          {/* Tipo de proyecto */}
          <div className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <ArrowRight size={16} className="text-purple-700 font-semibold" />
            <span className="text-sm  text-purple-700 font-semibold">
              {review.projectType}
            </span>
          </div>

          {/* Comentario del cliente */}
          <p className="text-gray-600 leading-relaxed italic mb-5 flex-grow text-sm md:text-base">
            "{truncateText(review.comment)}"
          </p>

          {/* Información del cliente */}
          <div className="flex items-center mt-auto">
            <div className="mr-3">
              {review.userImage ? (
                <div className="border-2 border-purple-100 w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-sm">
                  <MessageCircle className="text-purple-700" size={20} />
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
  const { t } = useTranslation("reviews");

  const reviews = [
    {
      userName: "Allison Pitman",
      userImage: alison,
      country: "Estados Unidos",
      rating: 5,
      comment:
        "Crixium has outstanding web developers who truly EXCELS in their field! Their professionalism and code expertise not only exceeded expectations but also made the entire process a delight. Working with Crixium was a breeze, incredibly polite, fluent in communication, and consistently went above and beyond.",
      projectType: "Web Development",
    },
    {
      userName: "John W.",
      userImage: q,
      country: "Estados Unidos",
      rating: 5,
      comment:
        "We asked Crixium to create a short jingle we could use for our social media videos. They hit the nail on the head- absolutely perfect piece. 10/10 would use again.",
      projectType: "Jingle",
    },
    {
      userName: "Fernando Bravo",
      userImage: fernando,
      country: "Argentina",
      rating: 5,
      comment:
        "He tenido el placer de trabajar con Crixium y la experiencia ha sido excepcional. Cristian es un verdadero genio: no solo demuestra una responsabilidad admirable, sino que también se preocupa por cada detalle en su trabajo. Desde el inicio, su profesionalismo y compromiso se hicieron evidentes, facilitando una comunicación fluida y efectiva. Su feedback fue sorprendentemente rápido, y su disponibilidad 24/7 permitió resolver cualquier duda o ajuste en el acto. Además, la calidad de su trabajo superó todas mis expectativas, demostrando un dominio y creatividad que realmente marcan la diferencia. Recomiendo a Cris sin ninguna duda, ya que es la opción ideal para quienes buscan un servicio impecable y altamente confiable. ¡Una experiencia de principio a fin que vale la pena destacar! ",
      projectType: "Web Development",
    },

    {
      userName: "Tony O.",
      userImage: null,
      country: "Estados Unidos",
      rating: 5,
      comment:
        "Crixium delivered an EXCELLENT jingle that showcased superb musicality, sound quality, and creativity. His deep understanding ensured the project was completed on time.",
      projectType: "Música Corporativa",
    },
    {
      userName: "Peter Khalil",
      userImage: peter,
      country: "Estados Unidos",
      rating: 5,
      comment:
        "This team is AWESOME! His attention to detail and professionalism exceeded our expectations, making our site exactly how we envisioned. He delivered on time, was incredibly polite, and even went the extra mile to ensure everything was perfect. HIGHLY recommended for any web development needs! 👍",
      projectType: "Web Development",
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
      userName: "Christina Waynor",
      userImage: christina,
      country: "Noruega",
      rating: 5,
      comment:
        "Crixium excelled in both delivery quality and collaboration. His attention to detail and professionalism were outstanding, and his proactive communication and polite demeanor made working together seamless. Highly recommended for excellent service and cooperation!",
      projectType: "Web Development",
    },
    {
      userName: "Luis E.",
      userImage: emplaw,
      country: "México",
      rating: 5,
      comment:
        "Crixium delivered top-tier work with incredible attention to detail and professionalism that EXCEEDED my expectations. Working together was a breeze!",
      projectType: "Audio Branding",
    },
    {
      userName: "CIOM Argentina",
      userImage: null,
      country: "Argentina",
      rating: 5,
      comment:
        "Excelente trabajo han realizado. Muy responsables y comprometidos tanto con los tiempos de entrega como con la calidad del entregable. Presentan avances, comunicación fluida.",
      projectType: "Web Development",
    },
  ];

  // Componentes personalizados para el carrusel
  const CustomDot = ({ onClick, active }) => {
    return (
      <button
        className={`
          mx-1 h-2 transition-all duration-300 rounded-full
          ${
            active ? "w-8 bg-purple-700" : "w-2 bg-gray-300 hover:bg-purple-300"
          }
        `}
        onClick={() => onClick()}
      />
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="absolute right-5 -mr-4 bg-white text-purple-700 p-2 rounded-full shadow-md hover:bg-purple-50 transition-all duration-300 z-10 flex items-center justify-center border border-gray-100 transform hover:scale-110"
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
        className="absolute left-5 -ml-4 bg-white text-purple-700 p-2 rounded-full shadow-md hover:bg-purple-50 transition-all duration-300 z-10 flex items-center justify-center border border-gray-100 transform hover:scale-110"
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
    <section className="py-20 px-4 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-24 h-24 bg-purple-300 rounded-full opacity-20"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} className="text-coral-500" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </motion.div>

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
      </div>
    </section>
  );
};

export default LandingReviewsCarousel;

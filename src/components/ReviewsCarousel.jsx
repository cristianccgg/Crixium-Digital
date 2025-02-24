import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Star,
  StarHalf,
  MessageCircle,
  Globe,
  ChevronDown,
  ChevronUp,
  Quote,
  Sparkles,
} from "lucide-react";
import emplaw from "../assets/users_pictures/emplaw.webp";
import laura from "../assets/users_pictures/laura.webp";
import masha from "../assets/users_pictures/masha.webp";
import q from "../assets/users_pictures/q.webp";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

  return (
    <div className="p-3">
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`bg-white rounded-xl border border-gray-100 p-6 h-full transition-all duration-300 ${
          isExpanded ? "h-auto" : "h-72"
        } ${isHovering ? "shadow-xl transform scale-[1.02]" : "shadow-md"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-4">
            <div className="relative">
              {review.userImage ? (
                <div className="border-2 border-blue-100 w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm transition-all duration-300">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm">
                  <MessageCircle className="text-blue-600" size={28} />
                </div>
              )}
              <div className="absolute -top-2 -left-2 bg-blue-600 text-white p-1 rounded-full">
                <Quote size={14} className="rotate-180" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col items-start justify-between">
                <h3 className="font-semibold text-lg">{review.userName}</h3>
                <div className="flex items-center">
                  <Globe size={14} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">
                    {review.country}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-500 ml-2">
                  {review.date}
                </span>
              </div>
            </div>
          </div>

          {/* Project Badge */}
          <div className="mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              <Sparkles size={12} className="mr-1" />
              {review.projectDetails}
            </span>
          </div>

          <div className="mt-4 flex-1 relative">
            <div className={`${isExpanded ? "" : "h-28 overflow-hidden"}`}>
              <p className="text-gray-600 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-4 px-4 py-1.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-all w-full ${
              isExpanded
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            {isExpanded ? (
              <>
                Mostrar menos
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                Leer más
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewsCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const reviews = [
    {
      userName: "John Watkins",
      userImage: q,
      country: "United States",
      rating: 5,
      date: "Hace 3 semanas",
      comment:
        "We asked Christian to create a short jingle we could use for our tiktok and instagram short format social media videos. Christian hit the nail on the head- absolutely perfect piece. It's serious, yet a little silly which is exactly what we wanted. 10/10 would use again.",
      projectDetails: "Jingle Publicitario - 30 segundos",
    },
    {
      userName: "tonyoverbay",
      userImage: null,
      country: "United States",
      rating: 5,
      date: "Hace 1 semana",
      comment:
        "Christian G delivered an EXCELLENT jingle that showcased superb musicality, sound quality, and creativity. His deep understanding and proactive communication ensured the project was completed on time, making the whole experience delightful. I love it and can't wait to add it to my podcast—definitely returning for more! 🙌",
      projectDetails: "Música Corporativa para Video Institucional",
    },
    {
      userName: "masshahira",
      userImage: masha,
      country: "Malaysia",
      rating: 5,
      date: "Hace 2 semanas",
      comment:
        "Great to work with and the attention to details were exceptional! He also made thorough research before executing the request. Would certainly recommended to work with Christian, he will surely ace your request!",
      projectDetails: "Spot de Radio - 20 segundos",
    },
    {
      userName: "emplaw",
      userImage: emplaw,
      country: "México",
      rating: 5,
      date: "Hace 3 meses",
      comment:
        "Christian G delivered top-tier work with incredible attention to detail and professionalism that EXCEEDED my expectations. Working together was a breeze thanks to his language fluency and proactive communication. Highly responsive and a joy to collaborate with—truly EXCEPTIONAL! 👏",
      projectDetails: "Audio Branding Completo",
    },
  ];

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
      className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
      <div
        className="absolute bottom-10 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div
        className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <div className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Testimonios
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Más de 100 clientes satisfechos confían en nuestra producción
            musical profesional
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
          dotListClass="custom-dot-list-style mt-8"
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

export default ReviewsCarousel;

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Star,
  StarHalf,
  MessageCircle,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
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
    <div className="p-2">
      <div
        className={`bg-white rounded-xl shadow-md p-6 h-full transition-all duration-300 ${
          isExpanded ? "h-auto" : "h-72"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-4">
            <div className="relative">
              {review.userImage ? (
                <div className="border w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-full h-full "
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-blue-600" size={28} />
                </div>
              )}
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

          <div className="mt-4 flex-1 relative">
            <div className={`${isExpanded ? "" : "h-32 overflow-hidden"}`}>
              <p className="text-gray-600 leading-relaxed">{review.comment}</p>
            </div>

            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center gap-1 transition-colors w-full"
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
          ${active ? "w-6 bg-blue-600" : "w-2 bg-gray-300"}
        `}
        onClick={() => onClick()}
      />
    );
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
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
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="pb-12"
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

import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      title: "Connect with Study Partners",
      subtitle: "Find students who share your subjects and interests.",
      image:
        "https://cdn.pixabay.com/photo/2021/03/08/10/10/students-6078679_1280.jpg",
      ctaText: "Find Partners",
      ctaLink: "/find-partners",
    },
    {
      id: 2,
      title: "Collaborate for Better Learning",
      subtitle:
        "Create study groups, exchange ideas, and boost your learning outcomes.",
      image:
        "https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_1280.jpg",
      ctaText: "Create Profile",
      ctaLink: "/create-partner-profile",
    },
    {
      id: 3,
      title: "Track Your Progress",
      subtitle: "Stay organized, set goals, and achieve academic success.",
      image:
        "https://cdn.pixabay.com/photo/2018/11/13/18/04/books-3813612_640.jpg",
      ctaText: "View Connections",
      ctaLink: "/my-connections",
    },
  ];

  return (
    <div className="w-full mt-16 md:mt-1 relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden flex items-end justify-start text-left"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-xl">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 text-[#4A7BA8] drop-shadow-lg leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-xl mb-5 text-[#A88647] drop-shadow-md">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.ctaLink}
                  className="px-4 py-2 sm:px-6 sm:py-3 rounded-md text-white font-semibold hover:opacity-90 transition duration-300 shadow-lg"
                  style={{ backgroundColor: "#4A7BA8" }}
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;

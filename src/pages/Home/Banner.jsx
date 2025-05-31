import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/effect-cards";

import bannerImg1 from "../../assets/banner-image/1.jpg";
import bannerImg2 from "../../assets/banner-image/2.jpg";
import bannerImg3 from "../../assets/banner-image/3.jpeg";
import bannerImg4 from "../../assets/banner-image/4.jpeg";
import bannerImg5 from "../../assets/banner-image/5.png";
import bannerImg6 from "../../assets/banner-image/6.png";
import bannerImg7 from "../../assets/banner-image/7.jpg";
import bannerImg8 from "../../assets/banner-image/8.jpeg";
import bannerImg9 from "../../assets/banner-image/9.webp";
import bannerImg10 from "../../assets/banner-image/10.webp";

const images = [
  bannerImg1,
  bannerImg2,
  bannerImg3,
  bannerImg4,
  bannerImg5,
  bannerImg6,
  bannerImg7,
  bannerImg8,
  bannerImg9,
  bannerImg10,
];

const Banner = () => {
  return (
    <div className="relative max-w-screen-xl mx-auto py-6 px-4">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="rounded-xl overflow-hidden shadow-md mx-2"
          >
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="h-96 w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

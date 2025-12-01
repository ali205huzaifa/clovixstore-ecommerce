"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function ImageSwiper() {
  const images = [
    {
      src: "/images/img1.jpg",
      text: "20% Off Grab it Now",
    },
    {
      src: "/images/img2.jpg",
      text: "25% Off Grab it Now",
    },
    { src: "/images/img4.jpg", text: "Limited Stock Only" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-4 rounded-xl">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="pb-10 w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex justify-center items-center rounded-xl overflow-hidden">
              <img
                src={img.src}
                alt={img.text}
                className="max-w-full max-h-[500px] object-contain"
              />

              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <p className="text-primary text-4xl font-normal">{img.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

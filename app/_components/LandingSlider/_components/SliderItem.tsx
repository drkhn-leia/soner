"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import SliderCard from "./SliderCard";

const slides = [
  {
    title: "Dergi",
    title2: "Çözümleri",
    description:
      "Ürününüze özel ölçü ve tasarımda, düşük adetlerden kitlesel üretime ölçeklenebilir kutu basımı.",
    ctaText: "Portföyü Gör",
    imageSrc: "/slider/h1-slider4.png",
    imageAlt: "Kutu baskı",
  },

  {
    title: "Baskıda Hızlı",
    title2: "Teslim",
    description:
      "Kartvizitten kataloga; yüksek kalite, rekabetçi fiyat ve zamanında teslim. İhtiyacınıza uygun baskı çözümleri.",
    ctaText: "Teklif Al",
    imageSrc: "/slider/h1-slider6.png",
    imageAlt: "Baskı makinesi",
  },
];

export default function SliderItem() {
  return (
    <div className="w-full h-full">
      <section>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          /*pagination={{ clickable: true }}*/
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          breakpoints={{
            1024: { spaceBetween: 40 },
          }}
          className="pb-10"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={`slide-${i}`}>
              {({ isActive }) => (
                /**
                 * isActive her değiştiğinde child yeniden render/ remount olur.
                 * key’de isActive’i kullanarak Reveal animasyonlarını sıfırdan tetikliyoruz.
                 */
                <div className="py-8 w-full">
                  <SliderCard
                    key={`card-${i}-${isActive}`}
                    isActive={isActive}
                    {...s}
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

// @/app/_components/LandingSlider/_components/SliderItem.tsx
"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SliderCard from "./SliderCard";
import { useLanguage } from "@/lib/LanguageProvider";

type ApiSlide = {
  title1: string;
  title2: string;
  imageLink: string;
  subText: string;
  tips: string[];
  buttonLink: string;
};


export default function SliderItem() {
  const { lang } = useLanguage();             // ✅ Sizin provider’ınız
  const [slides, setSlides] = useState<ApiSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      const res = await fetch(`/api/carousel?lang=${lang}`, { cache: "no-store" });
      const data = await res.json();
      if (mounted) {
        setSlides(data.carousel ?? []);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [lang]); // ✅ dil değişince yeniden çek

  if (loading) return <div className="py-8">Yükleniyor…</div>;
  if (!slides.length) return <div className="py-8">İçerik bulunamadı.</div>;

  return (
    <section className="w-full h-full pb-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        breakpoints={{ 1024: { spaceBetween: 40 } }}
      >
        {slides.map((s, i) => {
          const mapped = {
            title: s.title1,
            title2: s.title2,
            description: s.subText,
            ctaText: lang === "tr" ? "Devamı" : "Learn more",
            imageSrc: s.imageLink,
            imageAlt: `${s.title1} ${s.title2}`,
            href: s.buttonLink,
          };
          return (
            <SwiperSlide key={`slide-${i}`}>
              {({ isActive }) => (
                <div className="py-8 w-full">
                  <SliderCard key={`card-${i}-${isActive}`} isActive={isActive} {...mapped} />
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

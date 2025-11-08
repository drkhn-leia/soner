"use client";

import useSWR from "swr";
import { FaPhone, FaEnvelope } from "react-icons/fa6";
import Dropdown from "./LanguageDropdown";
import { useLanguage } from "@/components/LanguageProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Settings = {
  phone: string | null;
  email: string | null;
  store_location_url: string | null;
};
type Banner = {
  lang_code: string;
  promo_text: string | null;
  promo_cta: string | null;
  promo_url: string | null;
};

const fetcher = async (key: string) => {
  // key format: "banner:<lang>"
  const [, lang] = key.split(":");
  const supabase = createSupabaseBrowserClient();

  // site_settings (dile bağlı değil) — 1 kez alıp cache’te tutacağız
  const settingsPromise = supabase
    .from("site_settings")
    .select("phone,email,store_location_url")
    .limit(1)
    .maybeSingle();

  // v_banner (dil bazlı)
  const bannerPromise = supabase
    .from("v_banner")
    .select("lang_code,promo_text,promo_cta,promo_url")
    .eq("lang_code", lang)
    .limit(1)
    .maybeSingle();

  const [{ data: s }, { data: b }] = await Promise.all([
    settingsPromise,
    bannerPromise,
  ]);

  return {
    settings: (s ?? {}) as Settings,
    banner: (b ?? {
      lang_code: lang,
      promo_text: null,
      promo_cta: null,
      promo_url: null,
    }) as Banner,
  };
};

export default function TopHorizontalBanner() {
  const { lang } = useLanguage();

  // SWR: keepPreviousData etkisi için aynı key’i koruyoruz -> önceki içerik kalır, flicker yok
  const { data } = useSWR(`banner:${lang}`, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true as any, // SWR v2'de default benzeri davranış, önceki data korunur
  });

  // İlk yüklemede de skeletonsız render için basit guard
  const settings = data?.settings;
  const banner = data?.banner;

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-300 px-4 py-2 h-10 w-full flex justify-center font-poppins font-medium text-foreground">
      <div className="flex flex-row justify-between items-center w-full max-w-7xl text-sm text-white">
        <div className="flex flex-row gap-8">
          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex flex-row items-center gap-2"
            >
              <FaPhone /> {settings.phone}
            </a>
          )}
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="flex flex-row items-center gap-2"
            >
              <FaEnvelope /> {settings.email}
            </a>
          )}
        </div>

        <div className="flex flex-row gap-2">
          {banner?.promo_text && (
            <a href={banner.promo_url ?? "#"}>{banner.promo_text}</a>
          )}
          {banner?.promo_text && banner?.promo_cta && (
            <span className="opacity-70">|</span>
          )}
          {banner?.promo_cta && (
            <a href={banner.promo_url ?? "#"}>{banner.promo_cta}</a>
          )}
        </div>

        <div className="flex flex-row items-center gap-2">
          <Dropdown />
          <span className="opacity-70">|</span>
          <a href={settings?.store_location_url ?? "#"}>Store Location</a>
        </div>
      </div>
    </div>
  );
}

"use client";

import useSWR from "swr";
import { FaPhone, FaEnvelope } from "react-icons/fa6";
import Dropdown from "./LanguageDropdown";
import { useLanguage } from "@/components/LanguageProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const fetcher = async (lang: string) => {
  const supabase = createSupabaseBrowserClient();

  // site_settings
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  // banner_translations
  const { data: banner } = await supabase
    .from("banner_translations")
    .select("*")
    .eq("lang_code", lang)
    .maybeSingle();

  return { settings, banner };
};

export default function TopHorizontalBanner() {
  const { lang } = useLanguage();

  const { data } = useSWR(`top-banner-${lang}`, () => fetcher(lang), {
    revalidateOnFocus: false,
  });

  const settings = data?.settings;
  const banner = data?.banner;

  if (!settings) return null;

  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-300 px-4 py-2 h-10 w-full flex justify-center font-poppins font-medium text-foreground">
      <div className="flex flex-row justify-between items-center w-full max-w-7xl text-sm text-white">
        <div className="flex flex-row gap-8">
          {settings.phone && (
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2">
              <FaPhone /> {settings.phone}
            </a>
          )}
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2">
              <FaEnvelope /> {settings.email}
            </a>
          )}
        </div>

        <div className="flex flex-row gap-2">
          {banner?.promo_text && <a href={banner.promo_url ?? "#"}>{banner.promo_text}</a>}
          {banner?.promo_text && banner?.promo_cta && <span className="opacity-70">|</span>}
          {banner?.promo_cta && <a href={banner.promo_url ?? "#"}>{banner.promo_cta}</a>}
        </div>

        <div className="flex flex-row items-center gap-2">
          <Dropdown />
          <span className="opacity-70">|</span>
          <a href={settings.store_location_url ?? "#"}>Store Location</a>
        </div>
      </div>
    </div>
  );
}

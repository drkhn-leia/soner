// lib/queries/site-settings.ts
import { createClient } from "@supabase/supabase-js";

/** İstersen bunu kendi util'ındaki createSupabaseServerClient ile değiştir. */
function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, anon, { auth: { persistSession: false } });
}

/** --- Tipler --- */
export type SiteSettings = {
  id: string;
  site_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  store_location_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  whatsapp_url: string | null;
  working_hours: string | null;
  footer_text: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type BannerRow = {
  settings_id: string;
  site_name: string;
  logo_url: string | null;
  phone: string | null;
  email: string | null;
  store_location_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  whatsapp_url: string | null;
  footer_text: string | null;
  working_hours: string | null;
  lang_code: string;
  promo_text: string;
  promo_cta: string;
  promo_url: string | null;
};

/** --- Yardımcılar --- */

/** Varsayılan dili getir (ör. 'en'). Yoksa 'en' döner. */
export async function getDefaultLang(): Promise<string> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("languages")
    .select("code")
    .eq("is_default", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    // prod ortamında swallow edebilir, loglayabilirsiniz
    console.error("[getDefaultLang]", error.message);
  }
  return data?.code ?? "en";
}

/** site_settings: tek satır genel ayarlar */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getSiteSettings]", error.message);
    return null;
  }
  return data as SiteSettings | null;
}

/**
 * Banner'ı istenen dilde getir, yoksa varsayılan dile düş.
 * v_banner view'u kullanır.
 */
export async function getBanner(lang?: string): Promise<BannerRow | null> {
  const supabase = createSupabaseServerClient();
  const wantLang = lang || (await getDefaultLang());

  // Önce hedef dilde dene
  let { data, error } = await supabase
    .from("v_banner")
    .select("*")
    .eq("lang_code", wantLang)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getBanner:first]", error.message);
  }

  // Hedef dil yoksa varsayılana düş
  if (!data) {
    const fallback = await getDefaultLang();
    const res = await supabase
      .from("v_banner")
      .select("*")
      .eq("lang_code", fallback)
      .limit(1)
      .maybeSingle();

    if (res.error) {
      console.error("[getBanner:fallback]", res.error.message);
      return null;
    }
    return (res.data as BannerRow) ?? null;
  }

  return data as BannerRow;
}

/** Ergonomi: tek çağrıda hem ayarlar hem banner */
export async function getSiteSettingsWithBanner(lang?: string) {
  const [settings, banner] = await Promise.all([
    getSiteSettings(),
    getBanner(lang),
  ]);

  return { settings, banner };
}

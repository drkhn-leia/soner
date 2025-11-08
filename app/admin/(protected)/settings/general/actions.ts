"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function updateSiteSettings(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const payload = {
    site_name: formData.get("site_name")?.toString() || null,
    logo_url: formData.get("logo_url")?.toString() || null,
    favicon_url: formData.get("favicon_url")?.toString() || null,
    phone: formData.get("phone")?.toString() || null,
    email: formData.get("email")?.toString() || null,
    address: formData.get("address")?.toString() || null,
    store_location_url: formData.get("store_location_url")?.toString() || null,
    facebook_url: formData.get("facebook_url")?.toString() || null,
    instagram_url: formData.get("instagram_url")?.toString() || null,
    twitter_url: formData.get("twitter_url")?.toString() || null,
    linkedin_url: formData.get("linkedin_url")?.toString() || null,
    whatsapp_url: formData.get("whatsapp_url")?.toString() || null,
    working_hours: formData.get("working_hours")?.toString() || null,
    footer_text: formData.get("footer_text")?.toString() || null,
    updated_at: new Date().toISOString(),
  };

  const { data: existing } = await supabase
    .from("site_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (existing?.id) {
    const { error } = await supabase
      .from("site_settings")
      .update(payload)
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("site_settings").insert(payload);
    if (error) throw new Error(error.message);
  }

  return { ok: true };
}

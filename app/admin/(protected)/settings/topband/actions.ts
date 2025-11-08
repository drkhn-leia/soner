"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function upsertBannerTranslation(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const lang_code = formData.get("lang_code")?.toString()!;
  const promo_text = formData.get("promo_text")?.toString() || "";
  const promo_cta = formData.get("promo_cta")?.toString() || "";
  const promo_url = formData.get("promo_url")?.toString() || null;

  const { error } = await supabase
    .from("banner_translations")
    .upsert([{ lang_code, promo_text, promo_cta, promo_url }], {
      onConflict: "lang_code",
    });

  if (error) throw new Error(error.message);
  return { ok: true };
}

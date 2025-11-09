"use server";

import { readDB, writeDB, type Banner } from "@/lib/db";

export async function upsertBannerTranslation(formData: FormData) {
  const lang_code = formData.get("lang_code")?.toString() || "";
  const promo_text = formData.get("promo_text")?.toString() || "";
  const promo_cta = formData.get("promo_cta")?.toString() || "";
  const promo_url = formData.get("promo_url")?.toString() || null;

  if (!lang_code) {
    throw new Error("lang_code zorunludur.");
  }

  const incoming: Banner = { lang_code, promo_text, promo_cta, promo_url };

  try {
    const db = await readDB();
    const banners = db.banners ?? [];

    const idx = banners.findIndex((b) => b.lang_code === lang_code);
    if (idx >= 0) {
      banners[idx] = { ...banners[idx], ...incoming };
    } else {
      banners.push(incoming);
    }

    db.banners = banners;
    await writeDB(db);

    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

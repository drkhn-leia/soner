// @/app/api/banners/route.ts
import { NextResponse } from "next/server";
import { readBanners } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = (url.searchParams.get("lang") || "en").toLowerCase();

  const db = await readBanners();
  const banners = db.banners.filter((b) => b.lang_code.toLowerCase() === lang);
  return NextResponse.json({ banners });
}

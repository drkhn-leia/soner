// @/app/api/carousel/route.ts
import { NextResponse } from "next/server";
import { readCarousel } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = (url.searchParams.get("lang") || "en").toLowerCase();

  const db = await readCarousel();
  const all = db.landingCarousel || {};
  const carousel = all[lang] ?? all.en ?? [];
  return NextResponse.json({ carousel });
}

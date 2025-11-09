// /app/api/ads/route.ts
import { NextResponse } from "next/server";
import { readAds } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lang = (url.searchParams.get("lang") || "en").toLowerCase();

    const db = await readAds();
    const ads = db[lang] ?? db["en"] ?? [];

    return new NextResponse(JSON.stringify({ ads }), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Invalid ads.json", detail: String(e?.message || e) },
      { status: 500 }
    );
  }
}

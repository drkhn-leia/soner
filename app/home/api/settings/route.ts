// /app/api/settings/route.ts
import { NextResponse } from "next/server";
import { readSiteSettings, readBanners } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lang = (url.searchParams.get("lang") || "").toLowerCase();

    const { site_settings } = await readSiteSettings();
    const { banners } = await readBanners();

    const filtered = lang
      ? banners.filter((b) => b.lang_code.toLowerCase() === lang)
      : banners;

    return new NextResponse(
      JSON.stringify({
        site_settings,
        banners: filtered.length ? filtered : banners, // fallback
      }),
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        },
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        error: "Invalid settings/banners json",
        detail: String(e?.message || e),
      },
      { status: 500 }
    );
  }
}

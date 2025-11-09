// @/app/api/navigation/route.ts
import { NextResponse } from "next/server";
import { readNavigation } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const lang = (url.searchParams.get("lang") || "en").toLowerCase();

    const db = await readNavigation();
    const navigation = db.navigation?.[lang] ?? db.navigation?.en ?? [];

    // Basit cache headers (dev’de etkisiz olabilir; prod’da faydalı)
    return new NextResponse(JSON.stringify({ navigation }), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store", // dil anında değişsin
      },
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Invalid navigation.json", detail: String(e?.message || e) },
      { status: 500 }
    );
  }
}

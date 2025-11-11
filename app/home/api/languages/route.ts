import { NextResponse } from "next/server";
import { readDB, type Language } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const db = await readDB();

    let languages: Language[];

    if (Array.isArray(db.languages) && db.languages.length > 0) {
      languages = db.languages;
    } else {
      // languages yoksa banners içindeki lang_code'lardan türet
      const codes = Array.from(
        new Set(
          (db.banners ?? [])
            .map((b: any) => String(b.lang_code || "").toLowerCase())
            .filter(Boolean)
        )
      );

      // Varsayılan dili belirle: tr varsa tr, yoksa ilk eleman
      const defaultCode = codes.includes("tr") ? "tr" : codes[0] ?? "en";

      languages = codes.length
        ? codes.map((code) => ({
            code,
            name: code.toUpperCase(), // basit isimlendirme; istersen db.json'a tam adları koy
            is_default: code === defaultCode,
          }))
        : [
            // Hiç data yoksa bir güvenli varsayılan dön
            { code: "en", name: "EN", is_default: true },
          ];
    }

    // default dil en başta gelsin
    languages = [...languages].sort(
      (a, b) =>
        Number(b.is_default) - Number(a.is_default) ||
        a.code.localeCompare(b.code)
    );

    return NextResponse.json({ languages });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to load languages", detail: String(e?.message || e) },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

type Creds = { email: string; password: string };

async function readCreds(req: Request): Promise<Creds> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  if (ct.includes("application/json")) {
    const body = await req.json().catch(() => ({} as any));
    return {
      email: String(body?.email ?? "")
        .trim()
        .toLowerCase(),
      password: String(body?.password ?? ""),
    };
  }

  // Form POST (x-www-form-urlencoded / multipart)
  const form = await req.formData().catch(() => null);
  return {
    email: String(form?.get("email") ?? "")
      .trim()
      .toLowerCase(),
    password: String(form?.get("password") ?? ""),
  };
}

export async function POST(req: Request) {
  const { email, password } = await readCreds(req);

  const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL ?? "")
    .trim()
    .toLowerCase();
  const ADMIN_PASSWORD_HASH = String(
    process.env.ADMIN_PASSWORD_HASH ?? ""
  ).trim();

  const okEmail = !!email && email === ADMIN_EMAIL;
  const okPass =
    !!password && (await bcrypt.compare(password, ADMIN_PASSWORD_HASH));

  if (!okEmail || !okPass) {
    // Form gönderiminde JSON hata dönmek yerine aynı sayfada kalmak isterseniz 303 ile tekrar /login'e yönlendirebilirsiniz.
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = await getSession();
  session.user = { id: "admin", email: ADMIN_EMAIL, role: "admin" };
  await session.save();

  // redirect paramını hem JSON hem Form için destekleyelim
  const url = new URL(req.url);
  const next = url.searchParams.get("redirect") || "/admin";

  const ct = (req.headers.get("content-type") || "").toLowerCase();
  if (ct.includes("application/json")) {
    // JSON akışında istemci kendisi yönlendirsin (window.location.assign veya router)
    return NextResponse.json({ ok: true, next });
  } else {
    // Form akışında sunucudan 303 redirect (tam sayfa geçiş ve cookie kesin)
    return NextResponse.redirect(new URL(next, url.origin), { status: 303 });
  }
}

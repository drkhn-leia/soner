// app/admin/layout.tsx
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import Header from "./_components/Header";

type AuthCookie = { email?: string };

function parseAuth(raw?: string): AuthCookie | null {
  if (!raw) return null;
  try { return JSON.parse(raw) as AuthCookie; } catch { return null; }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const raw = (await cookies()).get("auth")?.value;
  const auth = parseAuth(raw);
  const isAuthed = Boolean(auth?.email);           // ✅ oturum var mı?
  const userEmail = auth?.email ?? "";

  return (
    <section className="flex min-h-screen flex-col">
      {isAuthed && (                                  // ✅ sadece login sonrası
        <header className="sticky top-0 z-10 border-b bg-white">
          <Header userEmail={userEmail} />
        </header>
      )}
      <main className="flex-1">{children}</main>
    </section>
  );
}

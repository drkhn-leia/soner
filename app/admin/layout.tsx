import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

// /app/(admin)/admin/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }
  return (
    <main className="h-screen w-full overflow-hidden bg-gray-50">
      <div className="flex h-full">
        <aside className="sticky top-0 h-screen min-w-64 w-64 shrink-0 border-r bg-white overflow-hidden">
          <Sidebar />
        </aside>

        <section className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 border-b bg-white">
            <Header userEmail={session.user.email} />
          </header>

          <div className="flex-1 min-h-0 overflow-y-auto p-6">{children}</div>
        </section>
      </div>
    </main>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // ❌ Eski:
  // const { data: { session } } = await supabase.auth.getSession();
  // if (!session) redirect("/admin/login");

  // ✅ Yeni: Kullanıcıyı doğrulamak için getUser() kullan
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login?redirect=/admin");
  }

  const email = user.email ?? "";

  return (
    <main className="h-screen w-full overflow-hidden bg-gray-50">
      <div className="flex h-full">
        <aside className="sticky top-0 h-screen min-w-64 w-64 shrink-0 border-r bg-white overflow-hidden">
          <Sidebar />
        </aside>

        <section className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 border-b bg-white">
            <Header userEmail={email} />
          </header>

          <div className="flex-1 min-h-0 overflow-y-auto p-6">{children}</div>
        </section>
      </div>
    </main>
  );
}

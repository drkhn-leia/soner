import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LoginForm from "./_components/LoginForm";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect(searchParams?.redirect || "/admin");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
        <LoginForm />
        <p className="text-xs text-gray-500 mt-4">
          E-posta/şifre ile giriş yapın.
        </p>
      </div>
    </main>
  );
}

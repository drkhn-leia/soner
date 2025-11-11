// app/(public)/login/page.tsx
export const metadata = { title: "Admin • Login" };
// İsteğe bağlı: bu sayfayı her istekte dinamik render etmek istersen
// export const dynamic = "force-dynamic";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function LoginPage({ searchParams }: Props) {
  const next =
    typeof searchParams.redirect === "string" && searchParams.redirect.trim()
      ? searchParams.redirect
      : "/admin";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        method="POST"
        action={`/api/login?redirect=${encodeURIComponent(next)}`}
        className="w-full max-w-sm space-y-4 border p-6 rounded"
      >
        <h1 className="text-xl font-semibold">Admin Login</h1>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border rounded px-3 py-2"
            // Server Component'ta controlled state yok; defaultValue yeterli
            defaultValue=""
            autoComplete="username"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border rounded px-3 py-2"
            defaultValue=""
            autoComplete="current-password"
          />
        </div>

        {/* İstersen redirect'i hidden ile de iletebilirsin (action query'e ek olarak) */}
        <input type="hidden" name="redirect" value={next} />

        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Giriş
        </button>
      </form>
    </div>
  );
}

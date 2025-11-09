// app/(public)/login/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const params = useSearchParams();
  const next = params.get("redirect") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Klasik form post: action’da redirect paramını iletin
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form method="POST" action={`/api/login?redirect=${encodeURIComponent(next)}`}

        className="w-full max-w-sm space-y-4 border p-6 rounded"
      >
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <div className="space-y-1">
          <label className="block text-sm">Email</label>
          <input name="email" type="email" required
            className="w-full border rounded px-3 py-2"
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Password</label>
          <input name="password" type="password" required
            className="w-full border rounded px-3 py-2"
            value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Giriş
        </button>
      </form>
    </div>
  );
}

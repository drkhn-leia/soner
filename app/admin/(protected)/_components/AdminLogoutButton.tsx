// components/AdminLogoutButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLogoutButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  return (
    <div
      onClick={async () => {
        await supabase.auth.signOut();
        router.replace("/admin/login");
      }}
    >
      Çıkış
    </div>
  );
}

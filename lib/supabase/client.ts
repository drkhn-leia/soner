"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function createSupabaseBrowserClient() {
  // Auth-helpers, NEXT_PUBLIC_* env değerlerini kendi okur.
  return createClientComponentClient();
}

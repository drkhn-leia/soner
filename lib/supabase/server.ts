// ./lib/supabase/server.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Artık async değil; cookies fonksiyonunu doğrudan veriyoruz
export const createSupabaseServerClient = () => {
  return createServerComponentClient({ cookies }); // cookies: () => Promise<ReadonlyRequestCookies>
};

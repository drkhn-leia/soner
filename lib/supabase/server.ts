// /lib/supabase/server.ts

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Sunucu (Server) tarafında kullanılacak Supabase client.
 * Server component'larda, layout'larda, route handler'larda kullanılır.
 */
export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();
  return createServerComponentClient({ cookies: () => cookieStore });
};

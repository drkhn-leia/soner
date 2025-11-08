// Sunucu (SSR, RSC, Route Handlers) için Supabase istemcisi
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _serverClient: SupabaseClient | null = null;

/**
 * SSR için tekil (singleton) client üretir.
 * - Env değişkenleri: SUPABASE_URL, SUPABASE_ANON_KEY
 * - persistSession: false -> sunucuda session tutulmaz
 */
export function createSupabaseServerClient(): SupabaseClient {
  if (_serverClient) return _serverClient;

  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;

  if (!url) throw new Error("Missing env SUPABASE_URL");
  if (!anon) throw new Error("Missing env SUPABASE_ANON_KEY");

  _serverClient = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "X-Client-Env": "server" } },
  });

  return _serverClient;
}

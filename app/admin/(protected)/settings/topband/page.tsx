import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import TopbandForm from "./_components/TopBandForm";

export const metadata = { title: "Admin • Settings • Top Band" };

export default async function TopbandSettingsPage() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: languages = [] } = await supabase
    .from("languages")
    .select("code, name, is_default")
    .order("is_default", { ascending: false });

  const { data: banners = [] } = await supabase
    .from("banner_translations")
    .select("lang_code, promo_text, promo_cta, promo_url");

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Top Band / Banner</h1>
      <TopbandForm languages={languages} initialBanners={banners} />
    </>
  );
}

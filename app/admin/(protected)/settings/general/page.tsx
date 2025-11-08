import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import GeneralForm from "./_components/GeneralForm";

export const metadata = { title: "Admin • Settings • General" };

export default async function GeneralSettingsPage() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">General Settings</h1>
      <GeneralForm initialSettings={settings ?? null} />
    </>
  );
}

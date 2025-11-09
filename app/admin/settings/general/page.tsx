import GeneralForm from "./_components/GeneralForm";
import { readDB } from "@/lib/db";

export const metadata = { title: "Admin • Settings • General" };

export default async function GeneralSettingsPage() {
  const db = await readDB();
  const settings = db.site_settings ?? null;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">General Settings</h1>
      <GeneralForm initialSettings={settings} />
    </>
  );
}

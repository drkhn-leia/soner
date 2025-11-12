// @/app/_components/NavigationBar/NavigationBar.tsx
"use client";

import Link from "next/link";
import useSWR from "swr";
import { SlUser, SlBasket } from "react-icons/sl";
import Dropdown from "./_components/Dropdown";
import { useLanguage } from "@/components/LanguageProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const fetcher = async (lang: string) => {
  const supabase = createSupabaseBrowserClient();

  const { data } = await supabase
    .from("navigation_links")
    .select("*")
    .eq("lang_code", lang)
    .order("parent_id", { ascending: true })
    .order("id", { ascending: true });

  const tree: any[] = [];
  const map = new Map();

  // Basit tree builder
  data?.forEach((item) => map.set(item.id, { ...item, children: [] }));
  data?.forEach((item) => {
    if (item.parent_id) map.get(item.parent_id).children.push(map.get(item.id));
    else tree.push(map.get(item.id));
  });

  return tree;
};

export default function NavigationBar() {
  const { lang } = useLanguage();
  const { data: nav } = useSWR(`nav-${lang}`, () => fetcher(lang), {
    revalidateOnFocus: false,
  });

  return (
    <div className="relative w-full max-w-7xl h-24 flex items-center justify-between font-onest font-semibold">
      <div className="text-3xl font-poppins font-bold">
        <p>Nost Copy</p>
      </div>

      <ul className="flex space-x-8 items-center">
        {nav?.map((item) =>
          item.children?.length > 0 ? (
            <li key={item.id}>
              <Dropdown
                label={item.label}
                items={item.children.map((c: any) => ({
                  name: c.label,
                  href: c.href,
                }))}
              />
            </li>
          ) : (
            <li key={item.id} className="text-gray-700 hover:text-blue-500">
              <Link href={item.href ?? "#"}>{item.label}</Link>
            </li>
          )
        )}
      </ul>

      <div className="flex flex-row text-xl gap-4">
        <SlUser className="cursor-pointer" />
        <SlBasket className="cursor-pointer" />
      </div>
    </div>
  );
}

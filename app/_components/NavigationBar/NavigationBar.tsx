// @/app/_components/NavigationBar/NavigationBar.tsx
"use client";

import Link from "next/link";
import useSWR from "swr";
import { SlUser, SlBasket } from "react-icons/sl";
import Dropdown from "./_components/Dropdown";

import { useLanguage } from "@/lib/LanguageProvider";
import type { NavItem } from "@/lib/dbTypes";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function NavigationBar() {
  const { lang } = useLanguage();

  const { data } = useSWR<{ navigation: NavItem[] }>(
    `/api/navigation?lang=${lang}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5_000,
      keepPreviousData: true,
    }
  );

  const items: NavItem[] = data?.navigation ?? [];

  return (
    <div className="relative w-full max-w-7xl h-24 flex items-center justify-between font-onest font-semibold">
      <div className="text-3xl font-poppins font-bold">
        <Link href="/" className="cursor-pointer">
          Nost Copy
        </Link>
      </div>

      <ul className="flex space-x-8 items-center">
        {items.map((item) =>
          item.children?.length ? (
            <li key={item.label}>
              <Dropdown label={item.label} items={item.children} />
            </li>
          ) : (
            <li key={item.label} className="text-gray-700 hover:text-blue-500">
              {item.href ? (
                <Link href={item.href} className="cursor-pointer">
                  {item.label}
                </Link>
              ) : (
                <span className="cursor-default">{item.label}</span>
              )}
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

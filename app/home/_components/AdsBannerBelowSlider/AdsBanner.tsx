// /app/_components/AdsBar.tsx  (veya AdsBanner.tsx)
"use client";

import useSWR from "swr";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/lib/LanguageProvider";

type AdItem = { text: string; icon: string };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdsBar() {
    const { lang } = useLanguage();

    const { data } = useSWR<{ ads: AdItem[] }>(
        `/api/ads?lang=${lang}`,
        fetcher,
        { revalidateOnFocus: false }
    );

    const ads = data?.ads ?? [];

    return (
        <ul className="flex flex-row w-full max-w-7xl justify-between py-20 text-md font-poppins font-light">
            {ads.map((a, i) => (
                <li key={`${a.icon}-${i}`} className="px-4 py-2 whitespace-nowrap cursor-pointer">
                    <span className="flex flex-row gap-2 items-center hover:text-blue-400">
                        {a.icon ? <Icon icon={a.icon} className="text-blue-400 text-[18px]" /> : null}
                        {a.text}
                    </span>
                </li>
            ))}
        </ul>
    );
}

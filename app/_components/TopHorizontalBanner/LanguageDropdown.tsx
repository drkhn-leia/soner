"use client";

import React, { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";

type Language = { code: string; name: string; is_default: boolean };

export default function Dropdown() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    supabase
      .from("languages")
      .select("code,name,is_default")
      .order("is_default", { ascending: false })
      .then(({ data }) => setLanguages(data ?? []));
  }, [supabase]);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((s) => !s)}
        className="inline-flex items-center gap-2"
      >
        <span>{lang.toUpperCase()}</span>
        <svg className="w-2.5 h-2.5" viewBox="0 0 10 6" aria-hidden="true">
          <path
            d="m1 1 4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <ul className="py-1">
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setLang(l.code);
                  }} // sadece state değişiyor
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    lang === l.code
                      ? "font-semibold text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  {l.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

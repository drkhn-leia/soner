"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type LangCtx = {
  lang: string;
  setLang: (code: string) => void;
};

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({
  children,
  defaultLang = "en",
}: {
  children: React.ReactNode;
  defaultLang?: string;
}) {
  const [lang, setLangState] = useState(defaultLang);

  useEffect(() => {
    // cookie -> sayfa yenilense de hatırlansın
    const match = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
    if (match?.[1]) setLangState(decodeURIComponent(match[1]));
  }, []);

  const setLang = (code: string) => {
    setLangState(code);
    document.cookie = `lang=${encodeURIComponent(code)}; path=/; max-age=31536000`;
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

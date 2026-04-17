"use client";

import { useLanguage } from "@/components/providers/language-context";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="rounded-lg border bg-white px-3 py-1 text-xs text-slate-600 shadow-sm transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200"
    >
      🌐 {lang === "pt" ? "EN" : "PT"}
    </button>
  );
}

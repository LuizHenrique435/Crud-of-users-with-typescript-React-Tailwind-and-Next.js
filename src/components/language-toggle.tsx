"use client";

import { useLanguage, useT } from "@/components/providers/language-context";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const t = useT();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.langSwitch}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-black/15 bg-white px-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <span className="text-[10px] text-current/70">{t.currentLanguage}</span>
      <span>{lang === "pt" ? "EN" : "PT"}</span>
    </button>
  );
}

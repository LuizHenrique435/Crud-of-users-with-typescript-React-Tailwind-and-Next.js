"use client";

import { useTheme } from "next-themes";
import { useT } from "@/components/providers/language-context";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useT();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t.themeDark}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-black/15 bg-white px-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <span className="text-[10px] text-current/70">{t.currentTheme}</span>
      <span>{isDark ? t.themeLight : t.themeDark}</span>
    </button>
  );
}

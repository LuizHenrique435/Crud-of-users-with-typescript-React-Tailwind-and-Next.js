"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import ThemeToggle from "@/components/theme-toggle";
import LanguageToggle from "@/components/language-toggle";
import { useT } from "@/components/providers/language-context";
import { cn } from "@/lib/utils/cn";
import { clientAPI } from "@/service/client";

const navItems = [
  { href: "/app" as const, key: "navDashboard" },
  { href: "/app/users" as const, key: "navUsers" },
  { href: "/app/profiles" as const, key: "navProfiles" },
  { href: "/app/profile" as const, key: "navProfile" },
] as const;

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useT();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await clientAPI.delete("/sessions");
      toast.success(t.logoutSuccess);
      router.push("/auth/sign-in");
      router.refresh();
    } catch {
      toast.error(t.logoutError);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/92 backdrop-blur-xl dark:border-white/10 dark:bg-black/92">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-black/45 dark:text-white/45">
              {t.appName}
            </p>
            <div>
              <h1 className="text-xl font-semibold text-black dark:text-white">{t.appDesc}</h1>
              <p className="mt-1 max-w-2xl text-sm text-black/55 dark:text-white/55">
                {t.navDashboard} • {t.navUsers} • {t.navProfiles} • {t.navProfile}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex h-10 items-center justify-center rounded-full border border-black bg-black px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
            >
              {isLoggingOut ? t.loggingOut : t.logout}
            </button>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2" aria-label={t.navOpen}>
          {navItems.map((item) => {
            const label = t[item.key];
            const isActive =
              item.href === "/app"
                ? pathname === "/app"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-black/10 bg-black/[0.03] text-black/65 hover:border-black hover:text-black dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65 dark:hover:border-white dark:hover:text-white",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

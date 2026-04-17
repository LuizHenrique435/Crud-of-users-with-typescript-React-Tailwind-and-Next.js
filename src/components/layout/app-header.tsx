"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/theme-toggle";
import LanguageToggle from "@/components/language-toggle";

export function AppHeader() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={`border-b ${
        isDark
          ? "bg-black text-white border-white"
          : "bg-white text-black border-black"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <div>
          <p className="text-lg font-semibold">User Manager</p>
          <p className="text-sm opacity-70">
            Administração de usuários, perfis e conta própria
          </p>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/app" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/app/users" className="hover:underline">
            Usuários
          </Link>
          <Link href="/app/profiles" className="hover:underline">
            Perfis
          </Link>
          <Link href="/app/profile" className="hover:underline">
            Meu perfil
          </Link>

          <div className="ml-2 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

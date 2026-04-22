"use client";

import Link from "next/link";
import { useT } from "@/components/providers/language-context";

export default function LandingPage() {
  const t = useT();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/45 dark:text-white/45">
              {t.landingEyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              {t.landingTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-black/65 dark:text-white/65">
              {t.landingDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth/sign-in" className="rounded-full border border-black bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                {t.landingSignIn}
              </Link>
              <Link href="/app" className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-black hover:bg-black hover:text-white dark:border-white/15 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black">
                {t.landingOpenApp}
              </Link>
            </div>
          </section>

          <section className="grid gap-4">
            {[
              [t.navDashboard, t.dashSummaryDesc],
              [t.navUsers, t.dashCardUsersDesc],
              [t.navProfiles, t.dashCardProfilesDesc],
            ].map(([title, description]) => (
              <div key={title} className="rounded-[28px] border border-black/10 bg-black/[0.03] p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/40 dark:text-white/40">{t.appName}</p>
                <h2 className="mt-3 text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">{description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}

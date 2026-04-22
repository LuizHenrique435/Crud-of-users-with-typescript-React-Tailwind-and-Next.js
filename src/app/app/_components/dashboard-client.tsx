"use client";

import Link from "next/link";
import { useT } from "@/components/providers/language-context";

export default function DashboardClient({
  userCount,
  profileCount,
  activeUserCount,
}: {
  userCount: number;
  profileCount: number;
  activeUserCount: number;
}) {
  const t = useT();

  const metrics = [
    { label: t.dashUsers, value: userCount.toString().padStart(2, "0") },
    { label: t.dashProfiles, value: profileCount.toString().padStart(2, "0") },
    { label: t.dashActiveUsers, value: activeUserCount.toString().padStart(2, "0") },
  ];

  const sections = [
    {
      href: "/app/users" as const,
      title: t.navUsers,
      description: t.dashCardUsersDesc,
    },
    {
      href: "/app/profiles" as const,
      title: t.navProfiles,
      description: t.dashCardProfilesDesc,
    },
    {
      href: "/app/profile" as const,
      title: t.navProfile,
      description: t.dashCardProfileDesc,
    },
  ];

  return (
    <main className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-black/10 bg-[linear-gradient(135deg,rgba(0,0,0,0.05),rgba(0,0,0,0.01))] p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
            {t.dashSummary}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
            {t.dashTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-black/62 dark:text-white/62">
            {t.dashDesc}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-black/48 dark:text-white/48">
            {t.dashSummaryDesc}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {metrics.map((metric) => (
            <section key={metric.label} className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.9)] dark:border-white/10 dark:bg-black">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                {metric.label}
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-black dark:text-white">{metric.value}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-black/10 bg-black/[0.03] p-8 dark:border-white/10 dark:bg-white/[0.04]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/40 dark:text-white/40">
            {t.dashDirectoryTitle}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-black dark:text-white">{t.dashDirectoryDesc}</h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {sections.map((section, index) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-[28px] border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white dark:border-white/10 dark:bg-black dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-current/45">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{section.title}</h3>
              <p className="mt-3 text-sm leading-6 text-current/60">{section.description}</p>
              <p className="mt-6 text-sm font-medium text-current/80">{t.dashOpenSection}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

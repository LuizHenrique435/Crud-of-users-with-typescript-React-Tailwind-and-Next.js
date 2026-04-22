"use client";

import { useMemo, useState } from "react";
import { useT } from "@/components/providers/language-context";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string | null;
  email: string | null;
  phone: string | null;
  status: "ACTIVE" | "INACTIVE";
  profile?: { id: number; name: string } | null;
};

export default function UsersClient({ users }: { users: User[] }) {
  const t = useT();
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return users;

    return users.filter((user) => {
      const haystack = [
        user.firstName,
        user.lastName,
        user.username,
        user.email,
        user.phone,
        user.profile?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [query, users]);

  const stats = [
    { label: t.usersTotal, value: users.length },
    { label: t.usersWithEmail, value: users.filter((user) => Boolean(user.email)).length },
    { label: t.usersWithPhone, value: users.filter((user) => Boolean(user.phone)).length },
  ];

  return (
    <main className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-black/10 bg-[linear-gradient(135deg,rgba(0,0,0,0.05),rgba(0,0,0,0.01))] p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">{t.usersTitle}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-black/62 dark:text-white/62">{t.usersDesc}</p>
          <div className="mt-8">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.usersSearchPlaceholder}
              className="h-12 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-black dark:border-white/15 dark:bg-black dark:text-white dark:placeholder:text-white/35 dark:focus:border-white"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((stat) => (
            <section key={stat.label} className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.9)] dark:border-white/10 dark:bg-black">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40 dark:text-white/40">{stat.label}</p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-black dark:text-white">{String(stat.value).padStart(2, "0")}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_24px_70px_-55px_rgba(0,0,0,1)] dark:border-white/10 dark:bg-black">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-black/50 dark:text-white/50">{t.colName}</th>
                <th className="px-6 py-4 text-left font-semibold text-black/50 dark:text-white/50">{t.colUsername}</th>
                <th className="px-6 py-4 text-left font-semibold text-black/50 dark:text-white/50">{t.colEmail}</th>
                <th className="px-6 py-4 text-left font-semibold text-black/50 dark:text-white/50">{t.colPhone}</th>
                <th className="px-6 py-4 text-left font-semibold text-black/50 dark:text-white/50">{t.colProfile}</th>
                <th className="px-6 py-4 text-left font-semibold text-black/50 dark:text-white/50">{t.colStatus}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "--";
                const isActive = user.status === "ACTIVE";

                return (
                  <tr key={user.id} className="border-b border-black/8 transition hover:bg-black/[0.025] dark:border-white/8 dark:hover:bg-white/[0.035]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black text-xs font-semibold text-white dark:border-white/10 dark:bg-white dark:text-black">
                          {initials}
                        </div>
                        <div>
                          <p className="font-medium text-black dark:text-white">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-black/45 dark:text-white/45">{t.usersInitials}: {initials}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-black/65 dark:text-white/65">{user.username ?? "-"}</td>
                    <td className="px-6 py-4 text-black/65 dark:text-white/65">{user.email ?? "-"}</td>
                    <td className="px-6 py-4 text-black/65 dark:text-white/65">{user.phone ?? "-"}</td>
                    <td className="px-6 py-4 text-black/65 dark:text-white/65">{user.profile?.name ?? "-"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full border border-black/10 bg-black px-3 py-1 text-xs font-semibold text-white dark:border-white/10 dark:bg-white dark:text-black">
                        {isActive ? t.statusActive : t.statusInactive}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="border-t border-black/10 px-6 py-8 text-center text-sm text-black/55 dark:border-white/10 dark:text-white/55">
            {t.usersEmpty}
          </div>
        ) : null}
      </section>
    </main>
  );
}

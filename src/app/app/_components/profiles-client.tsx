"use client";

import { useT } from "@/components/providers/language-context";

type Profile = { id: number; name: string; description?: string | null };
type User = { profileId?: number | null };

export default function ProfilesClient({
  profiles,
  users,
}: {
  profiles: Profile[];
  users: User[];
}) {
  const t = useT();

  return (
    <main className="space-y-8">
      <section className="rounded-[32px] border border-black/10 bg-[linear-gradient(135deg,rgba(0,0,0,0.05),rgba(0,0,0,0.01))] p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
          {t.profilesTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-black/62 dark:text-white/62">
          {t.profilesDesc}
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {profiles.map((profile, index) => (
          <section
            key={profile.id}
            className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.9)] dark:border-white/10 dark:bg-black"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                  0{index + 1}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-black dark:text-white">
                  {profile.name}
                </h2>
              </div>
              <span className="rounded-full border border-black/10 bg-black px-3 py-1 text-xs font-semibold text-white dark:border-white/10 dark:bg-white dark:text-black">
                {users.filter((user) => user.profileId === profile.id).length} {t.profileUsers}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-black/58 dark:text-white/58">
              {profile.description ?? t.noDesc}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}

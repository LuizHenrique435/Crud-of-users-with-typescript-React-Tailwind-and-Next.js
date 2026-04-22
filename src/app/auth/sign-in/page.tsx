"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { clientAPI } from "@/service/client";
import { useT } from "@/components/providers/language-context";

export default function SignInPage() {
  const router = useRouter();
  const t = useT();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await clientAPI.post("/sessions", { username, password });
      toast.success(t.authSignedIn);
      router.push("/app");
      router.refresh();
    } catch {
      toast.error(t.authSignInError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.8)] dark:border-white/10 dark:bg-black">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-black/45 dark:text-white/45">
          {t.appName}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-black dark:text-white">{t.authSignInTitle}</h1>
        <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">{t.authSignInDesc}</p>
        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">{t.authUsernameOrEmail}</label>
            <Input value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">{t.authPassword}</label>
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
        </div>
        <Button type="submit" intent="primary" className="mt-6 w-full" disabled={loading}>
          {loading ? t.authSigningIn : t.authSignInAction}
        </Button>
        <div className="mt-5 text-center">
          <p className="text-sm text-black/60 dark:text-white/60">
            {t.authNoAccount}{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-black underline underline-offset-4 transition hover:text-black/65 dark:text-white dark:hover:text-white/70"
            >
              {t.authCreateHere}
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}

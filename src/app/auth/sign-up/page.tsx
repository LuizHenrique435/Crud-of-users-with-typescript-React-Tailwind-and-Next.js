"use client";

import { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { clientAPI } from "@/service/client";
import { useT } from "@/components/providers/language-context";

type ApiFailure = {
  error?: {
    message?: string;
    action?: string;
  };
};

export default function SignUpPage() {
  const router = useRouter();
  const t = useT();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await clientAPI.post("/users", {
        ...form,
        username: form.username.trim() || null,
        email: form.email.trim() || null,
      });
      toast.success(t.authCreated);
      router.push("/auth/sign-in");
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as ApiFailure | undefined)?.error?.message
          : undefined;

      toast.error(message ?? t.authCreateError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.8)] dark:border-white/10 dark:bg-black"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-black/45 dark:text-white/45">
          {t.appName}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-black dark:text-white">
          {t.authSignUpTitle}
        </h1>

        <div className="mt-8 space-y-3">
          <Input
            placeholder={t.authFirstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Input
            placeholder={t.authLastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <Input
            placeholder={t.authUsername}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            placeholder={t.authEmail}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder={t.authPassword}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          intent="primary"
          className="mt-6 w-full"
          disabled={loading}
        >
          {loading ? t.authSubmitting : t.authSignUpAction}
        </Button>
      </form>
    </main>
  );
}

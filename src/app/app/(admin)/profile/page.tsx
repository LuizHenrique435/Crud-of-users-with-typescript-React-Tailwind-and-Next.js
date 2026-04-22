"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { clientAPI } from "@/service/client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toPhone } from "@/lib/utils/formatters";
import z from "@/lib/utils/zod";
import {
  createUserSchema,
  updateUserSchema,
  userSchema,
} from "@/validators/user.schema";
import { useT } from "@/components/providers/language-context";

type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone?: string | null;
  avatar?: string | null;
  avatarColor?: string | null;
  profile?: { id: number; name: string } | null;
  createdAt?: string;
};

const MONOCHROME_STYLES = [
  { value: "111111", labelKey: "profileStyleClassic" },
  { value: "3F3F46", labelKey: "profileStyleSlate" },
  { value: "737373", labelKey: "profileStyleSoft" },
  { value: "E5E5E5", labelKey: "profileStyleContrast" },
  { value: "EF0D19", labelKey: "profileStyleRed" },
  { value: "2563EB", labelKey: "profileStyleOcean" },
  { value: "84CC16", labelKey: "profileStyleLime" },
  { value: "015E3A", labelKey: "profileStyleGreen" },
] as const;
const DEFAULT_AVATAR_COLOR = "111111";

const personalInfoSchema = z.object({
  firstName: userSchema.shape.firstName,
  lastName: userSchema.shape.lastName,
});

const accountInfoSchema = z.object({
  email: userSchema.shape.email,
  phone: userSchema.shape.phone,
});

const customizationSchema = updateUserSchema.pick({ avatarColor: true });

function makeSecuritySchema(t: ReturnType<typeof useT>) {
  return z
    .object({
      password: createUserSchema.shape.password,
      confirmPassword: z.string().min(1, t.confirmRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t.passwordMismatch,
    });
}

function normalizeAvatarColor(color?: string | null) {
  return (
    color?.replace("#", "").trim().slice(0, 6).toUpperCase() ||
    DEFAULT_AVATAR_COLOR
  );
}

function toColorHex(color?: string | null) {
  return `#${normalizeAvatarColor(color)}`;
}

function isLightColor(color?: string | null) {
  const normalized = normalizeAvatarColor(color);
  const rgb = Number.parseInt(normalized, 16);
  const red = (rgb >> 16) & 255;
  const green = (rgb >> 8) & 255;
  const blue = rgb & 255;
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
  return luminance > 160;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useT();

  useEffect(() => {
    async function load() {
      try {
        const res = await clientAPI.get("/users/me");
        setUser(res.data.data);
      } catch {
        toast.error(t.loadError);
      } finally {
        setLoading(false);
      }
    }

    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function patchCurrentUser(payload: Record<string, unknown>) {
    const res = await clientAPI.patch("/users/me", payload);
    setUser(res.data.data);
    return res.data.data as UserProfile;
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-black/40 dark:text-white/40">
        <span className="animate-pulse">{t.loading}</span>
      </div>
    );
  }

  if (!user) return null;

  const avatarColor = toColorHex(user.avatarColor);
  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() ||
    "--";
  const avatarIsLight = isLightColor(user.avatarColor);
  const profileStats = [
    { label: t.profileLabel, value: user.profile?.name ?? "-" },
    { label: t.contactReady, value: user.email && user.phone ? "100%" : "50%" },
    {
      label: t.accountSince,
      value: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "-",
    },
  ];

  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_24px_70px_-55px_rgba(0,0,0,1)] dark:border-white/10 dark:bg-black">
        <div
          className="relative overflow-hidden border-b border-black/10 p-6 dark:border-white/10 sm:p-8"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.18), transparent 48%), linear-gradient(160deg, rgba(0,0,0,0.1), transparent 72%)",
            backgroundColor: avatarColor,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.18),transparent_36%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full border-4 text-2xl font-semibold shadow-lg"
                style={{
                  backgroundColor: avatarColor,
                  borderColor: avatarIsLight ? "#171717" : "#FAFAFA",
                  color: avatarIsLight ? "#111111" : "#FAFAFA",
                }}
              >
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className={avatarIsLight ? "text-black" : "text-white"}>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] opacity-60">
                  {t.quickStats}
                </p>
                <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 opacity-75">
                  {t.quickStatsDesc}
                </p>
                <p className="mt-3 text-sm opacity-80">
                  {user.profile?.name ?? "-"} • {user.email ?? "-"}
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {profileStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/25 bg-white/12 p-4 text-white backdrop-blur-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                    {item.label}
                  </p>
                  <p className="mt-3 text-xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-0 divide-y divide-black/8 dark:divide-white/8 xl:grid-cols-[1.1fr_0.9fr] xl:divide-x xl:divide-y-0">
          <div>
            <SectionWrapper>
              <PersonalInfoSection user={user} onSave={patchCurrentUser} />
            </SectionWrapper>
            <SectionWrapper>
              <AccountInfoSection user={user} onSave={patchCurrentUser} />
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper>
              <CustomizationSection user={user} onSave={patchCurrentUser} />
            </SectionWrapper>
            <SectionWrapper>
              <SecuritySection onSave={patchCurrentUser} />
            </SectionWrapper>
          </div>
        </div>
      </section>
    </main>
  );
}

function PersonalInfoSection({
  user,
  onSave,
}: {
  user: UserProfile;
  onSave: (payload: Record<string, unknown>) => Promise<UserProfile>;
}) {
  const t = useT();
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { firstName: user.firstName, lastName: user.lastName },
  });
  const { register, handleSubmit, reset, formState } = form;

  useEffect(() => {
    reset({ firstName: user.firstName, lastName: user.lastName });
  }, [reset, user.firstName, user.lastName]);

  return (
    <section>
      <SectionHeading title={t.personal} description={t.personalDesc} />
      <FormProvider {...form}>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (data) => {
            await onSave(data);
            toast.success(t.savedName);
          })}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={t.firstName}
              error={formState.errors.firstName?.message}
            >
              <Input {...register("firstName")} />
            </Field>
            <Field
              label={t.lastName}
              error={formState.errors.lastName?.message}
            >
              <Input {...register("lastName")} />
            </Field>
          </div>
          <SectionActions
            dirty={formState.isDirty}
            saving={formState.isSubmitting}
            onCancel={() =>
              reset({ firstName: user.firstName, lastName: user.lastName })
            }
          />
        </form>
      </FormProvider>
    </section>
  );
}

function AccountInfoSection({
  user,
  onSave,
}: {
  user: UserProfile;
  onSave: (payload: Record<string, unknown>) => Promise<UserProfile>;
}) {
  const t = useT();
  const form = useForm({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: { email: user.email ?? "", phone: user.phone ?? "" },
  });
  const { register, handleSubmit, reset, setValue, watch, formState } = form;

  useEffect(() => {
    reset({ email: user.email ?? "", phone: user.phone ?? "" });
  }, [reset, user.email, user.phone]);

  return (
    <section>
      <SectionHeading title={t.account} description={t.accountDesc} />
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          await onSave({ ...data, phone: data.phone?.trim() || null });
          toast.success(t.savedAccount);
        })}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={t.email}
            error={formState.errors.email?.message}
            className="sm:col-span-2"
          >
            <Input {...register("email")} />
          </Field>
          <Field label={t.profileLabel}>
            <Input
              value={user.profile?.name ?? "-"}
              readOnly
              className="cursor-default opacity-65"
            />
          </Field>
          <Field label={t.phone} error={formState.errors.phone?.message}>
            <Input
              value={watch("phone") ?? ""}
              onChange={(event) =>
                setValue("phone", toPhone(event.target.value), {
                  shouldDirty: true,
                })
              }
            />
          </Field>
        </div>
        <SectionActions
          dirty={formState.isDirty}
          saving={formState.isSubmitting}
          onCancel={() =>
            reset({ email: user.email ?? "", phone: user.phone ?? "" })
          }
        />
      </form>
    </section>
  );
}

function CustomizationSection({
  user,
  onSave,
}: {
  user: UserProfile;
  onSave: (payload: Record<string, unknown>) => Promise<UserProfile>;
}) {
  const t = useT();
  const form = useForm({
    resolver: zodResolver(customizationSchema),
    defaultValues: { avatarColor: normalizeAvatarColor(user.avatarColor) },
  });
  const { handleSubmit, reset, setValue, watch, formState } = form;
  const color = watch("avatarColor");
  const previewIsLight = isLightColor(color);
  const selectedStyle = useMemo(
    () =>
      MONOCHROME_STYLES.find(
        (item) => item.value === normalizeAvatarColor(color),
      ),
    [color],
  );

  useEffect(() => {
    reset({ avatarColor: normalizeAvatarColor(user.avatarColor) });
  }, [reset, user.avatarColor]);

  return (
    <section>
      <SectionHeading
        title={t.customization}
        description={t.customizationDesc}
      />
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          await onSave({ avatarColor: normalizeAvatarColor(data.avatarColor) });
          toast.success(t.savedColor);
        })}
      >
        <div className="rounded-[28px] border border-black/10 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-black dark:text-white">
                  {t.colorLabel}
                </p>
                <p className="mt-1 text-xs leading-5 text-black/50 dark:text-white/50">
                  {t.colorDesc}
                </p>
              </div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold shadow-sm"
                style={{
                  backgroundColor: toColorHex(color),
                  color: previewIsLight ? "#111111" : "#FAFAFA",
                  borderColor: previewIsLight ? "#171717" : "#FAFAFA",
                }}
              >
                {selectedStyle ? t[selectedStyle.labelKey] : "AA"}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {MONOCHROME_STYLES.map((item) => {
                const active = normalizeAvatarColor(color) === item.value;
                const light = isLightColor(item.value);

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setValue("avatarColor", item.value, { shouldDirty: true })
                    }
                    className={`rounded-[24px] border p-4 text-left transition ${
                      active
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-black/10 bg-white text-black hover:border-black dark:border-white/10 dark:bg-black dark:text-white dark:hover:border-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-9 w-9 rounded-full border"
                        style={{
                          backgroundColor: toColorHex(item.value),
                          borderColor: light ? "#171717" : "#FAFAFA",
                        }}
                      />
                      <div>
                        <p className="font-medium">{t[item.labelKey]}</p>
                        <p className="text-xs text-current/60">#{item.value}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <SectionActions
          dirty={formState.isDirty}
          saving={formState.isSubmitting}
          onCancel={() =>
            reset({ avatarColor: normalizeAvatarColor(user.avatarColor) })
          }
        />
      </form>
    </section>
  );
}

function SecuritySection({
  onSave,
}: {
  onSave: (payload: Record<string, unknown>) => Promise<UserProfile>;
}) {
  const t = useT();
  const [editing, setEditing] = useState(false);
  const form = useForm({
    resolver: zodResolver(makeSecuritySchema(t)),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const { register, handleSubmit, reset, formState } = form;

  if (!editing) {
    return (
      <section>
        <SectionHeading title={t.security} description={t.securityDesc} />
        <button
          type="button"
          className="group w-full rounded-[28px] border border-black/10 bg-black/[0.03] p-5 text-left transition hover:bg-black hover:text-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white dark:hover:text-black"
          onClick={() => setEditing(true)}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{t.changePassword}</p>
              <p className="mt-1 text-xs leading-5 text-current/60">
                {t.changePasswordDesc}
              </p>
            </div>
            <span className="text-xl text-current/50 transition group-hover:translate-x-1">
              →
            </span>
          </div>
        </button>
      </section>
    );
  }

  return (
    <section>
      <SectionHeading title={t.security} description={t.securityDesc} />
      <form
        className="space-y-4 rounded-[28px] border border-black/10 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/[0.04]"
        onSubmit={handleSubmit(async (data) => {
          await onSave({ password: data.password });
          toast.success(t.savedPassword);
          reset({ password: "", confirmPassword: "" });
          setEditing(false);
        })}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t.password} error={formState.errors.password?.message}>
            <Input type="password" {...register("password")} />
          </Field>
          <Field
            label={t.confirmPassword}
            error={formState.errors.confirmPassword?.message}
          >
            <Input type="password" {...register("confirmPassword")} />
          </Field>
        </div>
        <SectionActions
          dirty={formState.isDirty}
          saving={formState.isSubmitting}
          onCancel={() => {
            reset({ password: "", confirmPassword: "" });
            setEditing(false);
          }}
          submitLabel={t.savePassword}
        />
      </form>
    </section>
  );
}

function SectionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-6 sm:px-8">{children}</div>;
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-black/35 dark:text-white/35">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/55">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-black/55 dark:text-white/55">
        {label}
      </label>
      {children}
      {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

function SectionActions({
  dirty,
  saving,
  onCancel,
  submitLabel,
}: {
  dirty: boolean;
  saving: boolean;
  onCancel: () => void;
  submitLabel?: string;
}) {
  const t = useT();

  return (
    <div className="flex justify-end gap-2 pt-1">
      <Button
        type="button"
        intent="ghost"
        disabled={!dirty || saving}
        onClick={onCancel}
      >
        {t.cancel}
      </Button>
      <Button type="submit" intent="primary" disabled={!dirty || saving}>
        {saving ? t.saving : (submitLabel ?? t.save)}
      </Button>
    </div>
  );
}

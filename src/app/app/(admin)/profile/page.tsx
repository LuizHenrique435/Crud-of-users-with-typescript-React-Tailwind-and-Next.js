"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTheme } from "next-themes";
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

// ─── Types ────────────────────────────────────────────────────────────────────

type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone?: string | null;
  avatar?: string | null;
  avatarColor?: string | null;
  profile?: { id: number; name: string } | null;
};

type Lang = "pt" | "en";

// ─── i18n ─────────────────────────────────────────────────────────────────────

const T = {
  pt: {
    loading: "Carregando perfil...",
    loadError: "Não foi possível carregar o perfil.",
    personal: "Informações pessoais",
    firstName: "Nome",
    lastName: "Sobrenome",
    savedName: "Nome atualizado com sucesso.",
    account: "Dados da conta",
    email: "E-mail",
    profileLabel: "Perfil",
    phone: "Telefone",
    savedAccount: "Dados da conta atualizados.",
    customization: "Personalização",
    colorLabel: "Cor de identificação",
    colorDesc: "Essa cor aparece no cabeçalho e no avatar.",
    savedColor: "Cor do perfil atualizada.",
    colorUpdated: "Cor atualizada.",
    security: "Segurança",
    changePassword: "Alterar senha",
    changePasswordDesc: "Clique para definir uma nova senha para a sua conta.",
    password: "Senha",
    confirmPassword: "Confirmar senha",
    savedPassword: "Senha atualizada com sucesso.",
    passwordMismatch: "As senhas não coincidem.",
    confirmRequired: "Confirme a senha.",
    save: "Salvar",
    savePassword: "Salvar senha",
    saving: "Salvando...",
    cancel: "Cancelar",
  },
  en: {
    loading: "Loading profile...",
    loadError: "Could not load profile.",
    personal: "Personal information",
    firstName: "First name",
    lastName: "Last name",
    savedName: "Name updated successfully.",
    account: "Account details",
    email: "E-mail",
    profileLabel: "Profile",
    phone: "Phone",
    savedAccount: "Account details updated.",
    customization: "Customization",
    colorLabel: "Identification color",
    colorDesc: "This color appears in the header and avatar.",
    savedColor: "Profile color updated.",
    colorUpdated: "Color updated.",
    security: "Security",
    changePassword: "Change password",
    changePasswordDesc: "Click to set a new password for your account.",
    password: "Password",
    confirmPassword: "Confirm password",
    savedPassword: "Password updated successfully.",
    passwordMismatch: "Passwords do not match.",
    confirmRequired: "Please confirm your password.",
    save: "Save",
    savePassword: "Save password",
    saving: "Saving...",
    cancel: "Cancel",
  },
} satisfies Record<Lang, Record<string, string>>;

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#F59E0B",
  "#22C55E",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#6366F1",
];
const DEFAULT_AVATAR_COLOR = "3B82F6";

// ─── Schemas (defined outside component to avoid recreation) ──────────────────

const personalInfoSchema = z.object({
  firstName: userSchema.shape.firstName,
  lastName: userSchema.shape.lastName,
});

const accountInfoSchema = z.object({
  email: userSchema.shape.email,
  phone: userSchema.shape.phone,
});

const customizationSchema = updateUserSchema.pick({ avatarColor: true });

function makeSecuritySchema(t: typeof T.pt) {
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeAvatarColor(color?: string | null) {
  return (
    color?.replace("#", "").trim().slice(0, 6).toUpperCase() ||
    DEFAULT_AVATAR_COLOR
  );
}

function toColorHex(color?: string | null) {
  return `#${normalizeAvatarColor(color)}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>("pt");
  const { theme, setTheme } = useTheme();
  const t = T[lang];

  useEffect(() => {
    async function load() {
      try {
        const response = await clientAPI.get("/users/me");
        setUser(response.data.data);
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
    const response = await clientAPI.patch("/users/me", payload);
    setUser(response.data.data);
    return response.data.data as UserProfile;
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-black/60 dark:text-white/60">
        {t.loading}
      </div>
    );
  }

  if (!user) return null;

  const avatarColor = toColorHex(user.avatarColor);
  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <main className="space-y-6">
      {/* ── Profile card ── */}
      <div
        className={`overflow-hidden rounded-2xl border shadow-sm transition-colors ${
          theme === "dark"
            ? "border-white/10 bg-black text-white"
            : "border-black/10 bg-white text-black"
        }`}
      >
        {/* Banner */}

        <div className="relative h-36" style={{ backgroundColor: avatarColor }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 dark:to-black/20" />
          <div className="absolute right-4 bottom-4 flex gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                className="h-6 w-6 rounded-full border-2 border-white/70 shadow transition hover:scale-110"
                style={{ backgroundColor: color }}
                onClick={() =>
                  void patchCurrentUser({
                    avatarColor: normalizeAvatarColor(color),
                  }).then(() => toast.success(t.colorUpdated))
                }
              />
            ))}
          </div>
        </div>

        {/* Avatar + name header */}
        <div className="relative px-6 pb-6">
          <div className="flex items-end gap-4">
            <div
              className="-mt-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white text-2xl font-bold text-white shadow-md dark:border-white/10"
              style={{ backgroundColor: avatarColor }}
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className="pb-1">
              <p className="text-lg font-semibold text-black dark:text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-black/60 dark:text-white/60">
                {user.profile?.name ?? "—"} · {user.email ?? "—"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-6 border-t border-black/10 dark:border-white/10" />

          {/* Sections */}
          <div className="mt-6 grid gap-8">
            <PersonalInfoSection user={user} onSave={patchCurrentUser} t={t} />
            <AccountInfoSection user={user} onSave={patchCurrentUser} t={t} />
            <CustomizationSection user={user} onSave={patchCurrentUser} t={t} />
            <SecuritySection onSave={patchCurrentUser} t={t} />
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Section: Personal Info ───────────────────────────────────────────────────

function PersonalInfoSection({
  user,
  onSave,
  t,
}: {
  user: UserProfile;
  onSave: (payload: Record<string, unknown>) => Promise<UserProfile>;
  t: typeof T.pt;
}) {
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
      <SectionHeading>{t.personal}</SectionHeading>
      <FormProvider {...form}>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (data) => {
            await onSave(data);
            toast.success(t.savedName);
          })}
        >
          <div className="grid gap-4 md:grid-cols-2">
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
            t={t}
          />
        </form>
      </FormProvider>
    </section>
  );
}

// ─── Section: Account Info ────────────────────────────────────────────────────

function AccountInfoSection({
  user,
  onSave,
  t,
}: {
  user: UserProfile;
  onSave: (payload: Record<string, unknown>) => Promise<UserProfile>;
  t: typeof T.pt;
}) {
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
      <SectionHeading>{t.account}</SectionHeading>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          await onSave({
            ...data,
            phone: data.phone?.trim() ? data.phone : null,
          });
          toast.success(t.savedAccount);
        })}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label={t.email}
            error={formState.errors.email?.message}
            className="md:col-span-2"
          >
            <Input {...register("email")} />
          </Field>
          <Field label={t.profileLabel}>
            <Input
              value={user.profile?.name ?? "-"}
              readOnly
              className="cursor-default opacity-70"
            />
          </Field>
          <Field label={t.phone} error={formState.errors.phone?.message}>
            <Input
              value={watch("phone") ?? ""}
              onChange={(e) =>
                setValue("phone", toPhone(e.target.value), {
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
          t={t}
        />
      </form>
    </section>
  );
}

// ─── Section: Customization ───────────────────────────────────────────────────

function CustomizationSection({
  user,
  onSave,
  t,
}: {
  user: UserProfile;
  onSave: (payload: Record<string, unknown>) => Promise<UserProfile>;
  t: typeof T.pt;
}) {
  const form = useForm({
    resolver: zodResolver(customizationSchema),
    defaultValues: { avatarColor: normalizeAvatarColor(user.avatarColor) },
  });
  const { handleSubmit, reset, setValue, watch, formState } = form;
  const color = watch("avatarColor");

  useEffect(() => {
    reset({ avatarColor: normalizeAvatarColor(user.avatarColor) });
  }, [reset, user.avatarColor]);

  return (
    <section>
      <SectionHeading>{t.customization}</SectionHeading>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          await onSave({ avatarColor: normalizeAvatarColor(data.avatarColor) });
          toast.success(t.savedColor);
        })}
      >
        <div className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-black">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-black dark:text-white">
                {t.colorLabel}
              </p>
              <p className="text-xs text-black/60 dark:text-white/60">
                {t.colorDesc}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full border-2 border-white shadow-md dark:"
                style={{ backgroundColor: toColorHex(color) }}
              />
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    title={item}
                    className="h-6 w-6 rounded-full border-2 border-transparent transition hover:scale-110 hover:border-white"
                    style={{ backgroundColor: item }}
                    onClick={() =>
                      setValue("avatarColor", normalizeAvatarColor(item), {
                        shouldDirty: true,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <SectionActions
          dirty={formState.isDirty}
          saving={formState.isSubmitting}
          onCancel={() =>
            reset({ avatarColor: normalizeAvatarColor(user.avatarColor) })
          }
          t={t}
        />
      </form>
    </section>
  );
}

// ─── Section: Security ────────────────────────────────────────────────────────

function SecuritySection({
  onSave,
  t,
}: {
  onSave: (payload: Record<string, unknown>) => Promise<UserProfile>;
  t: typeof T.pt;
}) {
  const [editing, setEditing] = useState(false);
  const securitySchema = makeSecuritySchema(t);

  const form = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const { register, handleSubmit, reset, formState } = form;

  if (!editing) {
    return (
      <section>
        <SectionHeading>{t.security}</SectionHeading>
        <button
          type="button"
          className="w-full rounded-xl border  bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 p-4 text-left transition hover:bg-black/5 dark:hover:bg-white/10 "
          onClick={() => setEditing(true)}
        >
          <p className="text-sm font-medium text-black dark:text-white">
            {t.changePassword}
          </p>
          <p className="mt-1 text-xs text-black/60 dark:text-white/60">
            {t.changePasswordDesc}
          </p>
        </button>
      </section>
    );
  }

  return (
    <section>
      <SectionHeading>{t.security}</SectionHeading>
      <form
        className="space-y-4 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-black"
        onSubmit={handleSubmit(async (data) => {
          await onSave({ password: data.password });
          toast.success(t.savedPassword);
          reset({ password: "", confirmPassword: "" });
          setEditing(false);
        })}
      >
        <div className="grid gap-4 md:grid-cols-2">
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
          t={t}
        />
      </form>
    </section>
  );
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
      {children}
    </h2>
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
      <label className="mb-1.5 block text-xs font-medium text-black/70 dark:text-white/70">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function SectionActions({
  dirty,
  saving,
  onCancel,
  submitLabel,
  t,
}: {
  dirty: boolean;
  saving: boolean;
  onCancel: () => void;
  submitLabel?: string;
  t: typeof T.pt;
}) {
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

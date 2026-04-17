import { redirect } from "next/navigation";
import { AppHeader } from "@/components/layout/app-header";
import { getSession } from "@/lib/auth/session";
import { LanguageProvider } from "@/components/providers/language-context";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/sign-in");

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-transparent">
        <AppHeader />
        <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
      </div>
    </LanguageProvider>
  );
}

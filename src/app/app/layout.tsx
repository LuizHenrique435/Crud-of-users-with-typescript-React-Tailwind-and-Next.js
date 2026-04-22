import { redirect } from "next/navigation";
import { AppHeader } from "@/components/layout/app-header";
import { getSession } from "@/lib/auth/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/sign-in");

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <AppHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

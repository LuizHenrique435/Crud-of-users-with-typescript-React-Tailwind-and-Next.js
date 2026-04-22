import { readAppData } from "@/lib/database/store";
import DashboardClient from "./_components/dashboard-client";

export default async function AppPage() {
  const data = await readAppData();

  return (
    <DashboardClient
      userCount={data.users.length}
      profileCount={data.profiles.length}
      activeUserCount={data.users.filter((user) => user.status === "ACTIVE").length}
    />
  );
}

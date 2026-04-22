import { readAppData } from "@/lib/database/store";
import ProfilesClient from "@/app/app/_components/profiles-client";

export default async function ProfilesPage() {
  const data = await readAppData();
  return <ProfilesClient profiles={data.profiles} users={data.users} />;
}

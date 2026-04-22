import { readAppData, withProfile } from "@/lib/database/store";
import UsersClient from "@/app/app/_components/users-client";

export default async function UsersPage() {
  const data = await readAppData();
  const users = data.users.map((user) => withProfile(user, data.profiles));

  return <UsersClient users={users} />;
}

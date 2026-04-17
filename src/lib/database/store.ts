import { promises as fs } from "node:fs";
import path from "node:path";

export type StoredProfile = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StoredUser = {
  id: number;
  firstName: string;
  lastName: string;
  username: string | null;
  email: string | null;
  password: string;
  phone: string | null;
  language: string;
  theme: string | null;
  avatar: string | null;
  avatarColor: string | null;
  status: "ACTIVE" | "INACTIVE";
  profileId: number;
  createdAt: string;
  updatedAt: string;
};

export type AppData = {
  profiles: StoredProfile[];
  users: StoredUser[];
};

const filePath = path.join(process.cwd(), "data", "app-data.json");

export async function readAppData(): Promise<AppData> {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as AppData;
}

export async function writeAppData(data: AppData) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function withProfile(user: StoredUser, profiles: StoredProfile[]) {
  return {
    ...user,
    profile: profiles.find((profile) => profile.id === user.profileId) ?? null,
  };
}

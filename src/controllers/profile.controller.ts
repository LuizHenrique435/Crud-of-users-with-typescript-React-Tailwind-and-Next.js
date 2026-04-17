import { profileSchema } from "@/validators/profile.schema";
import { failure, success } from "./@base";
import { readAppData, writeAppData } from "@/lib/database/store";

export async function getProfiles() {
  const data = await readAppData();
  const profiles = data.profiles.map((profile) => ({
    ...profile,
    _count: {
      users: data.users.filter((user) => user.profileId === profile.id).length,
    },
  }));

  return success(profiles);
}

export async function createProfile(input: Record<string, unknown>) {
  const validation = await profileSchema.safeParseAsync(input);
  if (!validation.success) return failure("Dados inválidos.", "Revise os campos do formulário.", 422);

  const data = await readAppData();
  const profile = {
    ...validation.data,
    description: validation.data.description ?? null,
    id: Math.max(0, ...data.profiles.map((item) => item.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.profiles.push(profile);
  await writeAppData(data);
  return success(profile, 201);
}

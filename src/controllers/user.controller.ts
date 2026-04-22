import bcrypt from "bcryptjs";
import { createUserSchema, updateUserSchema } from "@/validators/user.schema";
import { failure, success, type Response } from "./@base";
import { readAppData, withProfile, writeAppData } from "@/lib/database/store";

export async function getUsers() {
  const data = await readAppData();
  return success(data.users.map((user) => withProfile(user, data.profiles)));
}

export async function findMyself(userId: number) {
  const data = await readAppData();
  const user = data.users.find((item) => item.id === userId);
  if (!user) {
    return failure("Usuário não encontrado.", "Verifique a sessão atual.", 404);
  }

  return success(withProfile(user, data.profiles));
}

export async function updateCurrentUser(
  userId: number,
  input: Record<string, unknown>,
) {
  const validation = await updateUserSchema.partial().safeParseAsync(input);
  if (!validation.success) {
    return failure("Dados inválidos.", "Revise os campos do formulário.", 422);
  }

  const data = await readAppData();
  const index = data.users.findIndex((item) => item.id === userId);
  if (index < 0) {
    return failure("Usuário não encontrado.", "Verifique a sessão atual.", 404);
  }

  const current = data.users[index];
  const nextPassword =
    typeof validation.data.password === "string" && validation.data.password
      ? await bcrypt.hash(validation.data.password, 10)
      : current.password;

  data.users[index] = {
    ...current,
    ...validation.data,
    password: nextPassword,
    updatedAt: new Date().toISOString(),
  };

  await writeAppData(data);
  return success(withProfile(data.users[index], data.profiles));
}

export async function createUser(input: Record<string, unknown>) {
  const data = await readAppData();
  const defaultProfile =
    data.profiles.find((profile) => /manager/i.test(profile.name)) ??
    data.profiles[0];

  if (!defaultProfile) {
    return failure(
      "Nenhum perfil disponível.",
      "Cadastre um perfil antes de criar usuários.",
      500,
    );
  }

  const normalizedInput = {
    ...input,
    username:
      typeof input.username === "string" && !input.username.trim()
        ? null
        : input.username,
    email:
      typeof input.email === "string" && !input.email.trim()
        ? null
        : input.email,
    phone:
      typeof input.phone === "string" && !input.phone.trim()
        ? null
        : input.phone,
    profileId:
      typeof input.profileId === "number" || typeof input.profileId === "string"
        ? input.profileId
        : defaultProfile.id,
    language:
      typeof input.language === "string" && input.language.trim()
        ? input.language
        : "pt-BR",
    status:
      input.status === "ACTIVE" || input.status === "INACTIVE"
        ? input.status
        : "ACTIVE",
    avatarColor:
      typeof input.avatarColor === "string" && input.avatarColor.trim()
        ? input.avatarColor
        : "111111",
  };

  const validation = await createUserSchema.safeParseAsync(normalizedInput);
  if (!validation.success) {
    return failure("Dados inválidos.", "Revise os campos do formulário.", 422);
  }

  const user = {
    id: Math.max(0, ...data.users.map((item) => item.id)) + 1,
    firstName: validation.data.firstName,
    lastName: validation.data.lastName,
    username: validation.data.username ?? null,
    email: validation.data.email ?? null,
    password: await bcrypt.hash(validation.data.password, 10),
    phone: validation.data.phone ?? null,
    language: validation.data.language,
    theme: validation.data.theme ?? null,
    avatar: null,
    avatarColor: validation.data.avatarColor ?? "111111",
    status: validation.data.status,
    profileId: validation.data.profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.users.push(user);
  await writeAppData(data);
  return success(withProfile(user, data.profiles), 201);
}

export async function signIn(
  username: string,
  password: string,
): Promise<Response<{ userId: number }>> {
  const data = await readAppData();
  const user = data.users.find(
    (item) => item.username === username || item.email === username,
  );
  if (!user) {
    return failure("Credenciais inválidas.", "Verifique usuário e senha.", 401);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return failure("Credenciais inválidas.", "Verifique usuário e senha.", 401);
  }

  return success({ userId: user.id });
}

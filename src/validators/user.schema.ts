import z from "@/lib/utils/zod";

const baseUserSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, "cant-be-blank").min(3, "too-small").max(255, "too-long"),
  lastName: z.string().min(1, "cant-be-blank").min(3, "too-small").max(255, "too-long"),
  username: z.union([z.literal("").transform(() => null), z.string().min(3)]).nullable(),
  email: z.string().min(1, "cant-be-blank").max(255, "email-too-long").email("invalid-email").nullable(),
  phone: z.string().nullish(),
  profileId: z.coerce.number().min(1, "cant-be-blank"),
  language: z.string().min(1, "cant-be-blank").default("pt-BR"),
  theme: z.string().nullish(),
  status: z.enum(["INACTIVE", "ACTIVE"]).default("ACTIVE"),
  avatarColor: z.string().length(6, "invalid-color").regex(/^[0-9A-Fa-f]{6}$/, "invalid-color").nullish()
});

export const createUserSchema = z.object({
  ...baseUserSchema.shape,
  password: z.string().min(6, "too-small").max(96, "too-long")
});

export const updateUserSchema = z.object({
  ...baseUserSchema.shape,
  password: z.union([z.literal("").transform(() => undefined), z.string().min(6).max(96)])
});

export const userSchema = z.object({
  ...baseUserSchema.shape,
  password: z.string().max(96, "too-long").optional().transform((value) => (value ? value : undefined))
});

export type UserInput = z.input<typeof userSchema>;
export type UserOutput = z.infer<typeof userSchema>;
export type CreateUserInput = z.input<typeof createUserSchema>;
export type CreateUserOutput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.input<typeof updateUserSchema>;
export type UpdateUserOutput = z.infer<typeof updateUserSchema>;

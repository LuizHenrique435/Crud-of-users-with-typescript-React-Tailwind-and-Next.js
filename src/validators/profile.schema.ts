import z from "@/lib/utils/zod";

export const profileSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "too-small").max(255, "too-long"),
  description: z.string().nullable().optional()
});

export type ProfileInput = z.input<typeof profileSchema>;
export type ProfileOutput = z.infer<typeof profileSchema>;

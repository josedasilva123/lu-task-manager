import { z } from "zod";

export const localSchema = z.object({
   id: z.string().min(1),
   name: z.string().min(1).max(20),
});

export type TLocal = z.infer<typeof localSchema>;

export const localCreateDataSchema = localSchema.pick({ name: true });

export type TLocalBody = z.infer<typeof localCreateDataSchema>;

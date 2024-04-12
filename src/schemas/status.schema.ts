import { z } from "zod";

export const statusSchema = z.object({
   id: z.string().min(1),
   name: z.string().min(1).max(20),
});

export type TStatus = z.infer<typeof statusSchema>;

export const statusCreateSchema = statusSchema.pick({ name: true });

export type TStatusBody = z.infer<typeof statusCreateSchema>;

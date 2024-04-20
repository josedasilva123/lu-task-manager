import { z } from "zod";

export const categorySchema = z.object({
   id: z.string().min(1),
   name: z.string().min(1).max(20),
   createdAt: z.string().datetime(),
});

export type TCategory = z.infer<typeof categorySchema>;

export const categoryCreateSchema = categorySchema.pick({ name: true });

export type TCategoryBody = z.infer<typeof categoryCreateSchema>;

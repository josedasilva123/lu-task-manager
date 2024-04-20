import { z } from "zod";

export const classificationSchema = z.object({
   id: z.string().min(1),
   name: z.string().min(1).max(20),
   createdAt: z.string().datetime(),
});

export type TClassfication = z.infer<typeof classificationSchema>;

export const classificationCreateSchema = classificationSchema.pick({ name: true });

export type TClassficationBody = z.infer<typeof classificationCreateSchema>;

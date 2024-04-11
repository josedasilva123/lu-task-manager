import { z } from "zod";

export const classificationSchema = z.object({
   id: z.string().min(1),
   name: z.string().min(1).max(20),
});

export type TClassfication = z.infer<typeof classificationSchema>;

export const classificationCreateDataSchema = classificationSchema.pick({ name: true });

export type TClassficationBody = z.infer<typeof classificationCreateDataSchema>;

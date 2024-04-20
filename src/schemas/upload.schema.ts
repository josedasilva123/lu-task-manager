import { z } from "zod";

export const uploadSchema = z.object({
   name: z.string().min(1),
   contentType: z.string().min(1),
   createdAt: z.string().datetime(),
});

export type TUpload = z.infer<typeof uploadSchema>;

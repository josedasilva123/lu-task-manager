import { z } from "zod";

export const uploadSchema = z.object({
   name: z.string().min(1),
   contentType: z.string().min(1),
});

export type TUpload = z.infer<typeof uploadSchema>;

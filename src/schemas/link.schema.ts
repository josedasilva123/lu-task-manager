import { z } from "zod";

export const linkSchema = z.object({
    id: z.string().min(1),
    url: z.string().url(),
    taskId: z.string().min(1)
})

export type TLink = z.infer<typeof linkSchema>;

export const linkCreateSchema = linkSchema.pick({ url: true });

export type TLinkBody = z.infer<typeof linkCreateSchema>;
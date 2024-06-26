import { z } from "zod";

export const linkSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    url: z.string().url(),
    taskId: z.string().min(1),
    createdAt: z.string().datetime(),
})

export type TLink = z.infer<typeof linkSchema>;

export const linkCreateSchema = linkSchema.pick({ title: true, url: true });

export type TLinkBody = z.infer<typeof linkCreateSchema>;
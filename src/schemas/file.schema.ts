import { z } from "zod";

export const fileSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().nullish(),
    key: z.string().min(1),
    url: z.string().url(),
    createdAt: z.string().datetime(),
});

export type TFile = z.infer<typeof fileSchema>;

export const fileCreateSchema = fileSchema.pick({ name: true, description: true, key: true, url: true });

export type TFileCreateData = z.infer<typeof fileCreateSchema>;

export const filePostSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullish(),
    contentType: z.string().min(1),
});

export type TFilePostData = z.infer<typeof filePostSchema>;
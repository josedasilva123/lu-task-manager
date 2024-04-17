import { z } from "zod";

export const fileSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    key: z.string().min(1),
    url: z.string().url(),
});

export type TFile = z.infer<typeof fileSchema>;

export const fileCreateSchema = fileSchema.pick({ name: true, key: true, url: true });

export type TFileCreateData = z.infer<typeof fileCreateSchema>;

export const filePostSchema = z.object({
    name: z.string().min(1),
    contentType: z.string().min(1),
});

export type TFilePostData = z.infer<typeof filePostSchema>;
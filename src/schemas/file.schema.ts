import { z } from "zod";

export const fileSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    key: z.string().min(1),
    url: z.string().url(),
    taskId: z.string().min(1).nullish()
});

export type TFile = z.infer<typeof fileSchema>;

export const fileCreateDataSchema = fileSchema.pick({ name: true, key: true, url: true });

export type TFileCreateData = z.infer<typeof fileCreateDataSchema>;
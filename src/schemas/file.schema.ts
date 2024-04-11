import { z } from "zod";

export const fileSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    url: z.string().min(1),
    taskId: z.string().min(1)
});

export type TFile = z.infer<typeof fileSchema>;

export const fileCreateDataSchema = fileSchema.pick({ name: true, url: true, taskId: true });

export type TFileCreateData = z.infer<typeof fileCreateDataSchema>;
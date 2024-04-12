import { z } from "zod";
import { localSchema } from "./local.schema";
import { classificationSchema } from "./classification.schema";
import { categorySchema } from "./category.schema";
import { statusSchema } from "./status.schema";
import { linkSchema } from "./link.schema";
import { fileSchema } from "./file.schema";

export const taskSchema = z.object({
    id: z.string().min(1),
    localId: z.string().min(1).nullish(),
    local: localSchema.optional(),
    classificationId: z.string().min(1).nullish(),
    classification: classificationSchema.optional(),
    title: z.string().min(1).max(20),
    categories: z.array(categorySchema),
    description: z.string().min(1),
    statusId: z.string().min(1).nullish(),
    status: statusSchema.optional(),
    links: z.array(linkSchema),
    files: z.array(fileSchema),
    date: z.string().min(1).nullish(),
    userId: z.string().min(1),
    lastUserId: z.string().min(1),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullish(),
    isDeleted: z.boolean()
});

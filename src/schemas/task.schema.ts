import { z } from "zod";
import { localSchema } from "./local.schema";
import { classificationSchema } from "./classification.schema";
import { categorySchema } from "./category.schema";
import { statusSchema } from "./status.schema";
import { linkCreateSchema, linkSchema } from "./link.schema";
import { fileSchema } from "./file.schema";

export const connectSchema = z.object({
   id: z.string().min(1),
});

export type TConnect = z.infer<typeof connectSchema>;

export const taskSchema = z.object({
   id: z.string().min(1),
   localId: z.string().min(1).nullish(),
   local: localSchema.optional(),
   classificationId: z.string().min(1).nullish(),
   classification: classificationSchema.optional(),
   title: z.string().min(1).max(20),
   categories: z.array(categorySchema).optional(),
   description: z.string().min(1),
   statusId: z.string().min(1).nullish(),
   status: statusSchema.optional(),
   links: z.array(linkSchema).optional(),
   files: z.array(fileSchema).optional(),
   date: z.string().min(1).nullish(),
   userId: z.string().min(1),
   lastUserId: z.string().min(1),
   createdAt: z.string().datetime(),
   updatedAt: z.string().datetime().nullish(),
   isDeleted: z.boolean(),
});

export type TTask = z.infer<typeof taskSchema>;

export const taskCreateSchema = taskSchema
   .pick({
      localId: true,
      classificationId: true,
      title: true,
      description: true,
      statusId: true,
      date: true,
   })
   .merge(
      z.object({
         categories: z.array(connectSchema),
         links: z.array(linkCreateSchema),
         files: z.array(connectSchema),
      })
   );

export type TTaskCreateData = z.infer<typeof taskCreateSchema>;

export const taskUpdateSchema = taskSchema
   .pick({
      localId: true,
      classificationId: true,
      title: true,
      description: true,
      statusId: true,
      date: true,
   })
   .merge(
      z.object({
         categories: z.array(connectSchema),
      })
   )
   .partial();

export type TTaskUpdateData = z.infer<typeof taskUpdateSchema>;

import { prisma } from "../../database/prisma";
import { TTaskCreateData } from "../../schemas/task.schema";

export const create = async (userId: string, data: TTaskCreateData) => {
   const task = await prisma.task.create({
      data: {
         localId: data.localId,
         classficationId: data.classificationId,
         title: data.title,
         description: data.description,
         statusId: data.statusId,
         date: data.date,
         categories: {
            connect: data.categories,
         },
         links: {
            createMany: { data: data.links },
         },
         files: {
            connect: data.files,
         },
         userId,
      },
      include: {
         local: true,
         classfication: true,
         categories: true,
         links: true,
         files: true,
      },
   });

   return task;
};

/*
export const taskCreateSchema = taskSchema.pick({
    localId: true,
    classificationId: true,
    title: true,
    description: true,
    statudId: true,
    date: true,
}).merge(z.object({
    categories: z.array(connectSchema),
    links: z.array(linkCreateDataSchema),
    files: z.array(connectSchema),
}));
*/
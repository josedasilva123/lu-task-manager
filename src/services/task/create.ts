import { prisma } from "../../database/prisma";
import { TTaskCreateData } from "../../schemas/task.schema";

export const create = async (userId: string, data: TTaskCreateData) => {
   const now = new Date();

   const task = await prisma.task.create({
      data: {
         localId: data.localId,
         classificationId: data.classificationId,
         title: data.title,
         description: data.description,
         owner: data.owner,
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
         updatedAt: now
      },
   });

   return task;
};


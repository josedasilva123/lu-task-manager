import { prisma } from "../../database/prisma";
import { TTaskCreateData } from "../../schemas/task.schema";

export const create = async (userId: string, data: TTaskCreateData) => {
   const task = await prisma.task.create({
      data: {
         localId: data.localId,
         classficationId: data.classficationId,
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
   });

   return task;
};


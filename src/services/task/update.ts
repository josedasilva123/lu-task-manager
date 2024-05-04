import { prisma } from "../../database/prisma";
import { TTaskUpdateData } from "../../schemas/task.schema";

export const update = async (id: string, userId: string, data: TTaskUpdateData) => {
   const task = await prisma.task.update({
      where: { id },
      data: {
         localId: data.localId,
         classficationId: data.classificationId,
         title: data.title,
         description: data.description,
         statusId: data.statusId,
         date: data.date,
         lastUserId: userId,
         categories: { set: data.categories },
         links: {
            createMany: { data: data.creatingLinks ? data.creatingLinks : [] },
            deleteMany: data.deletingLinks,
         },
         files: { set: data.files },       
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

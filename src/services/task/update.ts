import { prisma } from "../../database/prisma";
import { TTaskUpdateData } from "../../schemas/task.schema";

export const update = async (id: string, userId: string, data: TTaskUpdateData) => {
   const now = new Date();

   const user = await prisma.user.findUnique({ where: { id: userId } });

   const task = await prisma.task.update({
      where: { id },
      data: {
         localId: data.localId,
         classificationId: data.classificationId,
         title: data.title,
         description: data.description,
         statusId: data.statusId,
         date: data.date,
         lastUserName: user?.name,
         categories: { set: data.categories },
         links: {
            createMany: { data: data.creatingLinks ? data.creatingLinks : [] },
            deleteMany: data.deletingLinks,
         },
         files: { set: data.files },
         updatedAt: now,
      },
   });

   return task;
};

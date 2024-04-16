import { prisma } from "../../database/prisma";
import { TTaskUpdateData } from "../../schemas/task.schema";

export const update = async (id: string, userId: string, data: TTaskUpdateData) => {
   const task = await prisma.task.update({
      where: { id },
      data: { ...data, lastUserId: userId, categories: { set: data.categories } },
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

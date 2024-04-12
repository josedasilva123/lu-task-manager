import { prisma } from "../../database/prisma";

export const getOne = async (id: string) => {
   const task = await prisma.task.findFirst({
      where: { id },
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

import { prisma } from "../../database/prisma";

export const disconnect = async (id: string, taskId: string) => {
   await prisma.file.update({
      where: { id },
      data: { tasks: { disconnect: { id: taskId } } },
   });
};

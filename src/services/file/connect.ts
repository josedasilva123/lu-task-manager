import { prisma } from "../../database/prisma";

export const connect = async (id: string, taskId: string) => {
   await prisma.file.update({
      where: { id },
      data: { tasks: { connect: { id: taskId } } },
   });
};

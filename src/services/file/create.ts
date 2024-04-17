import { prisma } from "../../database/prisma";
import { TFileCreateData } from "../../schemas/file.schema";

export const create = async (data: TFileCreateData, taskId?: string) => {
   const file = await prisma.file.create({
      data: { ...data, tasks: { connect: [{ id: taskId }] } },
   });

   return file;
};

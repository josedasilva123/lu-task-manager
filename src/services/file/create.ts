import { prisma } from "../../database/prisma";
import { TFileCreateData } from "../../schemas/file.schema";

export const create = async (data: TFileCreateData) => {
   const file = await prisma.file.create({ data });

   return file;
};

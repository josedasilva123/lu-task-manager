import { prisma } from "../../database/prisma";
import { TLocalBody } from "../../schemas/local.schema";

export const update = async (id: string, data: TLocalBody) => {
   const local = await prisma.local.update({ where: { id }, data });

   return local;
};

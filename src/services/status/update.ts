import { prisma } from "../../database/prisma";
import { TStatusBody } from "../../schemas/status.schema";

export const update = async (id: string, data: TStatusBody) => {
   const status = await prisma.status.update({ where: { id }, data });

   return status;
};

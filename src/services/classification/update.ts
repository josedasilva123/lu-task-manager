import { prisma } from "../../database/prisma";
import { TClassficationBody } from "../../schemas/classification.schema";

export const update = async (id: string, data: TClassficationBody) => {
   const classification = await prisma.classification.update({ where: { id }, data });

   return classification;
};

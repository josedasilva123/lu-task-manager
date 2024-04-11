import { prisma } from "../../database/prisma";
import { TClassficationBody } from "../../schemas/classification.schema";

export const create = async (data: TClassficationBody) => {
   const classification = await prisma.classification.create({ data });

   return classification;
};

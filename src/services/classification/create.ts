import { prisma } from "../../database/prisma";
import { TCategoryBody } from "../../schemas/category.schema";

export const create = async (data: TCategoryBody) => {
   const classification = await prisma.classification.create({ data });

   return classification;
};

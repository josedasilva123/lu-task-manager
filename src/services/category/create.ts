import { prisma } from "../../database/prisma";
import { TCategoryBody } from "../../schemas/category.schema";

export const create = async (data: TCategoryBody) => {
   const category = await prisma.category.create({ data });

   return category;
};

import { prisma } from "../../database/prisma";
import { TCategoryBody } from "../../schemas/category.schema";

export const update = async (id: string, data: TCategoryBody) => {
   const category = await prisma.category.update({ where: { id }, data });

   return category;
};

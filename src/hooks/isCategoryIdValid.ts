import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";
import { AppError } from "../error/AppError";

export const isCategoryIdValid = async (
   req: FastifyRequest<{ Params: { id: string } }>,
   res: FastifyReply
) => {
   const existingCategory = await prisma.category.findUnique({
      where: { id: req.params.id },
   });

   if (!existingCategory) {
      throw new AppError("Category not found.", 404);
   }
};

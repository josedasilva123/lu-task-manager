import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";
import { AppError } from "../error/AppError";

export const isClassificationIdValid = async (
   req: FastifyRequest<{ Params: { id: string } }>,
   res: FastifyReply
) => {
   const existingClassification = await prisma.classification.findUnique({
      where: { id: req.params.id },
   });

   if (!existingClassification) {
      throw new AppError("Classification not found.", 404);
   }
};

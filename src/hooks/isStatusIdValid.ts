import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";
import { AppError } from "../error/AppError";

export const isStatusIdValid = async (
   req: FastifyRequest<{ Params: { id: string } }>,
   res: FastifyReply
) => {
   const existingStatus = await prisma.status.findUnique({
      where: { id: req.params.id },
   });

   if (!existingStatus) {
      throw new AppError("Status not found.", 404);
   }
};

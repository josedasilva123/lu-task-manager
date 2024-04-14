import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";
import { AppError } from "../error/AppError";

export const isLocalIdValid = async (
   req: FastifyRequest<{ Params: { id: string } }>,
   res: FastifyReply
) => {
   const existingLocal = await prisma.local.findUnique({
      where: { id: req.params.id },
   });

   if (!existingLocal) {
      throw new AppError("Local not found.", 404);
   }
};

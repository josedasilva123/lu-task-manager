import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";
import { AppError } from "../error/AppError";

export const isLinkIdValid = async (
   req: FastifyRequest<{ Params: { id: string } }>,
   res: FastifyReply
) => {
   const existingLink = await prisma.link.findUnique({
      where: { id: req.params.id },
   });

   if (!existingLink) {
      throw new AppError("Link not found.", 404);
   }
};

import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";
import { AppError } from "../error/AppError";

export const isTaskIdValid = async (
   req: FastifyRequest<{ Params: { id: string } }>,
   res: FastifyReply
) => {
   const existingTask = await prisma.task.findUnique({
      where: { id: req.params.id },
   });

   if (!existingTask) {
      throw new AppError("Task not found.", 404);
   }
};

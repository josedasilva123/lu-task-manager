import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";
import { AppError } from "../error/AppError";

export const isLinkTaskIdValid = async (
   req: FastifyRequest<{ Params: { taskId: string } }>,
   res: FastifyReply
) => {
   const existingTask = await prisma.task.findUnique({
      where: { id: req.params.taskId },
   });

   if (!existingTask) {
      throw new AppError("Task not found.", 404);
   }
};

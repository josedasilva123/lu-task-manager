import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./AppError";
import { ZodError } from "zod";

export const errorHandler = (error: Error, req: FastifyRequest, res: FastifyReply) => {
   if (error instanceof AppError) {
      return res.status(error.statusCode).send({ message: error.message });
   }

   console.log(error);
   return res.status(500).send({ message: "Internal server error."});
};

import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../error/AppError";

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
   try {
      await req.jwtVerify();
   } catch (error) {
      if (error instanceof Error) {
         throw new AppError(error.message, 401);
      }
   }
};

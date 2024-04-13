import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, ZodSchema } from "zod";

export const validateBody = async (
   req: FastifyRequest,
   res: FastifyReply,
   schema: ZodSchema
) => {
   try {
      req.body = schema.parse(req.body);
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(422).send({ errors: error });
      }
   }
};

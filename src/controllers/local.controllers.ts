import { FastifyInstance } from "fastify";
import { TLocalBody, localCreateSchema } from "../schemas/local.schema";
import { authenticate } from "../hooks/authenticate";
import { validateBody } from "../hooks/validateBody";
import { localService } from "../services/local/_index";
import { isLocalIdValid } from "../hooks/isLocalIdValid";

interface Params {
   id: string;
}

export const localControllers = async (fastify: FastifyInstance) => {
   fastify.addHook("preHandler", authenticate);

   fastify.post<{ Body: TLocalBody }>(
      "/",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, localCreateSchema);
         },
      },
      async (req, res) => {
         const response = await localService.create(req.body);

         return res.status(201).send(response);
      }
   );

   fastify.get("/", async (req, res) => {
      const response = await localService.getMany();

      return res.status(200).send(response);
   });

   fastify.get<{ Params: Params }>("/:id", async (req, res) => {
      const response = await localService.getOne(req.params.id);

      return res.status(200).send(response);
   });

   fastify.delete<{ Params: Params }>(
      "/:id",
      { preHandler: isLocalIdValid },
      async (req, res) => {
         const response = await localService.remove(req.params.id);

         return res.status(200).send(response);
      }
   );

   fastify.patch<{ Body: TLocalBody; Params: Params }>(
      "/:id",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, localCreateSchema);
            await isLocalIdValid(req, res);
         },
      },
      async (req, res) => {
         const response = await localService.update(req.params.id, req.body);

         return res.status(200).send(response);
      }
   );
};

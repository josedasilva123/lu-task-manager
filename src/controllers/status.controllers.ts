import { FastifyInstance } from "fastify";
import { TStatusBody, statusCreateSchema } from "../schemas/status.schema";
import { authenticate } from "../hooks/authenticate";
import { validateBody } from "../hooks/validateBody";
import { isStatusIdValid } from "../hooks/isStatusIdValid";
import { statusService } from "../services/status/_index";

interface Params {
   id: string;
}

export const statusControllers = async (fastify: FastifyInstance) => {
   fastify.addHook("preHandler", authenticate);

   fastify.post<{ Body: TStatusBody }>(
      "/",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, statusCreateSchema);
         },
      },
      async (req, res) => {
         const response = await statusService.create(req.body);

         return res.status(201).send(response);
      }
   );

   fastify.get("/", async (req, res) => {
      const response = await statusService.getMany();

      return res.status(200).send(response);
   });

   fastify.get<{ Params: Params }>("/:id", async (req, res) => {
      const response = await statusService.getOne(req.params.id);

      return res.status(200).send(response);
   });

   fastify.delete<{ Params: Params }>(
      "/:id",
      { preHandler: isStatusIdValid },
      async (req, res) => {
         const response = await statusService.remove(req.params.id);

         return res.status(200).send(response);
      }
   );

   fastify.patch<{ Body: TStatusBody; Params: Params }>(
      "/:id",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, statusCreateSchema);
            await isStatusIdValid(req, res);
         },
      },
      async (req, res) => {
         const response = await statusService.update(req.params.id, req.body);

         return res.status(200).send(response);
      }
   );
};

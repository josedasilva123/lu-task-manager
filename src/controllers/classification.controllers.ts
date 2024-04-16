import { FastifyInstance } from "fastify";
import {
   TClassficationBody,
   classificationCreateSchema,
} from "../schemas/classification.schema";
import { authenticate } from "../hooks/authenticate";
import { validateBody } from "../hooks/validateBody";
import { classificationService } from "../services/classification/_index";
import { isClassificationIdValid } from "../hooks/isClassificationIdValid";

interface Params {
   id: string;
}

export const classificationControllers = async (fastify: FastifyInstance) => {
   fastify.addHook("preHandler", authenticate);

   fastify.post<{ Body: TClassficationBody }>(
      "/",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, classificationCreateSchema);
         },
      },
      async (req, res) => {
         const response = await classificationService.create(req.body);

         return res.status(201).send(response);
      }
   );

   fastify.get("/", async (req, res) => {
      const response = await classificationService.getMany();

      return res.status(200).send(response);
   });

   fastify.get<{ Params: Params }>("/:id", async (req, res) => {
      const response = await classificationService.getOne(req.params.id);

      return res.status(200).send(response);
   });

   fastify.delete<{ Params: Params }>(
      "/:id",
      { preHandler: isClassificationIdValid },
      async (req, res) => {
         const response = await classificationService.remove(req.params.id);

         return res.status(200).send(response);
      }
   );

   fastify.patch<{ Body: TClassficationBody; Params: Params }>(
      "/:id",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, classificationCreateSchema);
            await isClassificationIdValid(req, res);
         },
      },
      async (req, res) => {
         const response = await classificationService.update(req.params.id, req.body);

         return res.status(200).send(response);
      }
   );
};

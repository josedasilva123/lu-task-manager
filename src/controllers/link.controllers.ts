import { FastifyInstance } from "fastify";
import { linkService } from "../services/link/_index";
import { TLinkBody, linkCreateSchema } from "../schemas/link.schema";
import { validateBody } from "../hooks/validateBody";
import { isTaskIdValid } from "../hooks/isTaskIdValid";
import { isLinkIdValid } from "../hooks/isLinkIdValid";

interface Params {
   taskId: string;
}

interface RemoveParams extends Params {
   id: string;
}

export const linkControllers = async (fastify: FastifyInstance) => {
   fastify.addHook("preHandler", isTaskIdValid);

   fastify.post<{ Body: TLinkBody; Params: Params }>(
      "/",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, linkCreateSchema);
         },
      },
      async (req, res) => {
         const response = await linkService.create(req.params.taskId, req.body);

         return res.status(201).send(response);
      }
   );

   fastify.get<{ Params: Params }>("/", async (req, res) => {
      console.log(req.params);
      const response = await linkService.getMany(req.params.taskId);

      return res.status(200).send(response);
   });

   fastify.delete<{ Params: RemoveParams }>(
      "/:id",
      { preHandler: isLinkIdValid },
      async (req, res) => {
         const response = await linkService.remove(req.params.id);

         return res.status(200).send(response);
      }
   );
};

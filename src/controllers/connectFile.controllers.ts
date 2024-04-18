import { FastifyInstance } from "fastify";
import { fileService } from "../services/file/_index";
import { request } from "http";

interface Params {
   taskId: string;
   id: string;
}

export const connectFileControllers = async (fastify: FastifyInstance) => {
   fastify.patch<{ Params: Params }>("/:id/connect", async (req, res) => {
      const response = await fileService.connect(req.params.id, req.params.taskId);

      return res.status(200).send(response);
   });

   fastify.patch<{ Params: Params }>("/:id/disconnect", async (req, res) => {
      const response = await fileService.disconnect(req.params.id, req.params.taskId);

      return res.status(200).send(response);
   });
};

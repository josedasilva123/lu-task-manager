import { FastifyInstance } from "fastify";
import { authenticate } from "../hooks/authenticate";
import {
   TTaskCreateData,
   TTaskUpdateData,
   taskCreateSchema,
   taskUpdateSchema,
} from "../schemas/task.schema";
import { validateBody } from "../hooks/validateBody";
import { taskService } from "../services/task/_index";
import { IDecodedToken } from "../interfaces/token.interface";
import { IFilters } from "../interfaces/filter.interface";
import { IPagination } from "../interfaces/pagination.interface";
import { isTaskIdValid } from "../hooks/isTaskIdValid";
import { linkControllers } from "./link.controllers";
import { connectFileControllers } from "./connectFile.controllers";

interface Params {
   id: string;
}

export const taskControllers = async (fastify: FastifyInstance) => {
   fastify.addHook("preHandler", authenticate);

   fastify.post<{ Body: TTaskCreateData }>(
      "/",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, taskCreateSchema);
         },
      },
      async (req, res) => {
         const { id } = await req.jwtDecode<IDecodedToken>();

         const response = await taskService.create(id, req.body);

         return res.status(201).send(response);
      }
   );

   fastify.get<{ Querystring: IFilters & IPagination }>("/", async (req, res) => {
      const filters: IFilters = {
         search: req.query.search,
         categoryId: req.query.categoryId,
         statusId: req.query.statusId,
         localId: req.query.localId,
         date: req.query.date,
      };

      const pagination: IPagination = {
         skip: req.query.skip ? +req.query.skip : undefined,
         take: req.query.take ? +req.query.take : undefined,
      };

      const response = await taskService.getMany(filters, pagination);

      return res.status(200).send(response);
   });

   fastify.get<{ Params: Params }>("/:id", async (req, res) => {
      const response = await taskService.getOne(req.params.id);

      return res.status(200).send(response);
   });

   fastify.delete<{ Params: Params }>(
      "/:id",
      { preHandler: isTaskIdValid },
      async (req, res) => {
         await taskService.softRemove(req.params.id);

         return res.status(204).send();
      }
   );

   fastify.patch<{ Body: TTaskUpdateData; Params: Params }>(
      "/:id",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, taskUpdateSchema);
            await isTaskIdValid(req, res);
         },
      },
      async (req, res) => {
         const { id } = await req.jwtDecode<IDecodedToken>();

         const response = await taskService.update(req.params.id, id, req.body);

         return res.status(200).send(response);
      }
   );

   fastify.register(linkControllers, {
      prefix: "/:taskId/links",
   });

   fastify.register(connectFileControllers, {
      prefix: "/:taskId/files",
   });
};

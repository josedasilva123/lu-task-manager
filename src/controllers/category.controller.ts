import { FastifyInstance } from "fastify";
import { TCategoryBody, categoryCreateSchema } from "../schemas/category.schema";
import { authenticate } from "../hooks/authenticate";
import { validateBody } from "../hooks/validateBody";
import { categoryService } from "../services/category/_index";
import { isCategoryIdValid } from "../hooks/isCategoryIdValid";

interface Params {
   id: string;
}

export const categoryControllers = async (fastify: FastifyInstance) => {
   fastify.addHook("preHandler", authenticate);

   fastify.post<{ Body: TCategoryBody }>(
      "/",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, categoryCreateSchema);
         },
      },
      async (req, res) => {
         const response = await categoryService.create(req.body);

         return res.status(201).send(response);
      }
   );

   fastify.get("/", async (req, res) => {
      const response = await categoryService.getMany();

      return res.status(200).send(response);
   });

   fastify.get<{ Params: Params }>("/:id", async (req, res) => {
      const response = await categoryService.getOne(req.params.id);

      return res.status(200).send(response);
   });

   fastify.delete<{ Params: Params }>(
      "/:id",
      { preHandler: isCategoryIdValid },
      async (req, res) => {
         const response = await categoryService.remove(req.params.id);

         return res.status(200).send(response);
      }
   );

   fastify.patch<{ Body: TCategoryBody; Params: Params }>(
      "/:id",
      {
         preHandler: async (req, res) => {
            await validateBody(req, res, categoryCreateSchema);
            await isCategoryIdValid(req, res);
         },
      },
      async (req, res) => {
         const response = await categoryService.update(req.params.id, req.body);

         return res.status(200).send(response);
      }
   );
};

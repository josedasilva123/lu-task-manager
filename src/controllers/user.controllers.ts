import { FastifyInstance } from "fastify";
import {
   TUserCreateData,
   TUserLoginData,
   userCreateSchema,
} from "../schemas/user.schema";
import { userService } from "../services/user/_index";
import { validateBody } from "../hooks/validateBody";

export const userControllers = async (fastify: FastifyInstance) => {
   fastify.post<{ Body: TUserCreateData }>(
      "/register",
      { onRequest: async (req, res) => {
        validateBody(req, res, userCreateSchema);
      }},
      async (req, res) => {
         const response = await userService.create(req.body);

         return res.status(201).send(response);
      }
   );

   fastify.get("/profile", async (req, res) => {
      console.log(req.jwtDecode());
      return res.status(200).send();
   });

   fastify.post<{ Body: TUserLoginData }>("/login", async (req, res) => {
      const response = await userService.login(req.body);

      return res.status(200).send(response);
   });
};

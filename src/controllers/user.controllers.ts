import { FastifyInstance } from "fastify";
import {
  TUserCreateData,
  TUserLoginData,
  TUserUpdatePasswordData,
  userCreateSchema,
  userLoginSchema,
  userUpdatePasswordSchema,
} from "../schemas/user.schema";
import { userService } from "../services/user/_index";
import { validateBody } from "../hooks/validateBody";
import { authenticate } from "../hooks/authenticate";
import { IDecodedToken } from "../interfaces/token.interface";

export const userControllers = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: TUserCreateData }>(
    "/register",
    {
      preHandler: async (req, res) => {
        validateBody(req, res, userCreateSchema);
      },
    },
    async (req, res) => {
      const response = await userService.create(req.body);

      return res.status(201).send(response);
    }
  );

  fastify.get("/profile", { onRequest: authenticate }, async (req, res) => {
    const { id } = await req.jwtDecode<IDecodedToken>();

    const response = await userService.getOne(id);

    return res.status(200).send(response);
  });

  fastify.post<{ Body: TUserLoginData }>(
    "/login",
    {
      preHandler: async (req, res) => {
        validateBody(req, res, userLoginSchema);
      },
    },
    async (req, res) => {
      const response = await userService.login(req.body);

      return res.status(200).send(response);
    }
  );

  fastify.post<{ Body: TUserUpdatePasswordData }>(
    "/password",
    {
      onRequest: authenticate,
      preHandler: async (req, res) => {
        validateBody(req, res, userUpdatePasswordSchema);
      },
    },
    async (req, res) => {
      const { id } = await req.jwtDecode<IDecodedToken>();

      const response = await userService.updatePassword(
        id,
        req.body.oldPassword,
        req.body.newPassword
      );

      return res.status(200).send(response);
    }
  );
};

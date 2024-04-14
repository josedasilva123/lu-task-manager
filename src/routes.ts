import { FastifyInstance } from "fastify";
import { categoryControllers } from "./controllers/category.controller";
import { classificationControllers } from "./controllers/classification.controller";
import { localControllers } from "./controllers/local.controllers";
import { statusControllers } from "./controllers/status.controllers";
import { userControllers } from "./controllers/user.controllers";

export const routes = async (fastify: FastifyInstance) => {
   fastify.register(userControllers, {
      prefix: "/auth",
   });

   fastify.register(categoryControllers, {
      prefix: "/categories",
   });

   fastify.register(classificationControllers, {
      prefix: "/classifications",
   });

   fastify.register(statusControllers, {
      prefix: "/status",
   });

   fastify.register(localControllers, {
      prefix: "/locals",
   });
};

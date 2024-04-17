import { FastifyInstance } from "fastify";
import { categoryControllers } from "./controllers/category.controllers";
import { classificationControllers } from "./controllers/classification.controllers";
import { localControllers } from "./controllers/local.controllers";
import { statusControllers } from "./controllers/status.controllers";
import { userControllers } from "./controllers/user.controllers";
import { taskControllers } from "./controllers/task.controllers";
import { fileControllers } from "./controllers/file.controllers";

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

   fastify.register(taskControllers, {
      prefix: "/tasks",
   });

   fastify.register(fileControllers, {
      prefix: "/files",
   });
};

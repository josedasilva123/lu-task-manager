import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { errorHandler } from "./error/error";
import { userControllers } from "./controllers/user.controllers";
import { categoryControllers } from "./controllers/category.controller";
import { classificationControllers } from "./controllers/classification.controller";

export const app = fastify();

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(userControllers, {
   prefix: "/auth",
});

app.register(categoryControllers, {
   prefix: "/categories",
});

app.register(classificationControllers, {
   prefix: "/classifications"
})

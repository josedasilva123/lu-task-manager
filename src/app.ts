import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { errorHandler } from "./error/error";
import { routes } from "./routes";

export const app = fastify();

app.register(cors);

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(routes);

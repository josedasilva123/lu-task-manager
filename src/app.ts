import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { errorHandler } from "./error/error";
import { routes } from "./routes";
import fastifyHelmet from "@fastify/helmet";

export const app = fastify();

app.register(fastifyCors);

app.register(fastifyHelmet);

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(routes);

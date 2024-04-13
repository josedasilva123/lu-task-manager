import "dotenv/config";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { errorHandler } from "./error/error";

export const app = fastify();

app.setErrorHandler(errorHandler);
app.register(fastifyJwt, { secret: env.JWT_SECRET });

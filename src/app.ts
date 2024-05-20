import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyHelmet from "@fastify/helmet";

import { env } from "./env";
import { errorHandler } from "./error/error";
import { routes } from "./routes";

export const app = fastify();

app.register(fastifyCors, /* {
   origin: [
      "https://lu-task-manager-front-end.vercel.app",
      "https://lu-task-manager-front-end.onrender.com",
   ],
} */);

app.register(fastifyHelmet);

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(routes);

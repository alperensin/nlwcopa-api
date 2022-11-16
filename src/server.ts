import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { authRoutes } from "./routes/Auth";
import { userRoutes } from "./routes/User";
import { poolRoutes } from "./routes/Pool";
import { guessRoutes } from "./routes/Guess";
import { gameRoutes } from "./routes/Game";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
  });

  await fastify.register(authRoutes);
  await fastify.register(userRoutes);
  await fastify.register(poolRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(gameRoutes);

  await fastify.listen({ port: Number(process.env.PORT) || 3000 });
  // await fastify.listen({ port: 3333, host: "192.168.50.104" });
}

bootstrap();

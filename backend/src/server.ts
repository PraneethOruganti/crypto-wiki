import Fastify from 'fastify';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// Get all definitions
fastify.get('/definitions', async () => {
  return prisma.definition.findMany();
});

// Create a new definition
fastify.post('/definitions', async (request, reply) => {
  const body = request.body as { bodyLatex: string };
  const def = await prisma.definition.create({
    data: { bodyLatex: body.bodyLatex },
  });

  return def;
});

// run server
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';

export async function definitionRoutes(fastify: FastifyInstance) {
  // Get all definitions
  fastify.get('/definitions', async () => {
    const defs = prisma.definition.findMany();
    return defs;
  });

  // Get definition by ID
  fastify.get('/definitions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const def = await prisma.definition.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!def) {
      return reply.code(404).send({
        error: `Did not find definition with id ${id}`,
      });
    }

    return def;
  });

  // Create a new definition
  fastify.post('/definitions', async (request, reply) => {
    const { title, category, bodyLatex } = request.body as any;

    const newDef = await prisma.definition.create({
      data: { title, category, bodyLatex },
    });

    return newDef;
  });

  // PUT update
  fastify.put('/definitions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, category, bodyLatex } = request.body as any;
    const updated = await prisma.definition.update({
      where: {
        id: Number(id),
      },
      data: { title, category, bodyLatex },
    });

    return updated;
  });

  // Delete definition
  fastify.delete('/definitions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    await prisma.definition.delete({
      where: {
        id: Number(id),
      },
    });

    return {
      message: 'Deleted successfully',
    };
  });
}

import Fastify from 'fastify';
import { definitionRoutes } from './routes/definitions';

const fastify = Fastify({ logger: true });

// base endpoint
fastify.get('/', async (request, reply) => {
  reply.send({
    message: 'hello world',
  });
});

// Register definition routes
fastify.register(definitionRoutes);

// run server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

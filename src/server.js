import Fastify from 'fastify';
import encurtarRoutes from './modules/routes/encurtar.routes.js';

const fastify = Fastify({ logger: true });

fastify.register(encurtarRoutes, { prefix: '/api' });

// Iniciar o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3333 });
    console.log(`Servidor rodando em http://localhost:3333`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

import { criarUrl, listarUrls, editarUrl } from '../controllers/encurtar.controller.js';

export default async function (fastify) {
  fastify.post('/links', criarUrl);
  fastify.get('/links', listarUrls);
  fastify.put('/links/:id', editarUrl);
}


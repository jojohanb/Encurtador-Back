import { criarUrl, listarUrls, editarUrl, excluirUrl, redirecionar } from '../controllers/encurtar.controller.js';

export default async function (fastify) {
  fastify.post('/links', criarUrl);
  fastify.get('/links', listarUrls);
  fastify.put('/links/:id', editarUrl);
  fastify.delete('/links/:code', excluirUrl);
  fastify.get('/:code', redirecionar);


}


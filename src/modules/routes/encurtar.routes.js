import { criarUrl, listarUrls } from '../controllers/encurtar.controller.js';

export default async function (fastify) {
  fastify.post('/links', criarUrl);
  fastify.get('/links', listarUrls);

}


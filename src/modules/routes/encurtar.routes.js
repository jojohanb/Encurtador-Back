// // src/modules/routes/encurtar.routes.js
// import { criarUrl, redirecionar, listarUrls, excluirUrl } from '../controllers/encurtar.controller.js';

// export default async function (fastify) {
//   fastify.post('/encurtar', criarUrl);
//   fastify.get('/urls', listarUrls);
//   fastify.get('/:code', redirecionar);
//   fastify.delete('/:code', excluirUrl);
// }
import { criarUrl } from '../controllers/encurtar.controller.js';

export default async function (fastify) {
  fastify.post('/links', criarUrl);
}


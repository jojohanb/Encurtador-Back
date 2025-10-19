import { criarUrlService } from '../services/service.js';

export const criarUrl = async (request, reply) => {
  try {
    const { originalUrl } = request.body;
    const novaUrl = await criarUrlService(originalUrl);

    return reply.status(201).send({
      message: 'URL encurtada com sucesso!',
      data: novaUrl,
    });
  } catch (error) {
    console.error('Erro ao encurtar URL:', error);
    return reply.status(400).send({ error: error.message });
  }
};

// /**
//  * Redireciona uma URL curta para a original e incrementa clicks
//  */
// export const redirecionar = async (request, reply) => {
//   try {
//     const { code } = request.params;

//     // Atualiza o clicks e retorna a URL original
//     const [registro] = await db
//       .update(urls)
//       .set({ clicks: db.raw('clicks + 1') })
//       .where(eq(urls.shortCode, code))
//       .returning();

//     if (!registro) {
//       return reply.status(404).send({ error: 'URL não encontrada.' });
//     }

//     return reply.redirect(registro.originalUrl);
//   } catch (error) {
//     console.error('Erro ao redirecionar:', error);
//     return reply.status(500).send({ error: 'Erro interno do servidor.' });
//   }
// };

// /**
//  * Lista todas as URLs encurtadas
//  */
// export const listarUrls = async (request, reply) => {
//   try {
//     const lista = await db.select().from(urls);
//     return reply.send(lista);
//   } catch (error) {
//     console.error('Erro ao listar URLs:', error);
//     return reply.status(500).send({ error: 'Erro interno do servidor.' });
//   }
// };

// /**
//  * Exclui uma URL pelo código
//  */
// export const excluirUrl = async (request, reply) => {
//   try {
//     const { code } = request.params;

//     const result = await db.delete(urls).where(eq(urls.shortCode, code)).returning();

//     if (result.length === 0) {
//       return reply.status(404).send({ error: 'URL não encontrada.' });
//     }

//     return reply.send({ message: 'URL excluída com sucesso.' });
//   } catch (error) {
//     console.error('Erro ao excluir URL:', error);
//     return reply.status(500).send({ error: 'Erro interno do servidor.' });
//   }
// };

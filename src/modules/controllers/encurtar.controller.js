import { criarUrlService, listarUrlsService, editarUrlService, excluirUrlService, redirecionarService } from '../services/service.js';

export const criarUrl = async (request, reply) => {
  try {
    const { originalUrl, legenda } = request.body;
    const novaUrl = await criarUrlService(originalUrl, legenda);

    return reply.status(201).send({
      message: 'URL encurtada com sucesso!',
      data: novaUrl,
    });
  } catch (error) {
    console.error('Erro ao encurtar URL:', error);
    return reply.status(400).send({ error: error.message });
  }
};

export const listarUrls = async (request, reply) => {
  try {
    const lista =  await listarUrlsService();
    return reply.send(lista);
  } catch (error) {
    // console.error('Erro ao listar URLs:', error);
    // return reply.status(500).send({ error: 'Erro interno do servidor.' });
    console.error('Erro ao listar URLs:', error.message);
    return reply.status(500).send({ error: error.message });

  }
};


export const editarUrl = async (request, reply) => {
  try {
    const { id } = request.params;
    const { legenda, originalUrl } = request.body;

    const atualizado = await editarUrlService(Number(id), { legenda, originalUrl });

    return reply.send({
      message: 'URL atualizada com sucesso!',
      data: atualizado,
    });
  } catch (error) {
    console.error('Erro ao editar URL:', error);
    return reply.status(400).send({ error: error.message });
  }
};


//  Exclui uma URL pelo código

export const excluirUrl = async (request, reply) => {
  try {
    const { code } = request.params;

    await excluirUrlService(code);

    return reply.send({ message: 'URL excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir URL:', error);
    const status = error.message === 'URL não encontrada.' ? 404 : 500;
    return reply.status(status).send({ error: error.message });
  }
};

export const redirecionar = async (request, reply) => {
  try {
    const { code } = request.params;
    const urlOriginal = await redirecionarService(code);
    return reply.redirect(302, urlOriginal);
  } catch (error) {
    return reply.status(404).send({ error: 'URL não encontrada.' });
  }
};
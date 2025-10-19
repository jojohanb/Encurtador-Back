import { UrlRepository } from '../repositories/encurtar.repository.js';

function gerarCodigo(tamanho = 8) {
  const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indice];
  }
  return codigo;
};



export const criarUrlService = async (originalUrl, legenda) => {
  if (!originalUrl) throw new Error('A URL original é obrigatória.');

   try {
    new URL(originalUrl);
  } catch {
    throw new Error('Formato de URL inválido.');
  }

  let shortCode;
   do {
    shortCode = gerarCodigo(8);
  } while (await UrlRepository.existeCodigo(shortCode));

  return await UrlRepository.criar({ originalUrl, legenda, shortCode });

  // let existe;
  // do {
  //   shortCode = gerarCodigo(8);
  //   existe = await UrlRepository.existeCodigo(shortCode);
  // } while (existe);

  // const novaUrl = await UrlRepository.criar({ originalUrl, shortCode });
  // return novaUrl;
};



export const listarUrlsService = async () => {
  return await UrlRepository.listarTodas();
};

export const editarUrlService = async (id, dados) => {
  if (!dados.originalUrl && !dados.legenda) {
    throw new Error('É necessário informar pelo menos um campo para atualizar.');
  }

  const atualizado = await UrlRepository.editar(id, dados);
  if (!atualizado) throw new Error('URL não encontrada.');

  return atualizado;
};

export const excluirUrlService = async (code) => {
  const result = await UrlRepository.excluir(code);
  if (result.length === 0) throw new Error('URL não encontrada.');
  return true;
};


export const redirecionarService = async (code) => {
  const registro = await UrlRepository.incrementarClicks(code);
  if (!registro) throw new Error('URL não encontrada.');
  return registro.originalUrl;
};

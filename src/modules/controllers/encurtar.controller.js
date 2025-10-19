import db from '../db/Connection.js';
import { urls } from '../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * Função pra gerar um código de url aleatório
 */
function gerarCodigo(tamanho = 8) {
  const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indice];
  }
  return codigo;
}

export const criarUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'A URL original é obrigatória.' });
    }
    
    // Gera um código único       
    let shortCode;
    let existente;
    do {
      shortCode = gerarCodigo(8);
      [existente] = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);
    } while (existente);

    // Salva no banco
    const [novaUrl] = await db
      .insert(urls)
      .values({
        originalUrl,
        shortCode,
        createdAt: new Date(),
      })
      .returning();

    res.status(201).json({
      message: 'URL encurtada com sucesso!',
      data: novaUrl,
    });
  } catch (error) {
    console.error('Erro ao encurtar URL:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

/**
 * Redireciona uma URL curta para a original
 */
export const redirecionar = async (req, res) => {
  try {
    const { code } = req.params;

    const [registro] = await db
      .select()
      .from(urls)
      .where(eq(urls.shortCode, code))
      .limit(1);

    if (!registro) {
      return res.status(404).json({ error: 'URL não encontrada.' });
    }

    // Redireciona para a URL original
    res.redirect(registro.originalUrl);
  } catch (error) {
    console.error('Erro ao redirecionar:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

/**
 * Lista todas as URLs encurtadas
 */
export const listarUrls = async (req, res) => {
  try {
    const lista = await db.select().from(urls);
    res.json(lista);
  } catch (error) {
    console.error('Erro ao listar URLs:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

/**
 * Exclui uma URL pelo código
 */
export const excluirUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const result = await db.delete(urls).where(eq(urls.shortCode, code)).returning();

    if (result.length === 0) {
      return res.status(404).json({ error: 'URL não encontrada.' });
    }

    res.json({ message: 'URL excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir URL:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

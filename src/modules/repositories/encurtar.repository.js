import db from '../../infra/connection.js';
import { urls } from '../../infra/db/schema.js';
import { eq } from 'drizzle-orm';

export const UrlRepository = {
  // Cria uma nova URL encurtada
  criar: async ({ originalUrl, shortCode }) => {
    const [novaUrl] = await db
      .insert(urls)
      .values({
        originalUrl,
        shortCode,
        createdAt: new Date(), 
      })
      .returning({
        id: urls.id,
        originalUrl: urls.originalUrl,
        shortCode: urls.shortCode,
        createdAt: urls.createdAt,
      });
    return novaUrl;
  },
  
  // Verifica se um shortCode já existe
  existeCodigo: async (shortCode) => {
    const [registro] = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);
    return !!registro;
  },

  //Lista todas as URLs
  listarTodas: async () => {
    return await db.select().from(urls);
  },
};

//   /**
//    * Busca uma URL pelo shortCode
//    */
//   buscarPorCodigo: async (shortCode) => {
//     const [registro] = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);
//     return registro;
//   },

//   /**
//    * Atualiza a contagem de clicks e retorna a URL
//    */
//   incrementarClicks: async (shortCode) => {
//     const [registro] = await db
//       .update(urls)
//       .set({ clicks: db.raw('clicks + 1') })
//       .where(eq(urls.shortCode, shortCode))
//       .returning();
//     return registro;
//   },

//   /**
//    * Exclui uma URL pelo shortCode
//    */
//   excluir: async (shortCode) => {
//     const result = await db.delete(urls).where(eq(urls.shortCode, shortCode)).returning();
//     return result;
//   },

//   /**
//    * Verifica se um shortCode já existe
//    */
//   existeCodigo: async (shortCode) => {
//     const [registro] = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);
//     return !!registro;
//   }
// };

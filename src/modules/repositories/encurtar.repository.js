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
    return await db.select({
      id: urls.id,
      legenda: urls.legenda,
      originalUrl: urls.originalUrl,
      shortCode: urls.shortCode,
      clicks: urls.clicks,
      createdAt: urls.createdAt,
      updatedAt: urls.updatedAt,
    }).from(urls);
  },
    //Atualizar
editar: async (id, { legenda, originalUrl }) => {
  const [atualizado] = await db
    .update(urls)
    .set({
      legenda,
      originalUrl,
      updatedAt: new Date(),
    })
    .where(eq(urls.id, id))
    .returning({
      id: urls.id,
      legenda: urls.legenda,
      originalUrl: urls.originalUrl,
      shortCode: urls.shortCode,
      createdAt: urls.createdAt,
      updatedAt: urls.updatedAt,
    });

  return atualizado;
},
}


//   /**
//    * Busca uma URL pelo shortCode
//    */
//   buscarPorCodigo: async (shortCode) => {
//     const [registro] = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);
//     return registro;
//   },


  /**
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

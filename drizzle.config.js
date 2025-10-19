require('dotenv').config(); // carrega o .env

module.exports = {
  dialect: 'postgresql',
  out: './drizzle', // pasta onde serão salvas as migrations
  schema: './src/infra/db/schema.js', // caminho para o schema
  dbCredentials: {
    url: process.env.DATABASE_URL, // pega do .env
  },
};

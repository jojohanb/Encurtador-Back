import 'dotenv/config';

export default {
  dialect: 'postgresql',
  out: './drizzle', // Onde as migrations serão salvas
  schema: './src/infra/db/schema.js', // Onde seu schema está
  dbCredentials: {
    url: process.env.DATABASE_URL, // Pega do .env
  },
};

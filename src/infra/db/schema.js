import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const urls = pgTable('urls', {
  id: serial('id').primaryKey(),
  legenda: text('legenda'),       
  originalUrl: text('original_url').notNull(),
  shortCode: text('short_code').notNull().unique(),
  clicks: integer('clicks').default(0), 
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

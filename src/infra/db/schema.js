// import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// export const links = pgTable("links", {
//   id: serial("id").primaryKey(),
//   url: text("url").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
// });
// Só um exemplo pra testar.
// Dps no terminal dar "npx drizzle-kit generate" para criar uma pasta drizzle/migrations
// Para aplicar as migrations no banco "npx drizzle-kit push"
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const urls = pgTable('urls', {
  id: serial('id').primaryKey(),
  originalUrl: text('original_url').notNull(),
  shortCode: text('short_code').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

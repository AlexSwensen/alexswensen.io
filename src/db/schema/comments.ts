import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './users';

export const commentsTable = pgTable('comments', {
  id: uuid().primaryKey().defaultRandom(),
  postSlug: varchar({ length: 255 }).notNull(),
  userId: uuid().references(() => usersTable.id, { onDelete: 'set null' }),
  authorName: varchar({ length: 255 }).notNull(),
  authorEmail: varchar({ length: 255 }).notNull(),
  body: text().notNull(),
  approved: boolean().notNull().default(false),
  createdAt: timestamp().notNull().defaultNow(),
});

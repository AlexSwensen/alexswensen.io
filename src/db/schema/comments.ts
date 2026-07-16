import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const commentsTable = pgTable('comments', {
  id: uuid().primaryKey().defaultRandom(),
  postSlug: varchar({ length: 255 }).notNull(),
  // References better-auth's user table (text PK)
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  authorName: varchar({ length: 255 }).notNull(),
  body: text().notNull(),
  approved: boolean().notNull().default(false),
  createdAt: timestamp().notNull().defaultNow(),
});

import { eq } from 'drizzle-orm';
import { boolean, pgTable, timestamp, uuid, varchar, uniqueIndex } from 'drizzle-orm/pg-core';
import { usersTable } from './users';

export const userCredentialsTable = pgTable(
  'user_credentials',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    hash: varchar('hash', { length: 255 }).notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    activeCredentialConstraint: uniqueIndex('idx_user_active_credential')
      .on(table.userId)
      .where(eq(table.isActive, true)),
  })
);

export type UserCredential = typeof userCredentialsTable.$inferSelect;
export type NewUserCredential = typeof userCredentialsTable.$inferInsert;

export const deactivateCredential = (userId: string) => ({
  isActive: false,
  updatedAt: new Date(),
});

export const createNewCredential = (userId: string, hash: string): NewUserCredential => ({
  userId,
  hash,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

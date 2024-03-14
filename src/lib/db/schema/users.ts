// src/lib/db/schema.ts

import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	created_at: text('created_at').notNull(),
	updated_at: text('updated_at').notNull()
});
